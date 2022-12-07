import React, { useContext } from "react";
import { FormContext } from "../Overlay/CreateProject.js";
import { Files, Success, SetPrice, VerifyHumanity, Submit } from "../Forms";

function Step() {
  const { activeStepIndex } = useContext(FormContext);
  let stepContent;
  switch (activeStepIndex) {
    case 0:
      stepContent = <Files />;
      break;
    case 1:
      stepContent = <SetPrice />;
      break;
    case 2:
      stepContent = <VerifyHumanity />;
      break;
    case 3:
      stepContent = <Submit />;
      break;
    case 4:
      stepContent = <Success />;
      break;
    default:
      break;
  }

  return stepContent;
}

export default Step;
