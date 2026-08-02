# Plan de Mejoras — CELVAPROD Landing 3D

> ⚠️ **Limitación clave del proyecto:** Landing 3D con environment 360°.
> **No debe haber scroll vertical de página.** Todo el contenido debe manejarse dentro de componentes sin romper la experiencia inmersiva.
> Las transiciones entre secciones deben ocurrir *sin que el usuario sienta que "salió" del entorno 3D*.

**Leyenda:** ✅ Listo · 🔶 Parcial · ⬜ Pendiente

---

## Pilares principales

### Pilar 1 — CSS moderno y ordenado

**Objetivo:** Reemplazar el CSS global monolítico (`App.css` de ~850+ líneas) por un sistema modular, mantenible y semántico.

| Sub-tarea | Descripción | Estado |
|---|---|---|
| **1.1 CSS Modules** | **CSS 100% modularizado por componente/página**: `Navbar.module.css`, `ContentPanel.module.css`, `ServiceDetail.module.css`, `ContactForm.module.css`, `IconLogos.module.css`, `Footer.module.css`, `Home.module.css`, `Servicios.module.css`. `App.css` quedó solo con reset + variables. CSS compartido (`.cta1`) duplicado en los módulos que lo usan. | ✅ Listo |
| **1.2 Variables CSS semánticas** | Renombradas a `--color-primary`, `--color-accent`, `--color-green`, `--color-green-soft`. Viejas quedan como alias deprecados. | ✅ Listo |
| **1.3 Selectores de clase en lugar de etiqueta** | Navbar: `nav`/`nav a`/`nav a:hover` → `.navbar`/`.navbar a`/`.navbar a:hover`. Quedan selectores de etiqueta solo en el reset global (estándar). | ✅ Listo |
| **1.4 Hook `useFadeIn`** | Extraída la lógica de fade-in a un hook reutilizable. Aplicado en Home, Servicios, detalle de servicios y ContactForm. | ✅ Listo |
| **1.5 Animaciones centralizadas** | El fade vive en `ContentPanel.module.css` + stagger en `Servicios.module.css`, disparado por las clases globales `page-transition`/`show` (sin estilos propios, solo marcador de estado). | ✅ Listo |
| **1.6 Sistema de diseño mínimo** | Tokens de espaciado (`--space-*`), z-index (`--z-*`), radius, transition. | 🔶 Parcial (faltan breakpoints/tipografía) |

### Pilar 2 — TypeScript (tipado fuerte)

**Objetivo:** Contratos claros entre componentes, datos y escena 3D. **100% migrado.**

| Sub-tarea | Descripción | Estado |
|---|---|---|
| **2.1 Configuración inicial** | `tsconfig.json` + `tsconfig.app.json` estricto. `@types/react`, `@types/react-dom`, `@types/three`, `typescript` instalados. | ✅ Listo |
| **2.2 Tipos de dominio** | `src/types/`: `service.ts`, `navigation.ts`, `contact.ts`, `scene.ts`, barrel `index.ts`. | ✅ Listo |
| **2.3 Props tipadas** | `ServiceDetailProps`, `SceneContentProps`, `ErrorBoundaryProps`, `Scroll3DControllerProps`, `ServiceCard`, etc. | ✅ Listo |
| **2.4 Migración de datos** | `src/data/services.ts` con `ServiceMap` tipado estricto. | ✅ Listo |
| **2.5 Migración de componentes** | **Los 28 archivos del `src` son `.tsx`/`.ts`.** `tsc -b --noEmit` pasa limpio. | ✅ Listo |
| **2.6 Tipado de la escena 3D** | `TargetPositions`, `CameraTarget`, `RouteName` en `navigation.ts`; refs tipados `Group` en Scene3D. | ✅ Listo |

### Pilar 3 — Arquitectura clara

**Objetivo:** Eliminar duplicación, separar responsabilidades y establecer un layout predecible.

| Sub-tarea | Descripción | Estado |
|---|---|---|
| **3.1 Layout compartido con `<Outlet />`** | `PageLayout` en `src/layouts/` con Navbar + fade-in por ruta + `<Outlet />`. Navbar eliminado de las 6 páginas. `useFadeIn` ahora vive solo en el layout. | ✅ Listo |
| **3.2 Layout compartido para el contenido** | `ContentPanel` en `src/components/` con `variant: 'card' \| 'hero' \| 'cards' \| 'contacto'`. Reemplaza los `<div className="form-container--*">` duplicados en las 6 páginas. | ✅ Listo |
| **3.3 Separación de Scene3D** | `src/components/scene/`: `Scene3D` (Canvas), `SceneContent` (luces + modelo + env), `CameraController` (lógica por ruta), `MicrofonoModel`, `FallbackModel`. Posiciones de cámara centralizadas en `src/data/sceneTargets.ts`. Fix: rotación del modelo duplicada (giraba 2x) consolidada. Código muerto (`onModelReady`/`setModelReady`) eliminado. | ✅ Listo |
| **3.4 Estado de carga global** | `LoadingContext` + `LoadingProvider` en `src/contexts/`. `LoadingScreen` se muestra hasta que la escena reporta listo (modelo + environment vía `SceneLoadedSignal` en SceneContent). Eliminado el timer arbitrario de 2s en App; safety timeout de 12s. | ✅ Listo |
| **3.5 Error boundaries por página** | `PageErrorBoundary` en `src/components/PageErrorBoundary/` (clase + CSS module). Envuelve cada una de las 6 rutas en `App.tsx`; también captura fallos de carga de chunks lazy. | ✅ Listo |

---

## Optimizaciones adicionales

### Rendimiento

