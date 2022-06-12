import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return handleGET(res);
  } else if (req.method === "POST") {
    return handlePOST(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }

  async function handleGET(res) {
    const pedidos = await prisma.pedido.findMany({
      where: {
        status: "pendiente",
      },
      include: {
        productos: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    res.status(200).json(pedidos);
  }

  async function handlePOST(req, res) {
    const {proveedor, fecha, coste, productos} = req.body
    try {
     const pedido = await prisma.pedido.create({
        data: {
          proveedor,
          fecha,
          coste : Number(coste),
          status: "pendiente",
          productos: {
            create: productos
          },
        },
        }
     )
      res.status(200).json(pedido)
    } catch (error) {
      console.log(error)
    }
  }
}
