import { CurrencyEuroIcon, XCircleIcon, TrendingDownIcon, TruckIcon } from "@heroicons/react/solid";
import Link from "next/link";

const NotificacionHeader = ({ id, mensaje, setMostrarNotificacion }) => {
  const iconos = () => {
    if (id === "gastos") {
      return <CurrencyEuroIcon className={`h-6 w-6 text-lime-600`} />;
    } else if (id === "stockAgotado") {
      return <XCircleIcon className={`h-6 w-6 text-red-600`} />;
    } else if (id === "casiAgotado") {
      return <TrendingDownIcon className={`h-6 w-6 text-amber-600`} />;
    } else if (id === "pedidoOnline") {
      return <TruckIcon className={`h-6 w-6 text-purple-600`} />;
    }
  };

  const ocultarModal = () => {
    setMostrarNotificacion(false);
  };

  return (
    <Link href={`/admin/${id === "gastos" ? "gastos" : id === "pedidoOnline" ? "ecommerce/pedidos" : "productos" }`} passHref>
      <div
        onClick={ocultarModal}
        className={`my-2 flex cursor-pointer items-center gap-3 rounded-sm bg-white py-2 px-1 text-[0.8rem] font-medium hover:bg-sky-50`}
      >
        {iconos()}
        <p>{mensaje}</p>
      </div>
    </Link>
  );
};

export default NotificacionHeader;
