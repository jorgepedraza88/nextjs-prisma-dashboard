import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  const id = req.query.id;
  const body = req.body

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

// GET ID
async function handleGET(id, res) {
  const proveedor = await prisma.proveedor.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(proveedor);
}

// PUT 
async function handlerPUT(id, body, res) {
  try {
  const proveedor = await prisma.proveedor.update({
      where: {
          id: Number(id)
      },
      data: body
    })
    res.status(200).json(proveedor)
  } catch (error) {
    console.log(error)
  }
}

// DELETE ID
async function handleDELETE(id, res) {
  try {
    await prisma.proveedor.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({ error });
  }
}
