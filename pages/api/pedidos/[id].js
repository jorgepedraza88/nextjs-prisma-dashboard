import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  const id = req.query.id;
  const body = req.body;

  if (req.method === "GET") {
    return handleGET(id, res);
  } else if (req.method === "DELETE") {
    return handleDELETE(id, res);
  } else if (req.method === "PUT") {
    return handlerPUT(id, body, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/post/:id
async function handleGET(id, res) {
  const pedido = await prisma.pedido.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      productos: true,
    },
  });
  res.status(200).json(pedido);
}

// PUT
async function handlerPUT(id, body, res) {
  const { status, observaciones, coste } = body;
  try {
    const pedido = await prisma.pedido.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
        observaciones,
        coste: parseFloat(coste)
      },
    });
    res.status(200).json(pedido);
  } catch (error) {
    console.log(error)
  }
}

async function handleDELETE(id, res) {
  try {
    const borrarPedido = prisma.pedido.delete({
      where: { id: Number(id) },
    });
    const borrarProductosPedido = prisma.pedidoProductos.deleteMany({
      where: {
        pedidoId: Number(id),
      },
    });
    await prisma.$transaction([borrarPedido, borrarProductosPedido]);
    res.status(200).json({});
  } catch (error) {
    console.log(error)
  }
}
