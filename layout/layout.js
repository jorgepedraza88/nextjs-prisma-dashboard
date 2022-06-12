import { useState, useCallback } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useProductos from "../hooks/useProductos";
import Loader from "../components/utilities/Loader";

const Layout = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const { cargando } = useProductos();

  const clickFuera = useCallback(() => {
    setMostrarNotificacion(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Next.js Dashboard with Prisma, MySQL and Tailwind CSS</title>
      </Head>

      {cargando && <Loader />}
      <Header
        sidebar={sidebar}
        setSidebar={setSidebar}
        setMostrarNotificacion={setMostrarNotificacion}
        mostrarNotificacion={mostrarNotificacion}
      />
      <p className="mx-auto flex h-screen flex-col items-center justify-center font-bold text-red-600 lg:hidden">
        This Dashboard is made for Desktop only
      </p>
      <div onClick={clickFuera} className="hidden gap-2 lg:flex">
        <Sidebar sidebar={sidebar} />
        {children}
      </div>
    </>
  );
};

export default Layout;
