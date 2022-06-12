import { CheckCircleIcon } from "@heroicons/react/outline";

const LineaAñadirPedidoModal = ({ producto }) => {
  return (
    <div className="grid grid-cols-3 border-b-[1px] border-stone-200 px-4 py-1 text-center font-medium  hover:bg-stone-200">
      <div className="flex gap-2 col-span-2">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <p className="text-center">{producto.nombre}</p>
      </div>
      <div>
        <p className="text-right">{producto.stock} kilos</p>
      </div>
    </div>
  );
};

export default LineaAñadirPedidoModal;
