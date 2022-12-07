import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { FormContext } from "../../Overlay/CreateProject.js";
import * as yup from "yup";

function Files() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const renderError = (message) => (
    <p className="italic text-red-600">{message}</p>
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
      <Form className="flex flex-col justify-center items-center">
        <div className="text-2xl font-medium self-center mb-2">
          Upload OTF and/or TTF files!
        </div>
        <div className="flex flex-col items-center my-2 ">
          <Field
            type="file"
            name="files"
            className="rounded-md mx-auto border-0 p-2block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-red-50 file:text-red-700
            hover:file:bg-red-100"
          />
        </div>
        <ErrorMessage name="files" render={renderError} />

        <button
          className="rounded-md bg-red-500 font-medium text-white my-2 p-2"
          type="submit"
        >
          Continue
        </button>
      </Form>
    </Formik>
  );
}

export default Files;
