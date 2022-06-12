import { SearchIcon, RefreshIcon, PlusCircleIcon } from "@heroicons/react/solid";
import useProductos from "../../hooks/useProductos";
import Link from "next/link";
import { useState } from "react";

const FiltrosProductos = ({ setMostrarProductosCasiAgotados }) => {
  const {
    categoria,
    setCategoria,
    setBusqueda,
    setPagina,
    proveedores,
    setProveedorFiltro,
    proveedorFiltro,
    setFiltroStock,
    categorias,
    obtenerProductos,
  } = useProductos();

  const [buscar, setBuscar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setBusqueda(buscar);
    setPagina(1);
  };
  // Botón para resetear la lista
  const resetear = () => {
    setCategoria("");
    setProveedorFiltro("");
    setBuscar("");
    setBusqueda("");
    setFiltroStock("");
    setMostrarProductosCasiAgotados(false);
    setPagina(1);
  };

  return (
    <div className="col-span-2 mt-6 grid grid-cols-6 items-center justify-center gap-3 text-[14px] font-semibold">
      <div className="flex items-center gap-2">
        <p>Categories:</p>
        <select
          value={categoria}
          onChange={(e) => {
            setCategoria(e.target.value);
            setPagina(1);
          }}
          className="w-[80%] px-2 py-1 outline-none"
        >
          <option value={""} className="text-stone-400">
            All
          </option>
          {categorias?.map((categoria) => (
            <option key={categoria.id} value={`categoria=${categoria.nombre}`}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <p>Supplier:</p>
        <select
          value={proveedorFiltro}
          onChange={(e) => {
            setProveedorFiltro(e.target.value);
            setPagina(1);
          }}
          className="w-[80%] px-2 py-1 outline-none"
        >
          <option value={""} className="text-stone-400">
            All
          </option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.id} value={`proveedorId=${proveedor.id}`}>
              {proveedor.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-2 flex items-center gap-2">
        <label htmlFor="buscar">
          <SearchIcon className="h-5 w-5" />
        </label>
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            id="buscar"
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            className="w-full border-b-2 px-2 py-1 outline-none"
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
      <div
        onClick={resetear}
        className="flex justify-center gap-4 rounded bg-sky-700 py-2 px-4 font-semibold text-white shadow transition-all hover:cursor-pointer hover:bg-sky-800 "
      >
        <RefreshIcon className="mt-[2px] h-5 w-5 text-white transition-transform hover:rotate-180" />
        <p className="mt-[2px] text-xs">Reset list</p>
      </div>
      <Link href={"/admin/productos/crearProducto"} passHref>
        <div className="flex items-center justify-center gap-4 rounded bg-green-600 py-2 px-4 font-semibold text-white shadow transition-all hover:cursor-pointer hover:bg-green-800 ">
          <PlusCircleIcon className="h-5 w-5 text-white" />
          <p className="mt-[2px] text-xs">Add product</p>
        </div>
      </Link>
    </div>
  );
};

export default FiltrosProductos;
