import { useEffect, useState, useCallback } from "react";
import BoxStat from "./BoxStat";
import { comparar } from "../../helpers/helper.js";

const VentasStats = ({
  balanzaConectada,
  ventas,
  ventasEcommerce,
  ventasEcommercePasadas,
  hoy,
  hoyAñoPasado,
}) => {
  const [totalEcommerce, setTotalEcommerce] = useState(0);
  const [hoyEcommerce, setHoyEcommerce] = useState(0);
  const [porcentajeDiaWC, setPorcentajeDiaWC] = useState(0);
  const [porcentajeMesWC, setPorcentajeMesWC] = useState(0);

  const obtenerDatos = useCallback(async () => {
    setTotalEcommerce(Number(ventasEcommerce[0]?.total_sales));
    setHoyEcommerce(Number(ventasEcommerce[0]?.totals[hoy]?.sales));
    if (ventasEcommerce[0] && ventasEcommercePasadas[0]) {
      comparar(
        Number(ventasEcommerce[0]?.total_sales),
        Number(ventasEcommercePasadas[0]?.total_sales),
        setPorcentajeMesWC
      );
      comparar(
        Number(ventasEcommerce[0]?.totals[hoy]?.sales),
        Number(ventasEcommercePasadas[0]?.totals[hoyAñoPasado].sales),
        setPorcentajeDiaWC
      );
    }
  }, [ventasEcommerce, ventasEcommercePasadas]);

  // useEffect(() => {
  //   obtenerDatos();
  // }, [obtenerDatos]);

  return (
    <>
      <div className="mt-6 mb-1 grid grid-cols-2">
        <p className="text-lg font-semibold">Retail Store</p>
        <p className="text-lg font-semibold">Ecommerce</p>
      </div>
      <div className="mx-auto  grid grid-cols-4 border-y-[1px]">
        <div className="border-r-2 pl-5">
          {balanzaConectada ? (
            <BoxStat tiempo={"Today"} porcentaje="40" cantidad={1500} />
          ) : (
            <p className="mt-3">No se pueden mostrar datos, balanza no conectada</p>
          )}
        </div>
        <div className="flex border-r-2 pl-5">
          {balanzaConectada ? (
            <BoxStat tiempo={"This month"} porcentaje="40" cantidad={500} />
          ) : (
            <p className="mt-3">No se pueden mostrar datos, balanza no conectada</p>
          )}
        </div>
        <div className="border-r-2 pl-5">
          <BoxStat tiempo={"Today"} porcentaje={-3} cantidad={531} />
        </div>
        <div className="pl-5 ">
          <BoxStat tiempo={"This month"} porcentaje={20} cantidad={5412} />
        </div>
      </div>
    </>
  );
};

export default VentasStats;
