# 🎨 Guia de Customização

## Personalize Seu Dashboard

Este guia mostra como adaptar o dashboard às suas necessidades específicas.

---

## 🎯 Customizações Rápidas (js/config.js)

### 1. Alterar Cores do Tema

Edite `js/config.js`:

```javascript
COLORS: {
    primary: '#FF6B6B',      // Vermelho coral em vez de dourado
    secondary: '#4ECDC4',    // Turquesa em vez de ciano
    accent: '#45B7D1',       // Azul céu em vez de roxo
    danger: '#FF4757',       // Vermelho mais vibrante
    success: '#2ED573',      // Verde mais claro
    warning: '#FFA502',      // Laranja mais quente
    background: '#1e1e2e',   // Roxo escuro em vez de charcoal
}
```

**Ferramentas úteis:**
- [Coolors.co](https://coolors.co/) - Gerador de paletas
- [Adobe Color](https://color.adobe.com/) - Harmonia de cores

---

### 2. Ajustar Frequência de Atualização

```javascript
// Atualizar a cada 10 segundos (mais rápido)
POLLING_INTERVAL: 10000,

// Atualizar a cada 5 minutos (mais econômico)
POLLING_INTERVAL: 300000,

// Desabilitar atualização automática
POLLING_INTERVAL: 999999999,
```

---

### 3. Personalizar Dados Mock

Útil para demonstrações ou testes:

```javascript
const MOCK_DATA = [
    // Seus KPIs customizados
    { kpi_name: 'Vendas Online', value: 50000, trend: 25.3, category: 'financeiro' },
    { kpi_name: 'NPS Score', value: 8.9, trend: 5.2, category: 'performance' },
    { kpi_name: 'Tickets Resolvidos', value: 245, trend: 12.1, category: 'suporte' },
    // ...
];
```

---

## 🖼️ Customizações Visuais

### 1. Alterar Fonte

Edite `index.html`, seção `<head>`:

```html
<!-- Substituir Inter por outra fonte do Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

<style>
    body {
        font-family: 'Poppins', sans-serif; /* Alterar aqui também */
    }
</style>
```

**Fontes recomendadas:**
- **Poppins**: Moderna e arredondada
- **Montserrat**: Geométrica e limpa
- **Roboto**: Neutra e versátil
- **Space Grotesk**: Futurista

---

### 2. Modificar Tamanho dos KPI Cards

Edite `js/components/KpiCard.js`:

```javascript
// Aumentar tamanho do valor principal
<div className="text-5xl font-bold gradient-text glow-gold"> {/* era 4xl */}
    {formatValue(value)}
</div>

// Aumentar espaçamento
<div className="glass-card-strong rounded-3xl p-8 mb-6"> {/* era p-6 mb-4 */}
```

---

### 3. Adicionar Mais Cards na Sidebar

Edite `js/App.js`:

```javascript
// De 4 para 6 KPIs
const financeKpis = getFinanceData().slice(0, 6); // era .slice(0, 4)
```

⚠️ **Nota:** Ajuste a altura da sidebar se adicionar mais cards.

---

### 4. Mudar Ícones dos Filtros

Edite `js/App.js`, seção dos `FilterButton`:

```javascript
<window.FilterButton 
    icon="🏠"  // Emoji ou texto
    label="Todos"
    // ...
/>
```

**Emojis recomendados:**
- Financeiro: 💰 💵 💳 📊 📈
- Logística: 🚚 📦 🚛 🏭 🗺️
- Performance: 🎯 ⚡ 🔥 💯 🏆
- Suporte: 🎧 💬 📞 ✉️ 🆘

---

### 5. Personalizar Animações

Edite `index.html`, seção `<style>`:

```css
/* Animação mais rápida */
.animate-float {
    animation: float 1.5s ease-in-out infinite; /* era 3s */
}

/* Animação mais suave */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); } /* era -10px */
}

/* Desabilitar animação */
.animate-float {
    animation: none;
}
```

---

## 📊 Customizações de Dados

### 1. Adicionar Nova Categoria

**Passo 1:** Adicione a categoria no Google Sheets:
```csv
kpi_name,value,trend,category
Tickets Abertos,45,-8.2,suporte  # Nova categoria!
```

**Passo 2:** Crie filtro no `js/hooks/useDashboardData.js`:
```javascript
const getSupportData = useCallback(() => {
    return data.filter(item => item.category === 'suporte');
}, [data]);

// Retorne no hook
return {
    // ...
    getSupportData, // Adicionar aqui
};
```

**Passo 3:** Adicione botão de filtro em `js/App.js`:
```javascript
<window.FilterButton 
    icon="🎧"
    label="Suporte"
    active={activeFilter === 'support'}
    onClick={() => setActiveFilter('support')}
    color="pink"
    index={4}
/>
```

**Passo 4:** Adicione case no switch:
```javascript
switch (activeFilter) {
    case 'support':
        setDisplayData(getSupportData());
        break;
    // ...
}
```

---

### 2. Formatar Valores Customizados

Edite `js/components/KpiCard.js`, função `formatValue`:

```javascript
const formatValue = (val) => {
    // Customização por nome do KPI
    if (kpi_name.includes('Tempo')) {
        return `${val}h`; // Adiciona "h" de horas
    }
    
    if (kpi_name.includes('Distância')) {
        return `${val}km`;
    }
    
    if (kpi_name.includes('Taxa')) {
        return `${val}%`;
    }
    
    if (kpi_name.includes('Temperatura')) {
        return `${val}°C`;
    }
    
    // Formato padrão
    if (typeof val === 'number') {
        if (val > 1000) {
            return `R$ ${val.toLocaleString('pt-BR')}`;
        }
        return val.toFixed(1);
    }
    
    return val;
};
```

---

### 3. Adicionar Threshold de Alertas

Edite `js/components/KpiCard.js`:

```javascript
// Definir cor baseada em thresholds
const getAlertColor = (value) => {
    if (kpi_name.includes('Taxa') && value < 80) {
        return 'text-red-500'; // Vermelho se taxa < 80%
    }
    if (kpi_name.includes('Custo') && value > 10000) {
        return 'text-yellow-500'; // Amarelo se custo alto
    }
    return 'text-white'; // Padrão
};

// Usar na renderização
<div className={`text-4xl font-bold ${getAlertColor(value)}`}>
    {formatValue(value)}
</div>
```

---

## 🎨 Customizações Avançadas

### 1. Adicionar Tema Light Mode

Crie um toggle de tema em `js/App.js`:

```javascript
const [theme, setTheme] = useState('dark');

// Adicionar botão
<button 
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className="fixed top-4 right-4 z-50 glass-card p-3 rounded-full"
>
    {theme === 'dark' ? '☀️' : '🌙'}
</button>

// Aplicar classe no container principal
<div className={`relative w-screen h-screen ${theme === 'dark' ? 'bg-matte-charcoal' : 'bg-gray-100'}`}>
```

**Definir cores do light mode** em `index.html`:

```css
/* Light Mode */
.light-mode {
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
}

.light-mode .glass-card {
    background: rgba(0, 0, 0, 0.05);
}

.light-mode .text-white {
    color: #1a1b20 !important;
}
```

---

### 2. Adicionar Gráfico Adicional

Crie novo componente `js/components/BarChart.js`:

```javascript
const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;

const CustomBarChart = ({ data, title }) => {
    return (
        <div className="glass-card-strong rounded-2xl p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#00FFFF" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

window.CustomBarChart = CustomBarChart;
```

**Adicionar ao `index.html`:**
```html
<script type="text/babel" src="js/components/BarChart.js"></script>
```

**Usar no `App.js`:**
```javascript
<window.CustomBarChart 
    data={[
        { name: 'Jan', value: 1200 },
        { name: 'Fev', value: 1500 },
        // ...
    ]}
    title="Vendas Mensais"
/>
```

---

### 3. Adicionar Notificações

Crie sistema de alertas em `js/App.js`:

```javascript
const [notifications, setNotifications] = useState([]);

// Verificar thresholds
useEffect(() => {
    data.forEach(kpi => {
        if (kpi.trend < -10) { // Queda maior que 10%
            setNotifications(prev => [...prev, {
                id: Date.now(),
                message: `⚠️ ${kpi.kpi_name} caiu ${Math.abs(kpi.trend)}%`,
                type: 'warning'
            }]);
        }
    });
}, [data]);

// Renderizar notificações
<div className="fixed top-4 right-4 z-50 space-y-2">
    {notifications.map(notif => (
        <div 
            key={notif.id}
            className="glass-card-strong rounded-lg p-4 animate-slide-in"
        >
            {notif.message}
        </div>
    ))}
</div>
```

---

### 4. Exportar Dados como CSV

Adicione botão de download em `js/App.js`:

```javascript
const downloadCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-export-${Date.now()}.csv`;
    a.click();
};

// Botão
<button 
    onClick={downloadCSV}
    className="glass-card px-6 py-3 rounded-full hover:scale-105 transition"
>
    📥 Exportar CSV
</button>
```

---

### 5. Adicionar Filtro por Data

Crie range de datas em `js/App.js`:

```javascript
const [dateRange, setDateRange] = useState({
    start: null,
    end: null
});

// Filtrar dados por data
const filteredByDate = useMemo(() => {
    if (!dateRange.start || !dateRange.end) return data;
    
    return data.filter(item => {
        const itemDate = new Date(item.date); // Assumindo que tem campo 'date'
        return itemDate >= dateRange.start && itemDate <= dateRange.end;
    });
}, [data, dateRange]);
```

---

## 🚀 Otimizações de Performance

### 1. Lazy Loading de Componentes

```javascript
// Em vez de renderizar tudo de uma vez
const [showCharts, setShowCharts] = useState(false);

useEffect(() => {
    // Renderizar gráficos após 500ms
    setTimeout(() => setShowCharts(true), 500);
}, []);

return (
    <div>
        {/* Sidebar renderiza imediatamente */}
        <Sidebar />
        
        {/* Gráficos renderizam depois */}
        {showCharts && <Charts />}
    </div>
);
```

---

### 2. Memoização de Componentes

Envolva componentes em `React.memo`:

```javascript
const KpiCard = React.memo(({ kpi_name, value, trend, index }) => {
    // ... componente
});
```

---

## 📝 Checklist de Customização

Após personalizar, teste:

- [ ] Dashboard carrega sem erros (console limpo)
- [ ] Todos os gráficos aparecem
- [ ] Animações funcionam suavemente
- [ ] Dados atualizam corretamente
- [ ] Filtros funcionam
- [ ] Responsivo em diferentes resoluções
- [ ] Performance está boa (não trava)

---

## 🎯 Inspirações de Customização

### Temas Prontos

**Tema Corporativo:**
```javascript
COLORS: {
    primary: '#0066CC',    // Azul corporativo
    secondary: '#00A3E0',  // Azul claro
    accent: '#003D7A',     // Azul escuro
}
```

**Tema Neon:**
```javascript
COLORS: {
    primary: '#FF10F0',    // Rosa neon
    secondary: '#00FFFF',  // Ciano neon
    accent: '#39FF14',     // Verde neon
}
```

**Tema Minimalista:**
```javascript
COLORS: {
    primary: '#000000',    // Preto
    secondary: '#FFFFFF',  // Branco
    accent: '#808080',     // Cinza
}
```

---

**Divirta-se customizando! 🎨**

Para mais detalhes técnicos, consulte **ARCHITECTURE.md**.
