import Head from "next/head";
import Layout from "@/components/home/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>InterplanetaryFonts</title>
        <meta
          name="description"
          content="A decentralized NFT marketplace & collaboration platform for creators and collectors of Fonts."
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>This is the test home page</h1>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
