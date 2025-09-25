// Consultas Parte II – Proyecto MongoDB

db = db.getSiblingDB("tiendaDB");

// 1. Clientes de México mayores de 25 años
print("1️⃣ Clientes de México mayores de 25 años");
db.clientes.find(
  { pais: "México", edad: { $gt: 25 } }
).pretty();



// 2. Proyección de nombre y promedio de compras
print("2️⃣ Nombre y promedio de compras de cada cliente");
db.clientes.aggregate([
  {
    $project: {
      _id: 0,
      nombre: 1,
      promedioCompras: { $avg: "$compras" }
    }
  }
]);
