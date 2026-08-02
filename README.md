# CELVAPROD React Three.js

> Landing 3D inmersivo con React Three Fiber. Escena 360° con modelo interactivo y navegación por rutas sin scroll vertical.

## 🚀 Quick Start

```bash
# Development
pnpm install
pnpm run dev

# Production Build
pnpm run build
pnpm run preview

# Type Check
pnpm run typecheck

# Tests (Vitest + React Testing Library)
pnpm run test          # Ejecuta toda la suite una vez
pnpm run test:watch    # Modo watch

# Lint
pnpm run lint
```

## ✨ Features

- Escena 3D interactiva con React Three Fiber + Three.js
- Navegación por rutas con React Router (SPA, sin scroll vertical)
- Transiciones de cámara 3D por ruta (lerp)
- **TypeScript al 100%** — 28 archivos `.tsx`/`.ts`, modo estricto
- Datos de servicios centralizados y tipados (`src/data/services.ts`)
- Tipos de dominio en `src/types/` (service, navigation, contact, scene)
- Hook `useFadeIn` reutilizable para animación de entrada
- Variables CSS semánticas + tokens de diseño
- Code splitting por ruta (chunks separados)
- Error handling robusto (ErrorBoundary en la escena 3D + PageErrorBoundary por ruta)
- Web Vitals monitoring
- **Suite de tests**: 47 tests (Vitest + React Testing Library) — lógica HDRI adaptativa, datos, rutas, componentes y error boundaries

## 🏗️ Architecture

```
src/
├── components/
│   ├── scene/                    # Subsistema 3D (Canvas, luces, cámara, modelo)
│   │   ├── Scene3D.tsx           # Canvas 3D (config gl, camera, dpr)
│   │   ├── SceneContent.tsx      # Luces + modelo + environment + controllers
│   │   ├── CameraController.tsx  # Cámara/modelo por ruta (lerp + rotación + exposure)
│   │   ├── MicrofonoModel.tsx    # Carga del modelo GLTF
│   │   ├── FallbackModel.tsx     # Fallback (cubo) mientras carga el modelo
│   │   └── types.ts              # ModelRef compartido
│   ├── Navbar/                   # Navbar.tsx + Navbar.module.css
│   ├── ContentPanel/             # Contenedor de contenido (card/hero/cards/contacto)
│   ├── ServiceDetail/            # Panel de detalle de servicio (reutilizable)
│   ├── ContactForm/              # Formulario de contacto (Formspree)
│   ├── IconLogos/                # Iconos sociales
│   ├── Footer/                   # Pie de página
│   ├── LoadingScreen/            # Pantalla de carga
│   ├── ErrorBoundary/            # Manejo de errores de la escena 3D
│   └── PageErrorBoundary/        # Error boundary por ruta (cada página)
├── data/
│   ├── services.ts              # Datos de servicios tipados (composición, producción, clases)
│   └── sceneTargets.ts          # Posiciones de cámara/modelo por ruta (desktop + mobile)
├── contexts/
│   ├── loadingContext.ts       # Context + hook useLoading (estado de carga unificado)
│   └── LoadingProvider.tsx     # Provider con safety timeout
├── hooks/
│   ├── useFadeIn.ts             # Animación de entrada (fade + slide) — usada por el layout
│   └── useWebVitals.ts          # Monitoreo de performance
├── layouts/
│   └── PageLayout.tsx           # Layout compartido: Navbar + fade-in + <Outlet />
├── pages/
│   ├── Home/                     # Home.tsx + Home.module.css
│   ├── Servicios/                # Servicios.tsx + Servicios.module.css
│   ├── Composicion/              # Detalle composición
│   ├── Produccion/               # Detalle producción
│   ├── Clases/                   # Detalle clases
│   └── Contacto/                 # Contacto (usa ContactForm)
├── types/                       # Tipos de dominio (service, navigation, contact, scene)
├── router/
│   └── routes.ts                # ROUTES: fuente única de las 6 rutas lazy (App.tsx las mapea)
├── utils/
│   └── hdrFallback.ts           # Lógica adaptativa del HDRI (getBaselineHDR/shouldProbe/probe4K)
├── test/
│   └── setup.ts                 # Setup de tests (jest-dom)
├── App.tsx                      # App principal (routing + scene ready)
├── App.css                      # Solo reset + variables/tokens (sin estilos de componente)
└── main.tsx                     # Entry point
```

