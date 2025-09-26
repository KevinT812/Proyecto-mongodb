# Proyecto MongoDB – Colecciones basadas en consultas

## Descripción
Este proyecto implementa un conjunto de **colecciones basadas en consultas** en **MongoDB**, usando **Docker** y **Mongo Express**.  
El trabajo está dividido en cuatro partes:

1. **Teoría** → explicación de colecciones basadas en consultas.  
2. **Consultas básicas** → queries con filtros y proyecciones.  
3. **Colecciones basadas en consultas** → creación de vistas dinámicas (`clientesVIP`, `pedidosActivos`).  
4. **Caso integrador** → pedidos de los últimos 30 días + índices para optimizar consultas.

---

## Estructura del repositorio

# Estructura del Proyecto

| Carpeta | Contenido | Archivo Principal |
|---------|-----------|------------------|
| **teoria/** | 📚 Documentación teórica | `teoria_conceptual.md` |
| **queries/** | 🔍 Consultas básicas | `consultas.js` |
| **colecciones/** | 🗃️ Colecciones avanzadas | `colecciones.js` |
| **proyecto_final/** | 🚀 Caso integrador | `integrador.js` |
| - | 🐳 Configuración de contenedores | `docker-compose.yml` |
| **video/** | 📹 Demo en video | `README.md` |
| - | ⚡ Datos iniciales | `clientes.js` |
| - | 📖 Documentación | `README.md` |

## Levantar contenedores:
El paso inical sería levantar nuestro contenedor, para ello debemos tener abierto el programa de Docker Desktop en nuestra computadora y ejecutar el siguiente comando. Para este ejemplo utilizaré Visual Studio Code. 

`docker-compose up -d`

Esto levanta:
- MongoDB en localhost:27017
- Mongo Express en http://localhost:8081
- Credenciales de acceso a Mongo Expres: user: admin, password: admin123

## Verificar contenedores:
Para verificar que se a creado correctamente ejecutamos el siguiente comando `docker ps` que nos mostrará los contenedores activos, esto debe mostrar algo como esto: 

mongo-express:latest   "/sbin/tini -- /dock…"   6 seconds ago   Up 6 seconds   0.0.0.0:8081->8081/tcp, [::]:8081->8081/tcp       mongo_express
 
mongo:6.0              "docker-entrypoint.s…"   6 seconds ago   Up 6 seconds   0.0.0.0:27017->27017/tcp, [::]:27017->27017/tcp   mongo_container

- Mongosh dentro del contenedor: Ejecutar el siguiente comando
`docker exec -it mongo_container mongosh -u root -p example --authenticationDatabase admin`

LLegando a este punto ya tendremos implementado MongoDB en un contenedor de Docker.

## Uso de archivos .js
### Pasos inicales de creación de DB e insertar datos: 
Desde mongosh utilizamos el siguiente comando `use tiendaDB` esto switchea a la base de datos si ya esta creada o la crea automaticamente. 

Para insertar, que para este caso será una lista de clientes, copiamos el contenido del archivo clientes.js y lo ejecutamos, al hacer esto ya nos debe mostrar la base de datos creada con los datos insetados. Podemos verlo reflejado desde Mongo Express en el localhost:8081.
Esto insertará los 20 documentos en la colección clientes de la base tiendaDB.

Desde mongo-express o mongosh puedes verificar: `db.clientes.find().pretty();`

Teniendo esto podremos seguir con la ejecución de los queries.

### Parte II – consultas básicas
1. Escribe una query para obtener todos los clientes de México con edad mayor a 25. 
Dentro del archivo consultas.js encontramos el querie que nos permitira realizar esta consulta, copiamos y ejecutamos.

`print("1️⃣ Clientes de México mayores de 25 años");
db.clientes.find(
  { pais: "México", edad: { $gt: 25 } }
).pretty();`


2. Escribe una query que proyecte el nombre y el promedio de compras. Dentro del archivo consultas.js encontramos el querie que nos permitira realizar esta consulta, copiamos y ejecutamos.

`print("2️⃣ Nombre y promedio de compras de cada cliente");
db.clientes.aggregate([
  {
    $project: {
      _id: 0,
      nombre: 1,
      promedioCompras: { $avg: "$compras" }
    }
  }
]);`

### Parte III – colecciones basadas en consultas
1. Colección clientesVIP  

**Criterio:** clientes con promedio de compras > 500.  
**Justificación:** como el promedio puede cambiar cada vez que un cliente hace una compra, conviene que esta sea una colección dinámica (vista) en lugar de materializada.

- Primero creamos la vista con el siguiente código que también lo encontramos en colecciones/colecciones.js:  
`db.createView(
  "clientesVIP",
  "clientes",
  [
    {
      $project: {
        nombre: 1,
        pais: 1,
        edad: 1,
        promedioCompras: { $avg: "$compras" }
      }
    },
    { $match: { promedioCompras: { $gt: 500 } } }
  ]
);`  

Luego de crear la vista dinámica podemos realizar la consulta con el siguiente comando:  
`print("👉 ClientesVIP:");
db.clientesVIP.find().pretty();`  


2. Colección pedidosActivos

**Criterio:** pedidos con estado = "pendiente" o estado = "enviado".

Como aún no tenemos la colección pedidos, vamos a simularla insertando algunos pedidos de ejemplo.

    print("2️⃣ Insertando pedidos de ejemplo");
    db.pedidos.insertMany([
      { cliente: "Ana", estado: "pendiente", fecha: new Date("2025-09-01") },
      { cliente: "Luis", estado: "enviado", fecha: new Date("2025-09-02") },
      { cliente: "María", estado: "entregado", fecha: new Date("2025-08-28") },
      { cliente: "Juan", estado: "pendiente", fecha: new Date("2025-09-03") },
      { cliente: "Carla", estado: "cancelado", fecha: new Date("2025-08-25") }
    ]); 

En este caso, podría justificarse como materializada si los reportes se consultan con mucha frecuencia, pero para este ejercicio haremos una vista dinámica.

`print("3️⃣ Creando vista pedidosActivos (pendiente o enviado)");`

`db.createView(
  "pedidosActivos",
  "pedidos",
  [
    { $match: { estado: { $in: ["pendiente", "enviado"] } } }
  ]
);`

Al tener creados los pedidos de preuba y creada la vista dinámica procedemos a realizar la consulta.

`print("👉 Pedidos Activos:");`   
`db.pedidosActivos.find().pretty();`

### Parte IV – caso integrador
1. Colección pedidosUltimos30Dias:

**Criterio:** pedidos cuya fecha esté dentro de los últimos 30 días.
Para que siempre esté actualizada, conviene que sea una vista dinámica.
Usaremos new Date() y calcularemos hoy - 30 días.
Para las consultas tendriamos que ejecutar los siguientes comandos:
- Para Pedidos de úlitmos 30 días `db.pedidosUltimos30Dias.find().pretty();`

- Antes de tu consulta, define las fechas:  
`const hoy = new Date();
const hace30dias = new Date();
hace30dias.setDate(hoy.getDate() - 30);`

- Vista dinámica: pedidos de los últimos 30 días:  
`print("1️⃣ Creando vista pedidosUltimos30Dias");`
`db.createView(
  "pedidosUltimos30Dias",  
  "pedidos",
  [
    { $match: { fecha: { $gte: hace30dias } } }
  ]
);`

- Realizamos la consulta:  
`print("👉 Pedidos de los últimos 30 días:");
db.pedidosUltimos30Dias.find().pretty();`

Para poder utilizarlo con índices primero debemos crear el índice: 
  `print("2️⃣ Creando índice en pedidos (fecha + estado)");
  db.pedidos.createIndex({ fecha: 1, estado: 1 });`

Para consultas frecuentes por fecha y estado, se recomienda un índice compuesto.

- Realizamos la consuta optimizada:  
`print("3️⃣ Pedidos pendientes en los últimos 30 días");
db.pedidos.find({ fecha: { $gte: hace30dias }, estado: "pendiente" }).pretty();`

Justifica qué pasaría si se resolviera únicamente con consultas ad-hoc.

- Sin la vista (pedidosUltimos30Dias)
Cada vez que necesite "pedidos de los últimos 30 días", tendríamos que volver a escribir la consulta con $match o con condiciones de fecha.
Esto genera duplicación de lógica en el código y riesgo de errores (ejemplo: alguien usa 29 días en lugar de 30, o se le olvida filtrar por fecha).
Con la vista, en cambio, ya se tiene una "colección virtual" lista para consultar directamente.

- Sin índice (fecha + estado)
Mongo tendría que hacer un collection scan: leer todos los documentos de pedidos uno por uno para encontrar los que cumplan la condición.
Esto funciona bien con pocas filas, pero si la tabla crece a miles o millones de documentos → se vuelve muy lento y costoso en recursos.
Con el índice, Mongo puede buscar directamente en un "árbol ordenado" por fecha y estado, lo que reduce muchísimo el tiempo de respuesta.

## Notas
Todas las queries están pensadas para ejecutarse desde mongosh dentro del contenedor.

Comandos útiles:
- Iniciar el contenedor: `docker compose down -v`
- Detener el contenedor: `docker-compose up -d`