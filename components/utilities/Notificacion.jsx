import React from "react";

const Notificacion = ({ icono, color, mensaje }) => {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg ${color}-600 mt-2 py-2 px-1 text-xs font-semibold text-white transition-all hover:scale-105 hover:cursor-pointer`}
    >
      {icono}
      {mensaje}
    </div>
  );
};

export default Notificacion;
