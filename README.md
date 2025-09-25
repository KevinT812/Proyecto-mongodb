# Proyecto MongoDB – Colecciones basadas en consultas

## 📌 Descripción
Este proyecto implementa un conjunto de **colecciones basadas en consultas** en **MongoDB**, usando **Docker** y **Mongo Express**.  
El trabajo está dividido en cuatro partes:

1. **Teoría** → explicación de colecciones basadas en consultas.  
2. **Consultas básicas** → queries con filtros y proyecciones.  
3. **Colecciones basadas en consultas** → creación de vistas dinámicas (`clientesVIP`, `pedidosActivos`).  
4. **Caso integrador** → pedidos de los últimos 30 días + índices para optimizar consultas.

---

## 📂 Estructura del repositorio

proyecto-mongo/
├── teoria/ # Parte I – teoría en Markdown
│   └── parte1_teoria.md
├── queries/ # Parte II – consultas básicas
│   └── consultas.js
├── colecciones/ # Parte III – colecciones basadas en consultas
│   └── colecciones.js
├── proyecto_final/ # Parte IV – caso integrador
│   └── integrador.js
├── docker/ # Archivos para levantar el entorno
│   └── docker-compose.yml
├── video/ # Carpeta con enlace al video de la demo
│   └── README.md # Contiene el link al video (YouTube, Drive, etc.)
├── clientes.js # Script de carga inicial de datos
└── README.md # Este archivo

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

Para insertar, que para este caso será una lista de cleintes, copiamos el contenido del archivo clientes.js y lo ejecutamos, al hacer esto ya nos debe mostrar la base de datos creada con los datos insetados. Podemos verlo reflejado desde Mongo Express en el localhost:8081.
Esto insertará los 20 documentos en la colección clientes de la base tiendaDB.

Desde mongo-express o mongosh puedes verificar: `db.clientes.find().pretty();`

Teniendo esto podremos seguir con la ejecución de los queries.

### Parte II – consultas básicas
1. Escribe una query para obtener todos los clientes de México con edad mayor a 25. 
Dentro del archivo consultas.js encontramos el querie que nos permitira realizar esta consulta, copiamos y ejecutamos.

2. Escribe una query que proyecte el nombre y el promedio de compras.


## Notas

- Usuario de Mongo: root
- Contraseña: example
- Base de datos de trabajo: tiendaDB

Todas las queries están pensadas para ejecutarse desde mongosh dentro del contenedor.