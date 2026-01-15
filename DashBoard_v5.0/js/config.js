// ===========================================
// CONFIGURAÇÃO DO DASHBOARD
// ===========================================
// 
// INSTRUÇÕES: 
// 1. Cole aqui a URL do seu Google Sheets publicado como CSV
// 2. Para publicar sua planilha como CSV:
//    - Abra sua planilha no Google Sheets
//    - Vá em: Arquivo > Compartilhar > Publicar na Web
//    - Escolha a aba desejada e selecione "Valores separados por vírgula (.csv)"
//    - Clique em "Publicar" e copie a URL gerada
// 3. Cole a URL na constante GOOGLE_SHEETS_CSV_URL abaixo

const DASHBOARD_CONFIG = {
    // URL do Google Sheets publicado como CSV
    GOOGLE_SHEETS_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_EXAMPLE_KEY/pub?output=csv",
    
    // Intervalo de atualização dos dados (em milissegundos)
    POLLING_INTERVAL: 30000, // 30 segundos
    
    // Configurações de Cores do Dashboard
    COLORS: {
        primary: '#FFD700',      // Dourado
        secondary: '#00FFFF',    // Ciano
        accent: '#9333EA',       // Roxo
        danger: '#EF4444',       // Vermelho
        success: '#10B981',      // Verde
        warning: '#F59E0B',      // Amarelo
        background: '#1a1b20',   // Matte Charcoal
    },
    
    // Configurações dos Gráficos
    CHART_CONFIG: {
        animationDuration: 1000,
        strokeWidth: 3,
        gaugeThickness: 20,
    }
};

// Mock Data - Usado quando o CSV falha ou está carregando
const MOCK_DATA = [
    { kpi_name: 'Receita Total', value: 21338, trend: 12.5, category: 'financeiro' },
    { kpi_name: 'Custo Operacional', value: 8450, trend: -3.2, category: 'financeiro' },
    { kpi_name: 'Margem de Lucro', value: 60.3, trend: 8.7, category: 'financeiro' },
    { kpi_name: 'ROI', value: 145.2, trend: 15.4, category: 'financeiro' },
    { kpi_name: 'Entregas Realizadas', value: 1485, trend: 22.1, category: 'logistica' },
    { kpi_name: 'Entregas Pendentes', value: 318, trend: -5.3, category: 'logistica' },
    { kpi_name: 'Tempo Médio Entrega', value: 2.4, trend: -12.5, category: 'logistica' },
    { kpi_name: 'Taxa de Sucesso', value: 97.8, trend: 2.1, category: 'logistica' },
];

// Dados históricos simulados para o gráfico de onda
const MOCK_HISTORICAL_DATA = [
    { time: '00:00', value: 1125 },
    { time: '04:00', value: 1145 },
    { time: '08:00', value: 1320 },
    { time: '12:00', value: 1280 },
    { time: '16:00', value: 1450 },
    { time: '20:00', value: 1485 },
];

// Exportar configurações
window.DASHBOARD_CONFIG = DASHBOARD_CONFIG;
window.MOCK_DATA = MOCK_DATA;
window.MOCK_HISTORICAL_DATA = MOCK_HISTORICAL_DATA;
