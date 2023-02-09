import classes from "@/styles/DashboardContainer.module.css";

export default function DashboardContainer(props) {
  return <div className={classes.container}>{props.children}</div>;
}
