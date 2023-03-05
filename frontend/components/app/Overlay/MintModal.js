import { useState } from "react";
import { ethers } from "ethers";

import classes from "@/styles/Overlay.module.css";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import Button from "../UI/Button";
import connectContract from "@/utils/connectContract";

export default function MintModal(props) {
  const [loadingState, setLoadingState] = useState(null);
  const [txnHash, setTxnHash] = useState(null);

  async function mintFont() {
    try {
      const fontContract = connectContract();

      if (fontContract) {
        const txn = await fontContract.mintFontProject(
          "0x68a29e1b71177abd38c2a2501b2258db8cc7ed6c1e6c0aae74df6882245f730d",
          "https://ipfs.io/ipfs/QmVgmUWCUpW32JXi9UmS6GNcJjaQ4fJFT5TeozPaMBWn5s?filename=paradisio.json",
          {
            value: ethers.utils.parseEther("0.001"),
            gasLimit: 900000,
          }
        );
        setLoadingState("minting");
        setTxnHash(txn.hash);

        await txn.wait();
        setLoadingState("minted");
      } else {
        console.log("Error getting contract.");
      }
    } catch (err) {
      setLoadingState("error");
      console.log(err);
    }
  }

  const isMinting = loadingState === "minting";
  const isMinted = loadingState === "minted";

  return (
    <>
      <Backdrop mounted={props.mounted} handleMount={props.handleMount} />
      <Modal mounted={props.mounted} handleMount={props.handleMount}>
        <div className={classes["modal-content"]}>
          <p>
            {isMinting
              ? "Your font is comming from the space 🪐"
              : isMinted
              ? "Thanks for being part of the Font Universe!"
              : `${props.price.toFixed(4)} MATIC`}
          </p>
          <Button disabled={isMinting || isMinted} onClick={mintFont}>
            {isMinting ? "Minting..." : isMinted ? "Download Font" : "Mint"}
          </Button>
          {(isMinting || isMinted) && txnHash ? (
            <p style={{ fontSize: "1rem" }}>
              <a
                style={{ fontSize: "1rem" }}
                href={`${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}tx/${txnHash}`}
                target="blank"
              >
                {" Click here "}
              </a>
              to check the status of your mint
            </p>
          ) : null}
        </div>
      </Modal>
    </>
  );
}
