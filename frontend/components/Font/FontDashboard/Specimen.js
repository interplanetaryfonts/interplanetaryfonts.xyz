import classes from "../../../styles/FontDashboard.module.css";

export default function Specimen(props) {
  return (
    <div
      style={{ fontFamily: props.cssname, fontWeight: props.weight }}
      className={classes.specimen}
    >
      <h3>{props.fontname}</h3>
      {props.specimen.map((quote, i) => (
        <p key={`specimen-quote-${i}`}>
          {[...quote].map((quoteEl, j) => (
            <span key={`specimen-quote-el-${j}`}>{quoteEl}</span>
          ))}
        </p>
      ))}
    </div>
  );
}
