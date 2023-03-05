import classes from "@/styles/Overlay.module.css";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import Button from "../UI/Button";

export default function Collaborate(props) {
  return (
    <>
      <Backdrop mounted={props.mounted} handleMount={props.handleMount} />
      <Modal mounted={props.mounted} handleMount={props.handleMount}>
        <div className={classes["modal-content"]}>
          <Button>Collaborate</Button>
        </div>
      </Modal>
    </>
  );
}
