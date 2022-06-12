import { useState } from "react";
import { DateTime } from "luxon";
import { putPedido } from "../../../helpers/calls.js";
import useProductos from "../../../hooks/useProductos.js";

const VerPedidoModal = ({ pedido, setVerPedido, obtenerPedidos }) => {

  const { setCargando, obtenerPedidosEcommerce } = useProductos();
  const {
    billing,
    status,
    codigoPostal,
    total,
    id,
    line_items,
    payment_method_title,
    shipping_lines,
    date_created_gmt,
  } = pedido;

  const { first_name, last_name, email, address_1, address_2, city, state, postcode, phone } =
    billing;

  const [estadoPedido, setEstadoPedido] = useState({
    status: status,
  });

  const update = async () => {
    setCargando(true);
    await putPedido("ecommerce/pedidos", estadoPedido, id);
    await obtenerPedidosEcommerce();
    await obtenerPedidos();
    setVerPedido(false);
  };

  const fechaFormateada = DateTime.fromISO(date_created_gmt)
    .setLocale("es")
    .toLocaleString(DateTime.DATETIME_MED);

  return (
    <div className="fixed h-screen w-screen bg-stone-900 bg-opacity-80">
      <div className="mx-auto my-16 h-3/4 w-3/4 overflow-y-scroll rounded-lg bg-stone-50 py-8 px-4 xl:w-2/6">
        <div className="mb-6 flex items-center justify-between">
          <p className=" text-2xl font-bold">Ver Pedido #{id}</p>
          <p>
            <span className="font-semibold">Realizado el:</span> {fechaFormateada}
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div className="mb-12 flex flex-col gap-1">
            <p>
              <span className="font-semibold">Nombre:</span> {first_name} {last_name}
            </p>
            <p>
              <span className="font-semibold">Dirección:</span> {address_1}, {city}, {state}
            </p>
            <p>
              <span className="font-semibold">Codigo Postal:</span> {postcode}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p>
              <span className="font-semibold">Teléfono:</span> {phone}
            </p>
          </div>
          <div className="mb-12 flex flex-col gap-1">
            <p>
              <span className="font-semibold">Método de pago:</span> {payment_method_title}
            </p>
            <p>
              <span className="font-semibold">Tipo de envío:</span> {shipping_lines.method_title}
            </p>
            <label className="font-semibold">Estado:</label>
            <select
              onChange={(e) => setEstadoPedido({ status: e.target.value })}
              value={estadoPedido.status}
              className="campo"
            >
              <option value="pending">Pendiente</option>
              <option value="processing">Procesando</option>
              <option value="completed">Completado</option>
              <option value="refund">Reembolsado</option>
              <option value="cancelled">Cancelado</option>
              <option value="on-hold">En espera</option>
              <option value="failed">Fallido</option>
            </select>
          </div>
        </div>
        <div>
          <table className="text-md mt-5 w-full table-auto bg-white text-center font-medium shadow">
            <thead className="bg-sky-700 text-white">
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {line_items?.map((producto) => (
                <tr className="border-b-[1px]" key={producto.id}>
                  <td>{producto.name}</td>
                  <td>{producto.quantity}</td>
                  <td>{producto.total} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={update} type="button" className="boton_guardar">
          Guardar Cambios
        </button>
        <button type="button" onClick={() => setVerPedido(false)} className="boton_cancelar">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default VerPedidoModal;
