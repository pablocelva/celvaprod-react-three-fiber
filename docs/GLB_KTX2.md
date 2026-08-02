# Modelo 3D comprimido (GLB con KTX2)

## Estado actual

El proyecto usa el modelo sin comprimir:

- `public/microfono/scene.gltf` (36 KB) + `scene.bin` (638 KB) + texturas jpeg/png (~7 MB en total)
- Se carga con `useGLTF('/microfono/scene.gltf')` en `src/components/scene/MicrofonoModel.tsx`

También existe `public/microfono/scene_compressed.glb` (1.45 MB, autocontenido) que **no se usa**.

## Por qué no se usa el GLB comprimido

`scene_compressed.glb` exige estas extensiones:

- `KHR_mesh_quantization` (obligatoria)
- `EXT_meshopt_compression` (obligatoria)
- `KHR_texture_basisu` (obligatoria — texturas KTX2/Basis)

El `useGLTF` de drei configura **DRACO y Meshopt**, pero **no KTX2**. Sin un `KTX2Loader` registrado, las texturas KTX2 no se decodifican y el modelo aparece sin texturas (históricamente se abandonó por este problema).

## Decisión actual

Seguir con `scene.gltf` (funciona correctamente). El cambio a comprimido se evaluará cuando haya verificación visual en navegador.

## Cómo habilitar el GLB comprimido en el futuro

### Opción A — Transcoder local + fallback (recomendada)

1. Copiar `basis_transcoder.js` y `basis_transcoder.wasm` desde `node_modules/three/examples/jsm/libs/basis/` a `public/basis/`.
2. Crear un loader propio:

```ts
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

const loader = new GLTFLoader()
loader.setMeshoptDecoder(MeshoptDecoder)
const ktx2 = new KTX2Loader()
ktx2.setTranscoderPath('/basis/')
ktx2.detectSupport(renderer) // renderer de R3F: useThree((s) => s.gl)
loader.setKTX2Loader(ktx2)
```

3. Cargar `scene_compressed.glb` con **fallback** a `scene.gltf` si falla, para no romper la escena.

### Opción B — Convertir el GLB a formato sin KTX2

Convertir `scene_compressed.glb` a un GLB con texturas jpeg/png embebidas:

```bash
npm install -g @gltf-transform/cli
gltf-transform copy scene_compressed.glb scene_fixed.glb
```

O usar: <https://products.aspose.app/3d/conversion/glb-to-gltf>

## Archivos de referencia

- `src/components/scene/MicrofonoModel.tsx` — carga del modelo
- `src/components/scene/SceneContent.tsx` — preload del modelo
- `public/microfono/` — assets del modelo
