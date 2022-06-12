import "../styles/globals.css";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "../styles/custom_quill.css";
import { ProductosProvider } from "../context/ProductosProvider";
import { Router, useRouter } from "next/router";
import Layout from "../layout/layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname.startsWith("/admin")) {
    return (
      <ProductosProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProductosProvider>
    );
  } else {
    return <Component {...pageProps} />;
  }
}

export default MyApp;
