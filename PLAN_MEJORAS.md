# Plan de Mejoras — CELVAPROD Landing 3D

> ⚠️ **Limitación clave del proyecto:** Es un landing 3D con un environment 360°.  
> **No debe haber scroll vertical de página.** Todo el contenido debe manejarse dentro de componentes de manera que no se rompa la experiencia inmersiva.  
> Las transiciones entre secciones deben ocurrir *sin que el usuario sienta que "salió" del entorno 3D*.

---

## Índice

1. [Arquitectura y Organización](#1-arquitectura-y-organización)
2. [Tipado (TypeScript)](#2-tipado-typescript)
3. [Estilos y CSS](#3-estilos-y-css)
4. [Layout y Navegación Global](#4-layout-y-navegación-global)
5. [Páginas de Servicio (Detalle)](#5-páginas-de-servicio-detalle)
6. [Experiencia 3D y Transiciones](#6-experiencia-3d-y-transiciones)
7. [Rendimiento](#7-rendimiento)
8. [Accesibilidad](#8-accesibilidad)
9. [Mantenibilidad y Calidad de Código](#9-mantenibilidad-y-calidad-de-código)
10. [Propuesta de Roadmap](#10-propuesta-de-roadmap)

---

## 1. Arquitectura y Organización

### 1.1 Layout compartido con `<Outlet />`

**Problema:** Cada página importa y renderiza `<Navbar />` individualmente. No hay un `Layout` wrapper.

**Propuesta:** Crear un `Layout.jsx` compartido con `<Outlet />` de React Router, que incluya Navbar + fade-in animation + container. Así las pages solo renderizan su contenido específico.

```
<Routes>
  <Route element={<PageLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/servicios" element={<Servicios />} />
    <Route path="/servicios/composicion" element={<Composicion />} />
    ...
  </Route>
</Routes>
```

**Beneficios:** Elimina duplicación de estado `visible`, reduce boilerplate, centraliza lógica de transiciones.

### 1.2 Rutas anidadas para servicios

**Problema:** Las rutas `/servicios/composicion`, `/servicios/produccion`, `/servicios/clases` son planas, no hijas de `/servicios`.

**Propuesta:** Hacerlas rutas hijas:

```jsx
<Route path="/servicios" element={<Servicios />}>
  <Route path="composicion" element={<Composicion />} />
  <Route path="produccion" element={<Produccion />} />
  <Route path="clases" element={<Clases />} />
</Route>
```

**Beneficio:** Coherencia semántica, posibilidad de mostrar un índice de servicios + detalle en la misma vista si se desea.

### 1.3 Separación de responsabilidades en Scene3D

**Problema:** `Scene3D.jsx` (167 líneas) mezcla lógica de cámara, modelo, luces, environment, y responde a rutas.

**Propuesta:** Dividir en:
- `Scene3D.jsx` — solo el `<Canvas>` con configuración base.
- `SceneContent.jsx` — luces, environment, modelo, cámara.
- `CameraController.jsx` — lógica de transición de cámara por ruta (hook personalizado).
- `SceneLighting.jsx` — luces separadas.

### 1.4 Patrón de página (Page composable)

**Problema:** El fade-in `visible` + `useEffect + setTimeout(50ms)` se repite en 5 archivos.

**Propuesta:** Hook `useFadeIn()` que retorne `{ visible, className }` y se reutilice.

### 1.5 Componente de loading unificado

**Problema:** `<LoadingScreen />` se usa como fallback de Scene3D y como pantalla inicial. Hay dos fuentes de `loading`.

**Propuesta:** Unificar en un solo estado global (React Context o Zustand mínimo) que controle si la app está "lista" (3D listo + contenido cargado).

---

## 2. Tipado (TypeScript)

### 2.1 Migración progresiva a TypeScript

**Estado actual:** 100% JavaScript (`.jsx`). `@types/react` y `@types/react-dom` existen en devDependencies pero no se usan.

**Propuesta:**
1. Agregar `tsconfig.json` (strict).
2. Renombrar archivos a `.tsx` progresivamente, empezando por tipos e interfaces.
3. Mantener `.jsx` para los componentes legacy hasta migrarlos.

### 2.2 Interfaces a definir

| Archivo Propuesto | Contenido |
|---|---|
| `src/types/navigation.ts` | `RouteName`, `CameraPosition`, `TargetPosition` |
| `src/types/service.ts` | `Service`, `ServiceDetail`, `ServiceFeature` |
| `src/types/scene.ts` | `SceneConfig`, `LightConfig`, `ModelConfig` |
| `src/types/contact.ts` | `ContactFormData`, `ContactFormStatus` |

Ejemplo:

```ts
type RouteName = '/' | '/servicios' | '/servicios/composicion' | '/servicios/produccion' | '/servicios/clases' | '/contacto'

interface CameraTarget {
  cam: [number, number, number]
  model: [number, number, number]
}

type TargetPositions = Record<RouteName, CameraTarget>
```

### 2.3 Props tipadas

- `NavbarProps` (sin props por ahora, pero preparar)
- `Scene3DProps` (onModelReady, etc.)
- `ServiceCardProps` (title, description, link, icon)
- `ContactFormProps` (onSubmit, initialData)

---

## 3. Estilos y CSS

### 3.1 CSS Modules o CSS-in-JS ligero

**Problema:** `App.css` tiene 561 líneas con estilos globales, sin encapsulamiento. Riesgo de colisiones de nombres.

**Propuesta (opciones a discutir):**
- **Opción A: CSS Modules** — Mínimo impacto, zero runtime. Cada componente tiene su `.module.css`. Coexiste con `App.css` para estilos globales.
- **Opción B: Tailwind CSS** — Utility-first, excelente para iterar rápido en el layout responsivo. Requiere configurar PostCSS.
- **Opción C: Vanilla Extract** — CSS-in-JS con tipo estático, pero más complejo.

**Recomendación:** CSS Modules por ser lo más simple y no agregar dependencias pesadas.

### 3.2 Variables CSS más semánticas

**Actual:**
```
--color-primario: rgba(100, 51, 110, 0.8);
--color-cuarto: rgba(100, 150, 100, 0.4);  // ¿qué significa "cuarto"?
```

**Propuesta:**
```
--color-primary: #64336e;
--color-primary-rgb: 100, 51, 110;
--color-accent: #f5cc0e;
--color-accent-rgb: 245, 204, 14;
--color-green: #00913d;
--color-bg-overlay: rgba(100, 150, 100, 0.4);
--color-text: #ffffff;
--color-text-secondary: rgba(255, 255, 255, 0.87);
--blur-amount: 3px;
--radius-card: 1rem;
--transition-fade: 0.6s ease;
```

### 3.3 Sistema de diseño mínimo

Definir un set de tokens:
- Espaciado: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`
- Breakpoints: `--bp-mobile: 768px`, `--bp-tablet: 960px`, `--bp-desktop: 1200px`
- Z-index: `--z-canvas: 0`, `--z-content: 1`, `--z-navbar: 10`, `--z-loading: 100`
- Tipografía: `--font-body`, `--font-heading`, `--font-size-base`, `--font-size-lg`, `--font-size-xl`

### 3.4 Refactor de selectores genéricos

**Actual:**
```css
nav { ... }
ul { ... }
button { ... }
```

**Propuesta:** Usar clases específicas en lugar de selectores de etiqueta para evitar side effects.

Clases a estandarizar:
- `.navbar` (ya existe)
- `.nav-links`, `.nav-link` (elementos de lista)
- `.btn`, `.btn--primary`, `.btn--secondary` (en lugar de `.cta1`, `.cta2`)
- `.card`, `.card--service`
- `.overlay-panel` (en lugar de `.form-container`, `.servicio-desc`, etc.)

### 3.5 Animaciones y transiciones

- Centralizar en `animations.css` o en snippets reutilizables.
- Usar `@keyframes` modulares en lugar de transiciones inline.
- Considerar `framer-motion` para animaciones más complejas (entrada de cards, transiciones de ruta) — evaluar si el bundle lo justifica.

---

## 4. Layout y Navegación Global

### 4.1 Principio de layout sin scroll vertical

Dado que **no hay scroll vertical de página**, el contenido debe vivir en "paneles" o "vistas" que:
- Ocupan un área fija dentro del viewport.
- Se ubican sobre el Canvas 3D con `position: relative; z-index: 1`.
- Tienen `max-height: calc(100vh - <navbar-height>)` y hacen overflow **interno** si es necesario.
- Usan animación de entrada (fade + slide) para que el usuario sienta que navega *dentro* del mundo 3D.

```
┌──────────────────────────────────────┐
│           Navbar (fixed top)         │
├──────────────────────────────────────┤
│                                      │
│   ┌────────────────────────────┐     │
│   │   Panel de contenido       │     │
│   │   (overflow-y: auto)       │     │
│   │   (scroll interno)         │     │
│   │                            │     │
│   └────────────────────────────┘     │
│                                      │
│        ◄── 3D Scene (background) ──►│
└──────────────────────────────────────┘
```

### 4.2 Estrategia de layouts específicos

| Página | Layout Propuesto |
|---|---|
| **Home** | Hero centrado vertical y horizontalmente. Sin scroll. |
| **Servicios (índice)** | Cards en fila horizontal (scroll horizontal nativo o con botones). Sin scroll vertical. |
| **Servicio detalle** | Panel informativo con scroll interno si es necesario. |
| **Contacto** | Formulario centrado con altura fija. Sin scroll. |

### 4.3 Scroll horizontal para cards de servicios

En `/servicios`, las cards pueden navegarse horizontalmente (ya hay un intento con `overflow-x: auto` y `scroll-snap-type`). Propuesta mejorada:

- Scroll horizontal con scroll-snap.
- Botones de navegación (flechas) visibles en desktop.
- Indicadores de posición (dots).
- Transición suave al seleccionar una card.
- Click en card → transición de cámara 3D + navegación a detalle.

### 4.4 Transiciones entre páginas

- Aprovechar el cambio de cámara 3D que ya existe para dar sensación de "moverse" entre secciones.
- Coordinar: cambio de ruta → animación cámara 3D → fade-in de contenido.
- Usar `useTransition` de React 19 para transiciones de ruta no bloqueantes.

---

## 5. Páginas de Servicio (Detalle)

### 5.1 Estructura de datos del servicio

Crear un archivo `src/data/services.js` (o `services.ts`) con la información de cada servicio:

```ts
interface Service {
  id: string
  title: string
  subtitle: string
  shortDescription: string
  icon: string       // ícono representativo
  color: string      // color acento del servicio
  features: ServiceFeature[]
  portfolioUrl?: string
  ctaText: string
  ctaAction: 'contact' | 'external'
}

interface ServiceFeature {
  title: string
  description: string
  category: 'included' | 'optional' | 'process'
}
```

### 5.2 Layout de detalle de servicio (sin scroll vertical)

**Problema actual:** La página de detalle es texto + lista + 2 botones, ocupa muy poco espacio vertical y se ve vacía.

**Propuesta de layout en panel fijo (sin scroll vertical):**

```
┌──────────────────────────────────────────┐
│  ← Volver a Servicios                    │
│                                          │
│  ┌───┐  Título del Servicio             │
│  │icon│  Subtítulo                       │
│  └───┘                                   │
│                                          │
│  ┌─────────────────────────────────────┐ │
│  │ Características (scroll interno si  │ │
│  │ muchas, con categorías visuales)    │ │
│  │                                     │ │
│  │ ● Feature 1 — descripción breve     │ │
│  │ ● Feature 2 — descripción breve     │ │
│  │ ● Feature 3 — descripción breve     │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  [🎧 Portafolio]  [📩 Cotizar]          │
└──────────────────────────────────────────┘
```

El panel debe tener:
- `max-height: calc(100vh - navbar-height - padding)`
- `overflow-y: auto` para scroll interno (solo el panel, no la página)
- Backdrop blur para mantener legibilidad sobre el 3D
- Color de acento diferente por servicio (composición=azul, producción=verde, clases=violeta)

### 5.3 Contenido visual para servicio detalle

Además de texto, considerar:

| Elemento | Descripción |
|---|---|
| **Icono grande** | Icono representativo del servicio (usar @tabler/icons-react que ya existe) |
| **Precio o rango** | "Desde $XXX" o "Presupuesto personalizado" |
| **Etiquetas** | "Incluye 2 revisiones", "Entrega digital", etc. |
| **Proceso visual** | Timeline simple: Brief → Composición → Revisión → Entrega |
| **Badges** | "WAV/MP3/Stems", "SSL Quality", etc. |
| **Galería embebida** | Embed de SoundCloud / Tidal / YouTube (solo uno, cuidado con rendimiento) |

### 5.4 Diferenciación visual entre servicios

Cada servicio debería tener su propia personalidad visual:

| Servicio | Color Acento | Icono Sugerido |
|---|---|---|
| Composición | `#4a90d9` (azul) | `IconMusic` |
| Producción | `#00913d` (verde) | `IconMicrophone` |
| Clases | `#9b59b6` (violeta) | `IconSchool` |

### 5.5 Back button consistente

- Botón "← Volver a Servicios" en la parte superior del panel.
- También navegable con `onClick` → reinicia posición de cámara a `/servicios`.

---

## 6. Experiencia 3D y Transiciones

### 6.1 Coordinación cámara + contenido

**Idea clave:** La transición de cámara 3D debería sincronizarse con la aparición del contenido.

Propuesta de flujo:
1. Usuario hace clic en "Composición"
2. `navigate('/servicios/composicion')`
3. La cámara 3D empieza a moverse a la nueva posición (lerp).
4. Cuando la cámara está cerca del destino (threshold), el contenido fadea.
5. Sensación de "viajar" a través del espacio 3D.

### 6.2 Posiciones de cámara por servicio

Ya existen posiciones por ruta. Mejorar:
- Que la cámara se acerque más al micrófono en detalle de servicio (sensación de examinar).
- En `/servicios` (índice), que la cámara muestre el micrófono desde un ángulo que permita ver las cards.
- En `/contacto`, que la cámara se posicione "de frente" como si el micrófono te estuviera escuchando.

### 6.3 Efecto de "cambio de ambiente"

Usar el HDRI + color de luz ambiental para reflejar la sección actual:
- Home: tono neutro actual.
- Servicios: luz más cálida (ámbar).
- Contacto: tono más frío (azul).
- Cambio suave (lerp de color + exposición).

### 6.4 Overlay de transición entre rutas

- Un overlay breve (0.3s) al cambiar de ruta para evitar el "pop" visual del contenido apareciendo de golpe.
- Implementar con CSS transition en un contenedor de página.

---

## 7. Rendimiento

### 7.1 HDRI comprimido (prioridad alta)

El HDRI de 28MB es el cuello de botella principal. Ya hay un script `compress-hdr.js`. Usarlo y ofrecer una versión 2K (~7MB).

### 7.2 Modelo GLB comprimido

Ya existe `scene_compressed.glb` pero no se usa en `Scene3D.jsx` — la ruta apunta a `scene.gltf`. Cambiar a la versión comprimida.

### 7.3 Code splitting por ruta (ya implementado)

El proyecto ya usa `lazy()` + `Suspense`. ✅ Mantener.

### 7.4 Image optimization

Las texturas del micrófono (`jpeg`, `png`) pueden optimizarse con `sharp` o `imagemin`.

### 7.5 Bundle analysis

Agregar `vite-plugin-visualizer` para auditar el bundle.

---

## 8. Accesibilidad

### 8.1 ARIA labels en botones e íconos

- Botones de CTA: `aria-label="Ir a servicios"`.
- Iconos sociales: `aria-label="Instagram de CELVAPROD"`.
- Navbar hamburger: `aria-label="Abrir menú"`, `aria-expanded`.

### 8.2 Navegación por teclado

- El Canvas de Three.js puede atrapar el foco del teclado. Asegurar que se pueda salir con `Escape`.
- `tabIndex` manejado correctamente.

### 8.3 Contraste y legibilidad

- El texto sobre el backdrop blur + escena 3D debe tener suficiente contraste.
- Añadir `text-shadow` o backdrop más opaco para legibilidad.

---

## 9. Mantenibilidad y Calidad de Código

### 9.1 Husky + lint-staged (opcional)

Agregar pre-commit hooks que corran ESLint automáticamente.

### 9.2 Pruebas

Sin tests actualmente. Propuesta mínima:
- **Vitest** + **React Testing Library** para componentes clave (Navbar, ContactForm, ServiceCard).
- Pruebas de humo para páginas.

### 9.3 ESLint más estricto

Configuración actual: `eslint.config.js` con `@eslint/js`. Agregar reglas:
- `react/prop-types` (mientras no se migre a TS)
- `react-hooks/exhaustive-deps`
- `no-console` (para producción)
- `import/order` para consistencia

### 9.4 Componente de error boundary por página

Actualmente solo el Canvas 3D tiene `ErrorBoundary`. Propuesta: `PageErrorBoundary` para cada ruta.

---

## 10. Propuesta de Roadmap

| Fase | Qué incluye | Esfuerzo |
|---|---|---|
| **Fase 1 — Quick wins** | CSS modules, variables semánticas, hook `useFadeIn`, layout compartido, arreglar ruta del `.glb` comprimido | ⭐ Bajo |
| **Fase 2 — TypeScript** | Migrar tipos, interfaces de servicio, props tipadas, `tsconfig.json` | ⭐⭐ Medio |
| **Fase 3 — Layout de servicios** | Data-driven services, panel de detalle con scroll interno, diferenciación visual por servicio, back button | ⭐⭐ Medio |
| **Fase 4 — Experiencia 3D** | Sincronización cámara + contenido, cambio de ambiente por sección, overlay de transición | ⭐⭐⭐ Medio-Alto |
| **Fase 5 — Calidad** | Pruebas, accesibilidad, optimización HDRI, análisis de bundle | ⭐⭐ Medio |

---

## Notas sobre la limitación de scroll

Este es el punto más delicado y que condiciona todo el diseño:

- **Nunca** usar `overflow-y` en el body o en `#root`.
- Cada "página" debe ser un contenedor de altura fija (`height: 100vh` o `max-height: calc(100vh - <navbar>)`).
- Si el contenido excede, **scroll interno** en el panel (`overflow-y: auto` dentro del contenedor de contenido, nunca en la página).
- Las transiciones entre páginas deben sentirse como "cambiar de vista" (slide/fade), no como scroll.
- El Navbar debe ser `position: fixed; top: 0` y restar su altura del viewport disponible.
- La escena 3D de fondo siempre está fija y visible — el contenido solo se superpone.

```
html, body, #root {
  overflow: hidden;
  height: 100%;
}

.page-content {
  position: relative;
  z-index: 1;
  height: 100vh;
  overflow: hidden;
}

.content-panel {
  max-height: calc(100vh - 80px); /* 80px = navbar height */
  overflow-y: auto;
  /* scroll interno, no de página */
}
```
