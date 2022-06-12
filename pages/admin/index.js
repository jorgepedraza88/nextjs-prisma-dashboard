import { useEffect, useState, useCallback } from "react";
import VentasStats from "../../components/ventas/VentasStats";
import Graficos from "../../components/ventas/Graficos";
import TopVentas from "../../components/ventas/TopVentas";
import { get } from "../../helpers/calls";
import { DateTime } from "luxon";
import useProductos from "../../hooks/useProductos";

const Ventas = () => {
  const { setCargando } = useProductos();
  const [balanzaConectada, setBalanzaConectada] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [ventasEcommerce, setVentasEcommerce] = useState([]);
  const [ventasEcommercePasadas, setVentasEcommercePasadas] = useState([]);

  // Calcular fecha de hoy
  const hoy = DateTime.now().toISODate();
  const hoyAñoPasado = DateTime.now().minus({ weeks: 52 }).toISODate();
  const hoyFake = "2022-05-14";

  // useEffect(() => {
  //   const comprobarBalanza = async () => {
  //     try {
  //       const respuesta = await fetch("http://localhost:4000/status");
  //       const resultado = await respuesta.json();
  //       resultado && setBalanzaConectada(true);
  //     } catch (error) {
  //       setBalanzaConectada(false);
  //     }
  //   };
  //   comprobarBalanza();
  // }, []);

  // Api to get Woocommerce Sales
  const obtenerVentasWC = useCallback(async () => {
    setCargando(true);
    await get("ecommerce/totales", setVentasEcommerce);
    await get("ecommerce/comparartotales", setVentasEcommercePasadas);
    setCargando(false);
  }, []);

  // useEffect(() => {
  //   obtenerVentasWC();
  // }, [obtenerVentasWC]);

  return (
    <div className="mx-8 my-12 w-full">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold ">Sales</h1>
          <div className="flex items-center gap-2 rounded-lg bg-zinc-200 p-2 font-medium">
            <div
              className={`h-2 w-2 rounded-full ${
                balanzaConectada ? "bg-green-500" : "bg-red-500"
              } py-1 `}
            >
              <span> </span>
            </div>
            <p>{balanzaConectada ? "Retail store connected" : "Retail store not connected"}</p>
          </div>
        </div>
        <VentasStats
          balanzaConectada={balanzaConectada}
          ventasEcommerce={600}
          ventasEcommercePasadas={500}
          hoy={hoyFake}
          hoyAñoPasado={hoyAñoPasado}
        />
        <Graficos/>
        <TopVentas/>
      </div>
    </div>
  );
};

export default Ventas;
