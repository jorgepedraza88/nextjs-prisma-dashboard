import { useCallback, useState, useEffect } from "react";
import { get } from "../../../helpers/calls";
import Link from "next/link";
import LineaPedido from "../../../components/pedidos/LineaPedido";
import AñadirPedidoModal from "../../../components/pedidos/AñadirPedidoModal";
import Confirmacion from "../../../components/utilities/Confirmacion";
import useProductos from "../../../hooks/useProductos";
import { PlusCircleIcon } from "@heroicons/react/solid";

const Pedidos = () => {
  const { setCargando, pedidos, setPedidos } = useProductos();
  const [añadirModal, setAñadirModal] = useState(false);
  const [confirmacion, setConfirmacion] = useState("");

  const getPedidos = useCallback(async () => {
    setCargando(true);
    await get("pedidos", setPedidos);
    setCargando(false);
  }, [setCargando, setPedidos]);

  useEffect(() => {
    getPedidos();
  }, [getPedidos]);

  return (
    <>
      {confirmacion && <Confirmacion mensaje={confirmacion} />}
      {añadirModal && (
        <AñadirPedidoModal
          setAñadirModal={setAñadirModal}
          setConfirmacion={setConfirmacion}
          getPedidos={getPedidos}
        />
      )}
      <div className="my-12 mx-8 w-full">
        <div className="flex items-center justify-between">
          <h1 className="pb-6 text-4xl font-bold">Orders to Suppliers</h1>
          <div className="flex items-center gap-6">
            <Link href={"/admin/pedidos/historial"} passHref>
              <p className="cursor-pointer text-sm">Orders history</p>
            </Link>
            <Link href="/admin/pedidos/crear" passHref>
              <div className="flex justify-center gap-2 rounded bg-green-700 py-1 px-10 font-semibold uppercase text-white shadow transition-all hover:cursor-pointer hover:bg-green-800">
                <PlusCircleIcon className="mt-[2px] h-5 w-5 text-white" />
                <p>Make an order</p>
              </div>
            </Link>
          </div>
        </div>
        <table className="text-md mt-5 w-full table-auto bg-white text-center font-medium shadow">
          <thead className="bg-sky-700 text-white">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Supplier</th>
              <th className="p-2">Date</th>
              <th className="p-2">Cost + VAT</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pedidos?.map((pedido) => (
              <LineaPedido
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

export default Pedidos;
