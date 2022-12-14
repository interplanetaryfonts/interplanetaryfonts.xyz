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
    projectName: yup.string().required("A name is required"),
    description: yup.string().required("A description is required"),
    /* .test(
        "format",
        "Only the following formats are accepted: .ttf or .otf",
        (format) =>
          SUPPORTED_FORMATS.includes(["application/x-font-ttf", "font/*"])
      ) */
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        files: "",
        projectName: "",
        description: "",
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
            accept=".ttf,.otf,.woff,.woff2"
            multiple="multiple"
            type="file"
            name="files"
            className="rounded-md mx-auto border-0 p-2block w-full text-l text-darkblue
            file:mr-4 file:py-2 file:px-12
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-red file:text-darkblue
            hover:file:bg-red-100 cursor-pointer"
          />
          <ErrorMessage name="files" render={renderError} />
          <label className={classes.labelField}>Name</label>
          <Field
            type="text"
            name="projectName"
            className=" text-red-500 placeholder:italic placeholder:text-red-100 block bg-white w-full border border-red-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-red-500 focus:ring-red-500 hover:border-red-500 hover:border-1 focus:ring-1 sm:text-sm"
          />
          <ErrorMessage name="projectName" render={renderError} />
          <label className={classes.labelField}>Description</label>
          <Field
            type="text"
            component="textarea"
            rows="5"
            name="description"
            className=" text-red-500 placeholder:italic placeholder:text-red-100 block bg-white w-full border border-red-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-red-500 focus:ring-red-500 hover:border-red-500 hover:border-1 focus:ring-1 sm:text-sm"
            placeholder="Awesome Description"
          ></Field>
          <ErrorMessage name="description" render={renderError} />
        </div>
        <button className={classes.continue} type="submit">
          Continue
        </button>
      </Form>
    </Formik>
  );
}

export default Files;
