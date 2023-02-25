import Head from "next/head";
import Layout from "@/components/home/Layout";
import getAppURL from "@/utils/getAppURL";

export default function Home() {
  const appURL = getAppURL(process.env.NEXT_PUBLIC_URL);

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
      <a href={appURL}>Go to app</a>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
