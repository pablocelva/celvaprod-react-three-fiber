# Compresión del HDRI de ambiente

## Estado actual

- Archivo: `public/enviorments/river_walk_1_4k.hdr`
- Tamaño: **28.6 MB** (formato RADIANCE, 4K)
- Se carga desde `src/components/scene/SceneContent.tsx`:

```tsx
<Environment files="/enviorments/river_walk_1_4k.hdr" background />
```

## Objetivo

Reducir a ~7 MB (versión 2K) manteniendo calidad visual (~75% de reducción).

## Opciones

### 1. Descargar versión 2K desde Poly Haven (recomendada)

1. Ir a: <https://polyhaven.com/a/river_walk_1>
2. Descargar formato **HDRI**, resolución **2K**
3. Guardar como `public/enviorments/river_walk_1_2k.hdr`
4. Actualizar la ruta en `SceneContent.tsx`:

```tsx
<Environment files="/enviorments/river_walk_1_2k.hdr" background />
```

### 2. Herramienta online

- <https://www.imgonline.com.ua/eng/compress-image-on-server.php>
- Subir `river_walk_1_4k.hdr`, calidad 60-70%.

### 3. gltf-transform CLI

```bash
npm install -g @gltf-transform/cli
gltf-transform compress river_walk_1_4k.hdr output.hdr
```

### 4. Python + Pillow

```bash
pip install Pillow
python3 scripts/hdr-resize.py
```

## Impacto esperado

| Estrategia | Actual | Futuro | Reducción |
|---|---|---|---|
| Versión 2K descargada | 28.56 MB | 7 MB | 75% |
| Compresión online 60% | 28.56 MB | 11 MB | 61% |
| gltf-transform compress | 28.56 MB | 8 MB | 72% |
| Python downsampling | 28.56 MB | 12 MB | 58% |
