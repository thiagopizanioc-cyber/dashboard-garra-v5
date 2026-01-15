// ===========================================
// ARQUIVO DE EXEMPLO - NÃO EDITE ESTE
// ===========================================
// Este é um exemplo de como configurar seu dashboard.
// Edite o arquivo real em: js/config.js

/*
============================================
PASSO 1: CONFIGURAR URL DO GOOGLE SHEETS
============================================

1. Abra sua planilha no Google Sheets
2. Vá em: Arquivo → Compartilhar → Publicar na Web
3. Selecione a aba e escolha "CSV"
4. Clique em "Publicar" e copie a URL
5. Cole a URL no lugar do exemplo abaixo
*/

const DASHBOARD_CONFIG = {
    // ⚠️ EDITE AQUI: Cole sua URL do Google Sheets
    GOOGLE_SHEETS_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_SUA_CHAVE_AQUI/pub?output=csv",
    
    /*
    ============================================
    PASSO 2: AJUSTAR INTERVALO DE ATUALIZAÇÃO
    ============================================
    
    Defina com que frequência o dashboard deve buscar novos dados:
    - 10000 = 10 segundos
    - 30000 = 30 segundos (padrão)
    - 60000 = 1 minuto
    - 300000 = 5 minutos
    */
    POLLING_INTERVAL: 30000,
    
    /*
    ============================================
    PASSO 3: PERSONALIZAR CORES (OPCIONAL)
    ============================================
    
    Cores em formato hexadecimal (#RRGGBB)
    Use: https://htmlcolorcodes.com/ para escolher cores
    */
    COLORS: {
        primary: '#FFD700',      // Dourado - Cor principal dos valores
        secondary: '#00FFFF',    // Ciano - Destaques e brilhos
        accent: '#9333EA',       // Roxo - Gráficos e efeitos
        danger: '#EF4444',       // Vermelho - Alertas e quedas
        success: '#10B981',      // Verde - Crescimento positivo
        warning: '#F59E0B',      // Amarelo - Avisos
        background: '#1a1b20',   // Matte Charcoal - Fundo
    },
    
    /*
    ============================================
    CONFIGURAÇÕES AVANÇADAS DE GRÁFICOS
    ============================================
    */
    CHART_CONFIG: {
        animationDuration: 1000,  // Duração das animações (ms)
        strokeWidth: 3,           // Espessura das linhas dos gráficos
        gaugeThickness: 20,       // Espessura do gauge central
    }
};

/*
============================================
DADOS DE EXEMPLO (FALLBACK)
============================================

Estes dados são usados quando:
- O dashboard está carregando pela primeira vez
- Há erro ao buscar dados do Google Sheets
- A URL do Google Sheets está incorreta

Você pode personalizar estes dados de exemplo:
*/
const MOCK_DATA = [
    // KPIs Financeiros (4 principais para a sidebar)
    { kpi_name: 'Receita Total', value: 21338, trend: 12.5, category: 'financeiro' },
    { kpi_name: 'Custo Operacional', value: 8450, trend: -3.2, category: 'financeiro' },
    { kpi_name: 'Margem de Lucro', value: 60.3, trend: 8.7, category: 'financeiro' },
    { kpi_name: 'ROI', value: 145.2, trend: 15.4, category: 'financeiro' },
    
    // KPIs Logísticos
    { kpi_name: 'Entregas Realizadas', value: 1485, trend: 22.1, category: 'logistica' },
    { kpi_name: 'Entregas Pendentes', value: 318, trend: -5.3, category: 'logistica' },
    { kpi_name: 'Tempo Médio Entrega', value: 2.4, trend: -12.5, category: 'logistica' },
    { kpi_name: 'Taxa de Sucesso', value: 97.8, trend: 2.1, category: 'logistica' },
];

/*
============================================
DADOS HISTÓRICOS DE EXEMPLO
============================================

Formato: Array de objetos com 'time' e 'value'
O dashboard gera isso automaticamente, mas você pode customizar:
*/
const MOCK_HISTORICAL_DATA = [
    { time: '00:00', value: 1125 },
    { time: '04:00', value: 1145 },
    { time: '08:00', value: 1320 },
    { time: '12:00', value: 1280 },
    { time: '16:00', value: 1450 },
    { time: '20:00', value: 1485 },
];

/*
============================================
EXPORTAR CONFIGURAÇÕES
============================================
NÃO EDITE ESTA PARTE
*/
window.DASHBOARD_CONFIG = DASHBOARD_CONFIG;
window.MOCK_DATA = MOCK_DATA;
window.MOCK_HISTORICAL_DATA = MOCK_HISTORICAL_DATA;

/*
============================================
NOTAS IMPORTANTES
============================================

✅ Estrutura do CSV do Google Sheets:
   - Colunas obrigatórias: kpi_name, value, trend, category
   - category deve ser: "financeiro" ou "logistica"
   - value e trend devem ser números

✅ Para testar localmente:
   - Use um servidor local (não abra o arquivo diretamente)
   - Python: python -m http.server 8000
   - Node: npx serve

✅ Troubleshooting:
   - Abra o Console (F12) para ver erros
   - Verifique se a planilha está publicada como CSV
   - Certifique-se que a URL está correta

============================================
*/
