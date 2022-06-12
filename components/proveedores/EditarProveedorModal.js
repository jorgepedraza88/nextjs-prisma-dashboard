import { editando, confirmar } from "../../helpers/helper";
import { put } from "../../helpers/calls";
import useProductos from "../../hooks/useProductos";

const EditarProveedorModal = ({
  setModal,
  setProveedorModal,
  proveedorModal,
  setConfirmacion,
}) => {
  const { obtenerProveedores, setCargando } = useProductos();
  const { id, nombre, tipo, contacto, email, cobros, reparto } = proveedorModal;

  const editarLinea = (e) => {
    editando(e, setProveedorModal, proveedorModal);
  };

  const update = async (e) => {
    setCargando(true)
    await put(e, "proveedores", proveedorModal, id);
    await obtenerProveedores()
    await setModal(false);
    setCargando(false)
    confirmar(setConfirmacion, "Se ha editado con éxito");
  };

  return (
    <div className="fixed h-screen w-screen bg-stone-900 bg-opacity-80">
      <div className="mx-auto my-24 w-3/4  rounded bg-stone-50 py-8 xl:w-2/6">
        <p className="mb-6 px-6 text-2xl font-bold">Editar Proveedor</p>
        <form
          onSubmit={(e) => update(e)}
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
              type="text"
              required
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
              placeholder="Contacto y Teléfono"
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
          <button
            type="submit"
            className="boton_guardar"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={() => setModal(false)}
            className="boton_cancelar"
          >
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarProveedorModal;
