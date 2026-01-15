# 📊 Dashboard Logístico/Financeiro - High-End

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css)

Dashboard executivo de alta performance com design futurista para monitoramento em tempo real de KPIs logísticos e financeiros, conectado a dados do Google Sheets.

---

## ⚡ VISUALIZAÇÃO IMEDIATA - SEM CONFIGURAÇÃO!

> **🎯 Quer VER o dashboard AGORA?**
> 
> **Duplo clique em `index.html`** → O dashboard abre com dados de exemplo!
> 
> ✅ Não precisa configurar Google Sheets primeiro  
> ✅ Dados mock já incluídos (8 KPIs de demonstração)  
> ✅ Explore todos os recursos interativos  
> 📖 [Leia VIEW_NOW.md](VIEW_NOW.md) para mais opções

---

> 🎉 **Primeira vez aqui?** Abra o arquivo **[welcome.html](welcome.html)** para uma visão geral interativa do projeto!

---

## ✨ Funcionalidades Principais

### ✅ **Funcionalidades Implementadas**

1. **🔄 Integração com Google Sheets**
   - Hook customizado `useDashboardData` com polling automático a cada 30 segundos
   - Parse de CSV usando PapaParse
   - Fallback automático para dados mock em caso de erro
   - Status de conexão em tempo real

2. **📈 Visualizações Avançadas**
   - **Sidebar Esquerda**: 4 KPI Cards em formato "pílula" com animações
   - **Hero Gauge**: Gráfico radial 3D tipo ferradura no centro com anéis coloridos (Ciano, Amarelo, Vermelho)
   - **Gráfico de Onda**: Area Chart (Spline) roxo no rodapé com histórico
   - **Painel Lateral Direito**: Cards de estatísticas rápidas

3. **🎯 Sistema de Filtros**
   - 4 botões FAB (Floating Action Button) circulares animados
   - Filtros: Todos, Financeiro, Logística, Performance
   - Atualização dinâmica dos gráficos baseada no filtro ativo

