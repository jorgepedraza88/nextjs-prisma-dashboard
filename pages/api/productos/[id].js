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
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}

// GET PRODUCTO ID
async function handleGET(id, res) {
  const producto = await prisma.producto.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(producto);
}

// PUT - UPDATE => PRODUCTO ID
async function handlerPUT(id, body, res) {
  try {
    const producto = await prisma.producto.update({
      where: {
        id: Number(id),
      },
      data: body,
    });
    res.status(200).json({ msg: "Producto actualizado correctamente" });
  } catch (error) {
    console.log(error);
  }
}

// DELETE PRODUCTO ID
async function handleDELETE(id, res) {
  try {
    await prisma.producto.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.log(error);
  }
}
