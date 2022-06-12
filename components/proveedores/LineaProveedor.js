import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { editarModal, confirmar } from "../../helpers/helper";
import { del } from "../../helpers/calls";
import useProductos from "../../hooks/useProductos";

const LineaProveedor = ({ proveedor, setModal, setProveedorModal, setConfirmacion }) => {
  const { id, nombre, tipo, contacto, email, cobros, reparto } = proveedor;
  const { obtenerProveedores } = useProductos();

  // Borrar Proveedor API
  const borrar = async () => {
    const confirmacion = confirm(
      "¿Deseas eliminar este proveedor? Este proveedor puede tener productos asociados, tendrás que asociarlos de nuevo"
    );
    if (confirmacion) {
      await del("proveedores", id);
      await obtenerProveedores();
      confirmar(setConfirmacion, "Se ha eliminado con éxito");
    }
  };

  return (
    <tr className="border-b-[1px] hover:bg-sky-100">
      <td className="py-2">{nombre}</td>
      <td>{tipo}</td>
      <td>{contacto}</td>
      <td>{email}</td>
      <td>{cobros}</td>
      <td>{reparto}</td>
      <td className="flex justify-center gap-2">
        <PencilAltIcon
          className="my-2 h-5 w-5 cursor-pointer text-sky-700"
          onClick={() => editarModal(setProveedorModal, proveedor, setModal)}
        />
        <TrashIcon className="my-2 h-5 w-5 cursor-pointer text-red-700" onClick={borrar} />
      </td>
    </tr>
  );
};

export default LineaProveedor;
