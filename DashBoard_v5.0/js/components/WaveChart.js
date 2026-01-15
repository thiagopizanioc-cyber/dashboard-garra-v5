// ===========================================
// COMPONENTE: WaveChart
// ===========================================
// Gráfico de área (Spline) com efeito de onda roxo

const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;

const WaveChart = ({ data, title = "Histórico" }) => {
    // Custom Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card-strong rounded-lg p-3 border border-purple-500/30">
                    <p className="text-gray-400 text-xs mb-1">{label}</p>
                    <p className="text-purple-400 text-lg font-bold">
                        {payload[0].value.toLocaleString('pt-BR')}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="relative w-full h-full">
            {/* Título */}
            <div className="absolute top-0 left-0 z-10 p-4">
                <h3 className="text-lg font-bold text-purple-400 tracking-wide uppercase">
                    {title}
                </h3>
                <p className="text-gray-500 text-xs mt-1">Últimas 24 horas</p>
            </div>

            {/* Glow Effect de fundo */}
            <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-48 blur-3xl opacity-20"
                style={{
                    background: 'radial-gradient(ellipse, rgba(147, 51, 234, 0.6) 0%, transparent 70%)'
                }}
            />

            {/* Gráfico */}
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 60, right: 30, left: 0, bottom: 20 }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9333EA" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#9333EA" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="rgba(255, 255, 255, 0.05)" 
                        vertical={false}
                    />
                    
                    <XAxis 
                        dataKey="time" 
                        stroke="rgba(255, 255, 255, 0.3)"
                        tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                    />
                    
                    <YAxis 
                        stroke="rgba(255, 255, 255, 0.3)"
                        tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                        tickFormatter={(value) => value.toLocaleString('pt-BR')}
                    />
                    
                    <Tooltip content={<CustomTooltip />} />
                    
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#9333EA" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorValue)"
                        animationDuration={2000}
                        animationBegin={0}
                        dot={{
                            fill: '#9333EA',
                            strokeWidth: 2,
                            r: 4,
                            stroke: '#fff'
                        }}
                        activeDot={{
                            r: 6,
                            fill: '#9333EA',
                            stroke: '#fff',
                            strokeWidth: 2
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>

            {/* Decorative Stats */}
            <div className="absolute bottom-4 right-4 glass-card rounded-lg p-3">
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <div className="text-xs text-gray-400">Atual</div>
                        <div className="text-lg font-bold text-purple-400">
                            {data && data.length > 0 
                                ? data[data.length - 1].value.toLocaleString('pt-BR')
                                : '0'
                            }
                        </div>
                    </div>
                    <div className="w-px h-8 bg-gray-600" />
                    <div className="text-right">
                        <div className="text-xs text-gray-400">Pico</div>
                        <div className="text-lg font-bold text-cyan-400">
                            {data && data.length > 0 
                                ? Math.max(...data.map(d => d.value)).toLocaleString('pt-BR')
                                : '0'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.WaveChart = WaveChart;
