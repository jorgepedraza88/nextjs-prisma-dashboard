import { CheckIcon } from "@heroicons/react/solid";
import { del } from "../../helpers/calls";
import { confirmar } from "../../helpers/helper";
import { useState } from "react";

const LineaPedidoId = ({
  producto,
  setConfirmacion,
  refreshData,
  pedidoRevisado,
  productosStats,
  statusRevisado,
}) => {
  const { id, productoId, nombre, stock } = producto;

  const stockDisponible = productosStats.filter(
    (producto) => producto.id === productoId
  );
  const stockNuevo = stockDisponible[0]?.stock;

  const [nuevoStock, setNuevoStock] = useState({
    id: productoId,
    stock: stock + stockNuevo,
  });

  const [revisado, setRevisado] = useState(false);

  //* Borrar Producto del pedido
  const borrar = async () => {
    const confirmarEliminar = confirm("¿Deseas eliminar este producto?");
    if (confirmarEliminar) {
      await del("pedidos/productos", id);
      refreshData();
      confirmar(setConfirmacion, "Se ha eliminado con éxito");
    }
  };
  //* Añadir producto al State después de revisarlo
  const revisarPedido = () => {
    if (!pedidoRevisado.some((e) => e.id === id)) {
      setRevisado(true);
      pedidoRevisado.push(nuevoStock);
      refreshData();
    }
  };

  return (
    <tr
      className={`border-b-[1px] hover:bg-sky-100 ${
        revisado && "border-b-lime-200 bg-lime-100 hover:bg-lime-200"
      } `}
    >
      <td className="py-2">{nombre}</td>
      <td>{stock}</td>
      {!statusRevisado && (
        <td>
          <div className="flex items-center justify-center gap-6">
            <p
              onClick={revisarPedido}
              className="cursor-pointer rounded bg-green-600 px-2 text-xs uppercase text-white"
            >
              {revisado ? <CheckIcon className="h-4 w-4" /> : "Revisar"}
            </p>
            {!revisado && (
              <p
                onClick={borrar}
                className="cursor-pointer rounded bg-red-600 px-2 text-xs uppercase text-white"
              >
                Eliminar
              </p>
            )}
          </div>
        </td>
      )}
    </tr>
  );
};

export default LineaPedidoId;
