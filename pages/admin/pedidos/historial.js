import { useState, useEffect } from "react";
import { get } from "../../../helpers/calls";
import LineaPedidoHistorial from "../../../components/pedidos/LineaPedidoHistorial";
import Confirmacion from "../../../components/utilities/Confirmacion";
import useProductos from "../../../hooks/useProductos";

const Historial = () => {
  const { setCargando } = useProductos();
  const [pedidos, setPedidos] = useState([]);
  const [confirmacion, setConfirmacion] = useState("");

  const getPedidos = async () => {
    setCargando(true);
    await get("pedidos/historial", setPedidos);
    setCargando(false);
  };

  useEffect(() => {
    getPedidos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {confirmacion && <Confirmacion mensaje={confirmacion} />}
      <div className="my-12 mx-8 w-full">
        <div className="flex items-center justify-between">
          <h2 className="pb-6 text-4xl font-bold">Orders History</h2>
        </div>
        <table className="text-mdfont-medium mt-5 w-full table-auto bg-white text-center shadow">
          <thead className="bg-sky-700 text-white">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Supplier</th>
              <th className="p-2">Date</th>
              <th className="p-2">Cost + VAT</th>
              <th className="p-2">Observaciones</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <LineaPedidoHistorial
                key={pedido.id}
                pedido={pedido}
                setConfirmacion={setConfirmacion}
                getPedidos={getPedidos}
                setCargando={setCargando}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Historial;
