# Plan de Tests — CELVAPROD Landing 3D

> Estrategia de testing para una landing 3D inmersiva (R3F + React Router SPA, sin scroll).
> Fecha: 2026-08-01 · Estado: plan (sin implementar)

## Filosofía

Testear lo que tiene **riesgo real de romperse** y **valor de regresión**, no buscar cobertura total.
Este proyecto es una landing: la mayoría del "rendimiento" es visual/3D y eso **se valida manualmente**.
Los tests deben ser rápidos, deterministas y sin depender de red ni WebGL.

## Respuesta directa a las preguntas

| Herramienta | ¿Conviene? | Veredicto |
|---|---|---|
| **Unit tests** (Vitest) | Sí, para lógica pura | Alta prioridad |
| **Component tests** (React Testing Library) | Sí, para UI no-3D | Media-alta prioridad |
| **Integration** (routing + boundaries) | Sí, ligera | Media prioridad |
| **E2E** (Playwright) | Opcional, smoke test | Baja prioridad (post-MVP) |
| **Cypress** | No | **Sobreingeniería** acá: Playwright es más simple, TS nativo y más rápido; Cypress no aporta nada extra para un smoke |
| **Snapshots visuales / WebGL** | No | **Sobreingeniería**: flaky, pesado, y el look 3D es subjetivo → validación manual |

## Qué es sobreingeniería en este proyecto (y por qué NO hacerlo)

1. **Testear el Canvas 3D / WebGL** (Scene3D, SceneContent, MicrofonoModel render): jsdom no tiene WebGL y mockear three/drei es frágil y de bajo valor. → El 3D se valida manualmente en navegador (como venimos haciendo).
2. **Snapshots visuales / de imagen**: el 3D y los gradientes dependen de GPU/fuentes/tonemapping → flaky. La escena es el activo principal; su "correctitud" es visual.
3. **Cobertura 100%**: rendimiento decreciente. Apuntamos a cubrir la lógica de decisión y los flujos críticos de UI.
4. **Mockear three/R3F a fondo**: alto costo de mantenimiento, poco valor.
5. **E2E complejos** (login, multi-page): no aplica, es una landing de 6 rutas públicas.

## Stack recomendado

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- **Vitest** — nativo de Vite (misma config), sin bundler aparte, TS out-of-the-box.
- **@testing-library/react + jest-dom + user-event** — testing centrado en comportamiento de usuario, no en implementación.
- **jsdom** — DOM de prueba (sin WebGL: por eso los tests de 3D se excluyen).
- **Playwright** (solo si más adelante se quiere e2e) — smoke: carga, sin errores de consola, navegación, loading visible → fade.

### Configuración (cuando se implemente)

1. Agregar al `vite.config.ts` (cambiar a `defineConfig` de `vitest/config`):

```ts
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: './src/test/setup.ts',
}
```

2. `src/test/setup.ts` → `import '@testing-library/jest-dom'` (y mocks globales si hacen falta).
3. `package.json` → `"test": "vitest run"`, `"test:watch": "vitest"`.
4. Tests **colocated**: `src/**/*.test.ts(x)` junto al módulo.

## Estrategia por capas

### 1. Unit tests — lógica pura (prioridad alta)

Extraer la lógica de decisión a funciones puras y testearlas sin renderizar nada:

| Módulo | Qué testear | Archivo |
|---|---|---|
| **HDRI adaptativo** | ✅ Ya extraído a `src/utils/hdrFallback.ts`. Testear `getBaselineHDR()` (saveData/slow-2g → 1K; resto → 2K) y `shouldProbe()` (sin API → true; `4g` → true; `2g`/`3g`/`saveData` → false) mockeando `navigator.connection`. La sonda (fetch + `AbortController` + timeout) se testea con `vi.useFakeTimers` y mock de `global.fetch`. | `src/utils/hdrFallback.ts` |
| **Datos de servicios** | Integridad: 3 servicios, cada uno con `link` válido, `color`, `title` no vacío. | `src/data/services.ts` |
| **sceneTargets** | Que cada ruta (`/`, `/servicios`, `/servicios/composicion`, …) tenga targets desktop y mobile definidos. | `src/data/sceneTargets.ts` |
| **Rutas** | Que las 6 rutas de `App.tsx` existan y no haya duplicados. | `src/App.tsx` |

