import React, { useContext } from "react";
import { useAccount } from 'wagmi';
import { FormContext } from "../../Overlay/CreateProject.js";
import classes from "../../../styles/Forms.module.css";
import {
  client as lensClient,
  createIPFontsUser,
  createIPFontProject,
  getProfileByAddress
} from '../../../clientApi';

export default function Submit() {
  const { address, isConnected } = useAccount();
  const { activeStepIndex, setActiveStepIndex, formData } = useContext(FormContext);

  //   projectName: "",
    // description: "",
    // files: "",
    // lensHandle: "",
    // minLimit: "",
    // setPrice: "",

  const submit = async () => {
    // Check to see if user is logged in
    if (isConnected) {
      const lensProfile = await lensClient.query({
        query: getProfileByAddress,
        variables: {
          owner: address,
        },
      });

      // Checks to see if user has a profile in our smart contract
      // If false create basic user in smart contract with address and lens handle if logged in with lens
      // await createIPFontsUser({
      //   address,
      //   lensHandle : lensProfile.data?.profiles?.items[0]?.handle
      // });

      // Upload font files to IPFS through our endpoint
      // const { ok, cid } = await fetch('api/upload-font', {
      //   method: 'POST',
      //   body: '' // todo get file data from formData
      // });

      // if (!ok || !cid) {
      //   throw Error('could not upload font files');
      // }

      //     If font upload succesful 
      //        - upload name and description metadata to IPFS with our endpoint

      console.log(formData);



      const result = await createIPFontProject({
        name : formData.projectName,
        description : formData.description
      });

      console.log(result);


      // - create project in smart contract with rest of form data and CID of metadata and upload CID
    }

    setActiveStepIndex(activeStepIndex + 1);
    console.table(formData);
  };

  const stepBack = () => setActiveStepIndex(activeStepIndex - 1);

  return (
    <>
      <div className={classes.title}>Review your Project</div>
      <div className={classes.formValues}>Name: {formData.projectName}</div>
      <div className={classes.formValues}>Price: ${formData.setPrice}</div>
      <div className={classes.formValues}>Mint Limit: {formData.minLimit}</div>
      <p className={classes.formValuesDescription}>
        Description: {formData.description}
      </p>

      <button onClick={submit} className={classes.continue}>
        Create Project
      </button>
      <button className={classes.back} onClick={stepBack}>
        Back
      </button>
    </>
  );
}
