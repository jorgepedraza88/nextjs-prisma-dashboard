import { prisma } from "../../../../lib/prisma";


// Borrar 1 producto del pedido
export default async function handle(req, res) {
  const id = req.query.id
    try {
      await prisma.pedidoProductos.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({});
    } catch (error) {
      console.log(error);
    }
  }