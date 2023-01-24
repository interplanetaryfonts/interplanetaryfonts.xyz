import { useContext } from "react";
import { useAccount } from "wagmi";
import { FormContext } from "../../Overlay/CreateProject.js";
import classes from "../../../styles/Forms.module.css";
import { createIPFontProject } from "../../../clientApi";

export default function Submit() {
  const { isConnected } = useAccount();
  const { activeStepIndex, setActiveStepIndex, formData } =
    useContext(FormContext);

  const submit = async () => {
    // Check to see if user is logged in
    if (isConnected) {
      // TODO - create user in smart contract if it does not exist already

      await createIPFontProject({
        files: formData.files,
        name: formData.projectName,
        description: formData.description,
        perCharacterMintPrice: formData.setPrice,
        mintLimit: formData.minLimit,
      });
    }

    setActiveStepIndex(activeStepIndex + 1);
    console.table(formData);
  };

  const stepBack = () => setActiveStepIndex(activeStepIndex - 1);

  return (
    <>
      <div className={classes.title}>Review your Project</div>
      <div className={classes.formValues}>Name: {formData.projectName}</div>
      <div className={classes.formValues}>Price: ${formData.setPrice}</div>
      <div className={classes.formValues}>Mint Limit: {formData.minLimit}</div>
      <p className={classes.formValuesDescription}>
        Description: {formData.description}
      </p>

      <button onClick={submit} className={classes.continue}>
        Create Project
      </button>
      <button className={classes.back} onClick={stepBack}>
        Back
      </button>
    </>
  );
}
