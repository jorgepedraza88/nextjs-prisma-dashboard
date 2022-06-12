import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return handlerGET(req, res);
  } else {
    return handlerPOST(req, res);
  }

  async function handlerGET(req, res) {
    let { categoria, proveedorId, page, stock, limit, buscar } = req.query;
    // Paginación
    let skip = 0;
    if (page) {
      skip = page * 30 - 30;
    }
    // Pasar string a Número
    if (stock) {
      stock = Number(stock);
    }
    if (limit) {
      limit = Number(limit);
    }
    if (proveedorId) {
      proveedorId = Number(proveedorId);
    }
    try {
      const productos = await prisma.producto.findMany({
        skip: skip,
        take: limit,
        where: {
          nombre: {
            contains: buscar,
          },
          categoria,
          stock,
          proveedorId,
        },
        orderBy: {
          nombre: "asc",
        },
      });
      res.status(200).json(productos);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlerPOST(req, res) {
    try {
      const producto = await prisma.producto.create({
        data: req.body,
      });
      res.status(200).json({ msg: "Producto creado correctamente" });
    } catch (error) {
      console.log(error);
    }
  }
}
