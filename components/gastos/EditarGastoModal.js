import { useState } from "react";
import { put } from "../../helpers/calls";
import { editando, confirmar, editandoNumero } from "../../helpers/helper";
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
import ModalConfirmacion from "../ModalConfirmacion";
import useProductos from "../../hooks/useProductos";

const EditarGastoModal = ({
  setEditarModal,
  setConfirmacion,
  getGastos,
  gastoModal,
  setGastoModal,
}) => {
  const { proveedores, cargando } = useProductos();
  const { fecha, tipo, proveedor, numFactura, coste, fechaVencimiento, id, status } = gastoModal;
  const [modal, setModal] = useState(false);
  const fechaFormateada = DateTime.fromISO(fecha).toJSDate();
  const vencimientoFormateado = DateTime.fromISO(fechaVencimiento).toJSDate();

  // Edición del formulario
  const editarLinea = (e) => {
    editando(e, setGastoModal, gastoModal);
  };
  const editarNumero = (e) => {
    editandoNumero(e, setGastoModal, gastoModal);
  };

  // Actualizar Gasto API
  const update = async (e) => {
    await put(e, "gastos", gastoModal, id);
    getGastos();
    setEditarModal(false);
    // confirmar(setConfirmacion, "Se ha editado con éxito");
  };

  return (
    <>
      <ModalConfirmacion
        mensaje={"Editar el Gasto"}
        modal={modal}
        confirmacion={update}
        cancelar={() => setModal(false)}
        cargando={cargando}
        type={"editar"}
      />
      <div className="fixed z-20 h-screen w-screen bg-stone-900 bg-opacity-80">
        <div className="mx-auto my-24 w-3/4  rounded bg-stone-50 py-8 xl:w-2/6">
          <p className="mb-6 px-6 text-2xl font-bold">Editar Gasto</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setModal(true);
            }}
            className="mx-auto grid grid-cols-2 items-center gap-4 px-6 font-semibold"
          >
            <div>
              <label>Fecha de emisión:</label>
              <DatePicker
                selected={fechaFormateada}
                onChange={(date) => {
                  setGastoModal({
                    ...gastoModal,
                    fecha: DateTime.fromJSDate(date).plus({ hours: 2 }).toISO(),
                  });
                }}
                locale="es"
                placeholderText="Selecciona una fecha"
                className="campo cursor-pointer"
                calendarClassName="capitalize font-medium"
                popperPlacement="bottom-end"
              />
            </div>
            <div>
              <label>Tipo de producto:</label>
              <select
                id="tipo"
                onChange={editarLinea}
                value={tipo}
                className="campo"
                name="tipo"
                type="text"
                placeholder="Tipo de Producto"
                required
              >
                <option>Selecciona tipo de gasto</option>
                <option value="Mercancia">Mercancia</option>
                <option value="Gastos Fijos">Gasto fijo</option>
              </select>
            </div>
            {tipo === "Mercancia" && (
              <div>
                <label>Proveedor:</label>
                <select
                  onChange={editarLinea}
                  value={proveedor}
                  className="campo"
                  name="proveedor"
                  type="text"
                  placeholder="Proveedor"
                >
                  <option value="">Selecciona proveedor</option>
                  {proveedores.map((proveedor) => (
                    <option key={proveedor.id} value={proveedor.nombre}>
                      {proveedor.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label>Número de Factura:</label>
              <input
                onChange={editarLinea}
                value={numFactura}
                className="campo"
                name="numFactura"
                type="text"
                placeholder="Número de Factura"
              />
            </div>
            <div>
              <label>Coste:</label>
              <input
                onChange={editarNumero}
                value={coste}
                className="campo"
                name="coste"
                type="number"
                placeholder="Coste de la factura"
              />
            </div>
            <div>
              <label>Fecha de Vencimiento:</label>
              <DatePicker
                selected={vencimientoFormateado}
                onChange={(date) => {
                  setGastoModal({
                    ...gastoModal,
                    fechaVencimiento: DateTime.fromJSDate(date).plus({ hours: 2 }).toISO(),
                  });
                }}
                locale="es"
                placeholderText="Selecciona una fecha"
                className="campo cursor-pointer"
                calendarClassName="capitalize font-medium"
                popperPlacement="bottom-end"
              />
            </div>
            <div>
              <label>Estado:</label>
              <select
                id="status"
                onChange={editarLinea}
                value={status}
                className="campo"
                name="status"
                type="text"
                placeholder="Tipo de Producto"
                required
              >
                <option>Selecciona tipo de gasto</option>
                <option value="Pagado">Pagado</option>
                <option value="Pendiente">Pendiente</option>
              </select>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <button type="submit" className="boton_guardar">
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setEditarModal(false)}
                className="boton_cancelar"
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarGastoModal;
