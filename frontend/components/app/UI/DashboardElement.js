import classes from "@/styles/DashboardElement.module.css";

export default function DashboardElement(props) {
  return (
    <div className={`${classes.container} ${props.children}`}>
      {props.children}
    </div>
  );
}
