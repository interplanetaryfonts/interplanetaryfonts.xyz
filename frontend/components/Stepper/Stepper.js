import { useContext } from "react";
import { FormContext } from "../Overlay/CreateProject.js";
import classes from "../../styles/Stepper.module.css";

function Stepper() {
  const { activeStepIndex } = useContext(FormContext);

  return (
    <div className={classes.stepper}>
      <div
        className={`${classes.step} ${
          0 <= activeStepIndex ? classes.stepperItemFormat : ""
        }`}
      >
        1
      </div>
      <div className={classes.line}></div>
      <div
        className={`${classes.step} ${
          1 <= activeStepIndex ? classes.stepperItemFormat : ""
        }`}
      >
        2
      </div>
      <div className={classes.line}></div>
      <div
        className={`${classes.step} ${
          2 <= activeStepIndex ? classes.stepperItemFormat : ""
        }`}
      >
        3
      </div>
      <div className={classes.line}></div>
      <div
        className={`${classes.step} ${
          3 <= activeStepIndex ? classes.stepperItemFormat : ""
        }`}
      >
        4
      </div>
      <div className={classes.line}></div>
      <div
        className={`${classes.step} ${
          4 <= activeStepIndex ? classes.stepperItemFormat : ""
        }`}
      >
        5
      </div>
    </div>
  );
}

export default Stepper;
