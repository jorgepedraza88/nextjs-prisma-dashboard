import { useState } from "react";
import { crear } from "../../helpers/calls";
import { editando, confirmar } from "../../helpers/helper";
import useProductos from "../../hooks/useProductos";
import ModalConfirmacion from "../ModalConfirmacion";

const AñadirProveedorModal = ({ setAñadirModal, setConfirmacion }) => {
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: "",
    tipo: "",
    contacto: "",
    email: "",
    cobros: "",
    reparto: "",
  });

  const { nombre, tipo, contacto, email, cobros, reparto } = nuevoProveedor;
  const { obtenerProveedores } = useProductos();
  const [modal, setModal] = useState(false);
  const [cargando, setCargando] = useState();

  const editarLinea = (e) => {
    editando(e, setNuevoProveedor, nuevoProveedor);
  };

  const añadir = async (e) => {
    setCargando(true);
    await crear(e, "proveedores", nuevoProveedor);
    await obtenerProveedores();
    await setAñadirModal(false);
    confirmar(setConfirmacion, "Se ha añadido con éxito");
  };

  return (
    <>
      <ModalConfirmacion
        nombre={nombre}
        mensaje={"Añadir Proveedor"}
        modal={modal}
        confirmacion={añadir}
        cancelar={() => setModal(false)}
        cargando={cargando}
        type={"añadir"}
      />
      <div className="fixed h-screen w-screen bg-stone-900 bg-opacity-80">
        <div className="mx-auto my-24 w-3/4  rounded bg-stone-50 py-8 xl:w-2/6">
          <p className="mb-6 px-6 text-2xl font-bold">Añadir proveedor</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setModal(true);
            }}
            className="mx-auto grid grid-cols-2 items-center gap-4 px-6 font-semibold"
          >
            <div>
              <label>Nombre:</label>
              <input
                onChange={editarLinea}
                id="nombre"
                value={nombre}
                className="campo"
                name="nombre"
                required
                type="text"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label>Tipo de producto:</label>
              <input
                id="tipo"
                onChange={editarLinea}
                value={tipo}
                className="campo"
                name="tipo"
                type="text"
                placeholder="Tipo de Producto"
              />
            </div>
            <div>
              <label>Contacto:</label>
              <input
                onChange={editarLinea}
                value={contacto}
                className="campo"
                name="contacto"
                type="text"
                placeholder="Teléfono"
              />
            </div>
            <div>
              <label>Email o Teléfono:</label>
              <input
                onChange={editarLinea}
                value={email}
                className="campo"
                name="email"
                type="text"
                placeholder="Email o Teléfono"
              />
            </div>
            <div>
              <label>Fecha de cobros:</label>
              <input
                onChange={editarLinea}
                value={cobros}
                className="campo"
                name="cobros"
                type="text"
                placeholder="Fecha de cobros"
              />
            </div>
            <div>
              <label>Reparto:</label>
              <input
                onChange={editarLinea}
                value={reparto}
                className="campo"
                name="reparto"
                type="text"
                placeholder="Reparto"
              />
            </div>
            <button type="submit" className="boton_guardar">
              Guardar Cambios
            </button>
            <button type="button" onClick={() => setAñadirModal(false)} className="boton_cancelar">
              Cerrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AñadirProveedorModal;
