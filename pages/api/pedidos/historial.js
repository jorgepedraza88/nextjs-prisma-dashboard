import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const pedidos = await prisma.pedido.findMany({
    take: 20,
    where: {
      status: "revisado",
    },
    include: {
      productos: true,
    },
    orderBy: {
      fecha: "desc",
    },
  });
  res.status(200).json(pedidos);
}