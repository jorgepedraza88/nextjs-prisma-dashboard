import { useState, useCallback } from "react";
import { crear, get } from "../../../helpers/calls";
import { confirmar, formatearDinero } from "../../../helpers/helper";
import useProductos from "../../../hooks/useProductos";
import { DateTime } from "luxon";
import LineaAñadirPedidoModal from "../../../components/pedidos/LineaAñadirPedidoModal";
import LineaAñadirProducto from "../../../components/pedidos/LineaAñadirProducto";
import Confirmacion from "../../../components/utilities/Confirmacion";
import { useRouter } from "next/router";

const Crear = () => {
  const { proveedores, setCargando, setPedidos } = useProductos();
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const fecha = DateTime.now().toISO();
  const router = useRouter();

  const [nuevoPedido, setNuevoPedido] = useState({
    proveedor: "",
    fecha: fecha,
    coste: 0,
    productos: [],
  });
  const { proveedor } = nuevoPedido;

  const getPedidos = useCallback(async () => {
    setCargando(true);
    await get("pedidos", setPedidos);
    setCargando(false);
  }, [setCargando, setPedidos]);

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
      const confirmarPedido = confirm("¿Are you sure to make this order?");
      if (confirmarPedido) {
        setCargando(true);
        await crear(e, "pedidos", nuevoPedido);
        await getPedidos();
        confirmar(setConfirmacion, "Pedido añadido con éxito");
        setTimeout(() => {
          router.push("/admin/pedidos");
        }, 1000);
      }
    }
  };

  return (
    <>
      {error && <Confirmacion mensaje={error} type={"error"} />}
      <div className="my-12 mx-8 w-full">
        <div className="mt-6 grid grid-cols-2">
          <div>
            <h1 className="pb-6 text-4xl font-bold">Make an order</h1>
            <form
              onSubmit={(e) => buscarProductos(e)}
              className="mx-auto grid grid-cols-2 items-center gap-4 px-6 font-semibold"
            >
              <div className="col-span-1">
                <label>Choose a supplier:</label>
                <select
                  onChange={(e) => seleccionarProveedor(e.target.value)}
                  value={proveedor}
                  className="campo bg-white"
                  name="proveedor"
                  type="number"
                >
                  <option value="">Choose</option>
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
                <label>Add products to the order</label>
              </div>
              <div className="col-span-2">
                <div className=" mx-16 flex items-center justify-center gap-6">
                  <input
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-[30rem] border-b-2 bg-stone-50 px-2 py-1 outline-none"
                    type="text"
                    placeholder="Search"
                  />
                  <button
                    className="rounded bg-sky-600 px-4 py-2 font-semibold text-white"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
                <div className="mt-8 max-h-96 overflow-y-scroll border-t py-2 ">
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
            </form>
          </div>
          <div className="w-full">
            <div className="flex items-center gap-6">
              <h2 className="mt-6 pb-6 text-2xl font-bold">Products added to the order</h2>
              <div className="flex justify-end gap-4">
                <button onClick={añadir} type="button" className="boton_update">
                 Make an order
                </button>
                <button type="button" onClick={() => router.back()} className="boton_cancelar2">
                  Cancel the order
                </button>
              </div>
            </div>
            <div className="border">
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
        </div>
      </div>
    </>
  );
};

export default Crear;
