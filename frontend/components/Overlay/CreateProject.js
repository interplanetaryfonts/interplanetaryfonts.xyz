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
          <div className="w-fit h-fit flex flex-col items-center justify-start">
            <Stepper />
            <Step />
          </div>
        </FormContext.Provider>
      </Modal>
      <Worldcoin handleMount={handleMount} mounted={mounted} />
    </>
  );
}
