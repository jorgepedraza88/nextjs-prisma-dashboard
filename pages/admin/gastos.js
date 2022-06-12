import { useCallback, useState, useEffect } from "react";
import FiltroFecha from "../../components/gastos/FiltroFecha";
import LineaGastos from "../../components/gastos/LineaGastos";
import AñadirGastoModal from "../../components/gastos/AñadirGastoModal";
import { get } from "../../helpers/calls";
import { DateTime } from "luxon";
import Stats from "../../components/gastos/Stats";
import useProductos from "../../hooks/useProductos";
import EditarGastoModal from "../../components/gastos/EditarGastoModal";
import { PlusCircleIcon } from "@heroicons/react/solid";

const Gastos = () => {
  const { cargando, setCargando } = useProductos();
  const [gastos, setGastos] = useState([]); // Quizá ponerlo en el Context
  const [startDate, setStartDate] = useState(new Date());
  const [lastDate, setLastDate] = useState(new Date());
  const [editarModal, setEditarModal] = useState(false);
  const [añadirModal, setAñadirModal] = useState(false);
  const [gastoModal, setGastoModal] = useState({});
  const desde = DateTime.fromJSDate(startDate).toFormat("yyyy-MM");
  const hasta = DateTime.fromJSDate(startDate).plus({ months: 1 }).toFormat("yyyy-MM");

  // Función para recoger gastos
  const getGastos = useCallback(async () => {
    setCargando(true);
    await get(`gastos?desde=${desde}&hasta=${hasta}`, setGastos);
    setCargando(false);
  }, [desde, hasta, setCargando]);

  // Recoger gastos al cargar la página
  useEffect(() => {
    getGastos();
  }, [getGastos]);

  // Calcular total de gatos del mes
  const gastosMes = gastos.reduce((accumulator, item) => Number(item.coste) + accumulator, 0);

  return (
    <>
      {añadirModal && <AñadirGastoModal setAñadirModal={setAñadirModal} getGastos={getGastos} />}
      {editarModal && (
        <EditarGastoModal
          gastoModal={gastoModal}
          setEditarModal={setEditarModal}
          getGastos={getGastos}
          setGastoModal={setGastoModal}
          cargando={cargando}
        />
      )}
      <div className="my-12 mx-8 w-full">
        <div className="flex items-center justify-between">
          <h2 className="pb-6 text-4xl font-bold">Expenses</h2>
          <p className="font-medium text-red-600">Some expenses added to June 2022</p>
          <div className="flex flex-col gap-2">
            <FiltroFecha
              setStartDate={setStartDate}
              startDate={startDate}
              getGastos={getGastos}
              lastDate={lastDate}
              setLastDate={setLastDate}
            />
            <div
              onClick={() => setAñadirModal(true)}
              className="flex justify-center gap-2 rounded bg-green-600 py-2 px-10 font-medium uppercase text-white shadow transition-all hover:cursor-pointer hover:bg-green-700"
            >
              <PlusCircleIcon className="h-5 w-5 text-white" />
              Añadir gasto
            </div>
          </div>
        </div>
        <Stats gastosMes={gastosMes} setAñadirModal={setAñadirModal} />
        <table className="text-md mt-2 w-full table-auto bg-white text-center font-medium shadow">
          <thead className="bg-sky-700 font-medium text-white">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Type</th>
              <th className="p-2">Supplier</th>
              <th className="p-2">Nº de Factura</th>
              <th className="p-2">Cost</th>
              <th className="p-2">Fecha de Vencimiento</th>
              <th className="p-2">State</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map((gasto) => (
              <LineaGastos
                key={gasto.id}
                gasto={gasto}
                getGastos={getGastos}
                setCargando={setCargando}
                setGastoModal={setGastoModal}
                setEditarModal={setEditarModal}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Gastos;
