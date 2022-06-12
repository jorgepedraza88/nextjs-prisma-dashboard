import { createContext, useState, useEffect, useCallback } from "react";
import { get } from "../helpers/calls";

const ProductosContext = createContext();

const ProductosProvider = ({ children }) => {
  const [pagina, setPagina] = useState(1);
  const [categoria, setCategoria] = useState("");
  const [proveedorFiltro, setProveedorFiltro] = useState("");
  const [filtroStock, setFiltroStock] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [productoModal, setProductoModal] = useState({});
  const [productoAgotado, setProductoAgotado] = useState(false);
  const [productoCasiAgotado, setProductoCasiAgotado] = useState(false);
  const [cargando, setCargando] = useState();
  const [pedidos, setPedidos] = useState([]);
  const [ordersPendientes, setOrdersPendientes] = useState(false);
  const [totalPedidos, setTotalPedidos] = useState(); //eCommerce

  // const [notificaciones, setNotificaciones] = useState([]);

  // API para recoger estadísticas de todos los productos
  const [productosStats, setProductosStats] = useState([]);
  const getAllProductos = () => {
    get("productos", setProductosStats);
  };
  //Effect para recoger la cuenta de productos totales, si el numero de productos cambia, la cuenta también.
  const [cuentaProductos, setCuentaProductos] = useState();
  useEffect(() => {
    setCuentaProductos(productosStats.length);
  }, [productosStats]);

  //Fetch para recoger todos los proveedores y almacenarlos en State
  const [proveedores, setProveedores] = useState([]);
  const obtenerProveedores = () => {
    get("proveedores", setProveedores);
  };
  useEffect(() => {
    obtenerProveedores();
  }, []);

  //Fetch para recoger todas las categorias y almacenarlas en State
  const [categorias, setCategorias] = useState();
  useEffect(() => {
    get("categorias", setCategorias);
  }, []);

  //Fetch de todos los productos con Query Strings para los filtros - Tabla de Productos
  const [productos, setProductos] = useState([]);
  const obtenerProductos = useCallback(async () => {
    setCargando(true);
    try {
      const url = `/api/productos?${categoria}&${proveedorFiltro}&${filtroStock}&limit=30&page=${pagina}&buscar=${busqueda}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setProductos(resultado);
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
    getAllProductos(); // Actualizamos el total de productos para estadísticas
  }, [pagina, categoria, proveedorFiltro, filtroStock, busqueda]);

  useEffect(() => {
    obtenerProductos();
  }, [obtenerProductos]);

  // API para recoger todos los gastos
  const [gastos, setGastos] = useState([]);
  const getGastos = () => {
    get("gastos?desde=siempre", setGastos);
  };
  useEffect(() => {
    getGastos();
  }, [obtenerProductos]);

  // API para recoger numero total de Pedidos eCommerce y si hay alguno pendiente de procesar
  const obtenerPedidosEcommerce = async () => {
    try {
      const url = `${process.env.WC_URL}/reports/orders/totals`;
      const respuesta = await fetch(url, {
        headers: {
          Authorization: process.env.API_KEY_WOOCOMMERCE,
        },
      });
      const resultado = await respuesta.json();
      resultado[1].total > 0 ? setOrdersPendientes(true) : setOrdersPendientes(false);
      setTotalPedidos(resultado.reduce((accum, item) => item.total + accum, 0));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerPedidosEcommerce();
  }, []);

  // Filtros productos sin Stock y casi Agotados
  const productosAgotados = productosStats.filter((producto) => producto.stock === 0);
  const productosCasiAgotados = productosStats.filter((producto) => {
    const productoCasiAgotado = producto.stock > 0 && producto.stock <= producto.low_stock;
    return productoCasiAgotado;
  });

  // Función para mostrar Notificaciones de alerta en página de productos
  const notificacion = () => {
    productosAgotados.length > 0 ? setProductoAgotado(true) : setProductoAgotado(false);
    productosCasiAgotados.length > 0 ? setProductoCasiAgotado(true) : setProductoCasiAgotado(false);
  };
  useEffect(() => {
    notificacion();
  }, [productosAgotados, productoCasiAgotado]);

  return (
    <ProductosContext.Provider
      value={{
        productos,
        setProductos,
        setPagina,
        setCategoria,
        setBusqueda,
        pagina,
        categoria,
        proveedorFiltro,
        setProveedorFiltro,
        setFiltroStock,
        busqueda,
        productosStats,
        setProductoModal,
        productoModal,
        productosAgotados,
        productosCasiAgotados,
        productoAgotado,
        productoCasiAgotado,
        setProductoAgotado,
        setProductoCasiAgotado,
        cuentaProductos,
        proveedores,
        setProveedores,
        categorias,
        cargando,
        setCargando,
        gastos,
        obtenerProductos,
        obtenerProveedores,
        notificacion,
        setPedidos,
        pedidos,
        ordersPendientes,
        setOrdersPendientes,
        totalPedidos,
        obtenerPedidosEcommerce,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export { ProductosProvider };

export default ProductosContext;
