import { useState } from "react";
import { crear } from "../../helpers/calls";
import { editando, confirmar, editandoNumero } from "../../helpers/helper";
import useProductos from "../../hooks/useProductos";
import ModalConfirmacion from "../ModalConfirmacion";
import DatePicker from "react-datepicker";

const AñadirGastoModal = ({ setAñadirModal, setConfirmacion, getGastos }) => {
  const { proveedores, setCargando, cargando } = useProductos();
  const [modal, setModal] = useState(false);
  const [nuevoGasto, setNuevoGasto] = useState({
    fecha: "",
    tipo: "",
    proveedor: "N/A",
    numFactura: "",
    coste: "",
    fechaVencimiento: "",
  });
  const { fecha, tipo, proveedor, numFactura, coste, fechaVencimiento } = nuevoGasto;

  const editarLinea = (e) => {
    editando(e, setNuevoGasto, nuevoGasto);
  };
  const editarNumero = (e) => {
    editandoNumero(e, setNuevoGasto, nuevoGasto);
  };

  // Añadir Gasto API
  const añadir = async (e) => {
    setCargando(true);
    await crear(e, "gastos", nuevoGasto);
    await getGastos();
    await setAñadirModal(false);
    // confirmar(setConfirmacion, "Se ha añadido con éxito");
  };

  return (
    <>
      <ModalConfirmacion
        mensaje={"Añadir Gasto"}
        modal={modal}
        confirmacion={añadir}
        cancelar={() => setModal(false)}
        cargando={cargando}
        type={"añadir"}
      />
      <div className="fixed z-20 h-screen w-screen bg-stone-900 bg-opacity-80">
        <div className="mx-auto my-24 w-3/4  rounded bg-stone-50 py-8 xl:w-2/6">
          <p className="mb-6 px-6 text-2xl font-bold">Añadir Gasto</p>
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
                selected={fecha}
                onChange={(date) => {
                  setNuevoGasto({ ...nuevoGasto, fecha: date });
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
                selected={fechaVencimiento}
                onChange={(date) => {
                  setNuevoGasto({
                    ...nuevoGasto,
                    fechaVencimiento: date,
                  });
                }}
                locale="es"
                placeholderText="Selecciona una fecha"
                className="campo cursor-pointer"
                calendarClassName="capitalize font-medium"
                popperPlacement="bottom-end"
              />
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <button type="submit" className="boton_guardar">
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setAñadirModal(false)}
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

export default AñadirGastoModal;
