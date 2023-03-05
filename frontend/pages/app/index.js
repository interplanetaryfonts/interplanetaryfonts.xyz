import Head from "next/head";
// Components
import Gallery from "@/components/app/Gallery/Gallery";
import Layout from "@/components/app/Layout";

export default function Home(props) {
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
      <Gallery token={props.token} address={props.address} />
    </>
  );
}

Home.getLayout = function getLayout(page, props) {
  return <Layout {...props}>{page}</Layout>;
};
