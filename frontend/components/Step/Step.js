import React, { useContext } from "react";
import { FormContext } from "../Overlay/CreateProject.js";
import { Files, Success, SetPrice, VerifyHumanity, Submit } from "../Forms";

function Step() {
  const { activeStepIndex, formData, setFormData } = useContext(FormContext);
  let stepContent;
  switch (activeStepIndex) {
    case 0:
      stepContent = <Files formData={formData} setFormData={setFormData} />;
      break;
    case 1:
      stepContent = <SetPrice formData={formData} setFormData={setFormData} />;
      break;
    case 2:
      stepContent = (
        <VerifyHumanity formData={formData} setFormData={setFormData} />
      );
      break;
    case 3:
      stepContent = <Submit formData={formData} setFormData={setFormData} />;
      break;
    case 4:
      stepContent = <Success formData={formData} setFormData={setFormData} />;
      break;
    default:
      break;
  }

  return stepContent;
}

export default Step;
