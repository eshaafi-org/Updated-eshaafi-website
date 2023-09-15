import "@/styles/index.scss";
import type { AppProps } from "next/app";
import Header from "@/views/Header";
import Footer from "@/views/Footer";
import { useRouter } from "next/router";
// import Context from "@/contextAPI";
export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter();
  console.log(router.pathname);
  return (
    // <Context>
    <>
      {router.pathname === "/blog/second/[id]" || <Header />}
      <Component {...pageProps} />
      {router.pathname === "/blog/second/[id]" || <Footer />}
    </>
    // </Context>
  );
}
