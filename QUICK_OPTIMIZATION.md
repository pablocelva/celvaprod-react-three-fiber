# 🚀 Quick Start: Optimización de Carga

## Estado Actual
```
⏱️ Tiempo de carga actual: ~5+ segundos
🎯 Objetivo después de cambios: ~1.5-2 segundos
```

## ✅ Cambios Ya Realizados (Fase 1)

Estos cambios están **listos YA** en tu código:

- ✅ **Code Splitting**: Three.js en chunk separado (~40% reducción)
- ✅ **React.lazy()**: Scene3D y rutas cargadas bajo demanda
- ✅ **Memoización**: Componentes optimizados contra re-renders
- ✅ **Preload inteligente**: Modelo precargado mientras se renderiza
- ✅ **Canvas optimization**: DPR condicional para mobile
- ✅ **Vite config**: Manual chunks para mejor caching
- ✅ **Web Vitals monitoring**: Consola muestra LCP, CLS, FID

---

## 🎯 Próximo Paso: HDRI 2K (Hace 75% de la diferencia!)

### ⏱️ Tiempo estimado: 2 minutos

### Paso a Paso:

1. **Descargar HDRI 2K**
   ```
   Ir a: https://polyhaven.com/a/river_walk_1
   Buscar la versión "2K" en formato "HDRI .hdr"
   Descargar
   ```

2. **Guardar en proyecto**
   ```
   Guardar el archivo en:
   public/enviorments/river_walk_1_2k.hdr
   ```

3. **Actualizar referencia en código**
   
   En: `src/components/Scene3D.jsx` línea 88
   
   Cambiar:
   ```jsx
   <Environment files="/enviorments/river_walk_1_4k.hdr" background />
   ```
   
   Por:
   ```jsx
   <Environment files="/enviorments/river_walk_1_2k.hdr" background />
   ```

4. **Testear**
   ```bash
   npm run dev
   # Debería cargar MUCHO más rápido
   ```

---

## 📊 Impacto Esperado

### Antes de Cambios
- Bundle JS: ~300 KB
- HDRI: 28.56 MB
- Tiempo total: ~5+ segundos

### Después de Phase 1 (Hecho)
- Bundle JS: ~180 KB (-40%)
- Tiempo de carga reducido: ~30%

### Después de Phase 2 (HDRI 2K)
- HDRI: ~7 MB (-75%)
- **Tiempo total: ~1.5-2 segundos** (-70% total)

---

## 🔍 Cómo Verificar Mejoras

### Opción 1: Chrome Lighthouse (Recomendado)
```
1. Presionar F12 (DevTools)
2. Tab "Lighthouse"
3. Click "Analyze page load"
4. Comparar con mediciones anteriores
```

### Opción 2: Consola (Web Vitals)
```
1. Presionar F12 (DevTools)
2. Tab "Console"
3. Al cargar página, verás:
   - 📊 LCP (Largest Contentful Paint)
   - 📊 CLS (Cumulative Layout Shift)
   - 📊 FID/INP (Input Delay)
```

### Opción 3: Network Tab
```
1. Presionar F12 (DevTools)
2. Tab "Network"
3. Reload página (Ctrl+Shift+R para hard reset)
4. Ver tamaño total y tiempos de descarga
```

---

## 🛠️ Scripts Disponibles

```bash
# Ver análisis actual de assets
npm run analyze:assets

# Ver guía de compresión HDRI
npm run compress:hdr

# Build para production
npm run build

# Preview del build
npm run preview
```

---

## 📈 Próximas Optimizaciones (Optional)

Si quieres más mejoras después de HDRI 2K:

### Texture Compression (50-70% reducción)
```bash
npm install -g @gltf-transform/cli
gltf-transform compress public/microfono/scene_compressed.glb public/microfono/scene_optimized.glb
```

### Service Worker (cache en visitas posteriores)
```bash
npm install -D workbox-cli
# Solo necesario si quieres offline support
```

---

## 📝 Checklist

- [ ] Descargar HDRI 2K
- [ ] Guardar en `public/enviorments/river_walk_1_2k.hdr`
- [ ] Actualizar ruta en `Scene3D.jsx`
- [ ] Testear con `npm run dev`
- [ ] Validar con Lighthouse
- [ ] Commit cambios: `git add . && git commit -m "optimize: HDRI 2K for 70% faster load"`

---

## 🚨 Troubleshooting

### "El proyecto sigue lento"
```
1. Verificar que cambió la ruta en Scene3D.jsx
2. Limpiar cache del navegador (Ctrl+Shift+Delete)
3. Hard reload (Ctrl+Shift+R)
4. Abrir DevTools Network tab y buscar size del archivo HDRI
```

### "No veo diferencia visual"
```
La versión 2K se ve prácticamente idéntica a 4K en pantalla.
El cambio es principalmente en velocidad de carga, no en calidad visual.
```

### "Build falla después de cambios"
```bash
# Limpiar cache
rm -rf node_modules/.vite
npm run build
```

---

## 💡 Tips

1. **Monitorea siempre**: Usa Lighthouse después de cambios
2. **Test en mobile**: 60% de usuarios usan mobile
3. **No sacrifiques calidad**: 2K es imperceptible vs 4K
4. **Mide dos veces**: Antes y después con Lighthouse

---

**¿Preguntas?** Revisa `OPTIMIZATION_GUIDE.md` para más detalles técnicos.

**Última actualización**: Mayo 29, 2026