import classes from "../../styles/Overlay.module.css";
import { createPortal } from "react-dom";

export default function Modal(props) {
  return props.mounted
    ? createPortal(
        <div className={classes.modal}>
          <div className="w-full h-2 p-0"></div>
          {props.children}
          <button className="text-xs " onClick={() => props.handleMount(false)}>
            Cancel
          </button>
        </div>,
        document.getElementById("overlay-root")
      )
    : null;
}
