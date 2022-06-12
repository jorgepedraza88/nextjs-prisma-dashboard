import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import useProductos from "../../hooks/useProductos";

const Paginacion = () => {
  const { pagina, cuentaProductos, setPagina } = useProductos();

  const cambiarPagina = (num) => {
    if (num < 1 || num > cuentaProductos / 50 + 1) {
      return;
    }
    setPagina(num);
  };

  return (
    <div className="mx-auto flex w-full items-center justify-center gap-6 rounded bg-sky-700 py-2 px-4">
      <ChevronLeftIcon
        onClick={() => cambiarPagina(pagina - 1)}
        className="h-6 w-6 cursor-pointer text-stone-200"
      />
      <p className="font-semibold text-white">Page {pagina}</p>
      <ChevronRightIcon
        onClick={() => cambiarPagina(pagina + 1)}
        className="h-6 w-6 cursor-pointer text-stone-200"
      />
    </div>
  );
};

export default Paginacion;
