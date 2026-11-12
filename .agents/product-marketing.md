# Hotel Bermudas: contexto para diseño, marketing y SEO

## Alcance y confiabilidad

Este contexto guía cambios en la web del Hotel Bermudas. Los datos siguientes proceden del repositorio, revisado el 11 de noviembre de 2026; no constituyen una verificación independiente de la operación del hotel. Antes de publicar una afirmación nueva o resolver una contradicción comercial, confirmarla con el responsable o una fuente oficial.

Fuentes del proyecto: `lib/hotel-content.ts`, `app/layout.tsx`, `components/site-shell.tsx` y `app/informacion-del-huesped/page.tsx`. Mantener este documento cuando cambien hechos comerciales confirmados; el contenido del sitio debe ser coherente entre páginas.

## Negocio y público

- Nombre comercial: Hotel Bermudas.
- Ubicación declarada: 3 de Febrero 2484, barrio La Perla, Mar del Plata, Buenos Aires, Argentina.
- Sitio canónico configurado: `https://bermudashotel.com`.
- Contacto publicado: WhatsApp/teléfono `+54 223 607-6020`; correo `bermudashotel@hotmail.com`.
- Oferta descrita: 20 habitaciones, categorías doble, triple, cuádruple y quíntuple; esta última se presenta con dos ambientes.
- Equipamiento publicado: baño privado renovado, Wi-Fi, TV HD, climatización, sommier y caja de seguridad. La configuración de camas se confirma según disponibilidad.
- El sitio declara 100 m al mar y 300 m a la peatonal. Verificar distancias y recorridos antes de extender esas afirmaciones a lugares concretos.
- El responsable confirmó el 11/11/2026 que la estadía incluye desayuno continental: café, té, mate cocido, chocolate, leche, jugo, agua, yogures de frutilla/vainilla, cereales, tostadas, medialunas, manteca, mermeladas y dulce de leche.
- Públicos presentes en el contenido: parejas, familias, familias numerosas, amigos y grupos/contingentes. No asumir servicios especiales para grupos que no estén confirmados.

## Objetivo y propuesta

Objetivo principal: generar consultas calificadas que el hotel pueda convertir en reservas directas. El flujo actual lleva a WhatsApp; no hay un motor que garantice disponibilidad, cotice o cobre una reserva en estas páginas.

La propuesta debe apoyarse en pruebas del alojamiento: ubicación caminable en La Perla, fotografías reales, categorías para distintas cantidades de huéspedes y trato cercano. Presentar con precisión qué habitación conviene y qué se consulta antes de reservar. Un diseño cuidado debe representar este hotel y su escala real.

Voz: español de Argentina, cálido, concreto y sencillo; usar voseo con consistencia. Evitar superlativos vacíos como "experiencia inigualable" y afirmaciones de lujo, mejor precio o excelencia que no tengan respaldo.

## Dirección visual para próximas tareas

Usar el logo, la fachada, las habitaciones y los detalles reales como materia de diseño. Explorar una identidad costera propia de Mar del Plata sin convertirla en una plantilla de resort tropical o de software. Las fotografías deben conservar recortes legibles, escala y color creíbles.

Definir tipografía, paleta y ritmo según la tarea; no fijar aquí una composición obligatoria. Antes de sumar decoración, comprobar si ayuda a elegir habitación, entender la ubicación o consultar. Revisar el resultado renderizado: especificidad del contenido, primer pantallazo en móvil, accesibilidad y claridad del siguiente paso.

## Conversión y confianza

- CTA principal: "Consultar disponibilidad" por WhatsApp. CTA secundario según la página: ver una categoría de habitación o consultar la ubicación.
- Para una consulta útil, sugerir fecha de entrada, fecha de salida y cantidad de huéspedes; la categoría o composición del grupo sólo cuando aporte contexto.
- Explicar que el equipo confirma tarifa, condiciones y disponibilidad. No fabricar precios "desde", escasez, temporizadores, garantías ni descuentos.
- Resolver objeciones con información confirmada: capacidad, configuración de camas, ubicación, servicios y condiciones de la estadía.
- Las reseñas del código no acreditan por sí mismas autenticidad, permiso ni vigencia. Comprobar procedencia antes de ampliarlas, añadir puntuaciones o presentarlas como verificadas.
- No asumir políticas sobre estacionamiento, mascotas, accesibilidad, cancelación, check-in o medios de pago. Consultar fuentes del proyecto y confirmar lo que siga faltando.
- Mantener contacto y contenidos útiles accesibles. Agregar formularios o integraciones sólo cuando exista una necesidad y un destino funcional para los datos.

## Hipótesis iniciales de búsqueda y páginas existentes

Son hipótesis de intención, sin datos de volumen, dificultad o posiciones. Validar con Search Console y resultados actuales antes de priorizar una campaña o crear contenido. Elegir la URL propietaria según la consulta y evitar competencia innecesaria entre páginas.

- Marca y reserva directa: "Hotel Bermudas Mar del Plata" → `/` y `/contacto` según la intención.
- Alojamiento en el barrio: "hotel en La Perla Mar del Plata" → `/hotel-en-la-perla`.
- Familias: "hotel familiar en Mar del Plata" → `/alojamiento-familiar`.
- Capacidad o categoría: "habitación cuádruple Mar del Plata", "habitación quíntuple Mar del Plata" → `/habitaciones/cuadruple` y `/habitaciones/quintuple`; también existen doble, triple e índice `/habitaciones`.
- Grupos: "hotel para contingentes en Mar del Plata" → `/grupos-y-contingentes`, si la operación y las condiciones respaldan la oferta.
- Cercanía a playa, centro y recorridos: `/ubicacion`, `/guias/playas-cerca-del-hotel`, `/guias/la-perla-a-pie` y `/guias/centro-de-mar-del-plata`; cada una debe aportar información distinta y útil.
- Dudas previas a reservar: `/preguntas-frecuentes` e `/informacion-del-huesped`.

