import Link from "next/link";
import Button from "./Button";
import classes from "../../styles/ConnectedMenu.module.css";

export default function ConnectedMenu(props) {
  return (
    <div className={`${classes.container} ${props.menu && classes.open}`}>
      <Link href={`/user/${props.user.address}`}>
        <a className={classes["user-profile"]}>User Profile</a>
      </Link>
      <Button onClick={props.handleDisconnect} className={classes.button}>
        Disconnect
      </Button>
    </div>
  );
}
