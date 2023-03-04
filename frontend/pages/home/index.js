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
      <main className="container mx-auto py-8">
        <div className="container mx-auto py-4">
          <h1>The Future of Font Projects </h1>
          <p className="py-4">
            Welcome to InterplanetaryFonts, the decentralized NFT platform
            revolutionizing the way font projects are created, funded, and
            bought.
          </p>
          <p className="py-4">
            With InterplanetaryFonts, creators can collaborate on font projects
            and receive real-time payments for their work, making it easier than
            ever to expand multilingual font projects. Experience the
            flexibility and rewards of the next evolution in font collaboration.
            Join us in creating, funding, and buying font projects in a
            decentralized and flexible manner.
          </p>
          <a
            href={appURL}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Launch (Test)App{" "}
          </a>
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
