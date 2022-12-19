import { useState } from "react";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import Step from "../Step/Step";
import Stepper from "../Stepper";
import { createContext } from "react";
import classes from "../../styles/Forms.module.css";

export const FormContext = createContext();

export default function CreateProject(props) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    files: "",
    lensHandle: "",
    minLimit: "",
    setPrice: "",
  });

  const [mounted, setMounted] = useState(false),
    handleMount = (bool) => {
      setMounted(bool);
    };
  return (
    <>
      <Backdrop mounted={props.mounted} handleMount={props.handleMount} />
      <Modal
        mounted={props.mounted}
        handleMount={props.handleMount}
        styleModal={classes.modalCreateProject}
      >
        <FormContext.Provider
          value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
        >
          <Stepper />
          <Step />
        </FormContext.Provider>
      </Modal>
    </>
  );
}
