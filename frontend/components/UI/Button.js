import classes from '../../styles/Button.module.css';

export default function Button(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`${classes.button} ${props.className}`}
    >
      {props.children}
    </button>
  );
}
