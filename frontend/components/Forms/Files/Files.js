import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { FormContext } from "../../Overlay/CreateProject.js";
import * as yup from "yup";
import classes from "../../../styles/Forms.module.css";

function Files() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const renderError = (message) => (
    <p className={classes.errorMessage}>{message}</p>
  );

  const ValidationSchema = yup.object().shape({
    files: yup.mixed().required("OTFs or TTFs are required"),
    /* .test(
        "format",
        "Only the following formats are accepted: .ttf or .otf",
        (format) =>
          SUPPORTED_FORMATS.includes(["application/x-font-ttf", "font/*"])
      ) */
  });

  return (
    <Formik
      initialValues={{
        files: "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      <Form className={classes.formContainer}>
        <div className={classes.title}>Upload OTF and/or TTF files!</div>
        <div className={classes.formContainer}>
          <Field
            type="file"
            name="files"
            className="rounded-md mx-auto border-0 p-2block w-full text-l text-darkblue
            file:mr-4 file:py-2 file:px-12
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-red file:text-darkblue
            hover:file:bg-red-100 cursor-pointer"
          />
        </div>
        <ErrorMessage name="files" render={renderError} />

        <button className={classes.continue} type="submit">
          Continue
        </button>
      </Form>
    </Formik>
  );
}

export default Files;
