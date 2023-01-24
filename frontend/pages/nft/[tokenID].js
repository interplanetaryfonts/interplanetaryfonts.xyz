import { useState } from "react";
import Link from "next/link";
import classes from "../../styles/NFTsAndStream.module.css";
// Components
import Button from "../../components/UI/Button";
import NFTsAndStream from "../../components/UI/NFTsAndStream";
import SeePeople from "../../components/Overlay/SeePeople";
import Download from "../../components/Overlay/Download";

const fakeNFT = {
  nme: "Some NFT",
  date: new Intl.DateTimeFormat("en-US").format(new Date()),
  parentp: { nme: "Some Font", url: "/font/test-font" },
  owner: "fontmaniac.eth",
  files: { otf: true, ttf: true, woff: false, woff2: false },
};

export default function NFT() {
  const [clicked, setClicked] = useState("");
  const [mounted, setMounted] = useState(false);
  const handleMount = (bool) => {
    setMounted(bool);
  };
  return (
    <>
      <NFTsAndStream
        nme={fakeNFT.nme}
        date={`Minted on ${fakeNFT.date}`}
        parentp={fakeNFT.parentp}
      >
        <div className={classes.element}>
          Creators{" "}
          <Button
            onClick={() => {
              setMounted(true);
              setClicked("see");
            }}
          >
            See
          </Button>
        </div>
        <div className={classes.element}>
          Owner{" "}
          <Link href={`/user/${fakeNFT.owner}`}>
            <a>{fakeNFT.owner}</a>
          </Link>
        </div>

        <div className={classes.element}>
          Files{" "}
          <span className={classes.files}>
            {Object.entries(fakeNFT.files).map(([key, value], i) => {
              return (
                <span className={classes["file-symbol"]} key={`nft-span-${i}`}>
                  <span>{key.toUpperCase()}</span>
                  <span>{value ? "✅" : "🛑"}</span>
                </span>
              );
            })}
          </span>
        </div>
        <div className={classes.element}>
          Charset{" "}
          <Button
            onClick={() => {
              setMounted(true);
              setClicked("download");
            }}
          >
            Download
          </Button>
        </div>
      </NFTsAndStream>
      {mounted && clicked === "see" ? (
        <SeePeople mounted={mounted} handleMount={handleMount} />
      ) : mounted && clicked === "download" ? (
        <Download mounted={mounted} handleMount={handleMount} />
      ) : (
        ""
      )}
    </>
  );
}