4. **🎨 Design Futurista**
   - Tema Dark Mode (Matte Charcoal #1a1b20)
   - Efeitos Glassmorphism em todos os cards
   - Gradientes dourados e ciano
   - Animações suaves (Framer Motion)
   - Efeitos de glow e pulse
   - Sombras volumétricas 3D
   - Layout responsivo 100vw/100vh sem rolagem

5. **⚙️ Configuração Fácil**
   - Arquivo `js/config.js` centralizado para configurações
   - URL do Google Sheets facilmente editável
   - Dados mock pré-configurados para testes

---

## 🚀 Como Usar

### 1. **Configurar Google Sheets**

#### Estrutura da Planilha
Sua planilha do Google Sheets deve ter as seguintes colunas:

| kpi_name | value | trend | category |
|----------|-------|-------|----------|
| Receita Total | 21338 | 12.5 | financeiro |
| Custo Operacional | 8450 | -3.2 | financeiro |
| Entregas Realizadas | 1485 | 22.1 | logistica |
| Taxa de Sucesso | 97.8 | 2.1 | logistica |

#### Publicar como CSV

1. Abra sua planilha no Google Sheets
2. Vá em: **Arquivo → Compartilhar → Publicar na Web**
3. Escolha a aba desejada
4. Selecione **"Valores separados por vírgula (.csv)"**
5. Clique em **"Publicar"**
6. Copie a URL gerada (exemplo: `https://docs.google.com/spreadsheets/d/e/2PACX-1vR...`)

### 2. **Configurar o Dashboard**

Edite o arquivo `js/config.js`:

```javascript
const DASHBOARD_CONFIG = {
    // Cole aqui a URL do seu Google Sheets
    GOOGLE_SHEETS_CSV_URL: "SUA_URL_AQUI",
    
    // Intervalo de atualização (padrão: 30 segundos)
    POLLING_INTERVAL: 30000,
};
```

### 3. **Visualizar o Dashboard**

Abra o arquivo `index.html` em um navegador moderno ou use um servidor local:

```bash
# Usando Python
python -m http.server 8000

# Usando Node.js
npx serve
```

Acesse: `http://localhost:8000`

---

## 📁 Estrutura do Projeto

```
dashboard-logistico/
│
├── index.html                 # Página principal
│
├── js/
│   ├── config.js             # ⚙️ Configurações (EDITE AQUI!)
│   │
│   ├── hooks/
│   │   └── useDashboardData.js   # Hook de busca de dados
│   │
│   └── components/
│       ├── KpiCard.js        # Card KPI sidebar
│       ├── HeroGauge.js      # Gráfico radial central
│       ├── FilterButton.js   # Botões FAB de filtro
│       ├── WaveChart.js      # Gráfico de área roxo
│       └── App.js            # Componente principal
│
└── README.md                  # Este arquivo
```

---

## 🎨 Paleta de Cores

```css
Matte Charcoal (Fundo): #1a1b20
Dourado (Destaque):     #FFD700
Ciano (Primário):       #00FFFF
Roxo (Secundário):      #9333EA
Vermelho (Alerta):      #EF4444
Verde (Sucesso):        #10B981
Amarelo (Aviso):        #F59E0B
```

---

## 📊 Estrutura de Dados

### Campos Obrigatórios no CSV

- **kpi_name** (string): Nome do indicador (ex: "Receita Total")
- **value** (number): Valor numérico do KPI
- **trend** (number): Tendência em % (positivo = crescimento, negativo = queda)
- **category** (string): Categoria do KPI ("financeiro" ou "logistica")

### Exemplo de Dados

```csv
kpi_name,value,trend,category
Receita Total,21338,12.5,financeiro
Custo Operacional,8450,-3.2,financeiro
Margem de Lucro,60.3,8.7,financeiro
ROI,145.2,15.4,financeiro
Entregas Realizadas,1485,22.1,logistica
Entregas Pendentes,318,-5.3,logistica
Tempo Médio Entrega,2.4,-12.5,logistica
Taxa de Sucesso,97.8,2.1,logistica
```

---

## 🔧 Tecnologias Utilizadas

### Core
- **React 18**: Framework JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Vite**: Build tool (configuração CDN)

### Bibliotecas
- **PapaParse 5**: Parser de CSV
- **Recharts 2.5**: Biblioteca de gráficos
- **Framer Motion 10**: Animações suaves
- **Lucide Icons**: Ícones modernos

### Técnicas de UI/UX
- Glassmorphism
- Neumorphism
- Animações CSS/JS
- Gradientes complexos
- Efeitos de glow/shadow

---

## 🎯 Funcionalidades Futuras (Roadmap)

### 🔜 Próximos Passos Recomendados

1. **📱 Responsividade Mobile**
   - Adaptar layout para tablets e smartphones
   - Menu hambúrguer para sidebar em telas pequenas

2. **🔔 Sistema de Alertas**
   - Notificações quando KPIs atingirem thresholds
   - Alertas sonoros e visuais

3. **📤 Exportação de Dados**
   - Download de relatórios em PDF
   - Exportar gráficos como imagens

4. **🕐 Histórico Avançado**
   - Comparação de períodos (dia/semana/mês)
   - Gráficos de tendência de longo prazo

5. **👥 Multi-Usuários**
   - Sistema de autenticação
   - Dashboards personalizados por usuário

6. **🎨 Temas Customizáveis**
   - Light mode
   - Temas personalizados (cores, fontes)

7. **📊 Mais Visualizações**
   - Mapas de calor
   - Gráficos de dispersão
   - Treemaps

---

## 🐛 Troubleshooting

### Problema: Dashboard mostra "Usando dados mock"

**Solução:**
1. Verifique se a URL do Google Sheets está correta em `js/config.js`
2. Certifique-se que a planilha está publicada como CSV
3. Verifique se há bloqueios CORS no navegador (console F12)
4. Teste a URL diretamente no navegador

### Problema: Gráficos não aparecem

**Solução:**
1. Verifique o console do navegador (F12) para erros
2. Certifique-se que os dados têm a estrutura correta
3. Limpe o cache do navegador
4. Verifique se todas as bibliotecas CDN foram carregadas

### Problema: Dados não atualizam automaticamente

**Solução:**
1. Verifique a configuração `POLLING_INTERVAL` em `js/config.js`
2. Abra o console e procure por erros de fetch
3. Teste manualmente clicando em "Refresh" (se implementado)

---

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Otimizar o código

---

## 📞 Suporte

Para dúvidas ou suporte:
1. Verifique a seção de **Troubleshooting** acima
2. Abra o console do navegador (F12) para ver erros
3. Consulte a documentação das bibliotecas usadas

---

## 🎉 Créditos

Desenvolvido com 💜 usando as melhores práticas de desenvolvimento web moderno.

**Stack:** React + Tailwind + Recharts + PapaParse + Framer Motion

---

**Versão:** 1.0.0  
**Última Atualização:** Janeiro 2026  
**Status:** ✅ Pronto para Produção
