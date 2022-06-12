import { DateTime } from "luxon";
import { prisma } from "../../../lib/prisma";

const hoy = DateTime.local().toISO();

export default async function handler(req, res) {
  if (req.method === "GET") {
    return handlerGET(req, res);
  } else if (req.method === "POST") {
    return handlerPOST(req, res);
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }

  async function handlerGET(req, res) {
    let { desde, hasta, proveedor } = req.query;

    if (desde === "siempre") {
      desde = "1970-01";
    }

    const gastos = await prisma.controlGastos.findMany({
      where: {
        fecha: {
          gte: desde ? `${desde}-01T00:00:00.000Z` : hoy,
          lt: hasta ? `${hasta}-01T00:00:00.000Z` : "3000-01-01T00:00:00.000Z",
        },
        proveedor: proveedor,
      },
      orderBy: {
        fechaVencimiento: "asc",
      },
    });
    res.json(gastos);
  }

  async function handlerPOST(req, res) {
    const { fecha, numFactura, fechaVencimiento, proveedor, coste, tipo } = req.body;
    const fechaFormat = DateTime.fromISO(fecha).plus({ hours: 2 }).toISO();
    const vencimientoFormat = DateTime.fromISO(fechaVencimiento).plus({ hours: 2 }).toISO();
    try {
      const gastos = await prisma.controlGastos.create({
        data: {
          fecha: fechaFormat,
          proveedor,
          numFactura,
          coste: Number(coste),
          tipo,
          fechaVencimiento: vencimientoFormat,
          status: "Pendiente",
        },
      });
      res.status(200).json(gastos);
    } catch (error) {
      console.log(error);
    }
  }
}
