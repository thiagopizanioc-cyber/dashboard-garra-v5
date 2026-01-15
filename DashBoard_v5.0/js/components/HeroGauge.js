// ===========================================
// COMPONENTE: HeroGauge
// ===========================================
// Gráfico radial 3D tipo ferradura/meia-lua no centro

const { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarAngleAxis } = Recharts;

const HeroGauge = ({ goalPercentage = 75, title = "Meta Geral" }) => {
    // Preparar dados para o gráfico radial
    const data = [
        {
            name: 'Crítico',
            value: Math.min(goalPercentage, 33),
            fill: '#EF4444',
        },
        {
            name: 'Atenção',
            value: Math.min(Math.max(goalPercentage - 33, 0), 33),
            fill: '#F59E0B',
        },
        {
            name: 'Ótimo',
            value: Math.max(goalPercentage - 66, 0),
            fill: '#00FFFF',
        },
    ];

    // Calcular ângulo da agulha
    const needleAngle = (goalPercentage / 100) * 180 - 90;

    return (
        <div className="relative flex flex-col items-center justify-center">
            {/* Título */}
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold gradient-text-cyan tracking-wide uppercase">
                    {title}
                </h2>
                <div className="text-gray-400 text-sm mt-1">Performance Global</div>
            </div>

            {/* Container do Gráfico */}
            <div className="relative w-full" style={{ height: '400px' }}>
                {/* Glow Effect de fundo */}
                <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)'
                    }}
                />

                {/* Gráfico Radial */}
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        cx="50%"
                        cy="60%"
                        innerRadius="60%"
                        outerRadius="100%"
                        barSize={24}
                        data={data}
                        startAngle={180}
                        endAngle={0}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar
                            background={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                            dataKey="value"
                            cornerRadius={10}
                            animationDuration={2000}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>

                {/* Valor Central */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
                    <div className="text-7xl font-black gradient-text glow-gold animate-pulse-glow">
                        {goalPercentage}%
                    </div>
                    <div className="text-gray-400 text-lg mt-2 font-medium">
                        da Meta
                    </div>
                </div>

                {/* Agulha Indicadora (decorativa) */}
                <div 
                    className="absolute top-1/2 left-1/2 origin-bottom transition-all duration-1000"
                    style={{
                        width: '4px',
                        height: '80px',
                        background: 'linear-gradient(180deg, #FFD700 0%, transparent 100%)',
                        transform: `translate(-50%, -100%) rotate(${needleAngle}deg)`,
                        filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))'
                    }}
                >
                    <div 
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, #FFD700 0%, #FFA500 100%)',
                            boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)'
                        }}
                    />
                </div>
            </div>

            {/* Legendas */}
            <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-gray-400 text-sm">0-33%</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-gray-400 text-sm">34-66%</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                    <span className="text-gray-400 text-sm">67-100%</span>
                </div>
            </div>
        </div>
    );
};

window.HeroGauge = HeroGauge;
