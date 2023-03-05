import { useState } from "react";
import classes from "@/styles/UserDashboard.module.css";
// Components
import DashboardElement from "@/components/app/UI/DashboardElement";
import Button from "@/components/app/UI/Button";
import Withdraw from "@/components/app/Overlay/Withdraw";
import CreateStream from "@/components/app/Overlay/CreateStream";
import Unwrap from "@/components/app/Overlay/Unwrap";
import StreamByTheSecond from "./StreamByTheSecond";
import Link from "next/link";

export default function Treasury(props) {
  const [clicked, setClicked] = useState("");
  const [mounted, setMounted] = useState(false);
  const handleMount = (bool) => {
    setMounted(bool);
  };

  return (
    <>
      <div className={classes["profile-elements"]}>
        <DashboardElement>
          <p>Balance</p>
          <p>{props.elements.balance.toFixed(4)} MATIC</p>
        </DashboardElement>
        <Button
          onClick={() => {
            setMounted(true);
            setClicked("withdraw");
          }}
        >
          Withdraw
        </Button>
        <h5>Active FontStreams</h5>
        {props.elements.fontStreams.map((el, i) => (
          <DashboardElement key={`treasury-streams-${i}`}>
            <Link href={el.url} passHref>
              <a>{el.txt}</a>
            </Link>
            <div className={classes["stream-data"]}>
              <StreamByTheSecond stream={el.ammount} />
              <Button
                onClick={() => {
                  setMounted(true);
                  setClicked("unwrap");
                }}
                className={classes.unwrap}
              >
                Unwrap
              </Button>
            </div>
          </DashboardElement>
        ))}
        <Button
          onClick={() => {
            setMounted(true);
            setClicked("stream");
          }}
        >
          Create New FontStream
        </Button>
      </div>
      {mounted && clicked === "withdraw" ? (
        <Withdraw mounted={mounted} handleMount={handleMount} />
      ) : mounted && clicked === "stream" ? (
        <CreateStream mounted={mounted} handleMount={handleMount} />
      ) : mounted && clicked === "unwrap" ? (
        <Unwrap mounted={mounted} handleMount={handleMount} />
      ) : (
        ""
      )}
    </>
  );
}
