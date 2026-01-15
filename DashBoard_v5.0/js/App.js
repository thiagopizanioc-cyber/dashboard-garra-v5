// ===========================================
// APLICAÇÃO PRINCIPAL
// ===========================================
// Dashboard Logístico/Financeiro

const { useState, useEffect } = React;

const App = () => {
    const { 
        data, 
        historicalData, 
        loading, 
        error, 
        lastUpdate, 
        getFinanceData, 
        getLogisticsData, 
        getTotalGoal 
    } = window.useDashboardData();

    const [activeFilter, setActiveFilter] = useState('all');
    const [displayData, setDisplayData] = useState([]);

    // Atualizar dados exibidos baseado no filtro
    useEffect(() => {
        switch (activeFilter) {
            case 'finance':
                setDisplayData(getFinanceData());
                break;
            case 'logistics':
                setDisplayData(getLogisticsData());
                break;
            case 'performance':
                setDisplayData(data.filter(item => 
                    item.kpi_name.toLowerCase().includes('taxa') || 
                    item.kpi_name.toLowerCase().includes('roi') ||
                    item.kpi_name.toLowerCase().includes('margem')
                ));
                break;
            default:
                setDisplayData(data);
        }
    }, [activeFilter, data, getFinanceData, getLogisticsData]);

    // Obter KPIs financeiros para sidebar
    const financeKpis = getFinanceData().slice(0, 4);
    const goalPercentage = getTotalGoal();

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-matte-charcoal">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-matte-charcoal via-gray-900 to-matte-charcoal" />
            
            {/* Animated Background Circles */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

            {/* Main Layout */}
            <div className="relative z-10 flex h-full">
                {/* Sidebar Esquerda - KPI Cards */}
                <div className="w-80 p-6 flex flex-col justify-center">
                    {loading && financeKpis.length === 0 ? (
                        <div className="text-center text-gray-400">
                            <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4" />
                            <p>Carregando KPIs...</p>
                        </div>
                    ) : (
                        financeKpis.map((kpi, index) => (
                            <window.KpiCard 
                                key={index}
                                {...kpi}
                                index={index}
                            />
                        ))
                    )}

                    {/* Status de Conexão */}
                    <div className="mt-4 glass-card rounded-xl p-3">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                            <div className="text-xs text-gray-400">
                                {error ? 'Usando dados mock' : 'Conectado'}
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
                        </div>
                    </div>
                </div>

                {/* Área Central */}
                <div className="flex-1 flex flex-col p-6">
                    {/* Cabeçalho */}
                    <div className="text-center mb-4">
                        <h1 className="text-4xl font-black gradient-text tracking-wider mb-2">
                            DASHBOARD EXECUTIVO
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Monitoramento em Tempo Real • Logística & Financeiro
                        </p>
                    </div>

                    {/* Hero Gauge */}
                    <div className="flex-1 flex items-start justify-center">
                        <window.HeroGauge 
                            goalPercentage={goalPercentage}
                            title="Meta Geral"
                        />
                    </div>

                    {/* Botões de Filtro FAB */}
                    <div className="flex justify-center gap-8 mb-6">
                        <window.FilterButton 
                            icon="📊"
                            label="Todos"
                            active={activeFilter === 'all'}
                            onClick={() => setActiveFilter('all')}
                            color="cyan"
                            index={0}
                        />
                        <window.FilterButton 
                            icon="💰"
                            label="Financeiro"
                            active={activeFilter === 'finance'}
                            onClick={() => setActiveFilter('finance')}
                            color="orange"
                            index={1}
                        />
                        <window.FilterButton 
                            icon="🚚"
                            label="Logística"
                            active={activeFilter === 'logistics'}
                            onClick={() => setActiveFilter('logistics')}
                            color="purple"
                            index={2}
                        />
                        <window.FilterButton 
                            icon="📈"
                            label="Performance"
                            active={activeFilter === 'performance'}
                            onClick={() => setActiveFilter('performance')}
                            color="pink"
                            index={3}
                        />
                    </div>

                    {/* Gráfico de Onda - Rodapé */}
                    <div className="h-64 glass-card-strong rounded-2xl overflow-hidden glow-purple">
                        <window.WaveChart 
                            data={historicalData}
                            title={`Histórico ${activeFilter === 'all' ? 'Geral' : activeFilter === 'finance' ? 'Financeiro' : activeFilter === 'logistics' ? 'Logístico' : 'Performance'}`}
                        />
                    </div>
                </div>

                {/* Painel Lateral Direito (Estatísticas Rápidas) */}
                <div className="w-64 p-6 flex flex-col justify-center gap-4">
                    {/* Stats Cards */}
                    {displayData.slice(0, 3).map((item, index) => (
                        <div 
                            key={index}
                            className="glass-card-strong rounded-2xl p-4 hover:scale-105 transition-transform duration-300"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                                {item.kpi_name}
                            </div>
                            <div className="text-2xl font-bold text-white mb-1">
                                {typeof item.value === 'number' 
                                    ? item.value.toLocaleString('pt-BR')
                                    : item.value
                                }
                            </div>
                            <div className={`text-xs flex items-center gap-1 ${item.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                <span>{item.trend > 0 ? '↑' : '↓'}</span>
                                <span>{Math.abs(item.trend).toFixed(1)}%</span>
                            </div>
                        </div>
                    ))}

                    {/* Info Card */}
                    <div className="glass-card rounded-xl p-4 mt-auto">
                        <div className="text-xs text-gray-500 mb-2">
                            💡 Dica Rápida
                        </div>
                        <div className="text-xs text-gray-300 leading-relaxed">
                            Use os filtros para visualizar dados específicos de cada categoria.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Renderizar aplicação
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
