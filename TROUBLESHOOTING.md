# 🔧 Troubleshooting & FAQ

## ❌ Errores Comunes y Soluciones

### Error 1: "setKTX2Loader must be called before loading KTX2 textures"

**Solución**: Ya está arreglado en el código.
- Cambié el modelo a `scene.gltf` que no usa KTX2
- No necesita configuración extra

**Si aún lo ves**:
1. Limpia cache: `Ctrl+Shift+Delete`
2. Hard reload: `Ctrl+Shift+R`
3. Reinicia dev server: `Ctrl+C`, `npm run dev`

---

### Error 2: "Context Lost"

**Causa**: El navegador perdió la conexión WebGL

**Solución**:
1. Recarga la página: `F5`
2. Si persiste, usa otro navegador
3. En producción es raro (usar HTTPS ayuda)

---

### Error 3: "Port 5173 already in use"

**Causa**: Dev server ya está corriendo

**Solución**:
```bash
# Matar proceso anterior
lsof -ti:5173 | xargs kill -9

# O cambiar puerto
npm run dev -- --port 3000
```

---

### Error 4: "Module not found"

**Causa**: Falta importar algo

**Solución**:
1. Revisa que las rutas sean correctas
2. Reinicia dev server
3. Limpia `node_modules/.vite`

---

## ⚠️ Warnings en Consola

### "Each child in a list should have a unique key"

- **Severidad**: Baja
- **Acción**: Revisar donde se haga map() sin key
- **Ya está**: Revisado en Scene3D.jsx

### "Can't resolve '@react-three/fiber'"

- **Severidad**: Crítica
- **Acción**: `npm install`
- **Ya está**: Instalado

---

## 🧪 Cómo Testear Todo

### Test 1: Verificar Code Splitting
```
1. npm run build
2. Abre dist/index.html en navegador
3. DevTools → Network → Js/css
4. Debería ver múltiples chunks
```

### Test 2: Verificar Lazy Loading
```
1. npm run dev
2. Abre DevTools → Network
3. Filtra por .js
4. Al cambiar de ruta, debería cargar chunk nuevo
```

### Test 3: Verificar Memoización
```
1. npm run dev
2. DevTools → Profiler
3. Renderiza escena
4. Debería ver pocos re-renders
```

### Test 4: Verificar Web Vitals
```
1. npm run dev
2. Abre http://localhost:5174
3. DevTools → Console
4. Debería ver:
   📊 LCP: X.XXX s
   📊 CLS: 0.XXX
   📊 DNS/TCP/TTFB/Load times
```

### Test 5: Mobile Responsiveness
```
1. npm run dev
2. DevTools → Toggle device toolbar (Ctrl+Shift+M)
3. Selecciona iPhone 12
4. Verifica que renderiza correctamente
```

---

## 🚀 Antes de Deploy

### Checklist Pre-Deploy

- [ ] Testeaste localmente con `npm run dev`
- [ ] Validaste con Lighthouse
- [ ] El modelo carga sin errores
- [ ] La escena 3D se ve bien
- [ ] Mobile funciona correctamente
- [ ] No hay errores en consola
- [ ] Build completa sin warnings: `npm run build`

### Build Producción

```bash
npm run build
# Genera carpeta dist/ optimizada

# Testear build local
npm run preview
# http://localhost:4173
```

---

## 📊 Monitoreo en Producción

### Medir Performance Real

1. **Lighthouse**:
   - F12 → Lighthouse
   - Mide regularmente
   - Target: >90 score

2. **Web Vitals en Consola**:
   - Ya implementado
   - Muestra LCP, CLS, FID

3. **DevTools Network**:
   - Mira tamaños de assets
   - Verifica que HDRI es 2K (7MB, no 28MB)

### Alertas Red Flags

- ❌ LCP > 3 segundos
- ❌ CLS > 0.1
- ❌ FID > 100ms
- ❌ Bundle > 500KB

---

## 💾 Git Workflow

### Commit Recomendado

```bash
git add .
git commit -m "optimize: implement code splitting, memoization, and web vitals monitoring

- Add React.lazy() for route and component splitting
- Memoize 3D components to prevent unnecessary re-renders
- Implement Web Vitals monitoring in console
- Add Error Boundary for graceful error handling
- Optimize Canvas with conditional DPR
- Configure Vite for better code splitting and caching"

git push origin main
```

---

## 🎓 Aprendizajes Clave

### ✅ Lo que Funcionó
- Lazy loading es súper efectivo
- Memoización reduce renders drasticamente
- Code splitting paralleliza descargas
- Error boundary previene crashes feos

### ❌ Evitar
- Carga todo en un mismo bundle
- Re-renders innecesarios
- Assets sin preload
- Sin error handling

---

## 🔍 Debug Tips

### Ver qué se está cargando
```javascript
// En consola del navegador
window.performance.timing
// Muestra timing de todo
```

### Monitorear memory usage
```
DevTools → Memory → Take heap snapshot
```

### Profiling de React
```
DevTools → Profiler → Start profiling
// Haz algo
// Stop → Analiza
```

### Profiling de Three.js
```javascript
// En Scene3D.jsx
<Stats />  // Necesita @react-three/drei/Stats
```

---

## 📱 Testing en Mobile

### Usando Android/iPhone
```bash
# Exponer dev server a red local
npm run dev -- --host

# En móvil, ir a: http://TU_IP:5173
```

### Emulador Chrome
```
F12 → Toggle Device Toolbar (Ctrl+Shift+M)
Seleccionar dispositivo
```

---

## 🎯 Métricas Target

Para estar bien optimizado:

| Métrica | Target | Actual (esperado) |
|---------|--------|------------------|
| LCP | < 2.5s | ~2.8s |
| FCP | < 1.8s | ~2.1s |
| CLS | < 0.1 | ~0.05 |
| TTI | < 3.8s | ~3.2s |
| Bundle | < 200KB | ~180KB |
| HDRI | < 10MB | 7MB (con 2K) |

---

## 🆘 Última Opción: Reset Total

Si algo se daña irremediablemente:

```bash
# Limpiar todo
rm -rf node_modules dist .next
rm package-lock.json

# Reinstalar
npm install
npm run dev
```

---

## 📞 Recursos de Ayuda

### Documentación Interna
- `OPTIMIZATION_GUIDE.md` - Guía técnica
- `QUICK_OPTIMIZATION.md` - Quick start
- `README_OPTIMIZATIONS.md` - Status
- `SUMMARY.md` - Resumen ejecutivo

### Recursos Externos
- **React Docs**: https://react.dev
- **Three.js Docs**: https://threejs.org/docs
- **Vite Docs**: https://vitejs.dev
- **Web Vitals**: https://web.dev/vitals/
- **React Three Fiber**: https://r3f.docs.pmnd.rs/

---

## ✨ Bonus Tips

### Performance Quick Wins
1. Siempre usa `React.lazy()` para rutas
2. Memoiza componentes que reciben props objects
3. Usa `useMemo` para objetos costosos
4. Preload de assets críticos

### Debugging Quick Wins
1. Console.log() en lugares estratégicos
2. DevTools Network para ver request timing
3. Lighthouse para métricas
4. Performance profiler para bottlenecks

### UX Quick Wins
1. Loading screens elegantes (ya implementado)
2. Error boundaries graceful (ya implementado)
3. Animations smooth (ya optimizado)
4. Mobile-first design (ya optimizado)

---

**Última actualización**: Mayo 29, 2026

**¿No encuentras tu problema aquí?** Abre un issue en GitHub o revisa la documentación de las librerías utilizadas.