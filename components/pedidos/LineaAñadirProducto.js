import { editandoNumero, confirmar } from "../../helpers/helper";
import { useState } from "react";

const LineaAñadirProducto = ({ item, nuevoPedido, buscarProductos, añadirCoste, setError }) => {
  const { id, nombre, stock, coste, iva, low_stock } = item;

  // Cada línea que se añade al pedido después de Añadir, se almacena en este State.
  const [productoNuevoPedido, setProductoNuevoPedido] = useState({
    id: undefined,
    productoId: id,
    nombre: nombre,
    stock: 0,
    coste: Number(coste),
    iva: iva,
  });

  const editarNumero = (e) => {
    editandoNumero(e, setProductoNuevoPedido, productoNuevoPedido);
  };
  // Añadir el producto al array de productos dentro del pedido.
  const añadirAlPedido = async (e) => {
    // Si el producto ya existe en el pedido, impide agregarlo.
    if (nuevoPedido.productos.some((item) => item.productoId === id)) {
      confirmar(setError, "Este producto ya ha sido añadido");
    } else if (productoNuevoPedido.stock === 0) {
      confirmar(setError, "No se puede añadir 0 kg al pedido");
    } else {
      await nuevoPedido.productos.push(productoNuevoPedido);
      await añadirCoste();
      buscarProductos(e);
    }
  };

  return (
    <>
      <div className="grid grid-cols-8 items-center gap-3 py-1 text-center hover:bg-sky-100 border-b-[1px]">
        <p className="col-span-3">{nombre}</p>
        <p className={`${low_stock > stock && "rounded bg-amber-400 p-1"} col-span-2`}>Stock: {stock} kgs</p>
        <p>{coste} € / kg</p>
        <input
          onChange={editarNumero}
          value={productoNuevoPedido.stock}
          name="stock"
          type="number"
          step="any"
          min="0"
          className="py-1 text-center outline-none"
        />
        <button
          onClick={(e) => añadirAlPedido(e)}
          className="w-full rounded bg-green-600 py-2 text-xs font-semibold text-white transition-all hover:scale-105"
          type="button"
        >
          Añadir
        </button>
      </div>
    </>
  );
};

export default LineaAñadirProducto;
