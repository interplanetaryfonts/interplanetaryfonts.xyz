import Link from "next/link";
import classes from "../../../styles/UserDashboard.module.css";
// Components
import DashboardElement from "../../UI/DashboardElement";

export default function Collabs(props) {
  return (
    <div className={classes["profile-elements"]}>
      {props.elements.map((el, i) => (
        <DashboardElement key={`collabs-el-${i}`}>
          <p>{el.txt}</p>
          <Link href={el.url} passHref>
            <a>View FontStream</a>
          </Link>
          <p>
            {el.cstatus ? "On Progress" : "Finished"}{" "}
            <span>{el.cstatus ? "🛑" : "✅"}</span>
          </p>
        </DashboardElement>
      ))}
    </div>
  );
}
