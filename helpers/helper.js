//* Funciones para calcular totales en página de producto.
export const totalStock = (array) =>
  array.reduce((accumulator, item) => Number(item.stock) + accumulator, 0);
export const totalCoste = (array) =>
  array.reduce((accumulator, item) => item.stock * item.coste + accumulator, 0);
export const totalPrecioVenta = (array) =>
  array.reduce((accumulator, item) => item.stock * item.precioVenta + accumulator, 0);

//* Función para editar con el formulario
export const editando = (e, setState, state) => {
  setState({
    ...state,
    [e.target.name]: e.target.value,
  });
};

export const editandoNumero = (e, setState, state) => {
  setState({
    ...state,
    [e.target.name]: parseFloat(e.target.value),
  });
};
//* Función para activar el Modal y cargar información
export const editarModal = (setState, info, modalState) => {
  setState(info);
  modalState(true);
};

//* Actualizar productos - IMPORTANTE
export const handleSubmit = async (e, db, id, state, modalState, refresco) => {
  e.preventDefault();
  try {
    const url = `http://localhost:4000/${db}/${id}`;
    await fetch(url, {
      method: "PUT",
      // El body es la información que se envía, hay que convertirlo de un Object a un String
      body: JSON.stringify(state),
      /* Este método es obligatorio de JSON-Server pero puede cambiar */
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  modalState(false);
  refresco(true);
};

export const confirmar = (func, mensaje) => {
  setTimeout(() => {
    func(mensaje);
  }, 300);
  setTimeout(() => {
    func("");
  }, 2500);
};

//capitalize all words of a string.
export function capitalizeWords(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}
// Formatear dinero
export const formatearDinero = (cantidad) => {
  return cantidad.toLocaleString("en-US", {
    style: "currency",
    currency: "EUR",
  });
};

export const calcularSubtotal = (total, iva) => {
  return total - (total * iva) / 100;
};

// Calcular porcentaje de ventas - Comparativa
export const comparar = (actual, comparar, func) => {
  func(((actual - comparar) / actual) * 100);
};
