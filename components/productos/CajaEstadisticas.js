const CajaEstadisticas = ({titulo, operacion}) => {

  return (
    <div className="w-full rounded border-b-2 bg-zinc-100 px-4 pt-2 pb-1">
      <p className="text-right font-semibold uppercase">{titulo}:</p>
      <p className="text-right text-2xl font-bold text-sky-700">
        {operacion}
      </p>
    </div>
  );
};

export default CajaEstadisticas;
