import { prisma } from "../../../../lib/prisma";

export default async function handle(req, res) {
  let { proveedor, buscar } = req.query;
  
  try {
   const productos = await prisma.producto.findMany({
    where: {
      nombre: {
        contains: buscar,
      },
      proveedor: {
        nombre: proveedor
      }
    },
    include: {
      proveedor: true
    },
    orderBy: {
      nombre: "asc",
    } 
  });
  res.status(200).json(productos); 
  } catch (error) {
    console.log(error)
  }
  
}