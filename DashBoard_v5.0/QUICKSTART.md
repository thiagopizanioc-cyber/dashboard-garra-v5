# 🚀 Guia de Início Rápido

## Configuração em 5 Minutos

### Passo 1: Prepare sua Planilha do Google Sheets

1. **Crie uma nova planilha** ou use uma existente
2. **Configure as colunas** exatamente como abaixo:

```
| kpi_name              | value | trend  | category   |
|-----------------------|-------|--------|------------|
| Receita Total         | 21338 | 12.5   | financeiro |
| Custo Operacional     | 8450  | -3.2   | financeiro |
| Margem de Lucro       | 60.3  | 8.7    | financeiro |
| ROI                   | 145.2 | 15.4   | financeiro |
| Entregas Realizadas   | 1485  | 22.1   | logistica  |
| Entregas Pendentes    | 318   | -5.3   | logistica  |
| Tempo Médio Entrega   | 2.4   | -12.5  | logistica  |
| Taxa de Sucesso       | 97.8  | 2.1    | logistica  |
```

**💡 Dica:** Use o arquivo `sample-data.csv` como referência!

---

### Passo 2: Publique como CSV

1. Na sua planilha, clique em **"Arquivo"**
2. Selecione **"Compartilhar" → "Publicar na Web"**
3. Na janela que abrir:
   - Escolha a **aba específica** ou "Planilha inteira"
   - No dropdown, selecione **"Valores separados por vírgula (.csv)"**
4. Clique em **"Publicar"**
5. **COPIE A URL** que aparecer (algo como):
   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-1vR_EXEMPLO.../pub?output=csv
   ```

---

### Passo 3: Configure o Dashboard

1. Abra o arquivo **`js/config.js`**
2. Encontre a linha:
   ```javascript
   GOOGLE_SHEETS_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_EXAMPLE_KEY/pub?output=csv",
   ```
3. **SUBSTITUA** pela URL que você copiou no Passo 2
4. Salve o arquivo

---

### Passo 4: Execute o Dashboard

#### Opção A: Abrir Diretamente (Mais Simples)
- Dê duplo clique no arquivo `index.html`
- O dashboard abrirá no seu navegador

#### Opção B: Servidor Local (Recomendado)

**Com Python:**
```bash
# Navegue até a pasta do projeto
cd caminho/para/o/projeto

# Inicie o servidor
python -m http.server 8000

# Abra no navegador: http://localhost:8000
```

**Com Node.js:**
```bash
# Instale o serve (apenas uma vez)
npm install -g serve

# Inicie o servidor
serve

# Abra no navegador: http://localhost:3000
```

**Com VS Code:**
- Instale a extensão "Live Server"
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

---

### Passo 5: Verifique se Está Funcionando

✅ **Indicadores de Sucesso:**
- No canto inferior esquerdo deve aparecer: **"Conectado"** com bolinha verde
- Os KPI Cards devem mostrar seus dados reais
- O gráfico central deve exibir a porcentagem da meta
- O gráfico de ondas deve plotar o histórico

❌ **Se aparecer "Usando dados mock":**
- Verifique se a URL do Google Sheets está correta
- Certifique-se que a planilha foi publicada como CSV
- Abra o Console do navegador (F12) para ver possíveis erros

---

## 🎨 Personalizações Rápidas

### Alterar Cores do Dashboard

Edite `js/config.js`:
```javascript
COLORS: {
    primary: '#FFD700',      // Dourado → Troque aqui
    secondary: '#00FFFF',    // Ciano → Troque aqui
    accent: '#9333EA',       // Roxo → Troque aqui
    // ...
}
```

### Alterar Intervalo de Atualização

Edite `js/config.js`:
```javascript
POLLING_INTERVAL: 30000, // 30 segundos (em milissegundos)
                         // 60000 = 1 minuto
                         // 300000 = 5 minutos
```

---

## 🆘 Problemas Comuns

### "Não consigo ver meus dados"
- ✅ Verifique se as colunas do CSV estão exatamente como: `kpi_name`, `value`, `trend`, `category`
- ✅ Certifique-se que os valores em `value` e `trend` são números
- ✅ As categorias devem ser `financeiro` ou `logistica` (sem acento)

### "CORS Error no Console"
- ✅ Use um servidor local (não abra o arquivo diretamente)
- ✅ Certifique-se que a planilha está pública

### "Dashboard fica lento"
- ✅ Reduza o intervalo de atualização para 60 segundos ou mais
- ✅ Limite o número de linhas na planilha (máx. 50 KPIs)

---

## 📊 Estrutura dos Dados

### Campos Obrigatórios

| Campo      | Tipo   | Descrição                                | Exemplo             |
|------------|--------|------------------------------------------|---------------------|
| kpi_name   | texto  | Nome do indicador                        | "Receita Total"     |
| value      | número | Valor numérico do KPI                    | 21338               |
| trend      | número | Tendência em % (+ ou -)                  | 12.5 ou -3.2        |
| category   | texto  | "financeiro" ou "logistica"              | "financeiro"        |

### Formatação Automática de Valores

O dashboard formata automaticamente:
- **Valores > 1000**: Adiciona separadores (21.338)
- **Valores < 100 com "margem", "taxa" ou "roi" no nome**: Adiciona % (60.3%)
- **Trend**: Sempre mostra % com seta ↑ ou ↓

---

## 🎯 Próximos Passos

1. ✅ Configure seu Google Sheets
2. ✅ Execute o dashboard
3. ✅ Personalize as cores se desejar
4. 📱 Considere adaptar para mobile (veja README.md)
5. 🔔 Adicione sistema de alertas (roadmap)

---

**Pronto!** Seu dashboard está configurado e funcionando! 🎉

Para mais detalhes, consulte o **README.md** completo.
