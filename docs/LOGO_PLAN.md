# Plan del Logo CELVAPROD

> Documento de referencia para crear el logo de marca y conectarlo al sitio.
> Fecha de creación: 2026-08-01 · Estado: pendiente (no hay logo aún)

## Objetivo

Contar con un logo de marca (SVG + PNG) para usarlo en: favicon, Apple touch icon, JSON-LD
(`Organization.logo`) y, opcionalmente, reemplazar el `og-preview.png` actual.

## Paleta de marca (tokens existentes en `src/App.css`)

| Token | Valor |
|---|---|
| `--color-primary` | `rgba(100, 51, 110, 0.8)` (#64336E) |
| `--color-accent` | `#f5cc0e` (amarillo) |
| `--color-green` | `#00913d` |
| `--color-dark` | `#121212` |
| `--color-light` | `#f1f1f1` |

## Especificaciones por uso

| Uso | Formato | Medida | Dónde se conecta |
|---|---|---|---|
| **Fuente de verdad** (web, favicon) | SVG vectorial, fondo transparente | scalable | `public/logo.svg` |
| **Logo para JSON-LD** | PNG con fondo transparente | **512×512 mínimo**, 1024×1024 recomendado | `Organization.logo` en `index.html` |
| **Apple touch icon** | PNG | 180×180 | `public/apple-touch-icon.png` + `<link rel="apple-touch-icon">` |
| **Social / preview** | PNG | 1200×630 | `public/og-preview.png` (hoy es screenshot del sitio) |
| Favicon actual | SVG inline (emoji 🌿) | — | `index.html` `<link rel="icon">` |

## Reglas de Google para `Organization.logo`

- Imagen de al menos ~112px (recomendado: 512×512 o 1024×1024, fondo transparente).
- SVG es aceptado, pero **PNG es el formato más compatible** → priorizar el PNG 1024.
- Debe representar claramente la marca (texto legible si el logo incluye tipografía).

## Plan de implementación (cuando el logo exista)

1. Exportar SVG maestro (`public/logo.svg`) y PNG transparente 1024×1024.
2. Reemplazar el favicon emoji 🌿 en `index.html` por el SVG real.
3. Agregar `public/apple-touch-icon.png` (180×180) y su `<link rel="apple-touch-icon">`.
4. Agregar `Organization.logo` al JSON-LD (solo cuando exista el PNG 1024).
5. Opcional: reemplazar `og-preview.png` (screenshot) por versión con logo + texto.
6. Validar en la Rich Results Test de Google (https://search.google.com/test/rich-results).

## Nota de branding

Algunos perfiles oficiales usan la marca **celvanegra** (Instagram, SoundCloud, itch.io)
y otros **CELVAPROD** (YouTube, Tidal). Google cruza `sameAs` con la entidad del sitio;
mantener consistencia de naming entre perfiles facilita el match. No es bloqueante,
pero conviene decidir el naming oficial antes de difundir el logo.

## Definición de hecho (Definition of Done)

- [ ] SVG maestro + PNG 1024×1024 transparente
- [ ] Favicon SVG real (sin emoji)
- [ ] `apple-touch-icon.png` (180×180) enlazado
- [ ] `Organization.logo` en JSON-LD
- [ ] Rich Results Test sin errores de logo
