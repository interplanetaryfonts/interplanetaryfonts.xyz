import Head from "next/head";
// Components
import Gallery from "../components/Gallery/Gallery";
import MainContainer from "../components/UI/MainContainer";

export default function Home() {
  return (
    <MainContainer>
      <Head>
        <title>InterplanetaryFonts</title>
        <meta
          name="description"
          content="Web App created during ETHOnline 2022"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <Gallery />
    </MainContainer>
  );
}
