import { totalStock, totalCoste, totalPrecioVenta, formatearDinero } from "../../helpers/helper";
import FiltrosProductos from "./FiltrosProductos";
import CajaEstadisticas from "./CajaEstadisticas";
import useProductos from "../../hooks/useProductos";

const EstadisticasProductos = ({ setMostrarProductosCasiAgotados }) => {
  const { productosStats } = useProductos();

  const margenTotal = productosStats.map((producto) => {
    const costeIVA = (producto.coste * producto.iva) / 100 + producto.coste;
    let margen = (((producto.precioVenta - costeIVA) / producto.precioVenta) * 100).toFixed(1);
    if (costeIVA === 0 || producto.precioVenta === 0) {
      margen = 0;
    }
    return margen;
  });

  const mediaMargen =
    margenTotal.reduce((accum, item) => Number(item) + accum, 0) / margenTotal.length;

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-2 my-auto flex justify-between gap-8 rounded-xl bg-stone-200 p-4 shadow-md">
        <CajaEstadisticas
          titulo="Stock warehouse value"
          operacion={formatearDinero(totalCoste(productosStats))}
        />
        <CajaEstadisticas
          titulo="Stock sale value"
          operacion={formatearDinero(totalPrecioVenta(productosStats))}
        />
        <CajaEstadisticas titulo="Total Profit %" operacion={`${mediaMargen.toFixed(2)} %`} />
        <CajaEstadisticas
          titulo="Warehouse"
          operacion={`${totalStock(productosStats).toFixed(2)} kg`}
        />
      </div>
      <FiltrosProductos setMostrarProductosCasiAgotados={setMostrarProductosCasiAgotados} />
    </div>
  );
};

export default EstadisticasProductos;
