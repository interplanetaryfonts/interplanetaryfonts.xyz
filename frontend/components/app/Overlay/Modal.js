import classes from "@/styles/Overlay.module.css";
import { createPortal } from "react-dom";

export default function Modal(props) {
  return props.mounted
    ? createPortal(
        <div
          className={` ${props.styleModal ? props.styleModal : classes.modal}`}
        >
          <div className={classes.header}></div>
          {props.children}
          <button className="text-xs " onClick={() => props.handleMount(false)}>
            Cancel
          </button>
        </div>,
        document.getElementById("overlay-root")
      )
    : null;
}
