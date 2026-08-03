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

```bash
npm install
npm run dev
```

## Validación

```bash
npm run lint
npm run build
```

## Railway

El repositorio incluye `railway.json` con:

- Node.js 22 según `package.json`.
- instalación reproducible mediante `npm ci`;
- compilación de producción con Vinext;
- servidor enlazado automáticamente al puerto asignado por Railway;
- healthcheck en `/`.

Al conectar el repositorio en Railway no es necesario completar manualmente los comandos de build o inicio.