## 📚 Documentation

Toda la documentación vive en `docs/`:

| Archivo | Contenido |
|---|---|
| `docs/PLAN_MEJORAS.md` | Plan de mejoras con estado de cada tarea (✅/🔶/⬜) |
| `docs/OPTIMIZATION_GUIDE.md` | Detalles técnicos de optimizaciones |
| `docs/TROUBLESHOOTING.md` | FAQ y soluciones a problemas comunes |
| `docs/HDRI_COMPRESSION.md` | Guía para comprimir el HDRI de ambiente (28.6MB → 2K) |
| `docs/GLB_KTX2.md` | Estado y opciones del modelo 3D comprimido (KTX2/meshopt) |
| `docs/LOGO_PLAN.md` | Specs y plan de implementación del logo de marca |
| `docs/TESTING_PLAN.md` | Estrategia de tests con estado — P1/P2/P3 implementados (47 tests), P4 (E2E) opcional |

## 🔧 Scripts

```bash
pnpm run dev              # Desarrollo local
pnpm run build            # Build producción
pnpm run preview          # Preview del build
pnpm run lint             # ESLint check
pnpm run typecheck        # Type check estricto (tsc -p tsconfig.app.json --noEmit)
pnpm run test             # Tests (Vitest + RTL) una sola pasada
pnpm run test:watch       # Tests en modo watch
pnpm run analyze:assets   # Análisis de assets
```

## 📦 Deployment

### Netlify (Recomendado)

1. Push a GitHub
2. Connect en Netlify
3. Auto-deployment configurado con `netlify.toml`

**Build Command**: `pnpm run build`  
**Publish Directory**: `dist`

SPA routing automático: todas las rutas apuntan a `/index.html`, React Router maneja la navegación.

## 💾 Caching Strategy

```
Assets normales:   max-age=3600 (1 hora)
Dist chunks:       max-age=31536000 (1 año, immutable)
```

## 🎯 Optimizaciones Implementadas

- Code splitting (Three.js en chunk separado, ~335KB gzip)
- React.lazy() para rutas
- Memoización de componentes (`memo`)
- Preload inteligente de modelos (`useGLTF.preload`)
- Canvas optimization (dpr condicional según viewport)
- Web Vitals monitoring
- Model ready detection
- Tipado estricto en toda la app
- Hook `useFadeIn` para animaciones consistentes
- SEO: meta/OG/Twitter, canonical, `robots.txt`, `sitemap.xml`, JSON-LD (`WebSite` + `Organization`), manifest PWA + prefetch de rutas
- HDRI adaptativo: sonda de 3s mide si el 4K carga rápido; línea base 2K (1K con `saveData`/`slow-2g`), sin flash ni doble descarga
- Suite de tests: Vitest + React Testing Library (47 tests: `hdrFallback`, datos, rutas, componentes, error boundaries)

## 🛠️ Tech Stack

- React 19.1.1
- TypeScript (modo estricto)
- Three.js 0.179.1
- React Three Fiber 9.3.0
- @react-three/drei 10.7.4
- React Router 7.8.2
- Vite 7.x
- Vitest 4.1.10 + jsdom (testing)
- React Testing Library 16.3 + jest-dom + user-event (component tests)
- pnpm (package manager)

## 📝 License

Privado - CELVAPROD

---

**Status**: Production Ready  
**Package Manager**: pnpm  
**Language**: TypeScript (100%)  
**Last Updated**: Agosto 2026
