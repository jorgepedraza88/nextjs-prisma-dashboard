import { TrendingUpIcon, TrendingDownIcon } from "@heroicons/react/solid";
import CountUp from "react-countup";

const BoxStat = ({ tiempo, porcentaje, cantidad }) => {
  return (
    <div className="my-3">
      <p className="text-lg font-medium">{tiempo}</p>
      <div className="mt-3 flex items-center gap-4">
        <p className="text-3xl font-semibold">
          {<CountUp end={cantidad} prefix="€" decimals={2} decimal="," duration={1.5} />}
        </p>
        <div
          className={`flex items-center gap-1 rounded-lg  p-1 text-xs  ${
            porcentaje >= 0 ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"
          }`}
        >
          <p className="font-semibold">{Number(porcentaje).toFixed(2)}%</p>
          {porcentaje > 0 ? (
            <TrendingUpIcon className="h-4 w-4" />
          ) : porcentaje < 0 ? (
            <TrendingDownIcon className="h-4 w-4" />
          ) : null}
        </div>
      </div>
      <p className="mt-3 font-light text-slate-800 text-xs">vs last year</p>
    </div>
  );
};

export default BoxStat;
