import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const body = req.body;

  if (req.method === "GET") {
    return handlerGET(res);
  } else if (req.method === "POST") {
    return handlerPOST(body, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }

  async function handlerGET(res) {
    const proveedores = await prisma.proveedor.findMany({
      orderBy: {
        nombre: "asc",
      },
    });
    res.status(200).json(proveedores);
  }

  async function handlerPOST(body, res) {
    try {
      const proveedor = await prisma.proveedor.create({
        data: body
      });
      res.status(200).json(proveedor);
    } catch (error) {
      console.log(error)
    }
  }
}
