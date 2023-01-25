import Link from "next/link";
import classes from "../../../styles/UserDashboard.module.css";
// Components
import DashboardElement from "../../UI/DashboardElement";

export default function Funded(props) {
  return (
    <div className={classes["profile-elements"]}>
      {props.elements.map((el, i) => (
        <DashboardElement key={`funded-el-${i}`}>
          <p>{el.txt}</p>
          <Link href={el.url} passHref>
            <a>View FontStream</a>
          </Link>
        </DashboardElement>
      ))}
    </div>
  );
}
