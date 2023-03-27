import classes from "@/styles/FontDashboard.module.css";

export default function Letter(props) {
  return (
    <button
      style={{ fontFamily: props.cssname, fontWeight: props.weight }}
      className={`${classes.letter} ${classes[props.checkedClass]}`}
      onClick={props.handleLetterClick}
    >
      {props.children}
    </button>
  );
}
