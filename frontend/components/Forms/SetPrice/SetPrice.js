import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { FormContext } from "../../Overlay/CreateProject.js";
import * as yup from "yup";
import classes from "../../../styles/Forms.module.css";

export default function SetPrice() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const renderError = (message) => (
    <p className={classes.errorMessage}>{message}</p>
  );

  const ValidationSchema = yup.object().shape({
    setPrice: yup
      .number()
      .label("Price")
      .positive()
      .required("A valid price is required")
      .min(1),
    minLimit: yup
      .number()
      .label("Mint Limit")
      .positive()
      .required("A valid number is required")
      .min(1)
      .max(100)
      .integer(),
  });

  return (
    <Formik
      initialValues={{
        setPrice: 0,
        minLimit: 0,
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      <Form className={classes.formContainer}>
        <div className={classes.title}>Set the price!</div>
        <div className={classes.formContainer}>
          <label className={classes.labelField}>Price</label>
          <Field
            name="setPrice"
            className=" text-red-500 placeholder:italic placeholder:text-red-100 block bg-white w-full border border-red-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-red-500 focus:ring-red-500 focus:ring-1 sm:text-sm"
            placeholder="00.00 USCD"
          />
          <ErrorMessage name="setPrice" render={renderError} />
          <label className={classes.labelField}>Mint Limit</label>
          <Field
            name="minLimit"
            className=" text-red-500 placeholder:italic placeholder:text-red-100 block bg-white w-full border border-red-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-red-500 focus:ring-red-500 focus:ring-1 sm:text-sm"
            placeholder="100 units"
          />
          <ErrorMessage name="minLimit" render={renderError} />
        </div>
        <button className={classes.continue} type="submit">
          Continue
        </button>
      </Form>
    </Formik>
  );
}
