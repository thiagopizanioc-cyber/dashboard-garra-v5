# 🛠️ Guia de Troubleshooting

## 🔍 Diagnóstico Rápido

### Como Identificar Problemas

1. **Abra o Console do Navegador:**
   - Chrome/Edge: `F12` ou `Ctrl+Shift+J`
   - Firefox: `F12` ou `Ctrl+Shift+K`
   - Safari: `Cmd+Option+C`

2. **Verifique a Aba "Console"** para mensagens de erro

3. **Verifique a Aba "Network"** para ver requisições HTTP

---

## ❌ Problemas Comuns

### 1. Dashboard Mostra "Usando dados mock"

**Sintoma:**
- Bolinha vermelha no canto inferior esquerdo
- Mensagem "Usando dados mock"
- Dados não atualizam

**Causas Possíveis:**

#### A. URL do Google Sheets Incorreta

**Solução:**
1. Abra `js/config.js`
2. Verifique se a URL está completa:
   ```javascript
   GOOGLE_SHEETS_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR.../pub?output=csv"
   ```
3. A URL deve terminar com `?output=csv`
4. Teste a URL diretamente no navegador (deve baixar um arquivo CSV)

#### B. Planilha Não Publicada

**Solução:**
1. Abra sua planilha no Google Sheets
2. Vá em: **Arquivo → Compartilhar → Publicar na Web**
3. Certifique-se que está marcado como:
   - Tipo: **Valores separados por vírgula (.csv)**
   - Status: **Publicado**
4. Se já estava publicado, clique em "Republicar"

#### C. Erro de CORS

**Solução:**
1. Use um servidor local (não abra o arquivo diretamente)
2. **Python:**
   ```bash
   python -m http.server 8000
   ```
3. **Node.js:**
   ```bash
   npx serve
   ```
4. Acesse: `http://localhost:8000`

---

### 2. Gráficos Não Aparecem

**Sintoma:**
- Tela em branco ou espaços vazios
- Console mostra erros de biblioteca

**Soluções:**

#### A. Bibliotecas CDN Não Carregadas

1. Abra a aba **Network** do console
2. Verifique se há erros 404 nos scripts CDN
3. Se houver, verifique sua conexão com a internet
4. Tente recarregar a página (Ctrl+F5)

#### B. Dados com Estrutura Errada

1. Verifique no console se há erro: `"Nenhum dado encontrado no CSV"`
2. Abra sua planilha e confirme:
   ```
   Primeira linha: kpi_name,value,trend,category
   ```
3. Certifique-se que não há linhas vazias no meio dos dados

---

### 3. Valores Não Formatam Corretamente

**Sintoma:**
- Números aparecem muito grandes ou estranhos
- Porcentagens não aparecem

**Soluções:**

#### A. Valores Não São Números

1. No Google Sheets, certifique-se que:
   - Coluna `value`: Formato **Número**
   - Coluna `trend`: Formato **Número**
2. Use ponto (.) como separador decimal, não vírgula
3. Remova símbolos como R$, $, %

#### B. Nomes de KPI Não Reconhecidos

O dashboard detecta automaticamente tipos de valores pelo nome:
- **Porcentagens**: Se o nome contém "margem", "taxa" ou "roi"
- **Moeda**: Se o valor > 1000

Para forçar formatação específica, edite `js/components/KpiCard.js`:
```javascript
const formatValue = (val) => {
    // Adicione suas regras personalizadas aqui
    if (kpi_name.includes('Taxa')) {
        return `${val}%`;
    }
    // ...
}
```

---

### 4. Dashboard Fica Lento

**Sintomas:**
- Navegador trava
- Animações lentas
- Alto uso de CPU

**Soluções:**

#### A. Muitos Dados na Planilha

1. Limite a planilha a no máximo **50 linhas de dados**
2. Remova colunas desnecessárias
3. Use apenas as colunas obrigatórias: `kpi_name, value, trend, category`

#### B. Polling Muito Frequente

1. Abra `js/config.js`
2. Aumente o intervalo:
   ```javascript
   POLLING_INTERVAL: 60000, // 1 minuto em vez de 30s
   ```

#### C. Muitas Abas Abertas

- Feche outras abas do navegador
- O dashboard usa animações que consomem recursos

---

### 5. Filtros Não Funcionam

**Sintoma:**
- Clicar nos botões não muda os gráficos
- Console mostra erros

**Soluções:**

#### A. Categorias Erradas

Verifique se sua planilha usa EXATAMENTE:
- `financeiro` (sem acento, minúsculas)
- `logistica` (sem acento, minúsculas)

❌ Errado:
```
category
Financeiro
LOGISTICA
logística (com acento)
```

✅ Correto:
```
category
financeiro
logistica
```

#### B. Limpe o Cache do Navegador

1. Chrome/Edge: `Ctrl+Shift+Delete`
2. Marque "Cached images and files"
3. Clique em "Clear data"
4. Recarregue a página (F5)

---

### 6. Erro: "Papa is not defined"

**Sintoma:**
```
Uncaught ReferenceError: Papa is not defined
```

**Solução:**

1. Verifique sua conexão com internet
2. Aguarde todos os scripts CDN carregarem
3. Abra a aba **Network** e procure por `papaparse.min.js`
4. Se houver erro 404, tente usar um CDN alternativo:

