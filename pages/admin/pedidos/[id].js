import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { prisma } from "../../../lib/prisma";
import { putPedido } from "../../../helpers/calls";
import { confirmar } from "../../../helpers/helper";
import { DateTime } from "luxon";
import LineaPedidoId from "../../../components/pedidos/LineaPedidoId";
import Confirmacion from "../../../components/utilities/Confirmacion";
import useProductos from "../../../hooks/useProductos";

const RevisarPedido = ({ pedido }) => {
  const { id, fecha, productos, proveedor, coste, status } = pedido;
  const { productosStats, setCargando, obtenerProductos } = useProductos();
  const [confirmacion, setConfirmacion] = useState("");
  const [pedidoRevisado, setPedidoRevisado] = useState([]);
  const [observaciones, setObservaciones] = useState(pedido.observaciones || undefined);
  const [costePedido, setCostePedido] = useState(coste.toFixed(2));
  const [statusRevisado, setStatusRevisado] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Quitar Loader al cargar esta página
  useEffect(() => {
    setCargando(false);
  }, [setCargando]);

  // Revisar el estado al cargar la página
  useEffect(() => {
    function revistarStatus() {
      if (status === "revisado") {
        setStatusRevisado(true);
      }
    }
    revistarStatus();
  });

  // Formatear fecha
  const fechaFormateada = DateTime.fromISO(fecha)
    .setLocale("es")
    .toLocaleString(DateTime.DATE_HUGE);

  // Refrescar página y datos
  const refreshData = () => {
    router.replace(router.asPath);
  };
  // Comprobar el pedido y Actualizar el Stock
  const updateStock = async () => {
    const confirmarPedido = confirm("¿Deseas terminar de comprobar el pedido?");
    if (confirmarPedido) {
      if (pedidoRevisado.length > 0) {
        setCargando(true);
        pedidoRevisado.forEach((producto) => {
          putPedido("pedidos", producto, "update");
        });
        await putPedido(
          "pedidos",
          {
            status: "revisado",
            observaciones: observaciones,
            coste: parseFloat(costePedido),
          },
          id
        );
        obtenerProductos();
        confirmar(setConfirmacion, "Pedido revisado y Stock Actualizado");
        setTimeout(() => {
          router.push("/admin/pedidos");
        }, 1000);
        setCargando(false);
      } else {
        confirmar(setError, "No se ha revisado ningún producto");
      }
    }
  };

  return (
    <div className="my-12 mx-8 w-full">
      {error && <Confirmacion mensaje={error} type={"error"} />}
      {confirmacion && <Confirmacion mensaje={confirmacion} />}
      <h1 className="pb-6 text-4xl font-bold">
        {statusRevisado ? `Pedido # ${id}` : `Revisando pedido # ${id}`}
      </h1>
      <div className="mt-12 grid grid-cols-5 items-center">
        <div className="col-span-2">
          <h2 className="mt-4 mb-2 text-2xl font-bold">Proveedor: {proveedor}</h2>
          <p className="mb-2">Realizado el {fechaFormateada}</p>
          <p className="mb-2">
            Status:{" "}
            <span className={`font-semibold ${statusRevisado ? "text-green-600" : "text-red-600"}`}>
              {statusRevisado ? "Revisado" : "Pendiente"}
            </span>
          </p>
          {statusRevisado ? (
            <p className="mb-8 text-xl font-semibold">
              Coste del pedido: <span className="font-bold text-red-500">{costePedido}€</span> (IVA
              Incluido)
            </p>
          ) : (
            <div className="my-4 flex items-center gap-2 text-xl font-semibold">
              <p className="">Coste del pedido: </p>
              <input
                value={costePedido}
                type="number"
                step="any"
                onChange={(e) => setCostePedido(e.target.value)}
                className="ml-2 w-[86px] text-right font-semibold text-red-600 outline-none"
              />
              <p>€</p>
            </div>
          )}

          <label className="font-semibold">Observaciones:</label>
          <div>
            {statusRevisado ? (
              observaciones
            ) : (
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                className="mt-2 h-28 w-10/12 border p-2 outline-none"
              />
            )}
          </div>
        </div>
        <div className="col-span-3 flex flex-col justify-center px-2">
          <table className="text-md mt-4 h-24 table-auto rounded-lg bg-white text-center font-medium shadow">
            <thead className="bg-sky-700 text-white">
              <tr>
                <th className="p-2">Nombre</th>
                <th className="p-2">Cantidad</th>
                {!statusRevisado && <th className="p-2">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {productos?.map((producto) => (
                <LineaPedidoId
                  key={producto.id}
                  producto={producto}
                  setConfirmacion={setConfirmacion}
                  refreshData={refreshData}
                  setPedidoRevisado={setPedidoRevisado}
                  pedidoRevisado={pedidoRevisado}
                  productosStats={productosStats}
                  statusRevisado={statusRevisado}
                />
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-center gap-4">
            {!statusRevisado && (
              <button onClick={updateStock} type="button" className="boton_guardar">
                Pedido Comprobado
              </button>
            )}

            <button onClick={() => router.back()} type="button" className="boton_cancelar">
              {statusRevisado ? "Volver" : "Cancelar"}
            </button>
          </div>
        </div>
        <div className="col-start-2"></div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const pedido = await prisma.pedido.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      productos: true,
    },
  });
  return {
    props: {
      pedido: JSON.parse(JSON.stringify(pedido)),
    },
  };
}

export default RevisarPedido;
