import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { crear } from "../../../helpers/calls";
import { editandoNumero, editando, confirmar } from "../../../helpers/helper";
import useProductos from "../../../hooks/useProductos";
import Confirmacion from "../../../components/utilities/Confirmacion";
import { Editor } from "primereact/editor";

const CrearProducto = () => {
  const router = useRouter();
  const { proveedores, categorias, productos, setCargando, obtenerProductos } = useProductos();
  const [error, setError] = useState("");
  const [confirmacion, setConfirmacion] = useState();
  const [nuevoProducto, setNuevoProducto] = useState({
    sku: "",
    nombre: "",
    categoria: "",
    proveedorId: undefined,
    stock: 0,
    low_stock: 0,
    numLote: "",
    coste: 0,
    precioVenta: 0,
    descripcion: "",
    contenido: "",
    imagen: "",
    publicado: false,
    ecologico: false,
  });

  const {
    sku,
    nombre,
    proveedorId,
    categoria,
    stock,
    low_stock,
    numLote,
    coste,
    precioVenta,
    iva,
    tipo,
    descripcion,
    contenido,
    imagen,
    ecologico,
    publicado,
  } = nuevoProducto;

  // const añadirDescripcion = useCallback(() => {
  //   setNuevoProducto( prev => ({ ...prev, descripcion: nuevoQuill.descripcion }));
  // },[nuevoQuill])

  // useEffect(() => {
  //   añadirDescripcion()
  // },[añadirDescripcion])

  const editarLinea = (e) => {
    editando(e, setNuevoProducto, nuevoProducto);
  };
  const editarNumero = (e) => {
    editandoNumero(e, setNuevoProducto, nuevoProducto);
  };
  const editarContenido = (e) => {
    setNuevoProducto({ ...nuevoProducto, contenido: e.htmlValue });
  };
  const editarDescripcion = (e) => {
    setNuevoProducto({ ...nuevoProducto, descripcion: e.htmlValue });
  };
  const editarPublicado = (campo, e) => {
    setNuevoProducto({ ...nuevoProducto, [campo]: e.target.value === "true" });
  };

  const añadir = async (e) => {
    if (
      productos.some(
        (producto) => producto.nombre.toUpperCase() === nombre.toUpperCase() || producto.sku === sku
      )
    ) {
      e.preventDefault();
      setError("El nombre de ese producto o su SKU ya existen"); // Poner una notificación
    } else {
      setCargando(true);
      await crear(e, "productos", nuevoProducto);
      await obtenerProductos();
      confirmar(setConfirmacion, "Se ha añadido el producto con éxito");
      setTimeout(() => {
        router.push("/admin/productos");
      }, 1000);
      return () => {
        setError("");
        setCargando(false);
      };
    }
  };

  return (
    <>
      <div className="my-12 mx-8 w-full">
        {confirmacion && <Confirmacion mensaje={confirmacion} />}
        <div>
          <p className="mb-6 px-6 text-3xl font-bold">Add Product</p>
          <form
            onSubmit={(e) => {
              añadir(e);
            }}
            className="mx-auto grid grid-cols-3 items-start gap-8 font-semibold"
          >
            <div className="col-span-2">
              <label>Name:</label>
              <input
                onChange={editarLinea}
                id="nombre"
                value={nombre}
                className="campo bg-white"
                name="nombre"
                type="text"
                placeholder="Product's name"
                required
              />
            </div>
            {/* Botones */}
            <div className="mx-auto grid w-[90%] grid-cols-2 gap-2 text-xs">
              <div>
                <button type="submit" className="boton_guardar">
                  Save Changes
                </button>
              </div>
              <div>
                <button type="button" onClick={() => router.back()} className="boton_cancelar">
                  Close
                </button>
              </div>
            </div>
            {/* Fin de botones */}

            <div className="col-span-3">
              <label>Short description:</label>
              <Editor
                id="descripcion"
                placeholder={"Escribe aquí una Short description del producto"}
                className="mt-2"
                value={descripcion}
                onTextChange={(e) =>
                  setNuevoProducto((prev) => ({ ...prev, descripcion: e.htmlValue }))
                }
                style={{ height: "100px" }}
              />
            </div>
            <div className="col-span-3">
              <label>Content:</label>
              <Editor
                id="contenido"
                placeholder={"Escribe aquí el contenido principal del producto"}
                className="mt-2"
                value={contenido}
                onTextChange={(e) =>
                  setNuevoProducto((prev) => ({ ...prev, contenido: e.htmlValue }))
                }
                style={{ height: "300px" }}
              />
            </div>
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
                  <option value="">Choose category</option>
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
                <label>Price:</label>
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
                <label>**SKU:</label>
                <input
                  onChange={editarLinea}
                  value={sku}
                  className="campo bg-white"
                  name="sku"
                  type="text"
                  placeholder="SKU"
                  required
                />
              </div>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <label>¿Is it eco?</label>
                  <select
                    onChange={(e) => editarPublicado("ecologico", e)}
                    value={ecologico}
                    className="campo bg-white"
                    name="tipo"
                    placeholder="Normal o Ecológico"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label>Ecommerce:</label>
                  <select
                    onChange={(e) => editarPublicado("publicado", e)}
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
              <p className="col-span-2 text-xs">** The SKU must be the same as in the retail store computer.</p>
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
          {error && <p className="my-4 px-8 font-semibold text-red-600">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default CrearProducto;
