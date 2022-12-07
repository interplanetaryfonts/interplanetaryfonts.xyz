import React, { useContext } from "react";
import { FormContext } from "../../Overlay/CreateProject.js";

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
      <div className="rounded-md border-2  border-red-500 font-medium text-red-500 my-2 p-2  w-fit  text-2xl px-5">
        Price: ${formData.SetPrice}
      </div>
      <div className="rounded-md border-2  border-red-500 font-medium text-red-500 my-2 p-2  w-fit  text-2xl px-5">
        LensHandle: @{formData.lensHandle}
      </div>

      <button
        onClick={submit}
        className="rounded-md bg-red-500 font-medium text-white my-2 p-2  w-fit "
      >
        Create Project
      </button>
    </>
  );
}
