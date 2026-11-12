# Hotel Bermudas

Estas instrucciones se aplican a todo el repositorio. El objetivo comercial es conseguir consultas calificadas y reservas directas para el hotel de La Perla, Mar del Plata.

En cada cambio, priorizar SEO, intención de búsqueda y marketing del nicho hotelero. El diseño debe ser profesional, muy moderno y reconocible como Hotel Bermudas; las decisiones visuales deben ayudar a descubrir el hotel, elegir alojamiento y consultar, preservando accesibilidad y velocidad.

## Contexto y skills

- Para trabajo de diseño, contenido, SEO o conversión, leer `.agents/product-marketing.md`; contiene el contexto del hotel y distingue datos del código de hechos pendientes de verificar.
- Para crear o rediseñar interfaces, usar `.agents/skills/frontend-design/SKILL.md`.
- Para diagnóstico de posicionamiento, indexación o SEO local, usar `.agents/skills/seo-audit/SKILL.md`; para búsquedas locales, leer también su referencia `references/local-seo.md`.
- Para mejorar consultas, llamadas y recorridos de reserva, usar `.agents/skills/cro/SKILL.md`.
- Cargar sólo las skills y referencias pertinentes. Una corrección pequeña no exige una auditoría o un rediseño completo. Las otras skills mencionadas por upstream son opcionales; no instalarlas automáticamente.
- El pedido del usuario y estas decisiones del proyecto prevalecen sobre recomendaciones genéricas de las skills. Para funciones y criterios que cambian, verificar documentación oficial vigente; algunas referencias upstream pueden quedar desactualizadas.

## Diseño y experiencia

- Derivar la dirección visual del hotel, sus fotografías reales, su logo y La Perla. Antes de un rediseño importante, expresar brevemente la idea visual y las decisiones de tipografía, color, composición y fotografía.
- Dar acabado profesional a tipografía, retícula, espaciado, alineación, recortes y estados interactivos. Usar una escala y tokens coherentes, jerarquías claras y detalles propios del hotel; revisar también textos largos, pantallas pequeñas y estados de carga o error cuando existan.
- Buscar una identidad propia con jerarquía clara y composiciones que respondan al contenido. Evitar repetir automáticamente tarjetas idénticas, degradados decorativos, números de sección, etiquetas en mayúsculas y animaciones de entrada en cada bloque.
- Conservar y evolucionar el sistema existente de `app/globals.css` y los componentes compartidos. Reutilizar tokens e iconos; justificar nuevas dependencias por una necesidad concreta.
- Usar fotos auténticas del hotel para representar habitaciones y servicios. Una imagen generada o de otro alojamiento no puede presentarse como una instalación real.
- Diseñar primero para móvil. Revisar navegación, legibilidad, recortes de fotos, foco de teclado, contraste, objetivos táctiles y estados de interacción; respetar `prefers-reduced-motion`.
- Mantener el contenido principal legible y las acciones esenciales disponibles sin depender de animaciones ni JavaScript cliente. Los botones flotantes no deben tapar texto, formularios ni otros controles.

## Transiciones, animaciones y profundidad 3D

- En cada diseño nuevo o rediseño, buscar oportunidades para incorporar transiciones cuidadas y animaciones con sensación 3D: perspectiva, capas, inclinación sutil, desplazamientos de profundidad y respuestas al interactuar. Aplicarlas siempre que sean viables para el dispositivo y mejoren la experiencia sin perjudicar SEO, lectura, accesibilidad o conversión.
- Definir un lenguaje de movimiento coherente: duraciones, aceleración e intensidad según la acción. Concentrar el efecto más expresivo en un momento relevante y mantener respuestas claras y discretas en navegación, botones y galería.
- Preferir CSS con `transform`, `opacity` y `perspective` para efectos que puedan resolverse así. Incorporar librerías de animación o WebGL sólo si el resultado lo justifica; diferir el código y los recursos pesados sin retrasar el contenido principal ni la imagen LCP.
- Dar una alternativa estática o más simple para `prefers-reduced-motion`, dispositivos táctiles y funciones no soportadas. La información y los controles deben funcionar con teclado y sin hover; no depender de girar un elemento para leer contenido esencial.
- Evitar saltos de layout, reproducción continua innecesaria y secuestro del scroll. Pausar trabajo fuera de pantalla cuando corresponda, limpiar listeners y bucles al desmontar, y comprobar que el efecto no retrase interacciones ni deje contenido invisible si falla JavaScript.

## Implementación y conversión

