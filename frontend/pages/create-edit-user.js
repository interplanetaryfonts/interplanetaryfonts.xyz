import React, { useState, useEffect } from 'react';
import {
    client as lensClient,
    getDefaultProfile,
    createSetDefaultProfile,
    createProfile,
    getProfileByHandle,
    getProfileByAddress,
    createSetProfileWithMetadata,
} from '../clientApi';
import connectContract from '../utils/connectContract';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classes from '../styles/Form.module.css';
// Components
import Form from '../components/UI/Form';
import Input from '../components/UI/Input';

const defaultFormValues = {
        name: '',
        email: '',
        handle: '',
        website: '',
        bio: '',
        twitter: '',
        lenster: '',
        instagram: '',
        discord: '',
        github: '',
    },
    createEditUserInputs = [
        { id: 'name', type: 'text', label: 'Name' },
        { id: 'email', type: 'email', label: 'E-Mail' },
        { id: 'handle', type: 'text', label: 'Handle' },
        { id: 'website', type: 'url', label: 'Website' },
        { id: 'bio', type: 'text-area', label: 'Bio' },
        { id: 'twitter', type: 'url', label: 'Twitter' },
        { id: 'lenster', type: 'url', label: 'Lenster' },
        { id: 'instagram', type: 'url', label: 'Instagram' },
        { id: 'discord', type: 'text', label: 'Discord' },
        { id: 'github', type: 'url', label: 'GitHub' },
    ],
    minStringValid = [3, 'Must be 3 characters or more'],
    validateLinks = linkName => {
        const greps = {
            twitter: /https:\/\/twitter\.com\/[A-Za-z0-9]+/,
            lenster: /https:\/\/lenster\.xyz\/u\/[A-Za-z0-9]+/,
            instagram: /https:\/\/www.instagram.com\/[A-Za-z0-9]+/,
            discord: /[A-Za-z0-9]+#\d{4}/,
            github: /https:\/\/github\.com\/[A-Za-z0-9]+/,
        };
        return Yup.string().matches(greps[linkName], {
            message: `Invalid ${linkName} ${
                linkName === 'discord' ? 'name' : 'link'
            }`,
            excludeEmptyString: true,
        });
    },
    createEditUserValidationSchema = {
        name: Yup.string().min(...minStringValid),
        email: Yup.string().email('Invalid email address'),
        handle: Yup.string().min(...minStringValid),
        website: Yup.string().url('Invalid website'),
        bio: Yup.string()
            .min(...minStringValid)
            .max(120, 'Must be less than 120 characters'),
        twitter: validateLinks('twitter'),
        lenster: validateLinks('lenster'),
        instagram: validateLinks('instagram'),
        discord: validateLinks('discord'),
        github: validateLinks('github'),
    };

