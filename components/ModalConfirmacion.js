import { XCircleIcon, ExclamationCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { RotatingLines } from "react-loader-spinner";
import { useEffect } from "react";

const ModalConfirmacion = ({ type, mensaje, confirmacion, cancelar, modal, nombre, cargando }) => {
  const tipo = () => {
    if (type === "añadir") {
      return <PlusCircleIcon className="mb-4 h-16 w-16 text-green-500" />;
    } else if (type === "editar") {
      return <ExclamationCircleIcon className="mb-4 h-16 w-16 text-amber-500" />;
    } else {
      return <XCircleIcon className="mb-4 h-16 w-16 text-red-500" />;
    }
  };

  return (
    <div
      className={`fixed flex h-screen w-screen flex-col justify-center bg-black bg-opacity-50  ${
        modal ? "z-30 opacity-100" : "opacity-0"
      } transition-all`}
    >
      <div
        className={`mx-auto mb-20 w-[30rem] scale-0 rounded-lg bg-stone-50 p-8 shadow ${
          modal ? "scale-100" : "scale-0"
        } transition-all duration-300`}
      >
        <div className="flex flex-col items-center justify-center">
          {tipo()}
          <p>
            ¿Estás seguro de <span className="font-bold">{mensaje}</span>?
          </p>
          <p className="py-1">{nombre}</p>
          <div className="mt-6 flex justify-center gap-10">
            <button onClick={confirmacion} className="boton_guardar w-[10rem] text-center">
              {cargando ? (
                <div className="flex justify-center">
                  <RotatingLines strokeColor="#4ade80" width="25" className="text-center" />
                </div>
              ) : (
                "Estoy seguro"
              )}
            </button>
            <button onClick={cancelar} className="boton_cancelar w-[10rem]">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
