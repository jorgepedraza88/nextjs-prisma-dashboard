import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { confirmar, formatearDinero } from "../../helpers/helper";
import { del } from "../../helpers/calls";
import { DateTime } from "luxon";
import Link from "next/link";

const LineaPedido = ({ pedido, setConfirmacion, getPedidos, setCargando }) => {
  const { id, proveedor, fecha, coste } = pedido;

  const fechaFormateada = DateTime.fromISO(fecha)
    .setLocale("es")
    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

  const borrar = async () => {
    const confirmarEliminar = confirm("¿Deseas eliminar este producto?");
    if (confirmarEliminar) {
      setCargando(true);
      await del("pedidos", id);
      await getPedidos();
      confirmar(setConfirmacion, "Se ha eliminado con éxito");
    }
  };

  return (
    <tr className="border-b-[1px] hover:bg-sky-100">
      <td className="">{id}</td>
      <td>{proveedor}</td>
      <td>{fechaFormateada}</td>
      <td>{formatearDinero(coste)}</td>
      <td className="flex justify-center gap-3">
        <Link href={`/admin/pedidos/${id}`} passHref>
          <PencilAltIcon
            onClick={() => setCargando(true)}
            className="my-2 h-5 w-5 cursor-pointer text-sky-700"
          />
        </Link>

        <TrashIcon className="my-2 h-5 w-5 cursor-pointer text-red-700" onClick={borrar} />
      </td>
    </tr>
  );
};

export default LineaPedido;
