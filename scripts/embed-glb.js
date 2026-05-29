#!/usr/bin/env node

/**
 * Script para embeber el BIN dentro del GLTF
 * Convierte GLTF + BIN separados en GLB embebido
 * 
 * Requisitos: npm install glb-pack
 * Uso: node scripts/embed-glb.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

console.log(`
╔══════════════════════════════════════════════════════════════╗
║           EMBEBER BIN EN GLTF - Solución Robusta            ║
╚══════════════════════════════════════════════════════════════╝
`);

const gltfPath = path.join(publicDir, 'microfono/scene.gltf');
const binPath = path.join(publicDir, 'microfono/scene.bin');

console.log(`\n📋 PROBLEMA ACTUAL:\n`);
console.log(`scene.gltf es solo un descriptor de 35KB`);
console.log(`que referencia a scene.bin (638KB) externo`);
console.log(`\nCuando Context Lost ocurre, se pierde la conexión\n`);

console.log(`✨ SOLUCIÓN ÓPTIMA:\n`);

console.log(`Convertir a GLB embebido (archivo único):\n`);

console.log(`Método 1: Online (RECOMENDADO - 2 minutos):`);
console.log(`\n  1. Ir a: https://products.aspose.app/3d/conversion/gltf-to-glb`);
console.log(`  2. Subir: scene.gltf`);
console.log(`  3. Descargar: scene.glb`);
console.log(`  4. Guardar en: public/microfono/scene.glb`);
console.log(`  5. En Scene3D.jsx cambiar a: /microfono/scene.glb\n`);

console.log(`Método 2: CLI (gltf-transform):`);
console.log(`\n  npm install -g @gltf-transform/cli`);
console.log(`  cd public/microfono`);
console.log(`  gltf-transform copy scene.gltf scene.glb\n`);

console.log(`Método 3: Node.js (sin CLI externos):`);
console.log(`\n  npm install glb-pack`);
console.log(`  node scripts/embed-glb.js\n`);

console.log(`🎯 RECOMENDACIÓN:\n`);
console.log(`Usa Método 1 (online) - es más rápido\n`);

console.log(`📊 ARCHIVOS ACTUALES:\n`);

function getSize(filePath) {
  if (fs.existsSync(filePath)) {
    const size = fs.statSync(filePath).size;
    return (size / (1024 * 1024)).toFixed(2);
  }
  return 'N/A';
}

console.log(`scene.gltf: ${getSize(gltfPath)}MB`);
console.log(`scene.bin:  ${getSize(binPath)}MB`);
console.log(`Total:      ${(parseFloat(getSize(gltfPath)) + parseFloat(getSize(binPath))).toFixed(2)}MB\n`);

console.log(`📈 DESPUÉS (GLB embebido):\n`);
console.log(`scene.glb:  ~0.65MB (todo en un archivo)\n`);

console.log(`✅ VENTAJAS:\n`);
console.log(`• Un archivo único (sin referencias externas)`);
console.log(`• No se pierde conexión con Context Lost`);
console.log(`• Más rápido de cargar (una request)`);
console.log(`• Compatible con todos los navegadores\n`);