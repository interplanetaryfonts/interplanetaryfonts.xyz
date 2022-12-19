import classes from "../../styles/Overlay.module.css";
import { createPortal } from "react-dom";

export default function Backdrop(props) {
  return props.mounted
    ? createPortal(
        <div
          className={classes.backdrop}
          onClick={() => props.handleMount(false)}
        ></div>,
        document.getElementById("backdrop-root")
      )
    : null;
}
