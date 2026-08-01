# Plan de Mejoras — CELVAPROD Landing 3D

> ⚠️ **Limitación clave del proyecto:** Landing 3D con environment 360°.
> **No debe haber scroll vertical de página.** Todo el contenido debe manejarse dentro de componentes sin romper la experiencia inmersiva.
> Las transiciones entre secciones deben ocurrir *sin que el usuario sienta que "salió" del entorno 3D*.

---

## Pilares principales

### Pilar 1 — CSS moderno y ordenado

**Objetivo:** Reemplazar el CSS global monolítico (`App.css` de ~800+ líneas) por un sistema modular, mantenible y semántico.

| Sub-tarea | Descripción | Prioridad |
|---|---|---|
| **1.1 CSS Modules** | Migrar a `.module.css` por componente. Cada componente tiene su propio archivo de estilos. `App.css` queda solo para estilos globales mínimos (reset, variables). | Alta |
| **1.2 Variables CSS semánticas** | Renombrar variables actuales (`--color-primario`, `--color-cuarto`) a nombres claros (`--color-primary`, `--color-accent`, `--color-bg-overlay`). Agregar tokens de espaciado, z-index, breakpoints, tipografía. | Alta |
| **1.3 Selectores de clase en lugar de etiqueta** | Reemplazar `nav { ... }`, `ul { ... }`, `button { ... }` por clases específicas (`.navbar`, `.nav-list`, `.btn`). Evita side effects y mejora legibilidad. | Alta |
| **1.4 Hook `useFadeIn`** | Extraer la lógica repetida de `useState + useEffect + setTimeout(50ms)` a un hook reutilizable. | Media |
| **1.5 Animaciones centralizadas** | Mover `@keyframes` y transiciones reutilizables a un archivo `animations.css` o a snippets compartidos. | Baja |
| **1.6 Sistema de diseño mínimo** | Definir tokens de espaciado, breakpoints y z-index como variables CSS. | Media |

### Pilar 2 — TypeScript (tipado fuerte)

**Objetivo:** Migración progresiva de JS a TS para tener contratos claros entre componentes, datos y escena 3D.

| Sub-tarea | Descripción | Prioridad |
|---|---|---|
| **2.1 Configuración inicial** | Agregar `tsconfig.json` con modo estricto. Configurar Vite para que acepte `.tsx` y `.jsx` en simultáneo (migración progresiva). | Alta |
| **2.2 Tipos de dominio** | Crear `src/types/` con interfaces para: servicios (`Service`, `ServiceFeature`), navegación (`RouteName`, `CameraPosition`), escena (`SceneConfig`), formulario (`ContactFormData`). | Alta |
| **2.3 Props tipadas** | Tipar los props de todos los componentes: `Navbar`, `ServiceDetail`, `ContactForm`, `IconLogos`, `Scene3D`, etc. | Alta |
| **2.4 Migración de datos** | Convertir `src/data/services.js` a `.ts` con tipado estricto. | Media |
| **2.5 Migración de componentes** | Renombrar archivos a `.tsx` progresivamente, resolviendo errores de tipo. | Media |
| **2.6 Tipado de la escena 3D** | Definir tipos para `CameraTarget`, `TargetPositions`, `LightConfig`, `ModelConfig`. | Baja |

### Pilar 3 — Arquitectura clara

**Objetivo:** Eliminar duplicación, separar responsabilidades y establecer un layout predecible.

| Sub-tarea | Descripción | Prioridad |
|---|---|---|
| **3.1 Layout compartido con `<Outlet />`** | Crear `PageLayout.jsx` que contenga Navbar + animación de entrada + contenedor. Las páginas solo renderizan su contenido específico. Elimina el `useEffect` repetido en cada página. | Alta |
| **3.2 Layout compartido para el contenido** | Los contenedores de página (`.form-container`, `.form-container--card`, etc.) se unifican en un solo componente `ContentPanel` parametrizable. | Alta |
| **3.3 Separación de Scene3D** | Dividir `Scene3D.jsx` (~167 líneas) en: `Scene3D` (Canvas base), `SceneContent` (luces + modelo + environment), `CameraController` (lógica de cámara por ruta). | Media |
| **3.4 Estado de carga global** | Unificar `LoadingScreen` y el estado de carga en un solo lugar (Context o Zustand). | Media |
| **3.5 Error boundaries por página** | Agregar `PageErrorBoundary` para cada ruta. | Baja |

---

## Optimizaciones adicionales

### Rendimiento

| Tarea | Descripción | Prioridad |
|---|---|---|
| HDRI comprimido | Usar `compress-hdr.js` para reducir el HDRI de 28MB a ~7MB (2K). | Alta |
| Modelo GLB comprimido | Cambiar ruta en `Scene3D.jsx` de `scene.gltf` a `scene_compressed.glb` (ya existe). | Alta |
| Bundle analysis | Agregar `vite-plugin-visualizer` para auditar el bundle. | Baja |

### Experiencia 3D

| Tarea | Descripción | Prioridad |
|---|---|---|
| Sincronización cámara + contenido | La cámara 3D se mueve a su posición y cuando está cerca del destino, el contenido aparece. | Media |
| Cambio de ambiente por sección | Color de luz ambiental y tono HDRI varían según la ruta (lerp suave). | Baja |
| Overlay de transición | Overlay breve (0.3s) al cambiar de ruta para evitar el "pop" visual. | Baja |

### Calidad de código

| Tarea | Descripción | Prioridad |
|---|---|---|
| ESLint stricter | Agregar reglas: `react/prop-types`, `react-hooks/exhaustive-deps`, `import/order`. | Media |
| Husky + lint-staged | Pre-commit hooks que corren ESLint automáticamente. | Baja |
| Pruebas mínimas | Vitest + React Testing Library para componentes clave (Navbar, ContactForm, ServiceDetail). | Baja |

### Accesibilidad

| Tarea | Descripción | Prioridad |
|---|---|---|
| ARIA labels | Agregar `aria-label` a botones CTA, iconos sociales, hamburger menu. | Media |
| Navegación por teclado | Asegurar que el Canvas 3D no atrape el foco, `tabIndex` correcto. | Baja |
| Contraste | Text-shadow o backdrop más opaco para legibilidad sobre la escena 3D. | Baja |

---

## Resumen de prioridades

| Prioridad | Tareas |
|---|---|
| **Ahora** | CSS Modules + variables semánticas, TypeScript config + tipos de dominio, Layout compartido |
| **Siguiente** | Selectores de clase, hook useFadeIn, props tipadas, migración de datos a TS, separación Scene3D |
| **Después** | Animaciones centralizadas, estado de carga global, error boundaries, HDRI/GLB comprimido, ESLint, ARIA labels |
| **Nice to have** | Sincronización cámara+contenido, pruebas, husky, bundle analysis, cambio de ambiente 3D |

---

## Notas sobre la limitación de scroll

- **Nunca** usar `overflow-y` en el body o en `#root`.
- Cada "página" debe ser un contenedor de altura fija (`height: 100vh` o `max-height: calc(100vh - <navbar>)`).
- Si el contenido excede, **scroll interno** en el panel (`overflow-y: auto` dentro del contenedor de contenido, nunca en la página).
- Las transiciones entre páginas deben sentirse como "cambiar de vista" (slide/fade), no como scroll.
- El Navbar debe ser `position: fixed; top: 0` y restar su altura del viewport disponible.
- La escena 3D de fondo siempre está fija y visible — el contenido solo se superpone.
