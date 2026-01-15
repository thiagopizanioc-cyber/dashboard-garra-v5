// ===========================================
// COMPONENTE: FilterButton
// ===========================================
// Botões circulares FAB (Floating Action Button) para filtros

const FilterButton = ({ icon, label, active, onClick, color = "cyan", index = 0 }) => {
    const colorMap = {
        cyan: {
            bg: 'from-cyan-500 to-cyan-700',
            shadow: 'shadow-cyan-500/50',
            glow: 'rgba(0, 255, 255, 0.4)',
            text: 'text-cyan-400'
        },
        orange: {
            bg: 'from-orange-500 to-orange-700',
            shadow: 'shadow-orange-500/50',
            glow: 'rgba(255, 165, 0, 0.4)',
            text: 'text-orange-400'
        },
        purple: {
            bg: 'from-purple-500 to-purple-700',
            shadow: 'shadow-purple-500/50',
            glow: 'rgba(147, 51, 234, 0.4)',
            text: 'text-purple-400'
        },
        pink: {
            bg: 'from-pink-500 to-pink-700',
            shadow: 'shadow-pink-500/50',
            glow: 'rgba(236, 72, 153, 0.4)',
            text: 'text-pink-400'
        }
    };

    const colors = colorMap[color] || colorMap.cyan;

    return (
        <div 
            className="flex flex-col items-center gap-2 animate-float cursor-pointer"
            onClick={onClick}
            style={{ animationDelay: `${index * 0.15}s` }}
        >
            {/* Botão Circular */}
            <div 
                className={`
                    relative w-20 h-20 rounded-full 
                    bg-gradient-to-br ${colors.bg}
                    ${active ? colors.shadow + ' shadow-2xl' : 'shadow-lg'}
                    transform transition-all duration-300
                    hover:scale-110 hover:${colors.shadow} hover:shadow-2xl
                    flex items-center justify-center
                    glass-card
                    ${active ? 'ring-4 ring-white/30' : ''}
                `}
                style={{
                    boxShadow: active 
                        ? `0 0 30px ${colors.glow}, 0 0 60px ${colors.glow}`
                        : undefined
                }}
            >
                {/* Ícone */}
                <div className="text-white text-3xl font-bold">
                    {icon}
                </div>

                {/* Pulse Indicator */}
                {active && (
                    <div 
                        className="absolute inset-0 rounded-full animate-ping opacity-30"
                        style={{
                            background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`
                        }}
                    />
                )}

                {/* Inner Glow */}
                <div 
                    className="absolute inset-2 rounded-full opacity-40"
                    style={{
                        background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`
                    }}
                />
            </div>

            {/* Label */}
            <div className={`
                text-sm font-semibold tracking-wide transition-all duration-300
                ${active ? colors.text + ' scale-110' : 'text-gray-400'}
            `}>
                {label}
            </div>
        </div>
    );
};

window.FilterButton = FilterButton;
