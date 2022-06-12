import Link from "next/link";
import { useRouter } from "next/router";

const EnlaceMenu = ({ nombre, icon, enlace, sidebar }) => {
  const router = useRouter();

  const nav = router.asPath;

  return (
    <Link href={`${enlace}`} passHref>
      <div className="flex items-center gap-2 rounded-md py-1 text-[0.95rem] hover:cursor-pointer hover:bg-stone-300 lg:ml-1">
        <div>{!sidebar && icon}</div>
        <div className={`${nav === enlace && "text-sky-700"}`}>{!sidebar && nombre}</div>
      </div>
    </Link>
  );
};

export default EnlaceMenu;
