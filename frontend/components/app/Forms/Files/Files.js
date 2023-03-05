import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import { FormContext } from "@/components/app/Overlay/CreateProject.js";
import * as yup from "yup";
import classes from "@/styles/Forms.module.css";

function Files({ formData, setFormData }) {
  const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);

  const renderError = (message) => (
    <p className={classes.errorMessage}>{message}</p>
  );

  const ValidationSchema = yup.object().shape({
    files: yup.mixed().required("OTFs or TTFs are required"),
    projectName: yup.string().required("A name is required"),
    description: yup.string().required("A description is required"),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={formData}
      validationSchema={ValidationSchema}
      onSubmit={() => {
        // const data = { ...formData, ...values };
        // setFormData(data);
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
            name="fileSelector"
            className="rounded-md mx-auto border-0 p-2block w-full text-l text-darkblue
            file:mr-4 file:py-2 file:px-12
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-red file:text-darkblue
            hover:file:bg-red-100 cursor-pointer"
            onChange={(event) => {
              console.log(event.target.files);
              setFormData({
                ...formData,
                files: [...event.target.files],
              });
            }}
          />
          <ErrorMessage name="files" render={renderError} />
          <label htmlFor="description" className={classes.labelField}>
            Name
          </label>
          <Field
            id="projectName"
            value={formData.projectName}
            onChange={(e) => {
              setFormData({
                ...formData,
                projectName: e.target.value,
              });
            }}
            type="text"
            name="projectName"
            className=" text-red-500 placeholder:italic placeholder:text-red-100 block bg-white w-full border border-red-300 rounded-md px-5 py-2 shadow-sm focus:outline-none focus:border-red-500 focus:ring-red-500 hover:border-red-500 hover:border-1 focus:ring-1 sm:text-sm"
          />
          <ErrorMessage name="projectName" render={renderError} />
          <label htmlFor="description" className={classes.labelField}>
            Description
          </label>
          <Field
            id="description"
            type="text"
            component="textarea"
            rows="5"
            name="description"
            className=" text-red-500 placeholder:italic placeholder:text-red-100 block bg-white w-full border border-red-300 rounded-md px-5 py-2 shadow-sm focus:outline-none focus:border-red-500 focus:ring-red-500 hover:border-red-500 hover:border-1 focus:ring-1 sm:text-sm"
            placeholder="Awesome Description"
            value={formData.description}
            onChange={(e) => {
              setFormData({
                ...formData,
                description: e.target.value,
              });
            }}
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