Edite `index.html` e substitua:
```html
<!-- De: -->
<script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>

<!-- Para: -->
<script src="https://unpkg.com/papaparse@5.4.1/papaparse.min.js"></script>
```

---

### 7. Erro: "Recharts is not defined"

**Sintoma:**
```
Uncaught ReferenceError: Recharts is not defined
```

**Solução:**

Similar ao erro Papa, mas para gráficos:

```html
<!-- CDN Alternativo para Recharts -->
<script src="https://unpkg.com/recharts@2.5.0/dist/Recharts.js"></script>
```

---

### 8. KPIs da Sidebar Não Aparecem

**Sintoma:**
- Sidebar esquerda vazia ou com menos de 4 cards

**Soluções:**

#### A. Poucos KPIs Financeiros

O dashboard mostra os **primeiros 4 KPIs** com `category = "financeiro"`.

Certifique-se de ter pelo menos 4 linhas:
```csv
kpi_name,value,trend,category
Receita Total,21338,12.5,financeiro
Custo,8450,-3.2,financeiro
Margem,60.3,8.7,financeiro
ROI,145.2,15.4,financeiro
```

#### B. Categoria Escrita Errado

Verifique se está escrito exatamente `financeiro` (sem acento).

---

### 9. Gráfico de Onda Não Atualiza

**Sintoma:**
- Gráfico roxo no rodapé não muda ao clicar nos filtros

**Causa:**
O gráfico histórico é gerado automaticamente com base nos dados atuais.

**Para Histórico Real:**

1. Crie uma segunda aba na planilha chamada "Historico"
2. Estrutura:
   ```csv
   time,value
   00:00,1125
   04:00,1145
   08:00,1320
   ```
3. Edite `js/hooks/useDashboardData.js` para buscar desta aba

---

## 🐛 Erros Específicos

### ERR_CONNECTION_REFUSED

**Erro:**
```
Failed to load resource: net::ERR_CONNECTION_REFUSED
```

**Causa:**
Tentando acessar o dashboard sem servidor local.

**Solução:**
Use um servidor:
```bash
python -m http.server 8000
# OU
npx serve
```

---

### CORS Policy Error

**Erro:**
```
Access to fetch at 'https://...' from origin 'null' has been blocked by CORS policy
```

**Causa:**
Abrindo o arquivo diretamente (`file://`)

**Solução:**
Use servidor local (veja acima)

---

### Parsing Error

**Erro:**
```
SyntaxError: Unexpected token '<'
```

**Causa:**
Servidor retornou HTML em vez de CSV.

**Solução:**
1. Teste a URL do Google Sheets diretamente no navegador
2. Deve baixar um arquivo `.csv`, não mostrar HTML
3. Se mostrar HTML, republique a planilha como CSV

---

## 🔧 Ferramentas de Diagnóstico

### 1. Verificar URL do CSV

Cole esta função no console do navegador:
```javascript
fetch(window.DASHBOARD_CONFIG.GOOGLE_SHEETS_CSV_URL)
  .then(r => r.text())
  .then(console.log)
  .catch(console.error);
```

Deve exibir o conteúdo CSV.

---

### 2. Verificar Estrutura dos Dados

No console:
```javascript
console.table(window.MOCK_DATA);
```

Deve mostrar uma tabela com seus dados.

---

### 3. Forçar Atualização Manual

No console:
```javascript
// Força busca imediata dos dados
window.location.reload();
```

---

## 📞 Checklist de Suporte

Antes de pedir ajuda, verifique:

- [ ] Estou usando um servidor local (não `file://`)
- [ ] A URL do Google Sheets está correta em `js/config.js`
- [ ] A planilha está publicada como CSV
- [ ] As colunas são: `kpi_name, value, trend, category`
- [ ] Os valores em `value` e `trend` são números
- [ ] A categoria é "financeiro" ou "logistica" (sem acento)
- [ ] Não há linhas vazias na planilha
- [ ] O console não mostra erros de CDN (404)
- [ ] Testei em outro navegador

---

## 🆘 Últimas Opções

### Reset Completo

1. **Limpe tudo:**
   ```bash
   # Limpe cache do navegador
   Ctrl+Shift+Delete
   ```

2. **Restaure configurações:**
   ```bash
   # Copie o arquivo de exemplo
   cp config.example.js js/config.js
   ```

3. **Teste com dados mock:**
   - Use a URL de exemplo do `config.js`
   - Se funcionar, o problema é sua planilha

4. **Teste com sample data:**
   - Crie nova planilha
   - Cole o conteúdo de `sample-data.csv`
   - Publique e teste

---

### Modo Debug

Adicione ao início do `js/App.js`:
```javascript
// Debug mode
window.DEBUG = true;

// Logs detalhados
console.log('Dashboard iniciado');
console.log('Config:', window.DASHBOARD_CONFIG);
console.log('Mock Data:', window.MOCK_DATA);
```

---

## 📚 Recursos Adicionais

- **README.md**: Documentação completa
- **QUICKSTART.md**: Início rápido
- **ARCHITECTURE.md**: Detalhes técnicos
- **GOOGLE_SHEETS_TEMPLATE.md**: Template da planilha

---

**Se o problema persistir:**
1. Verifique o console (F12)
2. Anote a mensagem de erro exata
3. Procure por esta mensagem neste documento
4. Teste em modo anônimo/privado do navegador

---

**Versão do Guia:** 1.0.0  
**Última Atualização:** Janeiro 2026
