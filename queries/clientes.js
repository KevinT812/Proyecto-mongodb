
db = db.getSiblingDB("tiendaDB");

db.clientes.insertMany([
  { nombre: "Ana",   edad: 28, pais: "México",  compras: [120, 350, 600] },
  { nombre: "Luis",  edad: 35, pais: "México",  compras: [400, 700, 150] },
  { nombre: "María", edad: 22, pais: "España",  compras: [200, 300] },
  { nombre: "Juan",  edad: 40, pais: "México",  compras: [800, 1200, 600] },
  { nombre: "Carla", edad: 31, pais: "Chile",   compras: [500, 200, 100] },
  { nombre: "Pedro", edad: 45, pais: "México",  compras: [1000, 900, 850] },
  { nombre: "Sofía", edad: 27, pais: "Argentina", compras: [220, 340] },
  { nombre: "Diego", edad: 29, pais: "México",  compras: [150, 400, 250] },
  { nombre: "Lucía", edad: 34, pais: "España",  compras: [600, 750, 300] },
  { nombre: "Andrés",edad: 26, pais: "Colombia", compras: [320, 480] },
  { nombre: "Elena", edad: 33, pais: "México",  compras: [200, 350, 500] },
  { nombre: "Mateo", edad: 38, pais: "México",  compras: [700, 400, 900] },
  { nombre: "Valeria", edad: 25, pais: "Perú",  compras: [150, 180] },
  { nombre: "Javier",  edad: 30, pais: "México",compras: [500, 600] },
  { nombre: "Paula",   edad: 36, pais: "Chile", compras: [250, 300, 400] },
  { nombre: "Héctor",  edad: 42, pais: "México",compras: [900, 1100] },
  { nombre: "Camila",  edad: 29, pais: "México",compras: [300, 200, 100] },
  { nombre: "Felipe",  edad: 37, pais: "Argentina", compras: [450, 550] },
  { nombre: "Isabel",  edad: 32, pais: "México",compras: [600, 500, 700] },
  { nombre: "Tomás",   edad: 41, pais: "España",compras: [800, 950, 400] }
]);

print("✅ 20 clientes insertados en la colección 'clientes' de la BD 'tiendaDB'");