> Refactor necesario previo: hecho. La decisión vive en `src/utils/hdrFallback.ts` (funciones puras) y `AdaptiveEnvironment.tsx` solo orquesta la sonda + Suspense.

### 2. Component tests — UI no-3D (prioridad media-alta)

| Componente | Qué testear |
|---|---|
| **Navbar** | En móvil: el hamburguesa abre/cierra el overlay; click en un link lo cierra; click en el logo (`/`) también lo cierra. (Usar `MemoryRouter` + ancho móvil via `window.innerWidth` o clase). |
| **LoadingScreen** | Renderiza wordmark + barras; con `fading` aplica la clase de fade; respeta `prefers-reduced-motion` (mock de `matchMedia`). |
| **Servicios** | Renderiza 3 cards con título, descripción y link a `/servicios/<x>`. |
| **ContactForm** | Campos `required` presentes (nombre, email, motivo, mensaje); submit del form sin validación JS rota. (No mockear Formspree: es un form nativo POST; jsdom no navega). |

> **Regla**: no renderizar componentes que importen three/R3F en jsdom. Los tests de escena se saltan (o se mockea el módulo 3D en casos puntuales de integración).

### 3. Integration — routing + boundaries (prioridad media)

| Qué testear |
|---|
| Render de cada ruta con `MemoryRouter` → la página correspondiente aparece (Home, Servicios, Contacto). |
| `PageErrorBoundary`: si un hijo lanza error, muestra el fallback y no crashea toda la app. |

### 4. E2E — smoke (baja prioridad, post-MVP)

Solo si el flujo lo pide, con **Playwright**:
- El sitio carga sin errores de consola (capturar `pageerror`/`console.error`).
- Navegación completa por navbar (home → servicios → contacto) sin 404.
- El loading screen aparece al recargar y se esfuma (esperar que `#root` tenga contenido).

## Buenas prácticas

- **Sin red**: nunca hacer fetch real en tests (mockear si aparece).
- **MemoryRouter** para todo lo que use `Link`/`useLocation`.
- **Fake timers** para el timeout del HDRI y el fade-out del loading (700ms).
- **matchMedia** mockeado para `prefers-reduced-motion`.
- **No WebGL en jsdom**: los archivos que renderizan Canvas se excluyen de la cobertura.
- Tests **colocated** (`*.test.tsx` junto al código) para mantenerlos visibles.

## Definición de "suficiente"

- 100% de la lógica de `hdrFallback` (la decisión adaptativa más riesgosa).
- Navbar completo (apertura/cierre/logo).
- Datos de servicios + rutas íntegros (protege contra typos que rompen navegación).
- LoadingScreen + fade.
- Smoke E2E opcional.

## Prioridades

| Prioridad | Tareas | Estado |
|---|---|---|
| **P1** | Unit tests de `hdrFallback` (`getBaselineHDR`/`shouldProbe` + sonda) y tests de datos/rutas | ⬜ Pendiente |
| **P2** | Navbar, LoadingScreen, Servicios, ContactForm (RTL) | ⬜ Pendiente |
| **P3** | Routing + PageErrorBoundary | ⬜ Pendiente |
| **P4** | Playwright smoke (opcional) | ⬜ Pendiente |

## Archivos de referencia

- `src/utils/hdrFallback.ts` — lógica HDR ya extraída (listo para testear)
- `src/components/scene/AdaptiveEnvironment.tsx` — sonda (fetch + timeout) a testear
- `src/components/Navbar/Navbar.tsx` — menú mobile (justo arreglado)
- `src/data/services.ts`, `src/data/sceneTargets.ts` — datos
- `src/App.tsx` — rutas + fade-out del loading
- `src/components/LoadingScreen/LoadingScreen.tsx` — loading + reduced-motion
