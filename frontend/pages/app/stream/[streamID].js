import { useState } from "react";
import Button from "@/components/app/UI/Button";
import NFTsAndStream from "@/components/app/UI/NFTsAndStream";
import classes from "@/styles/NFTsAndStream.module.css";
import SeePeople from "@/components/app/Overlay/SeePeople";
import Collaborate from "@/components/app/Overlay/Collaborate";
import Fund from "@/components/app/Overlay/Fund";
import Layout from "@/components/app/Layout";

const fakeStream = {
  nme: "Some FontStream",
  parentp: { nme: "Some Font", url: "/font/test-font" },
  time: "180 days",
  progress: { current: 23.1092, total: 2560.1898 },
  superfluid:
    "https://app.superfluid.finance/token/polygon-mumbai/0x96b82b65acf7072efeb00502f45757f254c2a0d4",
};

export default function Stream() {
  const [clicked, setClicked] = useState("");
  const [mounted, setMounted] = useState(false);
  const handleMount = (bool) => {
    setMounted(bool);
  };
  return (
    <>
      <NFTsAndStream nme={fakeStream.nme} parentp={fakeStream.parentp}>
        <div className={classes.element}>
          Stream time <span>{fakeStream.time}</span>
        </div>
        <div className={classes.element}>
          Progress
          <span>
            {`${fakeStream.progress.current} / ${fakeStream.progress.total}`}
          </span>
        </div>
        <div className={classes.element}>
          Superfluid{" "}
          <a href={fakeStream.superfluid} target="blank">
            Go to dashboiard
          </a>
        </div>
        <div className={classes.element}>
          <strong>Supporters</strong>{" "}
          <Button
            onClick={() => {
              setMounted(true);
              setClicked("see");
            }}
          >
            See
          </Button>
        </div>
        <div className={classes.buttons}>
          <Button
            onClick={() => {
              setMounted(true);
              setClicked("collaborate");
            }}
          >
            Collaborate
          </Button>
          <Button
            onClick={() => {
              setMounted(true);
              setClicked("fund");
            }}
          >
            Fund
          </Button>
        </div>
      </NFTsAndStream>
      {mounted && clicked === "see" ? (
        <SeePeople mounted={mounted} handleMount={handleMount} />
      ) : mounted && clicked === "collaborate" ? (
        <Collaborate mounted={mounted} handleMount={handleMount} />
      ) : mounted && clicked === "fund" ? (
        <Fund mounted={mounted} handleMount={handleMount} />
      ) : (
        ""
      )}
    </>
  );
}

Stream.getLayout = function getLayout(page, props) {
  return <Layout {...props}>{page}</Layout>;
};
