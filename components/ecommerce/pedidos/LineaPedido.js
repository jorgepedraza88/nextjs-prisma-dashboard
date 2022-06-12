import { EyeIcon } from "@heroicons/react/solid";
import { confirmar, formatearDinero } from "../../../helpers/helper.js";
import { DateTime } from "luxon";

const LineaPedido = ({
  pedido,
  setConfirmacion,
  obtenerPedidos,
  setCargando,
  setVerPedido,
  setPedido,
}) => {
  const { number, status, date_created_gmt, total, customer_id, billing } = pedido;

  const fechaFormateada = DateTime.fromISO(date_created_gmt)
    .setLocale("es")
    .toLocaleString(DateTime.DATETIME_MED);

  const colores = () => {
    if (status === "completed") {
      return "bg-lime-600";
    } else if (status === "processing") {
      return "bg-amber-600";
    } else if (status === "cancelled") {
      return "bg-red-600";
    } else if (status === "refunded") {
      return "bg-fuchsia-700";
    }
  };

  const traduccionStatus = () => {
    if (status === "completed") {
      return "Completado";
    } else if (status === "processing") {
      return "Procesando";
    } else if (status === "cancelled") {
      return "Cancelado";
    } else if (status === "refunded") {
      return "Reembolsado";
    }
  };

  return (
    <tr className="border-b-[1px] hover:bg-sky-100">
      <td className="">#{number}</td>
      <td>
        {"Jorge"} {"Pedraza"}
      </td>
      <td>{fechaFormateada}</td>
      <td>{"correo@correo.com"}</td>
      <td>
        <div className={`mx-auto w-24 p-[2px] text-xs uppercase text-white ${colores()}`}>
          <p className="text-center">{traduccionStatus()}</p>
        </div>
      </td>
      <td>{formatearDinero(total)} €</td>
      <td className="flex justify-center gap-3">
        <EyeIcon
          onClick={() => {
            setVerPedido(true);
            setPedido(pedido);
          }}
          className="my-2 h-5 w-5 cursor-pointer text-sky-700"
        />
        {/* <TrashIcon className="my-2 h-5 w-5 cursor-pointer text-red-700" /> */}
      </td>
    </tr>
  );
};

export default LineaPedido;
