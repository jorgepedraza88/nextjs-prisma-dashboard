import { useState } from "react";
import useProductos from "../../../hooks/useProductos";
import EstadisticasProductos from "../../../components/productos/EstadisticasProductos";
import LineaProducto from "../../../components/productos/LineaProducto";
import Paginacion from "../../../components/utilities/Paginacion";
import EditarProductoModal from "../../../components/productos/EditarProductoModal";
import AñadirStockModal from "../../../components/productos/AñadirStockModal";
import Notificacion from "../../../components/utilities/Notificacion";
import Confirmacion from "../../../components/utilities/Confirmacion";
import ProductosAgotados from "../../../components/productos/ProductosAgotados";
import { ExclamationIcon, ThumbDownIcon } from "@heroicons/react/solid";

export default function Productos() {
  const [modal, setModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [modalNotificaciones, setModalNotifaciones] = useState(false);
  const [confirmacion, setConfirmacion] = useState("");
  const [mostrarProductosCasiAgotados, setMostrarProductosCasiAgotados] = useState(false);

  const {
    productos,
    productoAgotado,
    productoCasiAgotado,
    productosCasiAgotados,
    setFiltroStock,
    setPagina,
    setCargando,
  } = useProductos();

  return (
    <>
      {/* MODALS */}
      {confirmacion && <Confirmacion mensaje={confirmacion} />}
      {modal && <EditarProductoModal setModal={setModal} setConfirmacion={setConfirmacion} />}
      {addModal && <AñadirStockModal setAddModal={setAddModal} setConfirmacion={setConfirmacion} />}
      {modalNotificaciones && (
        <ProductosAgotados
          productosAgotados={productoAgotado}
          setModalNotifaciones={setModalNotifaciones}
        />
      )}
      {/* FIN DE MODALS */}

      <div className="mx-8 my-8 w-full">
        <div className="flex items-center justify-between gap-6 pb-6">
          <p className="text-4xl font-black ">Products</p>
          {/* Notificaciones */}
          <div className="flex items-center gap-2">
            {productoAgotado ||
              (productoCasiAgotado && (
                <p className="mr-2 mt-2 text-right text-sm font-semibold">Notifications:</p>
              ))}

            <div
              onClick={() => {
                setMostrarProductosCasiAgotados(false);
                setFiltroStock("stock=0");
                setPagina(1);
              }}
            >
              {productoAgotado && (
                <Notificacion
                  icono={<ExclamationIcon className="h-5 w-5 text-white" />}
                  mensaje={"There are sold out products"}
                  color={"bg-red"}
                />
              )}
            </div>
            <div onClick={() => setMostrarProductosCasiAgotados(true)}>
              {productoCasiAgotado && (
                <Notificacion
                  icono={<ThumbDownIcon className="h-5 w-5 text-white" />}
                  mensaje={"There are products almost sold out"}
                  color={"bg-amber"}
                />
              )}
            </div>
          </div>
          {/* Fin Notificaciones */}
        </div>
        {/* Sección de estadísticas */}
        <EstadisticasProductos setMostrarProductosCasiAgotados={setMostrarProductosCasiAgotados} />

        <form>
          <table className="mt-5 w-full table-auto bg-white text-center font-medium shadow">
            <thead className="bg-sky-700 text-white">
              <tr>
                <th className="p-2 font-normal">SKU</th>
                <th className="p-2 font-normal">Name</th>
                <th className="p-2 font-normal">Category</th>
                <th className="p-2 font-normal">Supplier</th>
                <th className="p-2 font-normal">Type</th>
                <th className="p-2 font-normal">Stock in kg</th>
                <th className="p-2 file:font-normal">Warning</th>
                <th className="px-1 font-normal">Batch number</th>
                <th className="px-2 font-normal">Cost + VAT</th>
                <th className="p-2 font-normal">Price + VAT</th>
                <th className="font-normal">Profit</th>
                <th className="p-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mostrarProductosCasiAgotados
                ? productosCasiAgotados.map((productoFiltrados) => (
                    <LineaProducto
                      key={productoFiltrados.id}
                      producto={productoFiltrados}
                      setModal={setModal}
                      setAddModal={setAddModal}
                      setConfirmacion={setConfirmacion}
                      setCargando={setCargando}
                    />
                  ))
                : productos.map((producto) => (
                    <LineaProducto
                      key={producto.id}
                      producto={producto}
                      setModal={setModal}
                      setAddModal={setAddModal}
                      setConfirmacion={setConfirmacion}
                      setCargando={setCargando}
                    />
                  ))}
            </tbody>
          </table>
        </form>
        {/* Paginación */}
        <Paginacion />
      </div>
    </>
  );
}
