import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";

// ESTE ES EL TOAST

const Confirmacion = ({ mensaje, type }) => {
  return (
    <div
      className={`fixed left-[80%] z-30 mt-12 flex items-center justify-center gap-4 rounded border  bg-stone-100 p-4 transition-all
      ${type === "error" ? "border-red-600 " : " border-lime-600"}`}
    >
      <div className="flex items-center gap-4">
        {type === "error" ? (
          <XCircleIcon className="h-7 w-7 text-red-600" />
        ) : (
          <CheckCircleIcon className="h-7 w-7 text-lime-600" />
        )}
        <p className="text-stone-800">{mensaje}</p>
      </div>
    </div>
  );
};

export default Confirmacion;