| Tarea | Descripción | Estado |
|---|---|---|
| HDRI comprimido | **Fallback adaptativo implementado**: 4K por defecto, 2K si no carga en 4s, 1K/2K directo en conexiones lentas (`saveData`/2G). Lógica en `AdaptiveEnvironment.tsx`. Detalle en `docs/HDRI_COMPRESSION.md`. | ✅ Listo |
| Modelo GLB comprimido | Cambio a `scene_compressed.glb` **probado → falla**: `setKTX2Loader must be called before loading KTX2 textures`. Requiere KTX2Loader (Propuesta B) o GLB sin KTX2 (Propuesta C). Error real y propuestas en `docs/GLB_KTX2.md`. Modelo actual funcionando (`scene.gltf`). | ⬜ Pendiente (pausado) |
| Bundle analysis | Agregar `vite-plugin-visualizer` para auditar el bundle. | ⬜ Pendiente |

### Experiencia 3D

| Tarea | Descripción | Estado |
|---|---|---|
| Sincronización cámara + contenido | La cámara se mueve a su posición y cuando está cerca, el contenido aparece. | ⬜ Pendiente |
| Cambio de ambiente por sección | Color de luz ambiental varía según la ruta (lerp suave). | ⬜ Pendiente |
| Overlay de transición | Overlay breve (0.3s) al cambiar de ruta. | ⬜ Pendiente |

### Calidad de código

| Tarea | Descripción | Estado |
|---|---|---|
| ESLint stricter | Configurado `typescript-eslint` (recomendado). TS bajado a 5.9 (compat). Lint **verde**: 0 errores. Falta: `react-hooks/exhaustive-deps`, `import/order`. | 🔶 Parcial |
| Husky + lint-staged | Pre-commit hooks que corren ESLint automáticamente. | ⬜ Pendiente |
| Pruebas mínimas | Vitest + React Testing Library para componentes clave. | ⬜ Pendiente |
| Scripts `scripts/*.js` → TS | Migrar los 3 scripts funcionales a `.ts` con `tsx` + `@types/node` + type-check en `tsconfig.node.json`. **Opcional/diferido**: beneficio cosmético (badge de lenguaje en GitHub) con riesgo sobre assets reales (GLB/modelo). `src/` ya es 100% TS. | 🔶 Opcional — diferido |

### SEO

| Tarea | Descripción | Estado |
|---|---|---|
| SEO Pasos 1-4 | `lang="es"`, description, theme-color, favicon único; tags OG/Twitter + `og-preview.png` (1200×630, screenshot real); canonical + `robots.txt` + `sitemap.xml` (6 rutas); JSON-LD (`WebSite` + `Organization` con `sameAs` de 5 perfiles oficiales). Dominio sin `www` confirmado (redirección OK). | ✅ Listo |
| Logo de marca | Specs y plan en `docs/LOGO_PLAN.md` (pendiente: no hay logo aún). | ⬜ Pendiente |
| SEO Paso 5 | `manifest.json` (PWA: name, theme, start_url) + prefetch de rutas principales (Servicios y Contacto) tras la carga de la escena. | ✅ Listo |

### Accesibilidad

| Tarea | Descripción | Estado |
|---|---|---|
| ARIA labels | `aria-label` a botones CTA, iconos sociales, hamburger menu. | ⬜ Pendiente |
| Navegación por teclado | Que el Canvas 3D no atrape el foco, `tabIndex` correcto. | ⬜ Pendiente |
| Contraste | Text-shadow o backdrop más opaco para legibilidad. | ⬜ Pendiente |

---

## Mejoras ya aplicadas en sesiones previas (no listadas en pilares)

| Mejora | Descripción |
|---|---|
| Datos centralizados | `src/data/services.ts` con info de cada servicio (color, features, badges, CTA). |
| `ServiceDetail` reutilizable | Panel de detalle con back button, icono, título, features, botones de acción. |
| Badges por servicio | Solo `clases` muestra badges; composición y producción no. |
| Fondo oscuro con blur unificado | `rgba(0,0,0,0.25)` + `blur(8px)` en hero, cards, detalle y contacto. |
| Animación de entrada | Fade-in + slide-up en todas las páginas vía `useFadeIn`. |
| Navbar | Padding reducido, hover unificado (desplazamiento + amarillo) en logo, links e iconos. |
| Responsive contacto | Formulario con `width: 85%` en mobile, mismo comportamiento que las cards. |

---

## Resumen de prioridades

| Prioridad | Tareas | Estado |
|---|---|---|
| **Completado** | Layout compartido `<Outlet />`, ContentPanel, separación Scene3D, CSS Modules, selectores de clase, ESLint funcional, estado de carga global (3.4), error boundaries por página (3.5), SEO pasos 1-5, HDRI adaptativo | ✅ Listo |
| **Ahora** | Logo (`docs/LOGO_PLAN.md`) | ⬜ Pendiente |
| **Siguiente** | ESLint stricter (`exhaustive-deps`, `import/order`), overlay de transición, ARIA labels | ⬜ Pendiente |
| **Después** | Modelo GLB comprimido (requiere KTX2 loader, pausado), scripts → TS (opcional), sincronización cámara+contenido, cambio de ambiente por sección, pruebas, husky, bundle analysis | ⬜ Pendiente |

---

## Notas sobre la limitación de scroll

- **Nunca** usar `overflow-y` en el body o en `#root`.
- Cada "página" debe ser un contenedor de altura fija (`height: 100vh` o `max-height: calc(100vh - <navbar>)`).
- Si el contenido excede, **scroll interno** en el panel (`overflow-y: auto` dentro del contenedor, nunca en la página).
- Las transiciones entre páginas deben sentirse como "cambiar de vista" (slide/fade), no como scroll.
- El Navbar debe ser `position: fixed; top: 0` y restar su altura del viewport disponible.
- La escena 3D de fondo siempre está fija y visible — el contenido solo se superpone.
