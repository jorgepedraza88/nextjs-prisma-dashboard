import { CheckCircleIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { DateTime } from "luxon";
import { editarModal } from "../../helpers/helper";
import { putPedido, del } from "../../helpers/calls";

const LineaGastos = ({ gasto, getGastos, setCargando, setGastoModal, setEditarModal }) => {
  const { id, fecha, proveedor, numFactura, coste, fechaVencimiento, status, tipo } = gasto;

  // Formatear Fechas
  const today = DateTime.now().toISO();
  const fechaFormateada = DateTime.fromISO(fecha)
    .setLocale("es")
    .toLocaleString(DateTime.DATE_SHORT);
  const vencimiento = DateTime.fromISO(fechaVencimiento)
    .setLocale("es")
    .toLocaleString(DateTime.DATE_SHORT);

  // Función para setear el gasto a PAGADO clickando el ICONO
  const comprobar = async () => {
    setCargando(true);
    await putPedido("gastos", { status: "Pagado" }, id);
    getGastos();
    setCargando(false);
  };

  // Borrar Gasto
  const borrar = async () => {
    const confirmarEliminar = confirm("Do you want to remove this expense?");
    if (confirmarEliminar) {
      await del("gastos", id);
      await getGastos();
      // confirmar(setConfirmacion, "Se ha eliminado con éxito");
      setCargando(false);
    }
  };

  return (
    <tr className={`border-b-[1px] hover:bg-sky-100`}>
      <td className="py-2">{fechaFormateada}</td>
      <td>
        <div
          className={`${
            tipo === "Gastos Fijos" ? "bg-amber-600" : "bg-indigo-600"
          } mx-auto w-24 p-[2px] text-xs uppercase text-white`}
        >
          {tipo}
        </div>
      </td>
      <td>{proveedor}</td>
      <td>{numFactura}</td>
      <td className="w-40">{coste.toFixed(2)} €</td>
      <td
        className={`${
          (fechaVencimiento < today) & (status !== "Pagado") && "bg-amber-500 text-white"
        } w-44`}
      >
        {vencimiento}
      </td>
      <td>
        <div
          className={`${
            status === "Pagado" ? "bg-lime-600" : "bg-red-600"
          } mx-auto w-24 p-[2px] text-xs uppercase text-white`}
        >
          {status}
        </div>
      </td>
      <td className="flex items-center justify-center gap-2">
        {status !== "Pagado" && (
          <CheckCircleIcon
            onClick={() => comprobar()}
            className="h-6 w-6 cursor-pointer text-green-600"
          />
        )}

        <PencilAltIcon
          onClick={() => editarModal(setGastoModal, gasto, setEditarModal)}
          className="my-1 h-6 w-6 cursor-pointer text-sky-700"
        />
        <TrashIcon className="h-6 w-6 cursor-pointer text-red-700" onClick={borrar} />
      </td>
    </tr>
  );
};

export default LineaGastos;
