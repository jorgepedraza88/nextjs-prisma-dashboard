import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  const id = req.query.id;

  if (req.method === "PUT") {
    return handlePUT(id, res, req);
  } else if (req.method === "DELETE") {
    return handleDELETE(id, res);
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }

  async function handlePUT(id, res, req) {
    try {
      const gasto = await prisma.controlGastos.update({
        where: {
          id: Number(id),
        },
        data: req.body,
      });
      res.status(200).json(gasto);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDELETE(id, res) {
    try {
      const gasto = await prisma.controlGastos.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(gasto);
    } catch (error) {
      console.log(error);
    }
  }
}
