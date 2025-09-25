// Parte III – Colecciones basadas en consultas
db = db.getSiblingDB("tiendaDB");

// 1. Vista dinámica: clientesVIP
print("1️⃣ Creando vista clientesVIP (promedio > 500)");

db.createView(
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
);

print("👉 ClientesVIP:");
db.clientesVIP.find().pretty();

// 2. Insertar pedidos de ejemplo
print("2️⃣ Insertando pedidos de ejemplo");

db.pedidos.insertMany([
  { cliente: "Ana", estado: "pendiente", fecha: new Date("2025-09-01") },
  { cliente: "Luis", estado: "enviado", fecha: new Date("2025-09-02") },
  { cliente: "María", estado: "entregado", fecha: new Date("2025-08-28") },
  { cliente: "Juan", estado: "pendiente", fecha: new Date("2025-09-03") },
  { cliente: "Carla", estado: "cancelado", fecha: new Date("2025-08-25") }
]);

print("✅ Pedidos insertados");

// 3. Vista dinámica: pedidosActivos
print("3️⃣ Creando vista pedidosActivos (pendiente o enviado)");

db.createView(
  "pedidosActivos",
  "pedidos",
  [
    { $match: { estado: { $in: ["pendiente", "enviado"] } } }
  ]
);

print("👉 Pedidos Activos:");
db.pedidosActivos.find().pretty();
