import { useState } from "react";
import useProductos from "../../hooks/useProductos";
import { confirmar } from "../../helpers/helper";
import { put } from "../../helpers/calls";

const AñadirStockModal = ({ setAddModal, setConfirmacion }) => {
  const { productoModal, obtenerProductos } = useProductos();
  const { id, stock } = productoModal;

  // Nuevo state para guardar la suma
  const [suma, setSuma] = useState("");

  // Función suma
  const sumar = (num1, num2) => {
    return parseFloat(num1) + parseFloat(num2);
  };
  const nuevoStock = {
    stock: suma,
  };

  // Función para añadir el nuevo stock a la base de datos
  const añadirStock = async (e) => {
    await put(e, "productos", nuevoStock, id);
    await obtenerProductos();
    await setAddModal(false);
    confirmar(setConfirmacion, "Se ha añadido el stock");
  };

  return (
    <div className="fixed h-screen w-screen bg-stone-900 bg-opacity-80">
      <div className="mx-auto my-24 w-3/4 rounded bg-stone-50 py-8 xl:w-1/6">
        <p className="mb-6 px-6 text-2xl font-bold">Add Stock</p>
        <form onSubmit={añadirStock} className="mx-auto grid items-center gap-4 px-6 font-semibold">
          <div className="mb-6">
            <label>Add quantity</label>
            <input
              onChange={(e) => setSuma(sumar(e.target.value, stock))}
              id="stock"
              name="stock"
              type="number"
              step="any"
              className="campo"
              placeholder="Type the number of kg"
            />
          </div>
          <button type="submit" className="boton_guardar">
            Add Stock
          </button>
          <button type="button" onClick={() => setAddModal(false)} className="boton_cancelar">
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AñadirStockModal;
