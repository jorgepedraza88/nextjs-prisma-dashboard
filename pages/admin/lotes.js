import useProductos from "../../hooks/useProductos";
import { AutoComplete } from "primereact/autocomplete";
import { useState } from "react";

const Lotes = () => {
  const { productosStats } = useProductos();
  // const [lote, setLote] = useState("");
  const [nombreProducto, setNombreProducto] = useState("");
  const [productsFilter, setProductFilters] = useState("");
  const [producto, setProducto] = useState({
    sku: "",
    nombre: "",
    numLote: "",
  });

  const actualizarLoteBalanza = async () => {
    try {
      const url = "http://localhost:4000/items";
      const respuesta = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ sku: producto.sku, lote: producto.numLote }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await respuesta.json();
    } catch (error) {
      console.log(error);
    }
  };

  const buscarProducto = (event) => {
    setTimeout(() => {
      let productosFiltrados;
      if (!event.query.trim().length) {
        productosFiltrados = [...productosStats];
      } else {
        productosFiltrados = productosStats.filter((producto) => {
          return producto.nombre.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setProductFilters(productosFiltrados);
    }, 250);
  };

  const cambiarLote = (e) => {
    setProducto((prev) => ({ ...prev, numLote: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarLoteBalanza();
    // TODO: Función para Actualizar el Lote en la base de datos nueva
    setProducto({
      sku: "",
      nombre: "",
      numLote: "",
    });
    setNombreProducto("");
  };

  return (
    <div className="my-12 mx-8 w-full">
      <h1 className="pb-6 text-center text-4xl font-bold md:text-left">Batch Control</h1>
      <div className="flex h-[30rem] flex-col items-center justify-center ">
        <label className="mb-2 text-3xl font-semibold">Product:</label>
        <AutoComplete
          value={nombreProducto}
          suggestions={productsFilter}
          completeMethod={buscarProducto}
          field="nombre"
          onChange={(e) => setNombreProducto(e.value)}
          onSelect={(e) => setProducto(e.value)}
          placeholder="Type for search"
          size="28"
          inputClassName="autocomplete"
          className="autocomplete"
        />

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full flex-col items-center justify-center"
        >
          <label className="text-3xl font-semibold">Batch:</label>
          <input
            className="campo w-full border md:w-96"
            value={producto.numLote}
            onChange={cambiarLote}
          />
          <button type="submit" className="boton_update mt-6 md:w-52">
            Save
          </button>
        </form>
        <p className="mt-12 font-medium text-red-500">
          This part only works with the retail store. It updates instantly the batch number of the
          product in the TPV Machine.
        </p>
      </div>
    </div>
  );
};

export default Lotes;
