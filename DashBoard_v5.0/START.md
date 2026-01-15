# 🚀 INÍCIO RÁPIDO - 30 SEGUNDOS

## ⚡ VER O DASHBOARD AGORA (SEM CONFIGURAR)

### **Duplo clique em `index.html`** → Dashboard abre com dados de exemplo!

Sim, é só isso! 🎉

---

## 🎯 O Que Você Verá

- ✅ Dashboard futurista Dark Mode
- ✅ 4 KPI Cards dourados na sidebar
- ✅ Gráfico radial 3D no centro
- ✅ Gráficos interativos e animações
- ✅ **Dados mock** pré-configurados (normalmente aparece bolinha vermelha "Usando dados mock")

---

## 🔧 Para Usar SEUS Dados Reais

1. **Crie planilha no Google Sheets** com estas colunas:
   ```
   kpi_name | value | trend | category
   ```

2. **Publique como CSV:**
   - Arquivo → Compartilhar → Publicar na Web
   - Escolha: "CSV"
   - Copie a URL

3. **Cole a URL em `js/config.js`:**
   ```javascript
   GOOGLE_SHEETS_CSV_URL: "SUA_URL_AQUI"
   ```

4. **Recarregue a página** (F5)

5. ✅ **Bolinha verde** "Conectado" aparece = seus dados reais!

---

## 📚 Mais Detalhes?

- **Primeira vez:** Leia [VIEW_NOW.md](VIEW_NOW.md)
- **Configuração:** Leia [QUICKSTART.md](QUICKSTART.md) (5 min)
- **Problemas:** Consulte [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Documentação completa:** Veja [INDEX.md](INDEX.md)

---

## 🆘 Não Funcionou?

### Dashboard em branco?

**Use servidor local:**
```bash
python -m http.server 8000
```
Depois abra: `http://localhost:8000`

---

**🎉 É isso! Divirta-se com seu dashboard!**
