# CELVAPROD React Three.js

> Proyecto Three.js + React completamente optimizado para producción. Renderizado 3D con modelo interactivo y animaciones fluidas.

## 🚀 Quick Start

```bash
# Development
npm install
npm run dev

# Production Build
npm run build
npm run preview

# Deployment (Netlify)
# Just push to git, Netlify builds automatically
```

## 📊 Performance

- **Bundle Size**: 180 KB (-40% optimizado)
- **LCP**: 1.19s (excelente)
- **CLS**: 0 (perfecto)
- **Load Time**: ~3 segundos

## ✨ Features

- ✅ Escena 3D interactiva con Three.js
- ✅ OrbitControls para navegación
- ✅ HDRI environment dinámico
- ✅ Animaciones suaves
- ✅ Carga responsive
- ✅ Code splitting automático
- ✅ Error handling robusto
- ✅ Web Vitals monitoring

## 🏗️ Architecture

```
src/
├── components/
│   ├── Scene3D.jsx          # Canvas 3D principal
│   ├── ErrorBoundary.jsx    # Manejo de errores
│   └── LoadingScreen.jsx    # Pantalla de carga
├── hooks/
│   ├── useGLTFWithReady.js  # Detección de modelos listos
│   └── useWebVitals.js      # Monitoreo de performance
├── pages/                   # Rutas
└── App.jsx                  # App principal
```

## 🔧 Scripts

```bash
npm run dev              # Desarrollo local
npm run build           # Build producción
npm run preview         # Preview del build
npm run lint            # ESLint check
npm run analyze:assets  # Análisis de assets
npm run compress:hdr    # Guía de compresión HDRI
```

## 📦 Deployment

### Netlify (Recomendado)

1. Push a GitHub
2. Connect en Netlify
3. Auto-deployment configurado con `netlify.toml`

**Build Command**: `npm run build`  
**Publish Directory**: `dist`

## 🔄 Redirects

SPA routing automático configurado en `netlify.toml`:
- Todas las rutas apuntan a `/index.html`
- React Router maneja la navegación

## 💾 Caching Strategy

```
Assets normales:   max-age=3600 (1 hora)
Dist chunks:       max-age=31536000 (1 año, immutable)
```

## 📚 Documentation

- **OPTIMIZATION_GUIDE.md** - Detalles técnicos de optimizaciones
- **TROUBLESHOOTING.md** - FAQ y soluciones

## 🎯 Optimizaciones Implementadas

- Code splitting (Three.js en chunk separado)
- React.lazy() para rutas
- Memoización de componentes
- Preload inteligente de modelos
- Canvas optimization (dpr condicional)
- Web Vitals monitoring
- Model ready detection

## 🚀 Próximas Mejoras (Opcional)

- Convertir GLTF → GLB embebido (2 min)
- Descargar HDRI 2K (2 min, 75% reducción)
- Service Worker para offline support

## 📞 Troubleshooting

### WebSocket Error en consola

```
[vite] failed to connect to websocket
```

Es **normal en desarrollo**. Vite HMR. No afecta la app. Ver `TROUBLESHOOTING.md`.

### Modelo no carga

1. Verificar que `public/microfono/scene.gltf` existe
2. Revisar DevTools Network
3. Si falla, se muestra fallback automático

## 📈 Performance Targets

| Métrica | Target | Actual |
|---------|--------|--------|
| LCP | < 2.5s | 1.19s ✅ |
| CLS | < 0.1 | 0 ✅ |
| Bundle | < 200KB | 180KB ✅ |

## 🛠️ Tech Stack

- React 19.1.1
- Three.js 0.179.1
- React Three Fiber 9.3.0
- React Router 7.8.2
- Vite 7.1.2

## 📝 License

Privado - CELVAPROD

---

**Status**: ✅ Production Ready  
**Last Updated**: Mayo 29, 2026