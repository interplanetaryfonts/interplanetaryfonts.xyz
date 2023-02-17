import Link from "next/link";
import { useContext } from "react";
import classes from "@/styles/Forms.module.css";
import { FormContext } from "@/components/app/Overlay/CreateProject.js";
function Success() {
  const { setActiveStepIndex, setFormData } = useContext(FormContext);
  return (
    <>
      <div className={classes.title}>New Font Project Created</div>
      <Link href="/font/test-font">
        <button onClick="" className={classes.continue}>
          View Project
        </button>
      </Link>

      <button
        className={classes.back}
        onClick={() => {
          setActiveStepIndex(0),
            setFormData({
              projectName: "",
              description: "",
              files: "",
              lensHandle: "",
              minLimit: "",
              setPrice: "",
            });
        }}
      >
        {" "}
        NewProject
      </button>
    </>
  );
}
export default Success;
