# 🏗️ Arquitetura do Dashboard

## 📂 Estrutura de Arquivos

```
dashboard-logistico/
│
├── 📄 index.html                      # Ponto de entrada da aplicação
├── 📄 README.md                        # Documentação completa
├── 📄 QUICKSTART.md                    # Guia de início rápido (5 minutos)
├── 📄 GOOGLE_SHEETS_TEMPLATE.md        # Template da planilha
├── 📄 sample-data.csv                  # Dados de exemplo
├── 📄 config.example.js                # Exemplo de configuração
│
└── 📁 js/
    ├── 📄 config.js                    # ⚙️ Configurações (EDITE AQUI!)
    ├── 📄 App.js                       # Componente principal
    │
    ├── 📁 hooks/
    │   └── 📄 useDashboardData.js      # Hook customizado de dados
    │
    └── 📁 components/
        ├── 📄 KpiCard.js               # Card KPI sidebar
        ├── 📄 HeroGauge.js             # Gráfico radial central
        ├── 📄 FilterButton.js          # Botões FAB de filtro
        └── 📄 WaveChart.js             # Gráfico de área roxo
```

---

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                     GOOGLE SHEETS                           │
│                         (CSV)                               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP GET (a cada 30s)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              useDashboardData (Hook)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. Fetch CSV                                        │   │
│  │ 2. Parse com PapaParse                              │   │
│  │ 3. Validação                                        │   │
│  │ 4. Fallback para Mock em caso de erro              │   │
│  │ 5. Gerar dados históricos                           │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Estado React
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      App.js (Main)                          │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │   useState   │  useEffect   │  Filtros     │            │
│  └──────────────┴──────────────┴──────────────┘            │
└─────┬─────────────┬─────────────┬─────────────┬────────────┘
      │             │             │             │
      ▼             ▼             ▼             ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ KpiCard  │  │HeroGauge │  │ Filter   │  │WaveChart │
│          │  │          │  │ Button   │  │          │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
  Sidebar      Centro         Centro        Rodapé
   (4x)         (1x)          (4x)          (1x)
```

---

## 🎯 Componentes Principais

### 1. **useDashboardData** (Hook)
📍 Localização: `js/hooks/useDashboardData.js`

**Responsabilidades:**
- Buscar dados do Google Sheets via CSV
- Fazer polling automático a cada 30 segundos
- Parse do CSV usando PapaParse
- Tratamento de erros com fallback para dados mock
- Gerar dados históricos simulados
- Filtrar dados por categoria (financeiro/logística)

**Retorna:**
```javascript
{
  data,              // Array com todos os KPIs
  historicalData,    // Array para gráfico de onda
  loading,           // Boolean de carregamento
  error,             // Mensagem de erro (se houver)
  lastUpdate,        // Data da última atualização
  getFinanceData(),  // Filtra KPIs financeiros
  getLogisticsData(),// Filtra KPIs logísticos
  getTotalGoal(),    // Calcula meta geral (%)
  refetch()          // Força nova busca
}
```

---

### 2. **App** (Componente Principal)
📍 Localização: `js/App.js`

**Responsabilidades:**
- Gerenciar estado global da aplicação
- Controlar filtros ativos
- Orquestrar renderização dos componentes
- Layout principal (Grid/Flexbox)

**Estado:**
```javascript
{
  activeFilter: 'all' | 'finance' | 'logistics' | 'performance',
  displayData: Array // Dados filtrados para exibição
}
```

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│                   HEADER (Título)                       │
├──────────┬────────────────────────────┬─────────────────┤
│          │                            │                 │
│ SIDEBAR  │        CENTRO              │    LATERAL      │
│          │                            │    DIREITO      │
│ KPI      │  ┌──────────────────┐      │   Stats Quick   │
│ Cards    │  │   Hero Gauge     │      │                 │
│  (4x)    │  │    (Radial)      │      │   (3 cards)     │
│          │  └──────────────────┘      │                 │
│          │                            │                 │
│          │  ┌──────────────────┐      │                 │
│          │  │  Filter Buttons  │      │                 │
│          │  │      (4x FAB)    │      │                 │
│          │  └──────────────────┘      │                 │
│          │                            │                 │
│          │  ┌──────────────────┐      │                 │
│          │  │   Wave Chart     │      │                 │
│          │  │   (Area Spline)  │      │                 │
│          │  └──────────────────┘      │                 │
└──────────┴────────────────────────────┴─────────────────┘
```

---

### 3. **KpiCard** (Sidebar)
📍 Localização: `js/components/KpiCard.js`

**Props:**
```javascript
{
  kpi_name: string,  // Nome do indicador
  value: number,     // Valor numérico
  trend: number,     // Tendência (% positivo/negativo)
  index: number      // Índice para animações escalonadas
}
```

**Features:**
- Formato "pílula" arredondado
- Glassmorphism effect
- Gradientes dinâmicos
- Animação de hover (scale + glow)
- Barra de progresso baseada no trend
- Indicador de pulso (verde/vermelho)

---

### 4. **HeroGauge** (Centro - Principal)
📍 Localização: `js/components/HeroGauge.js`

**Props:**
```javascript
{
  goalPercentage: number,  // 0-100
  title: string            // Título do gauge
}
```

**Features:**
- Gráfico radial tipo ferradura (180°)
- 3 anéis coloridos (Vermelho 0-33%, Amarelo 34-66%, Ciano 67-100%)
- Agulha indicadora animada
- Valor central com glow dourado
- Background blur effect (radial gradient)
- Animação de entrada (2 segundos)

