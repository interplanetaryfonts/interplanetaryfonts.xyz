import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { FormContext } from "../../Overlay/CreateProject.js";
import * as yup from "yup";
import classes from "../../../styles/Forms.module.css";

export default function VerifyHumanity() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const renderError = (message) => (
    <p className={classes.errorMessage}>{message}</p>
  );

  const ValidationSchema = yup.object().shape({
    lensHandle: yup.string(),
  });
  const stepBack = () => setActiveStepIndex(activeStepIndex - 1);
  return (
    <Formik
      initialValues={{
        lensHandle: "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      <Form className={classes.formContainer}>
        <div className={classes.title}>Verify Humanity</div>
        <div className={classes.formContainer}>
          <Field
            name="lensHandle"
            className=" text-red-500 placeholder:italic placeholder:text-red-100 block bg-white w-full border border-red-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-red-500 focus:ring-red-500 hover:border-red-500 hover:border-1 focus:ring-1 sm:text-sm"
            placeholder="@handle.lens"
          />
        </div>
        <ErrorMessage name="lensHandle" render={renderError} />

        <button className={classes.lens}>Verify with Lens</button>

        <button type="submit" className={classes.continue}>
          Continue
        </button>
        <button className={classes.back} onClick={stepBack}>
          Back
        </button>
      </Form>
    </Formik>
  );
}
