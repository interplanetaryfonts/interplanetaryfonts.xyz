import classes from "@/styles/UserDashboard.module.css";
// Components
import Button from "@/components/app/UI/Button";

export default function UserButtons(props) {
  return (
    <div className={classes.buttons}>
      {Object.values(props.buttons).map((button, i) => (
        <Button
          onClick={props.handleActiveDashboard}
          className={`${classes.button} ${button.active && classes.active}`}
          key={`profile-dashboard-buttons-${i}`}
        >
          {button.txt}
        </Button>
      ))}
    </div>
  );
}
