// Parte IV – Caso integrador
db = db.getSiblingDB("tiendaDB");

const hoy = new Date();
const hace30dias = new Date();
hace30dias.setDate(hoy.getDate() - 30);

// 1. Vista dinámica: pedidos de los últimos 30 días
print("1️⃣ Creando vista pedidosUltimos30Dias");

db.createView(
  "pedidosUltimos30Dias",
  "pedidos",
  [
    { $match: { fecha: { $gte: hace30dias } } }
  ]
);

print("👉 Pedidos de los últimos 30 días:");
db.pedidosUltimos30Dias.find().pretty();

// 2. Crear índice recomendado
print("2️⃣ Creando índice en pedidos (fecha + estado)");
db.pedidos.createIndex({ fecha: 1, estado: 1 });

// 3. Consulta optimizada
print("3️⃣ Pedidos pendientes en los últimos 30 días");
db.pedidos.find({ fecha: { $gte: hace30dias }, estado: "pendiente" }).pretty();
