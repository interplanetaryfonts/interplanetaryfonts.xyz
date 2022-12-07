import React, { useContext, useEffect } from "react";
import { FormContext } from "../Overlay/CreateProject.js";
import classes from "../../styles/Stepper.module.css";

function Stepper() {
  const { activeStepIndex } = useContext(FormContext);
  useEffect(() => {
    const stepperItems = document.querySelectorAll(`.${classes.step}`);
    stepperItems.forEach((step, i) => {
      if (i <= activeStepIndex) {
        step.classList.add(`${classes.stepperItemFormat}`);
      } else {
        step.classList.remove(`${classes.stepperItemFormat}`);
      }
    });
  }, [activeStepIndex]);
  return (
    // <div className="w-2/3 flex flex-row items-center justify-center px-32 py-16">
    <div className={classes.stepper}>
      <div className={classes.step}>1</div>
      <div className={classes.line}></div>
      <div className={classes.step}>2</div>
      <div className={classes.line}></div>
      <div className={classes.step}>3</div>
      <div className={classes.line}></div>
      <div className={classes.step}>4</div>
      <div className={classes.line}></div>
      <div className={classes.step}>5</div>
    </div>
  );
}

export default Stepper;
