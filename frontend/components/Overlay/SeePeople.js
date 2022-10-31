import Link from 'next/link';
import classes from '../../styles/Overlay.module.css';
import Modal from './Modal';
import Backdrop from './Backdrop';

export default function SeePeople(props) {
  return (
    <>
      <Backdrop mounted={props.mounted} handleMount={props.handleMount} />
      <Modal mounted={props.mounted} handleMount={props.handleMount}>
        <div className={classes['modal-content']}>
          <Link
            href='/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
            passHref
          >
            <a>gutenberg.lens</a>
          </Link>
          <Link
            href='/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
            passHref
          >
            <a>sheila.lens.lens</a>
          </Link>
        </div>
      </Modal>
    </>
  );
}
