import { DateTime } from "luxon";
import { prisma } from "../../../lib/prisma";

const hoy = DateTime.local().toISO();

export default async function handler(req, res) {
  const { hasta } = req.query;

  const gastos = await prisma.controlGastos.findMany({
    where: {
      fechaVencimiento: {
        gte: hoy,
        lte: `${hasta}T00:00:00.000Z`,
      },
    },
  });
  res.json(gastos);
}
