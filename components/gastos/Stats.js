import { useEffect, useState } from "react";
import { get } from "../../helpers/calls";
import { formatearDinero } from "../../helpers/helper";
import { DateTime } from "luxon";

const Stats = ({ gastosMes, setAñadirModal }) => {
  const [previsionGastos, setPrevisionGastos] = useState([]);
  const [dias, setDias] = useState(30);
  const startDate = new Date();
  const hasta = DateTime.fromJSDate(startDate).plus({ days: dias }).toFormat("yyyy-MM-dd");

  // Recoger prevision de gastos desde hoy hasta X "días" recogidos en el state - Por defecto 30.
  useEffect(() => {
    async function getStats() {
      await get(`gastos/prevision?hasta=${hasta}`, setPrevisionGastos);
    }
    getStats();
  }, [gastosMes, hasta]);

  // Suma de todo el coste para mostrar la previsión
  const previsionTotal = previsionGastos.reduce(
    (accumulator, item) => Number(item.coste) + accumulator,
    0
  );

  return (
    <div>
      <div className="flex gap-8 rounded-lg">
        <p className=" text-lg font-semibold">
          Total this month:{" "}
          <span className="font-bold text-red-600">{formatearDinero(gastosMes)}</span>
        </p>
        <p className="text-lg font-semibold">
          Incoming expenses:{" "}
          <span className="font-bold text-red-600">{formatearDinero(previsionTotal)}</span>
        </p>
        <div className="flex items-center justify-center gap-2">
          <p className="text-lg font-semibold">Calculate incoming expenses:</p>
          <p
            onClick={() => setDias(7)}
            className={`${
              dias === 7 && "text-sky-400"
            } cursor-pointer rounded bg-sky-600 py-1 px-2 text-xs text-white`}
          >
            7 days
          </p>
          <p
            onClick={() => setDias(15)}
            className={`${
              dias === 15 && "text-sky-400"
            } cursor-pointer rounded bg-sky-600 py-1 px-2 text-xs text-white`}
          >
            15 days
          </p>
          <p
            onClick={() => setDias(30)}
            className={`${
              dias === 30 && "text-sky-400"
            } cursor-pointer rounded bg-sky-600 py-1 px-2 text-xs text-white`}
          >
            30 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
