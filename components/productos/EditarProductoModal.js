import useProductos from "../../hooks/useProductos";
import { editando, confirmar, editandoNumero } from "../../helpers/helper";
import { put } from "../../helpers/calls";
import { PencilIcon } from "@heroicons/react/solid";
import Link from "next/link";

const EditarProductoModal = ({ setModal, setConfirmacion }) => {
  const {
    productoModal,
    setProductoModal,
    obtenerProductos,
    proveedores,
    categorias,
    setCargando,
  } = useProductos();

  const {
    nombre,
    categoria,
    proveedorId,
    stock,
    low_stock,
    numLote,
    coste,
    precioVenta,
    id,
    iva,
    tipo,
    publicado,
    ecologico,
    sku,
  } = productoModal;

  const editarLinea = (e) => {
    editando(e, setProductoModal, productoModal);
  };
  const editarNumero = (e) => {
    editandoNumero(e, setProductoModal, productoModal);
  };

  const editarPublicado = (e) => {
    setProductoModal((prev) => ({ ...prev, [e.target.name]: e.target.value === "true" }));
  };


  const update = async (e) => {
    await put(e, "productos", productoModal, id);
    await obtenerProductos();
    await setModal(false);
    confirmar(setConfirmacion, "Se ha editado con éxito");
  };

  return (
    <>
      <div className="fixed h-screen w-screen bg-stone-900 bg-opacity-80">
        <div className="mx-auto my-24 w-3/4  rounded bg-stone-50 py-8 xl:w-2/6">
          <div className="flex items-center justify-between">
            <p className="mb-6 px-6 text-2xl font-bold">Edit Product</p>
            <div className="flex items-center gap-2">
              <PencilIcon className="mb-6 h-5 w-5" />
              <Link href={`/admin/productos/editar/${id}`} passHref>
                <p
                  onClick={() => setCargando(true)}
                  className="mb-6 pr-6 text-lg font-semibold hover:cursor-pointer hover:text-green-600"
                >
                  Edit more
                </p>
              </Link>
            </div>
          </div>
          <form
            onSubmit={(e) => update(e)}
            className="mx-auto grid grid-cols-2 items-center gap-4 px-6 font-semibold"
          >
            <div>
              <label>Name:</label>
              <input
                onChange={editarLinea}
                id="nombre"
                value={nombre}
                className="campo"
                name="nombre"
                type="text"
                required
                placeholder="Product's name"
              />
            </div>
            <div>
              <label>Category:</label>
              <select
                id="categoria"
                onChange={editarLinea}
                value={categoria}
                className="campo"
                name="categoria"
              >
                <option value="">Choose category</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.nombre}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Supplier:</label>
              <select
                onChange={editarNumero}
                value={proveedorId || undefined}
                className="campo"
                name="proveedorId"
              >
                <option value="">Choose supplier</option>
                {proveedores.map((proveedor) => (
                  <option key={proveedor.id} value={proveedor.id}>
                    {proveedor.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Stock:</label>
              <input
                onChange={editarNumero}
                value={stock}
                className="campo"
                name="stock"
                type="number"
                min="0"
                placeholder="Stock"
                step=".01"
              />
            </div>
            <div>
              <label>Stock Warning:</label>
              <input
                onChange={editarNumero}
                value={low_stock}
                className="campo"
                name="low_stock"
                type="number"
                min="0"
                step="any"
                placeholder="Limite de aviso"
              />
            </div>
            <div>
              <label>Batch number:</label>
              <input
                onChange={editarLinea}
                value={numLote}
                className="campo"
                name="numLote"
                type="text"
                placeholder="Número de Lote"
              />
            </div>
            <div>
              <label>Cost:</label>
              <input
                onChange={editarNumero}
                value={coste}
                className="campo"
                name="coste"
                type="number"
                min="0"
                step="any"
                placeholder="Coste por kg"
              />
            </div>
            <div>
              <label>VAT:</label>
              <select
                onChange={editarNumero}
                value={iva}
                className="campo"
                name="iva"
                type="number"
                step="any"
                placeholder="Tipo de IVA"
              >
                <option value="4">4%</option>
                <option value="10">10%</option>
                <option value="21">21%</option>
              </select>
            </div>
            <div>
              <label>*Type: (Bulk o Unity)</label>
              <select
                onChange={editarLinea}
                value={tipo}
                className="campo px-4"
                name="tipo"
                type="text"
                placeholder="G o U"
              >
                <option value="G">Bulk</option>
                <option value="U">Unity</option>
              </select>
            </div>
            <div>
              <label>Sale price:</label>
              <input
                onChange={editarNumero}
                value={precioVenta}
                className="campo"
                name="precioVenta"
                type="number"
                min="0"
                step="any"
                placeholder="Precio de Venta"
              />
            </div>
            <div>
              <label>¿Is it eco?</label>
              <select
                onChange={(e) => editarPublicado(e)}
                value={ecologico}
                className="campo bg-white"
                name="ecologico"
                placeholder="Normal o Ecológico"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div>
              <label>Ecommerce:</label>
              <select
                onChange={(e) => editarPublicado(e)}
                value={publicado}
                className="campo bg-white"
                name="publicado"
                required
              >
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>
            <button type="submit" className="boton_guardar">
              Save Changes
            </button>
            <button type="button" onClick={() => setModal(false)} className="boton_cancelar">
              Close
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarProductoModal;