export default function CreateEditUser(props) {
    const [hasIPFonts, setHasIPFonts] = useState(false),
        [lensHandle, setLensHandle] = useState(null),
        [waitForm, setWaitForm] = useState(false);

    // Check if the user has IPFonts and lens profile
    useEffect(() => {
        (async () => {
            try {
                // Has IPFonts profile
                const ipfontsContract = await connectContract();
                if (!ipfontsContract) {
                    alert('Cound not connect to contract');
                    return;
                }
                const ipfontsProfile = await ipfontsContract.addressToUser(
                    props.address
                );
                setHasIPFonts(Boolean(ipfontsProfile.createdAt.toNumber()));
                // Has Lens profile
                const getLensUser = await lensClient.query({
                    query: getDefaultProfile,
                    variables: { request: { ethereumAddress: props.address } },
                });
                // Setting a default profile is not working for some reason
                setLensHandle(getLensUser.data.defaultProfile?.handle);
            } catch (err) {
                setHasIPFonts(''), setLensHandle('');
            }
        })();
    }, [props.address]);

    // Create/edit user function
    async function handleCreateEditUser(body, resetFunction) {
        setWaitForm(true);
        // Creates a test lens profile
        const getLensUser = await lensClient.query({
            query: getDefaultProfile,
            variables: { request: { ethereumAddress: props.address } },
        });
        if (!getLensUser.data.defaultProfile?.handle) {
            try {
                const createLensProfile = await lensClient.mutate({
                    mutation: createProfile,
                    variables: {
                        request: {
                            handle: body.handle,
                            profilePictureUri: null,
                            followModule: { freeFollowModule: true },
                            followNFTURI: null,
                        },
                    },
                });
                if (
                    createLensProfile.data.createProfile.reason ===
                    'HANDLE_TAKEN'
                ) {
                    alert('Lens handle taken, change it and try again!');
                    setWaitForm(false);
                    return;
                }
                if (createLensProfile.data.createProfile.txHash) {
                    const profileId = await lensClient.query({
                            query: getProfileByAddress,
                            variables: { owner: props.address },
                        }),
                        profiles = profileId.data.profiles.items,
                        setProfile = await lensClient.mutate({
                            mutation: createSetDefaultProfile,
                            variables: {
                                request: {
                                    profileId: profiles[profiles.length - 1].id,
                                },
                            },
                        });
                    if (
                        setProfile.data.createSetDefaultProfileTypedData
                            .typedData.value.profileId
                    ) {
                        setLensHandle(`${body.handle}.test`);
                        resetFunction();
                    }
                }
            } catch (err) {
                alert(
                    `There was an error creating your lens test profile ${err}`
                );
                resetFunction();
            }
        }
        try {
            const ipfontsContract = await connectContract(),
                ipfontsBody = {
                    email: body.email,
                    name: body.name,
                    website: body.website,
                    bio: body.bio,
                    links: [
                        { name: 'twitter', url: body.twitter },
                        { name: 'lenster', url: body.lenster },
                        { name: 'instagram', url: body.instagram },
                        { name: 'discord', user: body.discord },
                        { name: 'github', url: body.github },
                    ],
                };
            if (ipfontsContract) {
                const response = await fetch('./api/user-profile-data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(ipfontsBody),
                });
                if (response.status !== 200) {
                    alert(
                        'Oops! Something went wrong. Please refresh and try again.'
                    );
                    resetFunction();
                } else {
                    const responseJSON = await response.json(),
                        cidURL = `https://${responseJSON.cid}.ipfs.w3s.link/data.json`;
                    if (!hasIPFonts) {
                        const txn = await ipfontsContract.createUser(
                            lensHandle,
                            responseJSON.cid,
                            Date.now(),
                            { gasLimit: 900000 }
                        );
                        const wait = await txn.wait();
                        resetFunction();
                    } else {
                        alert('Modify user logic goes here!');
                        if (lensHandle) {
                            const getProfile = await lensClient.query({
                                query: getProfileByHandle,
                                variables: { handle: lensHandle },
                            });
                            console.log(getProfile.data.profile);
                            const setLensProfile = await lensClient.mutate({
                                mutation: createSetProfileWithMetadata,
                                variables: {
                                    profileId: getProfile.data.profile.id,
                                    metadata: cidURL,
                                },
                            });
                            console.log(setLensProfile.data);
                        }
                        resetFunction();
                    }
                }
            } else {
                alert("Couldn't connect contract!");
            }
        } catch (error) {
            alert(`Oops! Something went wrong. Please refresh and try again.`);
            resetFunction();
        }
    }

    // Formik structure
    const formik = useFormik({
        initialValues: {
            ...defaultFormValues,
        },
        validationSchema: Yup.object({ ...createEditUserValidationSchema }),
        onSubmit: (values, { resetForm }) => {
            const setReset = () => {
                setWaitForm(false);
                resetForm();
            };
            handleCreateEditUser(values, setReset);
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            {!props.connected && (
                <h5>Connect your wallet to create or edit your user</h5>
            )}
            {props.connected && (
                <>
                    <h6>{lensHandle ? `Welcome ${lensHandle}` : 'Welcome'}</h6>
                    {createEditUserInputs.map(field => {
                        if (!Boolean(lensHandle && field.id === 'handle')) {
                            return (
                                <React.Fragment key={`${field.id}-fragment`}>
                                    <Input
                                        key={field.id}
                                        id={field.id}
                                        name={field.id}
                                        type={field.type}
                                        label={field.label}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values[field.id]}
                                    />
                                    {formik.touched[field.id] &&
                                    formik.errors[field.id] ? (
                                        <div key={`${field.id}-errors`}>
                                            {formik.errors[field.id]}
                                        </div>
                                    ) : null}
                                </React.Fragment>
                            );
                        }
                    })}
                    <input
                        className={classes.input}
                        type='submit'
                        value={waitForm ? 'Submitting...' : 'Submit'}
                        disabled={waitForm}
                    />
                </>
            )}
        </Form>
    );
}
