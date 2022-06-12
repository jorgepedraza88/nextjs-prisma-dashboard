import { useState } from "react";
import { crear } from "../../helpers/calls";
import { confirmar } from "../../helpers/helper";
import useProductos from "../../hooks/useProductos";
import LineaAñadirProducto from "./LineaAñadirProducto";
import { DateTime } from "luxon";
import LineaAñadirPedidoModal from "./LineaAñadirPedidoModal";
import Confirmacion from "../utilities/Confirmacion";

const AñadirPedidoModal = ({ setAñadirModal, setConfirmacion, getPedidos }) => {
  const { proveedores, setCargando } = useProductos();
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const fecha = DateTime.now().toISO();

  const [nuevoPedido, setNuevoPedido] = useState({
    proveedor: "",
    fecha: fecha,
    coste: 0,
    productos: [],
  });
  const { proveedor } = nuevoPedido;

  //Reiniciar productos cuando se cambie el proveedor - Probar useCallBack - Buscar explicación
  const seleccionarProveedor = (proveedor) => {
    setNuevoPedido((prev) => ({ ...prev, proveedor: proveedor, productos: [] }));
    setProductos([]);
  };

  // API para recoger listado de productos dentro del Modal
  const buscarProductos = async (e) => {
    e.preventDefault();
    try {
      const url = `/api/pedidos/productos?buscar=${busqueda}&proveedor=${proveedor}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setProductos(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  // Insertar el costeTotal dentro del objeto pedido
  const añadirCoste = async () => {
    //* Calculo del coste total del pedido
    const costeTotal = await nuevoPedido.productos.reduce(
      (accumulator, item) =>
        ((item.coste * item.iva) / 100 + item.coste) * item.stock + accumulator,
      0
    );
    setNuevoPedido({
      ...nuevoPedido,
      coste: parseFloat(parseFloat(costeTotal).toFixed(2)),
    });
  };

  // Crear Pedido en base de datos
  const añadir = async (e) => {
    if (nuevoPedido.productos.length === 0) {
      confirmar(setError, "El pedido está vacío");
    } else {
      const confirmarPedido = confirm("¿Estás seguro de guardar este pedido?");
      if (confirmarPedido) {
        setCargando(true)
        await crear(e, "pedidos", nuevoPedido);
        await setAñadirModal(false);
        await getPedidos()
        confirmar(setConfirmacion, "Pedido añadido con éxito");
      }
    }
  };

  return (
    <div className="fixed h-screen w-screen overflow-y-scroll bg-stone-900 bg-opacity-80">
      {error && <Confirmacion mensaje={error} type={"error"} />}
      <div className="mx-auto my-24 w-3/4 rounded bg-stone-50 py-8 xl:w-3/6 ">
        <p className="mb-6 px-6 text-2xl font-bold">Realizar un pedido</p>
        <form
          onSubmit={(e) => buscarProductos(e)}
          className="mx-auto grid grid-cols-2 items-center gap-4 px-6 font-semibold"
        >
          <div className="col-span-2">
            <label>Selecciona un proveedor:</label>
            <select
              onChange={(e) => seleccionarProveedor(e.target.value)}
              value={proveedor}
              className="campo"
              name="proveedor"
              type="number"
            >
              <option value="">Selecciona proveedor</option>
              {proveedores.map((proveedor) => {
                return (
                  <option key={proveedor.id} value={proveedor.nombre}>
                    {proveedor.nombre}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-span-2">
            <label>Añadir productos al pedido</label>
            <div className="mt-4">
              {nuevoPedido.productos.length > 0 &&
                nuevoPedido.productos?.map((producto) => (
                  <LineaAñadirPedidoModal
                    key={producto.nombre}
                    producto={producto}
                    nuevoPedido={nuevoPedido}
                  />
                ))}
            </div>
          </div>
          <div className="col-span-2">
            <div className=" mx-16 flex items-center justify-center gap-6">
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-[30rem] border-b-2 bg-stone-50 px-2 py-1 outline-none"
                type="text"
                placeholder="Introduce para buscar"
              />
              <button
                className="rounded bg-sky-600 px-4 py-2 font-semibold text-white"
                type="submit"
              >
                Buscar
              </button>
            </div>
            <div className="mt-8 border-t py-2">
              {productos?.map((item) => (
                <LineaAñadirProducto
                  key={item.id}
                  item={item}
                  nuevoPedido={nuevoPedido}
                  setNuevoPedido={setNuevoPedido}
                  buscarProductos={buscarProductos}
                  añadirCoste={añadirCoste}
                  setError={setError}
                />
              ))}
            </div>
          </div>
          <button onClick={añadir} type="button" className="boton_guardar">
            Guardar Cambios
          </button>
          <button type="button" onClick={() => setAñadirModal(false)} className="boton_cancelar">
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AñadirPedidoModal;
