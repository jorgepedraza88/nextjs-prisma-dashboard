export const get = async (api = "", state) => {
  try {
    const url = `/api/${api}`;
    const res = await fetch(url);
    const resultado = await res.json();
    state(resultado);
  } catch (error) {
    console.log(error);
  }
};
export const post = async (e, api = "", body = {}) => {
  e.preventDefault();
  try {
    const url = `/api/${api}`;
    const respuesta = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await respuesta.json();
  } catch (error) {
    console.log("Error doing post", error);
  }
};

export const put = async (e, api = "", body = {}, id) => {
  e.preventDefault();
  try {
    const url = `/api/${api}/${id}`;
    const respuesta = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
};

export const del = async (api = "", id) => {
  try {
    const url = `/api/${api}/${id}`;
    const respuesta = await fetch(url, {
      method: "DELETE",
    });
    return await respuesta.json();
  } catch (error) {
    console.log("Error doing deleting", error);
  }
};
export const delPedido = async (api = "", id, body) => {
  try {
    const url = `/api/${api}/${id}`;
    const respuesta = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await respuesta.json();
  } catch (error) {
    console.log("Error doing deleting", error);
  }
};

export const crear = async (e, api = "", body = {}) => {
  e.preventDefault();
  try {
    await fetch(`/api/${api}`, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  } catch (error) {
    console.log("error");
  }
};
export const putPedido = async (api = "", body, id) => {
  try {
    const url = `/api/${api}/${id}`;
    const respuesta = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await respuesta.json();
  } catch (error) {
    console.log(error);
  }
};

export const getWC = async (api, state) => {
  try {
    const url = `${process.env.WC_URL}/${api}`;
    const respuesta = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.API_KEY_WOOCOMMERCE,
      },
    });
    const resultado = await respuesta.json();
    state(resultado);
  } catch (error) {
    console.log(error);
  }
};
