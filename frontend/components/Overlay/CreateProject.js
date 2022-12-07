import { useState } from "react";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import Worldcoin from "./Worldcoin";
import Step from "../Step/Step";
import Stepper from "../Stepper";
import { createContext } from "react";

export const FormContext = createContext();

export default function CreateProject(props) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const [mounted, setMounted] = useState(false),
    handleMount = (bool) => {
      setMounted(bool);
    };
  return (
    <>
      <Backdrop mounted={props.mounted} handleMount={props.handleMount} />
      <Modal mounted={props.mounted} handleMount={props.handleMount}>
        <FormContext.Provider
          value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
        >
          <Stepper />
          <Step />
        </FormContext.Provider>
      </Modal>
      <Worldcoin handleMount={handleMount} mounted={mounted} />
    </>
  );
}
