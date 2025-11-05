import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Footer from "@/views/Footer";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Script from "next/script";
import Providers from "../redux/provider";
// import { Urbanist } from 'next/font/google';
import Finalfooter from "@/views/Footer/Finalfooter";



// import LocoMotiveScroll from "locomotive-scroll";

// rendering header as a client component
const NoSSRHeader = dynamic(() => import("../views/Header/index"), {
  ssr: false,
});

// import urbanist font
// const urbanist = Urbanist({ 
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700']
// });

// import Context from "@/contextAPI";
export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter();

  return (
    <Providers>
      <main id="root">
        {router.pathname === "/blog/second/[id]" ||
          router.pathname === "/blog/mobile/[id]" ||
          router.pathname === "/privacy-policy/mobile" ||
          router.pathname === "/terms-and-conditions/mobile" ||
          router.pathname === "/faq/mobile" ||<NoSSRHeader />}

        <Component {...pageProps} />
         
        <Script
        src="https://kit.fontawesome.com/a076d05399.js"
        crossOrigin="anonymous"
        />
        {router.pathname === "/blog/second/[id]" ||
          router.pathname === "/blog/mobile/[id]" ||
          router.pathname === "/privacy-policy/mobile" ||
          router.pathname === "/terms-and-conditions/mobile" ||
          router.pathname === "/faq/mobile" || <Finalfooter />
          // <Footer />
          
          }
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
