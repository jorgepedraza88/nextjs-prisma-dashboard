import { useState } from "react";
import LineaProveedor from "../../components/proveedores/LineaProveedor";
import EditarProveedorModal from "../../components/proveedores/EditarProveedorModal";
import AñadirProveedorModal from "../../components/proveedores/AñadirProveedorModal";
import Confirmacion from "../../components/utilities/Confirmacion";
import useProductos from "../../hooks/useProductos";
import { PlusCircleIcon } from "@heroicons/react/solid";

const Proveedores = () => {
  const { proveedores } = useProductos();
  const [modal, setModal] = useState(false);
  const [confirmacion, setConfirmacion] = useState("");
  const [añadirModal, setAñadirModal] = useState(false);
  const [proveedorModal, setProveedorModal] = useState({});

  return (
    <>
      {confirmacion && <Confirmacion mensaje={confirmacion} />}
      {modal && (
        <EditarProveedorModal
          setModal={setModal}
          proveedorModal={proveedorModal}
          setProveedorModal={setProveedorModal}
          setConfirmacion={setConfirmacion}
        />
      )}
      {añadirModal && (
        <AñadirProveedorModal setAñadirModal={setAñadirModal} setConfirmacion={setConfirmacion} />
      )}

      <div className="my-12 mx-8 w-full">
        <div className="flex items-center justify-between">
          <h2 className="pb-6 text-4xl font-bold">Suppliers</h2>
          <div
            onClick={() => setAñadirModal(true)}
            className="flex justify-center gap-2 rounded bg-sky-700 py-1 px-10 font-semibold uppercase text-white shadow transition-all hover:cursor-pointer hover:bg-sky-800"
          >
            <PlusCircleIcon className="mt-[2px] h-5 w-5 text-white" />
            <p>Add supplier</p>
          </div>
        </div>
        <table className="mt-5 w-full table-auto bg-white text-center text-sm font-medium shadow">
          <thead className="bg-sky-700 text-white">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Type of Product</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Email</th>
              <th className="p-2">Billing date</th>
              <th className="p-2">Reparto</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <LineaProveedor
                key={proveedor.id}
                proveedor={proveedor}
                setModal={setModal}
                setProveedorModal={setProveedorModal}
                setConfirmacion={setConfirmacion}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Proveedores;
