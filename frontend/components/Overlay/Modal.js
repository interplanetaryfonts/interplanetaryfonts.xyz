import classes from '../../styles/Overlay.module.css';
import { createPortal } from 'react-dom';

export default function Modal(props) {
  return props.mounted
    ? createPortal(
        <div className={classes.modal}>
          <div className={classes.header}></div>
          {props.children}
          <button onClick={() => props.handleMount(false)}>Cancel</button>
        </div>,
        document.getElementById('overlay-root')
      )
    : null;
}
