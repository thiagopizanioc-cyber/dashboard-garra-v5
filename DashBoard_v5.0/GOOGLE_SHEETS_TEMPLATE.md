# 📋 Template para Google Sheets

## Cole este conteúdo na sua planilha do Google Sheets

### Estrutura Obrigatória

**IMPORTANTE:** A primeira linha deve conter exatamente estes nomes de colunas:

```
kpi_name | value | trend | category
```

---

## 💰 Exemplo de Dados Financeiros

| kpi_name              | value    | trend  | category   |
|-----------------------|----------|--------|------------|
| Receita Total         | 21338.00 | 12.5   | financeiro |
| Custo Operacional     | 8450.50  | -3.2   | financeiro |
| Margem de Lucro       | 60.3     | 8.7    | financeiro |
| ROI                   | 145.2    | 15.4   | financeiro |
| Lucro Líquido         | 12887.50 | 18.2   | financeiro |
| EBITDA                | 15200.00 | 10.5   | financeiro |

---

## 🚚 Exemplo de Dados Logísticos

| kpi_name                  | value  | trend  | category   |
|---------------------------|--------|--------|------------|
| Entregas Realizadas       | 1485   | 22.1   | logistica  |
| Entregas Pendentes        | 318    | -5.3   | logistica  |
| Tempo Médio Entrega       | 2.4    | -12.5  | logistica  |
| Taxa de Sucesso           | 97.8   | 2.1    | logistica  |
| Km Percorridos            | 45320  | 8.3    | logistica  |
| Custo por Entrega         | 18.50  | -6.2   | logistica  |

---

## 📊 Dicas de Preenchimento

### Campo: **kpi_name**
- Tipo: Texto
- Use nomes descritivos e claros
- Exemplos: "Receita Total", "Entregas Realizadas", "Taxa de Conversão"

### Campo: **value**
- Tipo: Número
- Pode ser decimal (use ponto, não vírgula: 123.45)
- Não use símbolos de moeda (R$, $) - o dashboard formata automaticamente

### Campo: **trend**
- Tipo: Número (pode ser negativo)
- Representa a variação percentual
- Positivo = crescimento (↑ verde)
- Negativo = queda (↓ vermelho)
- Exemplo: 12.5 = crescimento de 12.5%

### Campo: **category**
- Tipo: Texto
- Valores aceitos: **"financeiro"** ou **"logistica"**
- ⚠️ Use exatamente estes termos (sem acento, minúsculas)

---

## 🎨 Como o Dashboard Interpreta os Dados

### Sidebar Esquerda (KPI Cards)
- Mostra os **primeiros 4 KPIs** com `category = "financeiro"`
- Exibe valor em **dourado/branco** grande
- Trend indicator com seta colorida

### Painel Lateral Direito
- Mostra os **primeiros 3 KPIs** do filtro ativo
- Atualiza dinamicamente ao clicar nos botões de filtro

### Gráfico Central (Hero Gauge)
- Calcula a **"Meta Geral"** baseada nos KPIs principais
- Normaliza valores para porcentagem (0-100%)

### Gráfico de Onda (Rodapé)
- Gera histórico simulado baseado nos dados atuais
- Em produção, você pode adicionar uma aba separada para histórico real

---

## 🔄 Atualização Automática

O dashboard busca novos dados automaticamente a cada **30 segundos**.

Para forçar atualização imediata:
- Recarregue a página (F5)
- Ou espere até 30 segundos

---

## ✅ Checklist de Validação

Antes de publicar sua planilha, verifique:

- [ ] A primeira linha contém: `kpi_name, value, trend, category`
- [ ] Todos os valores em `value` são números (sem símbolos)
- [ ] Todos os valores em `trend` são números (podem ser negativos)
- [ ] Todos em `category` são "financeiro" ou "logistica"
- [ ] Não há linhas vazias entre os dados
- [ ] A planilha foi publicada como CSV (não como HTML)

---

## 📝 Exemplo Mínimo Funcional

Se você quer testar rapidamente, use este exemplo com apenas 4 KPIs:

```
kpi_name,value,trend,category
Receita Total,21338,12.5,financeiro
Custo Total,8450,-3.2,financeiro
Entregas Hoje,1485,22.1,logistica
Taxa de Sucesso,97.8,2.1,logistica
```

Cole isso em uma nova planilha, publique como CSV e teste!

---

## 🆘 Troubleshooting

### "Meus dados não aparecem"

1. **Verifique os nomes das colunas:**
   - Devem ser exatamente: `kpi_name`, `value`, `trend`, `category`
   - Sem espaços extras
   - Minúsculas

2. **Verifique os tipos de dados:**
   - `value` e `trend` devem ser números
   - Use ponto (.) como separador decimal, não vírgula

3. **Verifique a categoria:**
   - Deve ser "financeiro" ou "logistica"
   - Sem acento no "financeiro"
   - Tudo em minúsculas

### "Dashboard está lento"

- Limite o número de linhas a no máximo 50 KPIs
- Aumente o intervalo de polling em `js/config.js`

---

## 📞 Suporte

Para mais informações, consulte:
- **README.md**: Documentação completa
- **QUICKSTART.md**: Guia de início rápido
- Console do navegador (F12): Para ver erros técnicos

---

**🎉 Pronto! Sua planilha está pronta para conectar ao dashboard!**
