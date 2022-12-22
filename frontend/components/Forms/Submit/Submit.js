import React, { useContext } from "react";
import { useAuthenticationStatus } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { FormContext } from "../../Overlay/CreateProject.js";
import classes from "../../../styles/Forms.module.css";
import {
  client as lensClient,
  createIPFontsUser,
  getProfileByAddress
} from '../../../clientApi';

export default function Submit() {
  const { address } = useAccount();
  const walletConnectionStatus = useAuthenticationStatus();
  const { activeStepIndex, setActiveStepIndex, formData } = useContext(FormContext);

  const submit = async () => {
    // Check to see if user is logged in
    if (walletConnectionStatus === 'authenticated') {
      const lensProfile = await lensClient.query({
        query: getProfileByAddress,
        variables: {
          owner: address,
        },
      });

      // Checks to see if user has a profile in our smart contract
      // If false create user in smart contract with address and lens handle if logged in with lens
      await createIPFontsUser({
        address,
        lensHandle : lensProfile.data?.profiles?.items[0]?.handle
      });

      // Upload font files to IPFS through our endpoint
      const { ok, cid } = await fetch('api/upload-font', {
        method: 'POST',
        body: '' // todo
      });

      if (!ok || !cid) {
        throw Error('could not upload font files');
      }

      //     If succesful 
      //        - upload name and description metadata to IPFS with our endpoint
      //        - create project in smart contract with rest of form data and CID of metadata and upload CID
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
