import { XCircleIcon } from "@heroicons/react/solid";

const ProductosAgotados = ({ productoAgotado, setModalNotifaciones }) => {
  return (
    <div className="fixed h-screen w-screen bg-stone-900 bg-opacity-80">
      <div className="mx-auto my-20 h-[60%] w-[35%] overflow-y-scroll rounded-lg bg-stone-300 p-16 ">
        <div className="my-2 flex justify-between">
          <p className="text-xl font-bold">Sold out products</p>
          <XCircleIcon
            className="-mt-4 h-10 w-10 cursor-pointer"
            onClick={() => setModalNotifaciones(false)}
          />
        </div>
        {productoAgotado.map((producto) => (
          <p key={producto.id}>{producto.nombre}</p>
        ))}
      </div>
    </div>
  );
};

export default ProductosAgotados;
