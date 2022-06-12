import { ChevronUpIcon, BellIcon } from "@heroicons/react/solid";
import { LogoutIcon, MenuIcon } from "@heroicons/react/outline";
import Link from "next/link";
import NotificacionHeader from "./utilities/NotificacionHeader";
import useProductos from "../hooks/useProductos";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";

const Header = ({ sidebar, setSidebar, setMostrarNotificacion, mostrarNotificacion }) => {
  const { gastos, productoAgotado, productoCasiAgotado, ordersPendientes } = useProductos();

  // Mostrar - Ocultar Sidebar
  const Toggle = () => {
    setSidebar(!sidebar);
  };

  // Comprobar si hay algún gasto pendiente
  const gastosPendientes = gastos.some((gasto) => {
    return gasto.fechaVencimiento < DateTime.now().toISO() && gasto.status !== "Pagado";
  });

  return (
    <header className="hidden lg:flex items-center justify-between bg-gradient-to-r from-stone-200 to-stone-100 py-2 px-8 shadow">
      <div className="flex items-center gap-6">
        <MenuIcon
          className="h-10 w-10 cursor-pointer rounded-md p-2 text-stone-700 hover:bg-stone-300"
          onClick={Toggle}
        />
        <div>
          <p className="text-2xl font-black">
            <span className="text-3xl font-black text-sky-700">SuperAdmin</span>
            Panel
          </p>
        </div>
        <p>This a DEMO version, I am still working on this dashboard</p>
      </div>
      <div className="hidden items-center justify-between gap-4 md:flex">
        <div className="relative ">
          <BellIcon
            onClick={() => setMostrarNotificacion(!mostrarNotificacion)}
            className={`mt-1 h-5 w-5 cursor-pointer`}
          />
          {(productoAgotado ||
            productoCasiAgotado ||
            gastosPendientes ||
            ordersPendientes) && (
              <div className="absolute -right-0 top-[2px] flex h-2 w-2 animate-bounce items-center justify-center rounded-full bg-red-600 text-xs text-white"></div>
            )}

          <div
            className={`z-1 absolute right-0 z-10 mt-1 w-80 rounded-md border bg-stone-100 px-2 py-2 drop-shadow-lg transition-all  ${
              mostrarNotificacion ? "visible translate-y-2" : "invisible opacity-0"
            }`}
          >
            {!productoAgotado && !productoCasiAgotado && !ordersPendientes && !gastosPendientes && (
              <p className="px-2 py-10">There are no notifications</p>
            )}
            {productoAgotado && (
              <NotificacionHeader
                id={"stockAgotado"}
                mensaje={"Some products are sold out"}
                setMostrarNotificacion={setMostrarNotificacion}
              />
            )}
            {productoCasiAgotado && (
              <NotificacionHeader
                id={"casiAgotado"}
                mensaje={"Some products are close to sold out"}
                setMostrarNotificacion={setMostrarNotificacion}
              />
            )}
            {gastosPendientes && (
              <NotificacionHeader
                id={"gastos"}
                mensaje={"You have expenses pending to review"}
                setMostrarNotificacion={setMostrarNotificacion}
              />
            )}
            {ordersPendientes && (
              <NotificacionHeader
                id={"pedidoOnline"}
                mensaje={"You have ecommerce orders"}
                setMostrarNotificacion={setMostrarNotificacion}
              />
            )}
            <ChevronUpIcon
              onClick={() => setMostrarNotificacion(false)}
              className="mx-auto h-4 w-20 cursor-pointer rounded bg-stone-200 transition-all hover:bg-stone-300"
            />
          </div>
        </div>
        <p>Logout</p>
        <Link href="/" passHref>
          <LogoutIcon className={`h-6 w-6 cursor-pointer`} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
