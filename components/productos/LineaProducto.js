import { del } from "../../helpers/calls";
import useProductos from "../../hooks/useProductos";
import { editarModal, confirmar } from "../../helpers/helper";
import {
  PencilAltIcon,
  PlusCircleIcon,
  TrashIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";

const LineaProducto = ({ producto, setModal, setAddModal, setConfirmacion }) => {
  const { setProductoModal, obtenerProductos, proveedores, setCargando, setBusqueda } =
    useProductos();
  let {
    sku,
    nombre,
    stock,
    low_stock,
    numLote,
    categoria,
    proveedorId,
    coste,
    precioVenta,
    id,
    iva,
    tipo,
  } = producto;

  // Para mostrar nombre del proveedor en la lista
  const proveedor2 = proveedores.filter((proveedor) => proveedor.id === proveedorId);
  const proveedorNombre = proveedor2[0]?.nombre;

  // Cálculo coste de IVA
  const costeIVA = (coste * iva) / 100 + coste;
  // Cálculo del margen
  let margen = (((precioVenta - costeIVA) / precioVenta) * 100).toFixed(1);
  if (costeIVA === 0 || precioVenta === 0) {
    margen = 0;
  }

  // Colores para el margen de Beneficio
  const colorMargen = () => {
    if (margen < 30) {
      return "bg-red-500";
    } else if (margen > 30 && margen < 50) {
      return "bg-amber-500";
    } else {
      return "bg-green-600";
    }
  };

  // Borrar producto API
  const borrar = async () => {
    const confirmarEliminar = confirm("¿Deseas eliminar este producto?");
    if (confirmarEliminar) {
      await del("productos", id);
      await obtenerProductos();
      await setBusqueda("");
      confirmar(setConfirmacion, "Se ha eliminado con éxito");
      setCargando(false);
    }
  };

  return (
    <tr className="border-b-[1px] hover:bg-sky-100">
      <td className="py-[6px]">{sku}</td>
      <td>
        <div className="flex items-center justify-center gap-4">
          {stock === 0 && <ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
          {nombre}
        </div>
      </td>
      <td>{categoria}</td>
      <td>{proveedorNombre}</td>
      <td>{tipo}</td>
      <td>
        <div className={`ml-2 grid grid-cols-2 items-center justify-center gap-1 px-4`}>
          {stock}
          <PlusCircleIcon
            onClick={() => editarModal(setProductoModal, producto, setAddModal)}
            className="h-5 w-5 cursor-pointer text-sky-700"
          />
        </div>
      </td>
      <td className={`${stock <= low_stock && stock > 0 ? "rounded bg-amber-300" : ""}`}>
        {low_stock}
      </td>
      <td>{numLote}</td>
      <td>{costeIVA.toFixed(2)} €</td>
      <td>{precioVenta} €</td>
      <td>
        <div className={`${colorMargen()} text-sm text-white`}>{margen}%</div>
      </td>
      <td className="flex items-center justify-center gap-2">
        <PencilAltIcon
          onClick={() => editarModal(setProductoModal, producto, setModal)}
          className="my-1 h-6 w-6 cursor-pointer text-sky-700"
        />
        <TrashIcon className="h-6 w-6 cursor-pointer text-red-700" onClick={borrar} />
      </td>
    </tr>
  );
};

export default LineaProducto;
