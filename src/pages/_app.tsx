import "@/styles/index.scss";
import type { AppProps } from "next/app";
import Header from "@/views/Header";
import Footer from "@/views/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
