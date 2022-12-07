import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { FormContext } from "../../Overlay/CreateProject.js";
import * as yup from "yup";

export default function VerifyHumanity() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const renderError = (message) => (
    <p className="italic text-red-600">{message}</p>
  );

  const ValidationSchema = yup.object().shape({
    lensHandle: yup.string(),
  });

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
      <Form className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-start mb-2">
          <div className=" self-center font-extrabold text-2xl text-red-500 mb-4">
            Verify Humanity
          </div>
          <Field
            name="lensHandle"
            className=" text-red-500 placeholder:italic placeholder:text-red-100 block bg-white w-full border border-red-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-red-500 focus:ring-red-500 hover:border-red-500 hover:border-1 focus:ring-1 sm:text-sm"
            placeholder="@handle.lens"
          />
        </div>
        <ErrorMessage name="lensHandle" render={renderError} />

        <button className="rounded-full border-2 border-red-200 font-medium text-red-200 my-2 p-2 w-full hover:border-red-500 hover:text-red-500">
          Verify with Lens
        </button>

        <button
          type="submit"
          className="rounded-md bg-red-500 font-medium text-white my-2 p-2 "
        >
          Continue
        </button>
      </Form>
    </Formik>
  );
}
