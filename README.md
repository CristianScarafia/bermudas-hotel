# Hotel Bermudas

Sitio web institucional moderno para Hotel Bermudas, ubicado en el barrio La Perla de Mar del Plata.

## Alcance

- Inicio orientado a conversión y reservas por WhatsApp.
- Habitaciones, servicios, ubicación y contacto.
- Fotografías reales optimizadas en WebP.
- Diseño responsive, accesible y con movimiento progresivo.
- SEO local, Open Graph, sitemap, robots.txt y datos estructurados `Hotel`.
- Arquitectura preparada para integrar un motor de reservas.

## Desarrollo

### Vista previa local con Docker

```bash
docker compose up -d --build
```

Abrí `http://localhost:5173`. El código está montado en el contenedor y los cambios se actualizan con Vite. El puerto se publica sólo en la interfaz local. No requiere base de datos: las consultas preparan un mensaje que el visitante revisa y abre en WhatsApp.

```bash
docker compose logs -f web
docker compose stop
```

Las dependencias Linux se guardan en un volumen separado de `node_modules` de Windows. Después de modificar el lockfile, ejecutar `docker compose exec web npm ci`. La vista local usa `HOTEL_LOCAL_PREVIEW=true` para añadir `noindex` y desactivar Analytics; esa variable debe quedar fuera de producción.

El contenedor local usa `Dockerfile.dev`. Ese nombre evita que Railway detecte por accidente el servidor de desarrollo como imagen de producción; el despliegue conserva los comandos de `railway.json` y Node.js 22 indicado en `.nvmrc`.

### Sin Docker

```bash
npm install
npm run dev
```

## Validación

```bash
npm run lint
npm run build
```

En el contenedor:

```bash
docker compose exec web npm run lint
docker compose exec web npx tsc --noEmit
docker compose exec web npm run build
docker compose exec web node --test tests/rendered-html.test.mjs
docker compose exec web node --experimental-strip-types --test tests/inquiry.test.mjs
docker compose exec web npx playwright install --with-deps chromium
docker compose exec web npx playwright test
```

Las capturas y trazas quedan en `outputs/` (ignorado por Git y por el observador de Vite). `node scripts/prepare-images.mjs` genera variantes WebP faltantes y el manifiesto que utiliza `ResponsiveImage`; ejecutar dentro del contenedor si el entorno anfitrión no tiene las dependencias instaladas.

El manifiesto también versiona las URLs de imagen según su contenido para renovar la caché después de los retoques. La galería recupera la foto completa si una variante falla; las miniaturas se distribuyen dentro del espacio disponible. Los archivos de fotografía se sustituyen mediante escritura temporal y renombrado, para evitar servir archivos a medio escribir en la vista local.

El nuevo recorrido incluye consultas individuales y grupales, galerías explícitas con teclado, explorador de categorías y un mapa local con perspectiva. Las páginas para agencias, eventos y viajes educativos enlazan a una ficha comercial imprimible. Disponibilidad, distribución grupal, servicios adicionales y acuerdos comerciales se confirman con el hotel.

Las 17 fotos únicas del hotel usadas en el sitio tienen retoques de IA revisados, con originales conservados, registro de prompts y PNG maestros. La fachada combina la foto diurna con la referencia nocturna actual y las correcciones del responsable sobre cartel inoxidable y piso superior. La portada presenta el frente grande y un recorte del mapa pequeño. El proceso y las rutas de respaldo están en [source-images/README.md](source-images/README.md). Los artefactos originales/de edición no se sirven desde `public/`.

El mapa usa calles, plazas y costa de OpenStreetMap, con geometrías peatonales de FOSSGIS/OSRM guardadas localmente; no consulta APIs al navegar. `public/maps/neighborhood-source.json` conserva el extracto local proyectado, procedencia, geometrías de recorridos y licencia ODbL. `node scripts/prepare-neighborhood-map.mjs` regenera el SVG y `lib/neighborhood-geography.json` de forma reproducible, sin red. Para una actualización cartográfica, obtener una extracción acotada con Overpass y ocho recorridos OSRM foot (máximo una consulta por segundo), guardar los resultados como `work/neighborhood-osm.json` y `work/walking-geometry.json`, y ejecutar el generador con `--refresh`; revisar geometría y accesos antes de aceptar cambios. Los datos actuales se revisaron el 11/11/2026.

Las distancias del mapa son longitudes peatonales redondeadas a 50 m hasta el acceso señalado: costa por Santa Fe (150 m), Rambla cercana por Santiago del Estero (200 m), Casino Central (1.050 m), San Martín/Santiago del Estero y los demás puntos. La Rambla cercana y el Casino son destinos independientes con iconos y recorridos propios. No deben confundirse con referencias generales de cercanía al mar o al centro. Los iconos cercanos usan una pequeña línea de anclaje para conservar su ubicación real sin superponerse. El mapa permite encuadrar un recorrido, ver toda la zona y acercar/alejar; el mapa externo permite consultar indicaciones vigentes.

`npm run test:unit` comprueba también que los recorridos permanezcan sobre calles o pasos peatonales, muestreando sus tramos cada 10 m. `node scripts/review-neighborhood-map.mjs` guarda capturas de la costa, terminal y vista general a 360, 768 y 1440 px, junto con errores y solapamientos en `outputs/geographic-map-review.json`.

## Skills de Codex

El repositorio incluye tres skills en `.agents/skills/`, seleccionadas por adopción pública, mantenimiento reciente y pertinencia para este sitio:

- `frontend-design`, de Anthropic: dirección visual e interfaces con identidad propia.
- `seo-audit`, de Marketing Skills: SEO técnico, contenido e investigación de búsquedas, con referencias de SEO local.
- `cro`, de Marketing Skills: claridad de la propuesta, recorridos y conversión de consultas.

Codex descubre las skills del proyecto desde `.agents/skills/`. Se pueden invocar como `$frontend-design`, `$seo-audit` y `$cro`. `AGENTS.md` orienta su uso y `.agents/product-marketing.md` aporta contexto del Hotel Bermudas, incluyendo afirmaciones comerciales pendientes de verificar.

Ejemplo: "Usá $frontend-design para mejorar la portada con una identidad propia del hotel y $cro para facilitar las consultas por WhatsApp; conservá el SEO y verificá móvil y escritorio".

Las versiones exactas, licencias, fechas y señales de adopción consultadas el 11 de noviembre de 2026 están registradas en `.agents/skills/sources.json`. Las estrellas corresponden al repositorio completo, no a una calificación individual de la skill. Estas copias están fijadas a commits revisados y no se actualizan automáticamente: revisar cambios upstream antes de reemplazarlas y actualizar su procedencia.

También se instalaron copias personales en `~/.agents/skills/` para otros proyectos de este equipo. Las copias personales y las del repo son independientes; actualizar ambas cuando se decida adoptar una nueva versión. Estarán disponibles a partir del próximo turno; si no aparecen en el selector, reiniciar Codex. Cuando ambos alcances estén presentes, el selector puede mostrar dos entradas con el mismo nombre.

Instalar skills configura cómo trabaja el agente. El rediseño, las mejoras SEO y las mediciones del sitio se realizan al ejecutar tareas concretas; ninguna skill garantiza posiciones en Google.

## Railway

El repositorio incluye `railway.json` con:

- Node.js 22 según `package.json`.
- instalación reproducible mediante `npm ci`;
- compilación de producción con Vinext;
- servidor enlazado automáticamente al puerto asignado por Railway;
- healthcheck en `/`.

Al conectar el repositorio en Railway no es necesario completar manualmente los comandos de build o inicio.
