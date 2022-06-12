import { useEffect, useCallback, useState } from "react";
import { get } from "../../../helpers/calls";
import Link from "next/link";
import LineaPedido from "../../../components/ecommerce/pedidos/LineaPedido";
import useProductos from "../../../hooks/useProductos";
import VerPedidoModal from "../../../components/ecommerce/pedidos/VerPedidoModal";
import { Paginator } from "primereact/paginator";

const Pedidos = () => {
  const { setCargando, totalPedidos } = useProductos();
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      number: 7652,
      status: "completed",
      date_created_gmt: "2022-04-01T00:00:00",
      total: 25.5,
    },
    {
      id: 2,
      number: 7653,
      status: "processing",
      date_created_gmt: "2022-04-01T00:00:00",
      total: 50,
    },
  ]);
  const [verPedido, setVerPedido] = useState(false);
  const [pedido, setPedido] = useState({});
  const [pagina, setPagina] = useState(1);
  const [buscar, setBuscar] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const obtenerPedidos = useCallback(async () => {
    setCargando(true);
    await get(`ecommerce/pedidos?page=${pagina}&search=${busqueda}`, setPedidos);
    setCargando(false);
  }, [setPedidos, pagina, busqueda, setCargando]);

  // useEffect(() => {
  //   obtenerPedidos();
  // }, [obtenerPedidos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBusqueda(buscar);
    setPagina(1);
  };

  return (
    <>
      {verPedido && (
        <VerPedidoModal
          pedido={pedido}
          setVerPedido={setVerPedido}
          obtenerPedidos={obtenerPedidos}
        />
      )}
      <div className="my-12 mx-8 w-full">
        <div className="flex items-center justify-between">
          <h1 className="pb-6 text-4xl font-bold">Woocommerce orders</h1>
          <p className="font-medium text-red-600">
            This section is connected to Woocommerce Rest API, I filled with dummy content but it is
            not functional in this demo.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label>Search order:</label>
            <form className="" onSubmit={handleSubmit}>
              <input
                id="buscar"
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                className="border-b-2 px-2 outline-none"
                type="text"
                placeholder="Search"
              />
            </form>
          </div>
          <div>
            <Link href="/admin" passHref>
              <a className="boton_update uppercase" target="_about:blank">
                Send with Packlink
              </a>
            </Link>
          </div>
        </div>
        <table className="text-md mt-5 w-full table-auto bg-white text-center font-medium shadow">
          <thead className="bg-sky-700 text-white">
            <tr>
              <th className="p-2"># Order</th>
              <th className="p-2">Customers name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Email</th>
              <th className="p-2">Status</th>
              <th className="p-2">Total</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pedidos?.map((pedido) => (
              <LineaPedido
                key={pedido.id}
                pedido={pedido}
                // setConfirmacion={setConfirmacion}
                obtenerPedidos={obtenerPedidos}
                setCargando={setCargando}
                setVerPedido={setVerPedido}
                setPedido={setPedido}
              />
            ))}
          </tbody>
        </table>
        <Paginator
          rows={30}
          first={pagina * 30 - 30}
          totalRecords={Number(totalPedidos)}
          onPageChange={(e) => setPagina(e.page + 1)}
        ></Paginator>
      </div>
    </>
  );
};
export default Pedidos;