- El stack real está en `package.json`: React y convenciones de Next App Router, ejecutadas con Vinext/Vite. Conservar renderizado del servidor y comprobar compatibilidad antes de asumir que una función de Next está soportada.
- Reutilizar `components/site-shell.tsx`, `responsive-image.tsx`, `content-sections.tsx` y `lib/hotel-content.ts` cuando corresponda; limitar componentes cliente a interacciones que los requieran.
- La acción comercial principal es consultar disponibilidad por WhatsApp. Comunicar lo que ocurre después del clic: la tarifa y disponibilidad las confirma el hotel; un clic no es una reserva confirmada.
- Escribir en español rioplatense claro, con beneficios concretos y preguntas reales del huésped. No inventar testimonios, calificaciones, disponibilidad, descuentos, servicios ni políticas comerciales.
- Aprovechar los eventos existentes de `components/analytics.tsx`. Medir clics como microconversiones y distinguirlos de consultas calificadas o reservas efectivas. No enviar mensajes personales, fechas de viaje ni datos del huésped a Analytics.

## SEO y rendimiento

- Ampliar la cobertura de búsquedas relevantes del nicho con contenido útil y diferenciado: marca, hotel en La Perla, alojamiento familiar, capacidades de habitación, grupos y planificación de la estadía. Priorizar según intención, evidencia y potencial de reservas; no prometer posiciones ni cobertura de todas las consultas.
- Asignar una intención principal a cada URL y aprovechar las páginas existentes antes de crear nuevas. Validar consultas y competencia con datos disponibles; no inventar volúmenes ni posiciones.
- Verificar títulos, descripciones, canonical propio, enlaces internos, robots, sitemap y JSON-LD en el HTML servido. No asumir que la declaración en TSX demuestra que llegaron a producción.
- Mantener identidad, dirección, teléfono y URL coherentes entre contenido y datos estructurados. El schema debe representar información real y visible; comprobar por separado validez de Schema.org y elegibilidad actual para resultados enriquecidos.
- Redactar para resolver la búsqueda. Los largos sugeridos de títulos y descripciones son orientativos; evitar relleno de palabras clave, páginas duplicadas por barrio y cambios de URL sin necesidad y redirección.
- Distinguir resultados orgánicos del sitio de Google Maps/Perfil de Empresa. Las acciones fuera del código requieren acceso y autorización correspondiente; no afirmar haberlas ejecutado desde este repo.
- Relacionar el mensaje y el CTA con la intención de llegada, sea búsqueda orgánica o campaña. Comparar resultados con Search Console y eventos de conversión cuando haya datos, considerando estacionalidad; ajustar prioridades por consultas calificadas y reservas, además de visitas.
- Priorizar imágenes responsivas, dimensiones estables, imagen LCP sin carga diferida y poco JavaScript. Como objetivo de campo al percentil 75: LCP <= 2,5 s, INP <= 200 ms y CLS <= 0,1; las mediciones de laboratorio no demuestran esos resultados de campo.

## Verificación

- Con cambios de aplicación, ejecutar `npm run lint` y `npm run build`; con cambios TypeScript, también `npx tsc --noEmit`. Cuando cambien rutas, metadatos, datos estructurados o el HTML servido, ejecutar también `node --test tests/rendered-html.test.mjs` después del build. Añadir pruebas de comportamiento cuando la funcionalidad modificada lo requiera.
- Los scripts npm usan Bash y el build requiere GNU `timeout`; en Windows usar un entorno compatible y declarar cualquier limitación sin modificar el stack sólo para evitarla.
- Con cambios visuales, revisar el sitio renderizado en móvil, tablet y escritorio; cubrir anchos de referencia de 360, 768 y 1440 px, además de cualquier ancho que reproduzca un fallo. Guardar capturas para revisar composición, recortes, solapamientos y desbordamientos; corregir y volver a comprobar los problemas encontrados.
- Probar recorridos afectados: menú, navegación interna, galería y su cierre/foco, preguntas frecuentes, WhatsApp, teléfono y formularios si existen. Revisar teclado y tacto. Para animaciones y 3D, comprobar entrada/salida, scroll, movimiento reducido y alternativa estática.
- Revisar consola, errores de hidratación y solicitudes fallidas en las páginas afectadas; comprobar que enlaces y recursos críticos respondan correctamente. Ante cambios de diseño o movimiento, medir rendimiento con herramientas disponibles y corregir regresiones significativas frente a la misma página y condiciones.
- No declarar terminado un cambio de aplicación con fallos conocidos atribuibles al trabajo. Corregirlos y repetir las comprobaciones afectadas; distinguir problemas previos o de infraestructura. Informar comandos, resultados y evidencia visual relevante, y señalar explícitamente cualquier prueba pendiente o limitación de cobertura. Un build exitoso por sí solo no acredita funcionamiento completo ni ausencia absoluta de errores.
- Para cambios exclusivos de instrucciones o documentación, validar skills, referencias y diff; no hace falta recompilar el sitio. Conservar cambios locales ajenos a la tarea.
