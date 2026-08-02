# Modelo 3D comprimido (GLB con KTX2)

## Estado actual

El proyecto usa el modelo sin comprimir:

- `public/microfono/scene.gltf` (36 KB) + `scene.bin` (638 KB) + texturas jpeg/png (~7 MB en total)
- Carga con `useGLTF('/microfono/scene.gltf')` en `src/components/scene/MicrofonoModel.tsx`

Existe `public/microfono/scene_compressed.glb` (1.45 MB, autocontenido). **Al probarlo falla.**

## Error real del navegador (2026-08-01)

```
Uncaught Error: Could not load /microfono/scene_compressed.glb:
THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures
```

Consecuencias al probarlo: el error rompe el `<CanvasImpl>` (lo captura el `ErrorBoundary` de la escena) y además se pierde el contexto WebGL.

## Análisis técnico confirmado

El `scene_compressed.glb` declara estas extensiones (verificadas en el binario):

| Extensión | Requerida | Estado en `useGLTF` de drei |
|---|---|---|
| `KHR_mesh_quantization` | Sí | Soportada por three.js core ✅ |
| `KHR_texture_basisu` (KTX2/Basis) | Sí | **NO registrada** ❌ |
| `EXT_meshopt_compression` | Sí | drei la carga ✅ |
| `KHR_draco_mesh_compression` | No presente | — |

**Causa raíz:** drei registra Draco y Meshopt en `useGLTF`, pero **no llama a `setKTX2Loader`**. Cuando una extensión está en `extensionsRequired` y no hay loader registrado, GLTFLoader lanza el error de arriba.

## Propuestas (con argumentos)

### Propuesta A — Volver a `scene.gltf` (cero riesgo)
- **A favor**: funciona perfecto, nada que tocar, cero chance de romper la escena (el activo principal del sitio).
- **En contra**: el modelo pesa ~7MB vs 1.45MB del comprimido (~78% más). El gran bottleneck ya se resolvió con el HDRI adaptativo; el modelo suma ~5MB al "first load".
- **Cuándo**: si el sitio ya carga bien y se prioriza estabilidad sobre optimización.

### Propuesta B — Registrar `KTX2Loader` + meshopt (solución definitiva)
- **Cómo**:
  1. Copiar `basis_transcoder.js` + `basis_transcoder.wasm` desde `node_modules/three/examples/jsm/libs/basis/` → `public/basis/`.
  2. Crear un loader propio con `GLTFLoader` + `KTX2Loader` (`setTranscoderPath('/basis/')`) + `MeshoptDecoder`, registrando las extensiones.
  3. Cargar `scene_compressed.glb` con **fallback** a `scene.gltf` si falla.
- **A favor**: 78% menos peso (7MB → 1.45MB), un solo request, autocontenido. Es el camino oficial de three.js.
- **En contra**: ~30-60 min de implementación + testing. Riesgo medio: verificar que el `.wasm` se sirva bien desde Netlify (Content-Type, tamaño) y que las texturas KTX2/Basis se vean igual de bien (Basis puede variar levemente el look). Requiere commitear el transcoder a `public/`.

### Propuesta C — GLB optimizado SIN KTX2 (recomendada)
- **Cómo**: convertir `scene.gltf` a un GLB con `meshopt` + `quantization` pero texturas **jpg/png embebidas** (sin KTX2). Herramienta: `@gltf-transform/cli` (o conversor online).
- **A favor**: carga con el **`useGLTF` actual** — un simple cambio de ruta, sin loader custom ni transcoder. Riesgo bajo.
- **En contra**: peso intermedio (~2.5-4MB estimado): texturas jpg pesan más que KTX2, pero bin + malla se comprimen con meshopt/quantization. Validar visualmente (re-codificar texturas puede variar el color).
- **Cuándo**: mejor relación riesgo/beneficio.

### Propuesta D — Optimizar el `scene.gltf` sin cambiar formato
- **Cómo**: comprimir las texturas más pesadas (JPEG, calidad/resolución 1K-2K).
- **A favor**: simple, sin tocar loaders ni estructura.
- **En contra**: ahorro parcial (las texturas suelen ser el grueso; el bin 638KB queda igual).

## Recomendación

1. **Propuesta C** para obtener la mayor parte del ahorro con el cambio más simple y seguro.
2. Si se quiere exprimir hasta el 1.45MB → **Propuesta B** (loader KTX2 completo) con fallback.

## Archivos de referencia

- `src/components/scene/MicrofonoModel.tsx` — carga del modelo (`useGLTF`)
- `src/components/scene/SceneContent.tsx` — preload del modelo (`useGLTF.preload`)
- `public/microfono/` — `scene.gltf` (funcional), `scene.bin`, texturas, `scene_compressed.glb` (1.45MB, requiere KTX2)
