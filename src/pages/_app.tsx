import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Footer from "@/views/Footer";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Script from "next/script";
import Providers from "../redux/provider";
// rendering header as a client component
const NoSSRHeader = dynamic(() => import("../views/Header/index"), {
  ssr: false,
});
// import Context from "@/contextAPI";
export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter();

  return (
    <Providers>
      <main id="root">
        {router.pathname === "/blog/second/[id]" ||
          router.pathname === "/blog/mobile/[id]" || <NoSSRHeader />}
        <Component {...pageProps} />
        {router.pathname === "/blog/second/[id]" ||
          router.pathname === "/blog/mobile/[id]" || <Footer />}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1BXFKZVVFJ" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', 'G-1BXFKZVVFJ');
          `}
        </Script>
      </main>
    </Providers>
  );
}
