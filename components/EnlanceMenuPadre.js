import { ChevronDownIcon } from "@heroicons/react/solid";

const EnlaceMenuPadre = ({ nombre, icon, sidebar }) => {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md py-1 text-[0.95rem] hover:cursor-pointer hover:bg-stone-300 lg:ml-1">
      <div className="flex items-center gap-2">
        <div>{!sidebar && icon}</div>
        <div className="font-semibold">{!sidebar && nombre}</div>
      </div>
      <ChevronDownIcon className="mr-2 h-6 w-6 text-stone-400" />
    </div>
  );
};

export default EnlaceMenuPadre;
