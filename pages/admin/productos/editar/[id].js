import useProductos from "../../../../hooks/useProductos";
import { useEffect, useState } from "react";
import { editandoNumero, editando, confirmar } from "../../../../helpers/helper";
import { put } from "../../../../helpers/calls";
import { useRouter } from "next/router";
import { prisma } from "../../../../lib/prisma";
import { Editor } from "primereact/editor";
import Confirmacion from "../../../../components/utilities/Confirmacion";
import slugify from "@sindresorhus/slugify";

const EditarProducto = ({ producto }) => {
  const router = useRouter();
  const { categorias, proveedores, setCargando, obtenerProductos } = useProductos();
  const [catalan, setCatalan] = useState(false);
  const [productoEditado, setProductoEditado] = useState(producto);
  const [confirmacion, setConfirmacion] = useState();
  const {
    nombre,
    nombreCat,
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
    descripcion,
    descripcionCat,
    contenido,
    contenidoCat,
    imagen,
    sku,
    publicado,
    ecologico,
    alergenos,
    alergenosCat,
    conservacion,
    conservacionCat,
    preparacion,
    preparacionCat,
    slug,
    slugCat,
  } = productoEditado;

  useEffect(() => {
    setProductoEditado((prev) => ({ ...prev, slug: slugify(nombre) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nombre]);

  useEffect(() => {
    setProductoEditado((prev) => ({ ...prev, slugCat: slugify(nombreCat) }));
    // eslint-disable-next-line
  }, [nombreCat]);

  useEffect(() => {
    setCargando(false);
  });

  const editarLinea = (e) => {
    editando(e, setProductoEditado, productoEditado);
  };
  const editarNumero = (e) => {
    editandoNumero(e, setProductoEditado, productoEditado);
  };
  const editarContenido = (e) => {
    setProductoEditado((prev) => ({ ...prev, contenido: e.htmlValue }));
  };
  const editarDescripcion = (e) => {
    setProductoEditado((prev) => ({ ...prev, descripcion: e.htmlValue }));
  };
  const editarPublicado = (e) => {
    setProductoEditado({ ...productoEditado, [e.target.name]: e.target.value === "true" });
  };

  const update = async (e) => {
    setCargando(true);
    await put(e, "productos", productoEditado, id);
    await obtenerProductos();
    await setCargando(false);
    // confirmar(setConfirmacion, "Se ha editado con éxito"); TRABAJAR CONFIRMACIONES
    router.push("/admin/productos");
  };

  return (
    <>
      <div className="my-12 mx-8 w-full">
        {confirmacion && <Confirmacion mensaje={confirmacion} />}
        <div>
          <div className="mb-6 flex items-center">
            <p className=" px-6 text-3xl font-bold">Editing Product</p>
            <div className="flex gap-2">
              <div
                onClick={() => setCatalan(false)}
                className={`cursor-pointer rounded bg-red-600 py-1 px-2  text-white transition-colors hover:bg-red-700 ${
                  !catalan && "shadow-md shadow-red-600"
                }`}
              >
                English
              </div>
              <div
                onClick={() => setCatalan(true)}
                className={`cursor-pointer rounded bg-amber-500 py-1 px-2  text-white transition-colors hover:bg-amber-600 ${
                  catalan && "shadow-md shadow-amber-500"
                }`}
              >
                Catalán
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              update(e);
            }}
            className="mx-auto grid grid-cols-3 items-start gap-8 font-semibold"
          >
            <div className="">
              <label>{!catalan ? "Name" : "Nom"}</label>
              {!catalan ? (
                <input
                  onChange={editarLinea}
                  id="nombre"
                  value={nombre}
                  className="campo bg-white"
                  name="nombre"
                  type="text"
                  placeholder="Nombre del Producto"
                  required
                />
              ) : (
                <input
                  onChange={editarLinea}
                  id="nombreCat"
                  value={nombreCat}
                  className="campo bg-white"
                  name="nombreCat"
                  type="text"
                  placeholder="Nom del Producte"
                  required
                />
              )}
            </div>
            {!catalan ? (
              <div>
                <label>Slug:</label>
                <input value={slug || ""} disabled className="campo" />
              </div>
            ) : (
              <div>
                <label>Slug:</label>
                <input value={slugCat || ""} disabled className="campo" />
              </div>
            )}
            {/* Botones */}
            <div className="mx-auto grid w-[90%] grid-cols-2 gap-2 text-xs">
              <div>
                <button type="submit" className="boton_guardar">
                  Save Changes
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    router.back();
                  }}
                  className="boton_cancelar"
                >
                  Close
                </button>
              </div>
            </div>
            {/* Fin de botones */}
            <div className="col-span-3">
              <div className="flex justify-between">
                <label>Short description:</label>
              </div>
              {!catalan ? (
                <div>
                  <Editor
                    id="descripcion"
                    placeholder={"Escribe aquí una Short description del producto"}
                    className="mt-2"
                    value={descripcion}
                    onTextChange={(e) => editarDescripcion(e)}
                    style={{ height: "100px" }}
                  />
                </div>
              ) : (
                <Editor
                  id="descripcionCat"
                  placeholder={"Escriu aquí una descripció curta del producte"}
                  className="mt-2"
                  value={descripcionCat}
                  onTextChange={(e) =>
                    setProductoEditado((prev) => ({ ...prev, descripcionCat: e.htmlValue }))
                  }
                  style={{ height: "100px" }}
                />
              )}
            </div>
            <div className="col-span-3">
              <label>Content:</label>
              {!catalan ? (
                <div>
                  <Editor
                    id="contenido"
                    placeholder={"Escribe aquí el contenido principal del producto"}
                    className="mt-2"
                    value={contenido}
                    onTextChange={(e) => editarContenido(e)}
                    style={{ height: "300px" }}
                  />
                </div>
              ) : (
                <Editor
                  id="contenidoCat"
                  placeholder={"Escriu aquí el contingut principal del producte"}
                  className="mt-2"
                  value={contenidoCat}
                  onTextChange={(e) =>
                    setProductoEditado((prev) => ({ ...prev, contenidoCat: e.htmlValue }))
                  }
                  style={{ height: "300px" }}
                />
              )}
            </div>
            {!catalan ? (
              <div>
                <label>Preparation:</label>
                <input
                  onChange={editarLinea}
                  value={preparacion}
                  className="campo bg-white"
                  name="preparacion"
                  type="text"
                  placeholder="How you cook it"
                />
              </div>
            ) : (
              <div>
                <label>Preparació:</label>
                <input
                  onChange={editarLinea}
                  value={preparacionCat}
                  className="campo bg-white"
                  name="preparacionCat"
                  type="text"
                  placeholder="Com es prepara"
                />
              </div>
            )}
            {!catalan ? (
              <div>
                <label>Alergens:</label>
                <input
                  onChange={editarLinea}
                  value={alergenos}
                  className="campo bg-white"
                  name="alergenos"
                  type="text"
                  placeholder="Alergens"
                />
              </div>
            ) : (
              <div>
                <label>Al·lèrgens:</label>
                <input
                  onChange={editarLinea}
                  value={alergenosCat}
                  className="campo bg-white"
                  name="alergenosCat"
                  type="text"
                  placeholder="Al·lèrgens"
                />
              </div>
            )}
            {!catalan ? (
              <div>
                <label>Conservation:</label>
                <input
                  onChange={editarLinea}
                  value={conservacion}
                  className="campo bg-white"
                  name="conservacion"
                  type="text"
                  placeholder="Cómo conservar el producto"
                />
              </div>
            ) : (
              <div>
                <label>Conservació:</label>
                <input
                  onChange={editarLinea}
                  value={conservacionCat}
                  className="campo bg-white"
                  name="conservacionCat"
                  type="text"
                  placeholder="Com conservar el producte"
                />
              </div>
            )}

            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label>Category:</label>
                <select
                  id="categoria"
                  onChange={editarLinea}
                  value={categoria}
                  className="campo bg-white"
                  name="categoria"
                >
                  <option value="">Select category</option>
                  {categorias?.map((categoria) => (
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
                  value={proveedorId}
                  className="campo bg-white"
                  name="proveedorId"
                >
                  <option value="">Choose supplier</option>
                  {proveedores?.map((proveedor) => (
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
                  className="campo bg-white"
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
                  className="campo bg-white"
                  name="low_stock"
                  type="number"
                  min="0"
                  placeholder="Limite de aviso"
                />
              </div>
              <div>
                <label>Batch number:</label>
                <input
                  onChange={editarLinea}
                  value={numLote}
                  className="campo bg-white"
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
                  className="campo bg-white"
                  name="coste"
                  type="number"
                  min="0"
                  step=".01"
                  required
                  placeholder="Coste por kg"
                />
              </div>
              <div className="flex gap-2">
                <div className="w-2/5">
                  <label>VAT:</label>
                  <select
                    onChange={editarNumero}
                    value={iva}
                    className="campo bg-white"
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
                <div className="w-3/5">
                  <label>*Type</label>
                  <select
                    onChange={editarLinea}
                    value={tipo}
                    className="campo bg-white px-4"
                    name="tipo"
                    type="text"
                    placeholder="G o U"
                  >
                    <option value="G">Granel</option>
                    <option value="U">Unidad</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Sale price:</label>
                <input
                  onChange={editarNumero}
                  value={precioVenta}
                  className="campo bg-white"
                  name="precioVenta"
                  type="number"
                  min="0"
                  step=".01"
                  required
                  placeholder="Precio de Venta"
                />
              </div>
              <div>
                <label>SKU:</label>
                <input
                  onChange={editarLinea}
                  value={sku}
                  className="campo bg-white"
                  name="sku"
                  type="text"
                  required
                />
              </div>
              <div className="flex gap-2">
                <div className="w-1/2">
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
                <div className="w-1/2">
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
              </div>
            </div>
            <div>
              <label>Imagen:</label>
              <input
                onChange={editarLinea}
                value={imagen}
                className="campo"
                name="imagen"
                type="text"
                placeholder="URL de la imagen"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const producto = await prisma.producto.findUnique({
    where: {
      id: Number(id),
    },
  });
  return {
    props: {
      producto,
    },
  };
}
export default EditarProducto;
