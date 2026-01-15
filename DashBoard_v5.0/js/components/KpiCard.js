// ===========================================
// COMPONENTE: KpiCard
// ===========================================
// Card de KPI em formato "pílula" para a sidebar

const KpiCard = ({ kpi_name, value, trend, index }) => {
    // Formatar valor baseado no tipo
    const formatValue = (val) => {
        if (typeof val === 'number') {
            // Se for menor que 100, assume que é porcentagem
            if (val < 100 && kpi_name.toLowerCase().includes('margin') || 
                kpi_name.toLowerCase().includes('taxa') ||
                kpi_name.toLowerCase().includes('roi')) {
                return `${val.toFixed(1)}%`;
            }
            // Se for maior, formata com separadores
            if (val > 1000) {
                return `$${val.toLocaleString('pt-BR')}`;
            }
            return val.toFixed(1);
        }
        return val;
    };

    // Definir cor do trend
    const trendColor = trend > 0 ? 'text-green-400' : 'text-red-400';
    const trendIcon = trend > 0 ? '↑' : '↓';

    // Cores alternadas para cada card
    const gradients = [
        'from-purple-600/20 to-purple-900/20',
        'from-blue-600/20 to-blue-900/20',
        'from-cyan-600/20 to-cyan-900/20',
        'from-indigo-600/20 to-indigo-900/20',
    ];

    const glowColors = [
        'shadow-purple-500/20',
        'shadow-blue-500/20',
        'shadow-cyan-500/20',
        'shadow-indigo-500/20',
    ];

    return (
        <div
            className={`glass-card-strong rounded-3xl p-6 mb-4 transform transition-all duration-300 hover:scale-105 hover:${glowColors[index % 4]} hover:shadow-2xl cursor-pointer`}
            style={{
                background: `linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(30, 31, 40, 0.9) 100%)`,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                animationDelay: `${index * 0.1}s`
            }}
        >
            {/* Nome do KPI */}
            <div className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">
                {kpi_name}
            </div>

            {/* Valor Principal */}
            <div className="flex items-end justify-between">
                <div className="text-4xl font-bold gradient-text glow-gold">
                    {formatValue(value)}
                </div>

                {/* Trend Indicator */}
                <div className={`flex items-center gap-1 ${trendColor} font-semibold text-lg`}>
                    <span className="text-2xl">{trendIcon}</span>
                    <span>{Math.abs(trend).toFixed(1)}%</span>
                </div>
            </div>

            {/* Barra de Progresso Decorativa */}
            <div className="mt-4 h-1 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                        width: `${Math.min(Math.abs(trend) * 5, 100)}%`,
                        background: trend > 0 
                            ? 'linear-gradient(90deg, #10B981 0%, #34D399 100%)'
                            : 'linear-gradient(90deg, #EF4444 0%, #F87171 100%)'
                    }}
                />
            </div>

            {/* Pulse Effect */}
            <div 
                className="absolute top-0 right-0 w-2 h-2 rounded-full animate-pulse-glow"
                style={{
                    background: trend > 0 ? '#10B981' : '#EF4444',
                    boxShadow: `0 0 10px ${trend > 0 ? '#10B981' : '#EF4444'}`
                }}
            />
        </div>
    );
};

window.KpiCard = KpiCard;
