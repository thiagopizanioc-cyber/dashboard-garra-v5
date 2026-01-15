// ===========================================
// CUSTOM HOOK: useDashboardData
// ===========================================
// Hook que gerencia a busca e atualização dos dados do dashboard
// Faz polling a cada 30 segundos do CSV do Google Sheets

const { useState, useEffect, useCallback } = React;

function useDashboardData() {
    const [data, setData] = useState(window.MOCK_DATA);
    const [historicalData, setHistoricalData] = useState(window.MOCK_HISTORICAL_DATA);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    // Função para buscar dados do CSV
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(window.DASHBOARD_CONFIG.GOOGLE_SHEETS_CSV_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const csvText = await response.text();
            
            // Parse do CSV usando PapaParse
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                complete: (results) => {
                    if (results.data && results.data.length > 0) {
                        setData(results.data);
                        setError(null);
                        setLastUpdate(new Date());
                        
                        // Gerar dados históricos simulados baseados nos dados atuais
                        // (Em produção, você teria uma aba separada para histórico)
                        generateHistoricalData(results.data);
                    } else {
                        throw new Error('Nenhum dado encontrado no CSV');
                    }
                },
                error: (error) => {
                    throw new Error(`Erro ao fazer parse do CSV: ${error.message}`);
                }
            });
            
        } catch (err) {
            console.warn('Erro ao buscar dados do Google Sheets, usando dados mock:', err);
            setError(err.message);
            // Mantém os dados mock em caso de erro
            setData(window.MOCK_DATA);
            setHistoricalData(window.MOCK_HISTORICAL_DATA);
        } finally {
            setLoading(false);
        }
    }, []);

    // Gerar dados históricos simulados baseados nos dados atuais
    const generateHistoricalData = (currentData) => {
        const logisticaData = currentData.filter(item => item.category === 'logistica');
        const mainValue = logisticaData.find(item => item.kpi_name.includes('Entrega'))?.value || 1485;
        
        const historical = [];
        const hours = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
        
        for (let i = 0; i < hours.length; i++) {
            const variation = (Math.random() - 0.5) * 0.2; // Variação de ±10%
            const value = Math.round(mainValue * (0.75 + (i / hours.length) * 0.25) * (1 + variation));
            historical.push({
                time: hours[i],
                value: value
            });
        }
        
        setHistoricalData(historical);
    };

    // Efeito para buscar dados inicialmente
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Efeito para polling periódico
    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, window.DASHBOARD_CONFIG.POLLING_INTERVAL);

        return () => clearInterval(interval);
    }, [fetchData]);

    // Funções auxiliares para filtrar dados
    const getFinanceData = useCallback(() => {
        return data.filter(item => item.category === 'financeiro');
    }, [data]);

    const getLogisticsData = useCallback(() => {
        return data.filter(item => item.category === 'logistica');
    }, [data]);

    const getTotalGoal = useCallback(() => {
        // Calcula meta geral baseada nos KPIs principais
        const mainKpis = data.filter(item => 
            item.kpi_name.includes('Total') || 
            item.kpi_name.includes('Receita') ||
            item.kpi_name.includes('ROI')
        );
        
        if (mainKpis.length > 0) {
            const sum = mainKpis.reduce((acc, item) => acc + (item.value || 0), 0);
            const avg = sum / mainKpis.length;
            // Normaliza para porcentagem (0-100)
            return Math.min(Math.round((avg / 200) * 100), 100);
        }
        
        return 75; // Valor padrão
    }, [data]);

    return {
        data,
        historicalData,
        loading,
        error,
        lastUpdate,
        getFinanceData,
        getLogisticsData,
        getTotalGoal,
        refetch: fetchData
    };
}

window.useDashboardData = useDashboardData;
