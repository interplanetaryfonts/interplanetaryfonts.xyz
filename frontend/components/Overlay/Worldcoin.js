import classes from '../../styles/Overlay.module.css';
import worldcoinQR from '../../public/worldcoin-qr.png';
import Modal from './Modal';

export default function Fund(props) {
  return (
    <>
      <Modal mounted={props.mounted} handleMount={props.handleMount}>
        <div className={classes['modal-content']}>
          <p>Verify your humanity with Worldcoin App</p>
          <div
            style={{ backgroundImage: `url("${worldcoinQR.src}")` }}
            className={classes.qr}
            onClick={() => props.handleMount(false)}
          ></div>
        </div>
      </Modal>
    </>
  );
}
