import Head from "next/head";
import GetApp from "@/views/Home/GetApp";
export default function Labs() {
  return (
    <>
      <Head>
        <title>eShaafi | Labs</title>
      </Head>
      <main>
        <GetApp color="#DFEAF2" />
      </main>
    </>
  );
}
