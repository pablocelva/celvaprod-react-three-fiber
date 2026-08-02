# HDRI de ambiente — Fallback adaptativo

## Estado actual (implementado)

Se usa **4K como principal** con **fallback automático** según la conexión y la velocidad de carga.
Ya no hace falta elegir un solo archivo a mano: el componente decide solo.

Archivos en `public/enviorments/`:

| Archivo | Tamaño | Rol |
|---|---|---|
| `river_walk_1_4k.hdr` | 28.56 MB | Calidad máxima (por defecto) |
| `river_walk_1_2k.hdr` | 7.38 MB | Fallback cuando el 4K tarda mucho |
| `river_walk_1_1k.hdr` | 1.88 MB | Conexiones críticas (2G / ahorro de datos) |

## Cómo funciona

Lógica en `src/components/scene/AdaptiveEnvironment.tsx`:

1. **Conexión lenta detectada al inicio** (`navigator.connection`, navegadores Chromium):
   - `saveData` o `effectiveType === 'slow-2g'` → **1K** directo (nunca descarga el 4K)
   - `effectiveType === '2g'` → **2K** directo
   - Sin soporte o conexión normal → **4K**
2. **Timer de 4 segundos** (`HDR_TIMEOUT_MS`): si el 4K no terminó de cargar en 4s, se cambia a **2K**.
   Si el 4K cargó a tiempo, se mantiene.
3. El cambio de archivo dispara una recarga del environment vía `useEnvironment` de drei
   (la pantalla de carga ya se ocultó, no se vuelve a mostrar).

## Por qué no es un simple cambio de ruta

El `<Environment files="..." />` de drei era declarativo y fijo. Ahora `AdaptiveEnvironment`
usa el hook `useEnvironment({ files })` directamente (que suspende hasta cargar) y re-renderiza
`<Environment map={...} />` cuando el archivo cambia, con un callback `onReady` para saber si
el 4K alcanzó a cargar antes del timeout.

## Cómo probar

1. `pnpm run dev` → el sitio carga el 4K y se ve nítido.
2. DevTools → **Network** → confirmar que se descarga `river_walk_1_4k.hdr`.
3. **Throttling** (Network → No throttling → "Slow 3G" / "Fast 3G") → recargar:
   - En "Slow 3G" la página debería pedir `river_walk_1_1k.hdr` (conexión detectada).
   - En una conexión normal pero limitada, el 4K debería fallback a 2K a los 4s.
4. Chrome DevTools → **Settings → Throttling → "Save data"** activado → debe pedir 1K.

## Ajuste fino

- `HDR_TIMEOUT_MS` (default 4000): cuánto esperar al 4K antes de bajar a 2K.
- Umbrales de `effectiveType` en `getInitialHDR()`: dónde entrar 1K vs 2K.

## Alternativa pendiente (no aplicada)

Si en el futuro se quisiera solo calidad 2K fija, basta con forzar `HDR_2K` como valor inicial.
