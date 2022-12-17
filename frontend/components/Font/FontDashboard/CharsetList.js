import classes from "../../../styles/FontDashboard.module.css";

export default function CharsetList(props) {
  return (
    <div className={classes["charset-container"]}>
      <select
        className={classes["charset-list"]}
        name="charsets"
        onChange={props.handleCharList}
      >
        {props.charsets.map((charset, i) => (
          <option key={`charset-sel-${i}`} name={charset}>
            {charset}
          </option>
        ))}
      </select>
    </div>
  );
}
