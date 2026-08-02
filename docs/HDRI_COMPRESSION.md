# HDRI de ambiente — Sonda adaptativa

## Estado actual (implementado)

Se arranca siempre en **2K** (o **1K** si hay ahorro de datos) y se **prueba en serio** si el
4K puede cargar rápido: una sonda con ventana de 3 segundos decide si se sube a 4K. Cero flash,
cero doble descarga, y el 4K llega solo cuando de verdad se puede — en mobile también.

Archivos en `public/enviorments/`:

| Archivo | Tamaño | Rol |
|---|---|---|
| `river_walk_1_4k.hdr` | 28.56 MB | Calidad máxima (solo si la sonda demuestra que carga en <3s) |
| `river_walk_1_2k.hdr` | 7.38 MB | Línea base (mobile y conexiones normales) |
| `river_walk_1_1k.hdr` | 1.88 MB | Ahorro de datos (`saveData`) / conexiones críticas (`slow-2g`) |

## Cómo funciona

Lógica en `src/utils/hdrFallback.ts` (funciones puras `getBaselineHDR` / `shouldProbe`) y
`src/components/scene/AdaptiveEnvironment.tsx` (sonda + Suspense):

1. **Línea base** (`getBaselineHDR()`): sin API de conexión → **2K**; `saveData` o
   `slow-2g` → **1K**; resto → **2K**. Nunca se arranca en 4K.
2. **Sonda** (`shouldProbe()` + `fetch` con `AbortController`): solo cuando `effectiveType`
   es `4g` (o no hay API, p.ej. iOS Safari). Descarga el 4K con ventana de 3s
   (`PROBE_TIMEOUT_MS`):
   - **Completó en la ventana** → `setFiles(HDR_4K)`: el 4K ya quedó en caché HTTP, la
     segunda carga es rápida, y el swap ocurre detrás del loading screen.
   - **No completó / abortado** → se mantiene el 2K. Solo se desperdicia lo que bajó en ≤3s
     (pocos MB), nunca 28 MB completos.
   - **`2g` / `3g` / `saveData`** → ni siquiera se sondea (respeto al ahorro de datos).
3. **La pantalla de carga espera al HDRI**: el loading ya no se esfuma cuando termina el
   modelo. `SceneContent` combina la señal del modelo (`SceneLoadedSignal`) con la del HDRI
   (`onEnvReady`) y solo llama a `setSceneReady()` cuando **ambos** están listos. La señal del
   HDRI está dentro del mismo `<Suspense>` que el environment, así que dispara solo cuando el
   archivo **final** (2K o el 4K de la sonda) ya está renderizado — cualquier swap queda tapado
   por el loading.

## Cuándo se carga el 4K (no es "si o sí")

El 4K **nunca se garantiza por tipo de dispositivo**: solo se usa si la sonda descarga el
archivo completo (28 MB) en ≤3s, lo que exige un throughput sostenido de ~75 Mbps+. La sonda
es el único filtro — no hay chequeo de dispositivo ni estimaciones de `downlink`.

| Caso | ¿Sondea? | ¿Resultado? |
|---|---|---|
| Desktop gigabit (Chrome reporta `4g`, 28 MB baja en <1s) | Sí | **4K** |
| Desktop/portátil con Wi-Fi medio (~40 Mbps) | Sí | 2K (sonda aborta a los 3s) |
| Desktop con conexión reportada `3g` | No | 2K |
| Mobile 5G / Wi-Fi rápido (baja 28 MB en <3s) | Sí | **4K** |
| Mobile con datos flojos | Sí | 2K (aborta) |
| Mobile `3g` reportado | No | 2K |
| iOS Safari (sin API de conexión) | Sí | 4K solo si baja en <3s; si no, 2K |
| `saveData` activado | No | 1K (ni siquiera sondea) |

Consecuencias honestas de la estrictez de la sonda:

- Un desktop con red mediocre se queda en 2K (el viejo opt-in por `downlink ≥ 10 Mbps` habría
  elegido 4K y fallado con flash + doble descarga).
- En el camino 4K, el loading screen espera a que el 4K termine de renderizarse.
- En el camino 2K con sonda corriendo, el loading espera hasta la ventana (≤3s) antes de esfumarse.

## Por qué este diseño

- El enfoque anterior elegía 4K por defecto en mobile y usaba un timer de fallback: en teléfonos
  bajaba el 4K (28 MB) y después el 2K (7 MB) → ~35 MB de datos desperdiciados por visita, y el
  4K podía alcanzar a aplicarse una fracción antes de que el 2K lo reemplazara (flash visible).
- Se intentó el **opt-in por `downlink`**, pero la API de conexión da una estimación optimista y
  poco fiable: iba a volver a elegir 4K en teléfonos que no lo bajan a tiempo.
- La **sonda mide la realidad** (descarga con timeout) en vez de confiar en estimaciones:
  si el 4K completa en ≤3s se usa; si no, se aborta. Sin carreras, sin flash, sin estimaciones.

## Cómo probar

1. `pnpm run dev` → el sitio carga el 2K; con red normal la sonda aborta y se queda en 2K.
2. DevTools → **Network** → confirmar `river_walk_1_2k.hdr`.
3. **Throttling** (Network → No throttling → "Slow 3G") → recargar: Chrome reporta `effectiveType`
   `3g` → la línea base es **2K** y la sonda se omite → pide `river_walk_1_2k.hdr`.
   - Activar **"Save data"** en Chrome DevTools → pide `river_walk_1_1k.hdr`.
4. **Sonda exitosa** (4K): Chrome DevTools → **Network conditions** → connection type `4g`,
   sin throttling y con `emulation.setNetworkConditions` sin límite de velocidad → debe pedir
   también `river_walk_1_4k.hdr` (la sonda) y el loading espera al 4K.
5. El loading ahora tarda hasta ~3s extra como máximo (ventana de sonda) antes de esfumarse.

## Ajuste fino

- `PROBE_TIMEOUT_MS` (default 3000): ventana de la sonda. Subirlo = más chances de 4K pero más
  espera/datos; bajarlo = menos 4K y menos espera.
- `getBaselineHDR()` / `shouldProbe()` en `src/utils/hdrFallback.ts`: dónde entrar 1K vs 2K y
  cuándo sondear (testeables con Vitest, ver `docs/TESTING_PLAN.md`).

## Alternativa pendiente (no aplicada)

Si en el futuro se quisiera solo calidad 2K fija, basta con forzar `HDR_2K` en `getBaselineHDR()`.
