import Link from "next/link";
import classes from "../../../styles/CardData.module.css";

export default function FontData(props) {
  return (
    <div className={classes.container}>
      <h5 className={classes.username}>{props.font.nme}</h5>
      <h6>Description</h6>
      <p className={classes.about}>{props.font.description}</p>
      <h6>{`Creator${props.font.creators.length > 1 ? "s" : ""}`}</h6>
      <div className={classes.about}>
        {props.font.creators.map((creator, i) => (
          <Link
            key={`creator-url-${i}`}
            href={`/user/${creator.address}`}
            passHref
          >
            <a key={`creator-${i}`}>{`@${creator.username}`}</a>
          </Link>
        ))}
      </div>
      <h6>FontStreams</h6>
      <div className={classes.about}>
        {props.font.streams.map((stream, i) => {
          return (
            <Link key={`p-stream-link-${i}`} href={stream.url} passHref>
              <a>{stream.nme}</a>
            </Link>
          );
        })}
      </div>
      <h6>Collected by</h6>
      <div className={classes.about}>
        {props.font.collected.map((collector, i) => (
          <Link
            key={`collector-url-${i}`}
            href={`/user/${collector.address}`}
            passHref
          >
            <a key={`collector-${i}`}>{`@${collector.username}`}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}
