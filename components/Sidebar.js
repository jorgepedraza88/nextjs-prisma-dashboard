import { useState } from "react";
import EnlaceMenu from "./EnlaceMenu";
import {
  ChartBarIcon,
  ClipboardListIcon,
  TruckIcon,
  ViewListIcon,
  TrendingDownIcon,
  BriefcaseIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  DesktopComputerIcon,
  ExternalLinkIcon,
  PencilAltIcon,
  PencilIcon,
} from "@heroicons/react/solid";

const Sidebar = ({ sidebar }) => {

  return (
    <div
      className={`hidden min-h-screen w-60 select-none flex-col gap-4 rounded-br-lg bg-gradient-to-b from-stone-200 to-stone-100 px-3 pt-4 shadow-md transition-all duration-200 md:flex lg:px-6 ${
        sidebar && "w-0 px-0 opacity-0 lg:px-0"
      }`}
    >
      <EnlaceMenu
        nombre={"Sales"}
        icon={<ChartBarIcon className="icon_sidebar" />}
        enlace={"/admin/"}
        sidebar={sidebar}
      />
      <EnlaceMenu
        nombre={"Products"}
        icon={<ViewListIcon className="icon_sidebar" />}
        enlace={"/admin/productos"}
        sidebar={sidebar}
      />
      <EnlaceMenu
        nombre={"Suppliers"}
        icon={<TruckIcon className="icon_sidebar" />}
        enlace={"/admin/proveedores"}
        sidebar={sidebar}
      />
      <EnlaceMenu
        nombre={"Orders"}
        icon={<ClipboardListIcon className="icon_sidebar" />}
        enlace={"/admin/pedidos"}
        sidebar={sidebar}
      />
      <EnlaceMenu
        nombre={"Expenses"}
        icon={<TrendingDownIcon className="icon_sidebar" />}
        enlace={"/admin/gastos"}
        sidebar={sidebar}
      />
      <EnlaceMenu
        nombre={"Batch Control"}
        icon={<PencilIcon className="icon_sidebar" />}
        enlace={"/admin/lotes"}
        sidebar={sidebar}
      />

      <div className="flex items-center justify-center gap-2">
        <hr className="rounded bg-gradient-to-r from-transparent to-stone-400 px-4 py-[0.7px]" />
        <p className="text-center font-semibold uppercase text-stone-400">Ecommerce</p>
        <hr className="rounded bg-gradient-to-l from-transparent to-stone-400 px-4 py-[0.7px]" />
      </div>
      <EnlaceMenu
        nombre={"Pedidos"}
        icon={<CreditCardIcon className="icon_sidebar" />}
        enlace={"/admin/ecommerce/pedidos"}
        sidebar={sidebar}
      />
      <EnlaceMenu
        nombre={"Wordpress"}
        icon={<ExternalLinkIcon className="icon_sidebar" />}
        enlace={"/admin"}
        sidebar={sidebar}
      />
    </div>
  );
};

export default Sidebar;
