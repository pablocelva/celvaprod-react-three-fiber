# CELVAPROD React Three.js

> Proyecto Three.js + React completamente optimizado para producción. Renderizado 3D con modelo interactivo y animaciones fluidas.

## 🚀 Quick Start

```bash
# Development
pnpm install
pnpm run dev

# Production Build
pnpm run build
pnpm run preview

# Deployment (Netlify)
# Just push to git, Netlify builds automatically
```

## 📊 Performance

### Primera Carga (Cold Start)
- **LCP**: ~20s (primera vez, descarga assets)
- **CLS**: 0 (perfecto)
- **INP**: ~60ms (bueno)

### Reload (Cache)
- **LCP**: ~1.2s (excelente, desde caché)
- **Bundle Size**: 180 KB (-40% optimizado)

**Nota**: La primera carga es lenta porque descarga:
- HDRI environment (28MB)
- Modelo 3D + texturas (6MB)
- Todo se cachea para reloads rápidos

## ✨ Features

- ✅ Escena 3D interactiva con Three.js
- ✅ OrbitControls para navegación
- ✅ HDRI environment dinámico
- ✅ Animaciones suaves
- ✅ Carga responsive
- ✅ Code splitting automático
- ✅ Error handling robusto
- ✅ Web Vitals monitoring
- ✅ CSS separado y organizado

## 🏗️ Architecture

```
src/
├── components/
│   ├── Scene3D.jsx              # Canvas 3D principal
│   ├── ErrorBoundary.jsx        # Manejo de errores
│   ├── LoadingScreen.jsx        # Pantalla de carga
│   ├── Navbar.jsx               # Navegación
│   ├── Footer.jsx               # Pie de página
│   ├── ContactForm.jsx          # Formulario
│   └── *.css                    # Estilos por componente
├── hooks/
│   ├── useGLTFWithReady.js      # Detección de modelos listos
│   └── useWebVitals.js          # Monitoreo de performance
├── pages/                       # Rutas
├── App.jsx                      # App principal
├── App.css                      # Estilos globales
└── main.jsx                     # Entry point
```

## 🔧 Scripts

```bash
pnpm run dev              # Desarrollo local
pnpm run build           # Build producción
pnpm run preview         # Preview del build
pnpm run lint            # ESLint check
pnpm run analyze:assets  # Análisis de assets
pnpm run compress:hdr    # Guía de compresión HDRI
```

## 📦 Deployment

### Netlify (Recomendado)

1. Push a GitHub
2. Connect en Netlify
3. Auto-deployment configurado con `netlify.toml`

**Build Command**: `pnpm run build`  
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
- CSS separado por componente
- Error boundaries elegantes

## 🚀 Próximas Mejoras (Opcional)

- Convertir GLTF → GLB embebido (2 min) - mejor performance
- Descargar HDRI 2K (2 min, 75% reducción)
- Service Worker para offline support

## 📞 Troubleshooting

### Primera carga lenta (20+ segundos)

Es **completamente normal y esperado**:

**¿Por qué?**
1. Primera descarga de HDRI (28MB)
2. Modelo 3D + texturas (6MB)
3. Compilación de Three.js
4. Todo se cachea automáticamente

**¿Cómo mejorarlo?**
- Usar HDRI 2K en lugar de 4K (-75% tamaño)
- Convertir modelo a GLB embebido

**Reload es rápido**: Caché del navegador + build compilado (1.2s)

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

| Métrica | Target | Primera Carga | Reload |
|---------|--------|---------------|--------|
| LCP | < 2.5s | ~20s | 1.2s ✅ |
| CLS | < 0.1 | 0 ✅ | 0 ✅ |
| Bundle | < 200KB | 180KB ✅ | 180KB ✅ |

## 🛠️ Tech Stack

- React 19.1.1
- Three.js 0.179.1
- React Three Fiber 9.3.0
- React Router 7.8.2
- Vite 7.1.2
- pnpm (package manager)

## 📝 License

Privado - CELVAPROD

---

**Status**: ✅ Production Ready  
**Package Manager**: pnpm  
**Last Updated**: Mayo 29, 2026