import { prisma } from "../../../lib/prisma";


// Actualizamos el stock después de revisar el pedido
export default async function handler(req, res) {
  const {id, stock} = req.body;
  try {
    const productos = await prisma.producto.update({
      where: {
        id: Number(id)
      },
      data: {
        stock: Number(stock)
      },
    });
    res.status(200).json(productos);
  } catch (error) {
    console.log(error);
  }
}
