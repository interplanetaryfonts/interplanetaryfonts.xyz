import React, { useContext, useEffect } from "react";
import { FormContext } from "../Overlay/CreateProject.js";

function Stepper() {
  const { activeStepIndex } = useContext(FormContext);
  useEffect(() => {
    const stepperItems = document.querySelectorAll(".stepper-item");
    stepperItems.forEach((step, i) => {
      if (i <= activeStepIndex) {
        step.classList.add("bg-red-500", "text-white");
      } else {
        step.classList.remove("bg-red-500", "text-white");
      }
    });
  }, [activeStepIndex]);
  return (
    <div className="w-2/3 flex flex-row items-center justify-center px-32 py-16">
      <div className="stepper-item w-8 h-8 text-center font-medium border-2 border-red-500 rounded-full">
        1
      </div>
      <div className="flex-auto border-t-2 border-red-500 "></div>
      <div className="stepper-item w-8 h-8 text-center font-medium border-2 border-red-500  rounded-full">
        2
      </div>
      <div className="flex-auto border-t-2 border-red-500"></div>
      <div className="stepper-item w-8 h-8 text-center font-medium border-2 border-red-500  rounded-full">
        3
      </div>
      <div className="flex-auto border-t-2 border-red-500"></div>
      <div className="stepper-item w-8 h-8 text-center font-medium border-2 border-red-500  rounded-full">
        4
      </div>
      <div className="flex-auto border-t-2 border-red-500"></div>
      <div className="stepper-item w-8 h-8 text-center font-medium border-2 border-red-500  rounded-full">
        5
      </div>
    </div>
  );
}

export default Stepper;
