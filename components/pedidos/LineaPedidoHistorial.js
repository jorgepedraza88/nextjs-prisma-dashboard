import { EyeIcon } from "@heroicons/react/solid";
import { DateTime } from "luxon";
import Link from "next/link";

const LineaPedidoHistorial = ({ pedido, setConfirmacion, getPedidos, setCargando }) => {
  const { id, proveedor, fecha, coste, observaciones } = pedido;
  const fechaFormateada = DateTime.fromISO(fecha)
    .setLocale("es")
    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

  return (
    <>
      <tr className="border-b-[1px] hover:bg-sky-100">
        <td className="">{id}</td>
        <td>{proveedor}</td>
        <td>{fechaFormateada}</td>
        <td>{coste.toFixed(2)} €</td>
        <td>{observaciones ? <p>Sí</p> : <p> Ninguna </p>}</td>
        <td className="flex justify-center gap-3">
          <Link href={`/admin/pedidos/${id}`} passHref>
            <EyeIcon
              onClick={() => setCargando(true)}
              className="my-5 h-5 w-5 cursor-pointer text-sky-700"
            />
          </Link>
        </td>
      </tr>
    </>
  );
};

export default LineaPedidoHistorial;
