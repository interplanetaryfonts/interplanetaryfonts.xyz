import React, { useContext } from "react";
import { FormContext } from "../../Overlay/CreateProject.js";
import classes from "../../../styles/Forms.module.css";

export default function Submit() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const submit = () => {
    const data = { ...formData };
    setFormData(data);
    setActiveStepIndex(activeStepIndex + 1);
    console.log(formData);
  };
  return (
    <>
      <div className={classes.title}>Your Font Project Name</div>
      <div className={classes.formValues}>Price: ${formData.SetPrice}</div>
      <div className={classes.formValues}>
        LensHandle: @{formData.lensHandle}
      </div>

      <button onClick={submit} className={classes.continue}>
        Create Project
      </button>
    </>
  );
}
