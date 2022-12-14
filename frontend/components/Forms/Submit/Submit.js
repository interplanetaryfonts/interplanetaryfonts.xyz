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
    console.table(formData);
  };

  const stepBack = () => setActiveStepIndex(activeStepIndex - 1);

  return (
    <>
      <div className={classes.formValues}>Name: {formData.projectName}</div>
      <div className={classes.formValues}>Price: ${formData.setPrice}</div>
      <div className={classes.formValues}>Mint Limit: {formData.minLimit}</div>
      <div className={classes.formValuesDescription}>
        Description: {formData.description}
      </div>

      <button onClick={submit} className={classes.continue}>
        Create Project
      </button>
      <button className={classes.back} onClick={stepBack}>
        Back
      </button>
    </>
  );
}