**Tecnologia:**
- Recharts: `RadialBarChart`, `RadialBar`

---

### 5. **FilterButton** (Centro - Botões)
📍 Localização: `js/components/FilterButton.js`

**Props:**
```javascript
{
  icon: string,          // Emoji do botão
  label: string,         // Texto do label
  active: boolean,       // Se está ativo
  onClick: function,     // Callback de clique
  color: string,         // cyan|orange|purple|pink
  index: number          // Para animações
}
```

**Features:**
- Botões circulares (FAB - Floating Action Button)
- 4 cores diferentes (mapeadas)
- Animação float (sobe/desce)
- Pulse effect quando ativo
- Ring indicator quando selecionado
- Glow effect no hover

---

### 6. **WaveChart** (Rodapé)
📍 Localização: `js/components/WaveChart.js`

**Props:**
```javascript
{
  data: Array<{time: string, value: number}>,
  title: string
}
```

**Features:**
- Gráfico de área (Spline) suave
- Gradiente roxo (de opaco para transparente)
- Grid horizontal minimalista
- Tooltip customizado (glassmorphism)
- Stats decorativas (Valor Atual + Pico)
- Background blur radial

**Tecnologia:**
- Recharts: `AreaChart`, `Area`, `XAxis`, `YAxis`

---

## 🎨 Sistema de Design

### Cores do Tema

```javascript
Matte Charcoal:  #1a1b20  // Fundo principal
Dourado:         #FFD700  // Valores principais, destaques
Ciano:           #00FFFF  // Secundário, brilhos
Roxo:            #9333EA  // Gráficos, acentos
Vermelho:        #EF4444  // Alertas, quedas
Verde:           #10B981  // Crescimento
Amarelo:         #F59E0B  // Avisos
```

### Efeitos Visuais

**Glassmorphism:**
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
```

**Glow Effect:**
```css
box-shadow: 
  0 0 20px rgba(0, 255, 255, 0.3),
  0 0 40px rgba(0, 255, 255, 0.1);
```

**Gradient Text:**
```css
background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Animações

**Float:**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
/* Duração: 3s, ease-in-out, infinite */
```

**Pulse Glow:**
```css
@keyframes pulse-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
/* Duração: 2s, ease-in-out, infinite */
```

---

## 🔧 Tecnologias & Bibliotecas

### Core
- **React 18**: Framework UI
- **Tailwind CSS 3**: Estilização utilitária
- **Babel Standalone**: Transpilação JSX no browser

### Dependências (CDN)
```html
<!-- React -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Parser CSV -->
<script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>

<!-- Gráficos -->
<script src="https://cdn.jsdelivr.net/npm/recharts@2.5.0/dist/Recharts.js"></script>

<!-- Animações -->
<script src="https://cdn.jsdelivr.net/npm/framer-motion@10.16.4/dist/framer-motion.js"></script>

<!-- Ícones -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

---

## 🚀 Performance

### Otimizações Implementadas

1. **Polling Inteligente:**
   - Intervalo configurável (padrão: 30s)
   - Apenas busca quando a aba está ativa (pode ser implementado)

2. **Memoization:**
   - `useCallback` para funções de filtro
   - Evita re-renders desnecessários

3. **Lazy Loading:**
   - Scripts carregados assincronamente
   - Componentes renderizam apenas quando necessário

4. **CSS Animações:**
   - Animações via CSS (GPU-accelerated)
   - Evita JavaScript para animações simples

---

## 📊 Fluxo de Filtros

```
┌─────────────┐
│ User Click  │
│ Filter BTN  │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ setActiveFilter()   │
│ (update state)      │
└──────┬──────────────┘
       │
       ▼
┌────────────────────────────────┐
│ useEffect monitora mudança     │
│ de activeFilter                │
└──────┬─────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ Switch case:                    │
│ - all → todos os dados          │
│ - finance → getFinanceData()    │
│ - logistics → getLogisticsData()│
│ - performance → filtro custom   │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────┐
│ setDisplayData()        │
│ (atualiza UI)           │
└─────────────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Re-render:              │
│ - WaveChart             │
│ - Stats Panel           │
│ - (outros componentes)  │
└─────────────────────────┘
```

---

## 🔐 Segurança

### Boas Práticas Implementadas

1. **Dados Públicos Apenas:**
   - Não armazena credenciais
   - Usa CSV público do Google Sheets

2. **Validação de Dados:**
   - Valida estrutura do CSV antes de usar
   - Fallback para dados mock em caso de erro

3. **CORS:**
   - Google Sheets permite CORS por padrão para CSV público
   - Sem necessidade de proxy

---

## 📝 Manutenção

### Checklist de Atualização

- [ ] Atualizar `DASHBOARD_CONFIG.GOOGLE_SHEETS_CSV_URL`
- [ ] Testar em diferentes navegadores (Chrome, Firefox, Safari)
- [ ] Validar estrutura do CSV no Google Sheets
- [ ] Verificar performance com dados reais
- [ ] Atualizar `README.md` se adicionar features

### Logs Úteis

Abra o console (F12) e procure por:
```javascript
console.warn('Erro ao buscar dados do Google Sheets, usando dados mock:', err);
```

---

## 🎯 Próximos Desenvolvimentos

1. Responsividade mobile
2. Sistema de alertas (push notifications)
3. Exportação de relatórios (PDF/Excel)
4. Múltiplos dashboards
5. Autenticação de usuários
6. Modo offline (Service Worker)
7. Testes automatizados

---

**Documentação da Arquitetura v1.0.0**  
Última atualização: Janeiro 2026
