# Parte I – Teoría sobre Colecciones Basadas en Consultas

## 1. ¿Qué es una colección basada en consultas?
Una **colección basada en consultas** es una colección en MongoDB que no se alimenta directamente de inserciones, sino que **se define a partir de una consulta** sobre una o más colecciones existentes.  
En la práctica, pueden implementarse como **vistas (views)** o como **colecciones materializadas**.

La diferencia principal es cuándo se obtienen los datos reales. Una colección basada en consultas es como una "promesa" de datos - solo ejecuta la búsqueda cuando realmente la necesitas, haciendo solo el trabajo mínimo indispensable. En cambio, una colección estática ya tiene todos los datos cargados en memoria desde el principio, como una foto fija de la información, lo que puede ser menos eficiente pero proporciona resultados inmediatos.

---

## 2. Tipos de colecciones basadas en consultas

### a) Consultas ad-hoc
- Son consultas ejecutadas en el momento (`db.collection.find(...)`).
- No se almacenan, por lo que cada vez que se ejecutan deben procesar todos los datos.
- **Ventaja**: flexibilidad, puedes consultar cualquier cosa.  
- **Desventaja**: si se usan mucho, pueden ser costosas en tiempo.

### b) Vistas materializadas
- Se ejecuta la consulta una vez y el resultado se **almacena físicamente** como una colección.
- Se consultan rápidamente porque ya tienen los resultados precalculados.
- **Ventaja**: eficiencia en consultas repetitivas.  
- **Desventaja**: se desactualizan si cambian los datos base (hay que refrescarlas manualmente).

### c) Colecciones dinámicas (views en MongoDB)
- Son consultas almacenadas que se ejecutan cada vez que se accede a la vista.
- Siempre muestran los datos actualizados.  
- **Ventaja**: siempre consistentes.  
- **Desventaja**: cada consulta puede ser más lenta si el dataset es grande.

---

## 3. Ventajas de usar colecciones basadas en consultas
- Simplifican el acceso a datos complejos.
- Mejoran el rendimiento en reportes frecuentes.
- Permiten separar **consultas de negocio** de los datos crudos.
- Facilitan la seguridad (puedes dar acceso a la vista sin exponer toda la colección original).

---