Una guía local debe ayudar a planificar la estadía con datos comprobados y enlaces pertinentes al hotel. Publicar sólo cuando aporte valor propio; no multiplicar páginas cambiando nombres de lugares o repitiendo palabras clave.

## SEO local y medición

Distinguir la visibilidad orgánica del sitio de la presencia en Maps/Perfil de Empresa. Para esta última, comprobar el perfil real, su verificación, datos de contacto, categoría, fotos y reseñas auténticas cuando haya acceso. No se verificó ni modificó ningún perfil externo al preparar estas instrucciones.

`components/analytics.tsx` reconoce `click_whatsapp`, `click_phone`, `open_map` y `click_email`. Reutilizar esos nombres; comprobar la configuración real antes de afirmar que hay datos. Los clics son microconversiones. Medir consultas calificadas y reservas efectivas por separado, sin enviar datos personales ni contenido de mensajes a Analytics.

Para evaluar SEO, usar consultas y páginas, impresiones, clics, CTR y posición de Search Console; separar marca de búsquedas generales y comparar períodos considerando la estacionalidad turística. No se consultaron Search Console, Analytics ni datos de reservas al crear este contexto.

Priorizar relevancia, indexación, contenido útil, velocidad y confianza. No prometer primeras posiciones, plazos de posicionamiento ni visibilidad garantizada en respuestas de IA. Las oportunidades se priorizan por evidencia y consultas/reservas potenciales.

## Fuentes para decisiones que pueden cambiar

Consultar documentación vigente cuando una recomendación dependa de políticas, herramientas o funciones de Google. No convertir límites orientativos de caracteres ni recomendaciones genéricas de una skill en requisitos de ranking.

- [Google Search Essentials](https://developers.google.com/search/docs/essentials): requisitos y prácticas de búsqueda.
- [Posicionamiento local de Google](https://support.google.com/business/answer/7091?hl=es): relevancia, distancia y prominencia; no se puede pagar por una mejor posición local.
- [Datos estructurados de negocios locales](https://developers.google.com/search/docs/appearance/structured-data/local-business): validar elegibilidad y hechos visibles además de sintaxis. No prometer estrellas de reseñas propias ni resultados enriquecidos por añadir schema.
- [Novedades de Search Central](https://developers.google.com/search/updates): comprobar funciones retiradas o cambios en elegibilidad, incluida la presentación de FAQ.
- [Core Web Vitals](https://web.dev/articles/vitals?hl=es): distinguir datos de campo y laboratorio; objetivo al percentil 75 de LCP <= 2,5 s, INP <= 200 ms y CLS <= 0,1.

## Datos y prioridades confirmados el 11/11/2026

- Check-in desde las 12:00 y check-out hasta las 10:00. Se pueden dejar bolsos antes del ingreso o después de la salida; no equivale a uso de habitación fuera de horario.
- No hay estacionamiento propio. El responsable informa que se puede detener frente al hotel para bajar equipaje e ingresar; hay estacionamiento no medido en los alrededores y cocheras privadas cercanas. Revisar señalización y condiciones vigentes, sin garantizar lugar ni costo de terceros.
- Priorizar también agencias, operadores, contingentes, delegaciones deportivas y participantes de eventos. Para educativos/egresados se consulta la viabilidad y coordinación; no se confirmó aún recepción automática ni cupo total del grupo.
- El recorrido sigue usando WhatsApp con resumen revisable. El usuario pidió revisar en contenedores locales antes de subir a producción.
- La ubicación incorpora un mapa local simplificado con calles, costa y recorridos peatonales reales de OpenStreetMap/FOSSGIS OSRM, guardados localmente. Conserva perspectiva, vista superior, zoom, iconos y encuadre por destino; los recorridos deben seguir calles o senderos, nunca atravesar manzanas. Las distancias se refieren al acceso indicado (costa por Santa Fe: 150 m; Rambla cercana por Santiago del Estero: 200 m; Casino Central: 1.050 m; San Martín/Santiago del Estero: 550 m; terminal: 2.500 m aprox.) y se distinguen de las referencias generales del hotel. Mantener atribución OSM/ODbL y enlace externo para indicaciones vigentes.

- Corrección del responsable: la Rambla cercana al hotel (200 m aprox.) y el Casino Central son lugares distintos. Mantenerlos como destinos independientes, con iconos, coordenadas y recorridos propios; no volver a agruparlos como un único punto.

- Fotos: el responsable autorizó retoques de IA en todas las fotos del hotel usadas en la web, conservando colores, distribución y equipamiento; además pidió cortinas existentes abiertas, persianas levantadas, día exterior y focos existentes alineados/encendidos con luz cálida. Originales, referencias y prompts en source-images/.
- Fachada: usar la referencia nocturna actual aportada por el responsable para cerramientos de vidrio, palmeras y plantas/flores. El responsable corrigió que el cartel es de acero inoxidable (no azul) y que el nivel superior es un piso terminado igual al primero, sin frente de madera/galería abierta. La portada lleva el frente actualizado grande y un recorte del mapa pequeño.
