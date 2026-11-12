# Fotos del Hotel Bermudas

Se retocaron con el editor integrado de OpenAI `image_gen` las 17 fotos únicas (18 nombres de archivo) usadas en la web, el 11/11/2026. La herramienta selecciona el modelo internamente y no expone un identificador verificable; no se atribuye la edición a un modelo concreto.

- `hotel-originals/` conserva los originales y sus versiones responsivas, con hashes en `inventory.json`.
- `hotel-retouched/` conserva los PNG maestros elegidos; las versiones comprimidas que usa el sitio están en `public/images/`, manteniendo sus URLs.
- `hotel-originals/ai-retouch-manifest.json` registra el prompt exacto de cada edición elegida, sus fuentes y referencias.
- `hotel-references/` conserva la foto nocturna actual aportada por el responsable para actualizar el frente.

Las instrucciones autorizan limpieza fotográfica y de detalles cosméticos, iluminación natural de día, apertura de cortinas existentes, persianas levantadas y luminarias existentes alineadas/encendidas con luz cálida. Se descartaron variantes que agregaban cortinas o luminarias. En la fachada, los cerramientos, plantas y palmeras toman la foto nocturna como referencia; el cartel inoxidable y el piso superior terminado siguen las correcciones expresas del responsable. Las vistas originalmente ocultas se resuelven con luz difusa; no se agregan vistas turísticas ni servicios.

`node scripts/apply-hotel-photo-edits.mjs` integra las ediciones aprobadas y regenera sus WebP y tamaños responsivos. Su entrada de trabajo está registrada en el manifiesto; para repetirlo en otro equipo, colocar las ediciones elegidas en las rutas `draft` indicadas o actualizar esas rutas a los PNG maestros conservados. El script verifica los hashes de los originales antes de sustituir archivos públicos.

`node scripts/review-hotel-photos.mjs` comprueba los originales conservados, decodifica las imágenes publicadas y revisa las páginas afectadas a 360, 768 y 1440 px. Las comparaciones antes/después quedan en `outputs/image-enhancement/comparisons/` (original a la izquierda), y el informe en `outputs/image-enhancement/verification.json`.

El recorte cartográfico de la portada se genera con `node scripts/prepare-location-card.mjs` a partir del mapa geográfico local y conserva la atribución de OpenStreetMap; es una captura gráfica del mapa, independiente de los retoques de fotos.
