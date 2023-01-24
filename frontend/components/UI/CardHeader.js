import classes from "../../styles/CardHeader.module.css";

export default function CardHeader(props) {
  return (
    <div className={`${classes.header} ${classes[props.color.normal]}`}>
      <p>{props.title}</p>
      {props.children}
    </div>
  );
}
