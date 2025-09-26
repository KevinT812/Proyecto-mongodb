# Parte IV – Caso integrador

##  Objetivo
Diseñar y ejecutar una **colección basada en consultas** para obtener los **pedidos realizados en los últimos 30 días**.  
Además, proponer **índices adecuados** para optimizar la búsqueda de pedidos filtrados por fecha y estado.

---

## Explicación del script `integrador.js`

1. **Definir fechas de referencia**
   ```javascript
   const hoy = new Date();
   const hace30dias = new Date();
   hace30dias.setDate(hoy.getDate() - 30);

- hoy: fecha actual del sistema.
- hace30dias: fecha calculada restando 30 días a la fecha actual.
- Se usan para filtrar únicamente los pedidos recientes.

2. Crear vista dinámica pedidosUltimos30Dias

- Se crea una vista dinámica llamada pedidosUltimos30Dias.
- Esta vista consulta la colección pedidos y devuelve únicamente los documentos cuya fecha sea mayor o igual a hace30dias.
- Se usa vista dinámica porque así siempre reflejará los pedidos recientes, sin necesidad de recalcular manualmente.

3. Proponer y crear un índice

- Se crea un índice compuesto sobre los campos fecha y estado.
- Esto mejora el rendimiento de las consultas que buscan pedidos por rango de fechas y estado (ej. "pendientes en los últimos 30 días").
- Sin este índice, cada búsqueda recorrería todos los documentos de la colección.

4. Ejecutar consulta optimizada:
- Ejemplo de consulta que aprovecha el índice.
- Devuelve solo los pedidos con estado pendiente dentro de los últimos 30 días.

Justifica qué pasaría si se resolviera únicamente con consultas ad-hoc.

- Sin la vista (pedidosUltimos30Dias)
Cada vez que necesite "pedidos de los últimos 30 días", tendríamos que volver a escribir la consulta con $match o con condiciones de fecha.
Esto genera duplicación de lógica en el código y riesgo de errores (ejemplo: alguien usa 29 días en lugar de 30, o se le olvida filtrar por fecha).
Con la vista, en cambio, ya se tiene una "colección virtual" lista para consultar directamente.

- Sin índice (fecha + estado)
Mongo tendría que hacer un collection scan: leer todos los documentos de pedidos uno por uno para encontrar los que cumplan la condición.
Esto funciona bien con pocas filas, pero si la tabla crece a miles o millones de documentos → se vuelve muy lento y costoso en recursos.
Con el índice, Mongo puede buscar directamente en un "árbol ordenado" por fecha y estado, lo que reduce muchísimo el tiempo de respuesta.

## Conclusión

La vista pedidosUltimos30Dias permite obtener información actualizada en tiempo real sobre los pedidos recientes.

El índice { fecha: 1, estado: 1 } mejora notablemente la eficiencia de las consultas que combinan filtros por fecha y estado.

Esta solución ejemplifica cómo usar colecciones basadas en consultas dinámicas junto con optimización de rendimiento en MongoDB.