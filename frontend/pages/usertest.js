import { useState, useEffect, useRef, useReducer } from 'react';
import {
    client as lensClient,
    createProfile,
    getProfileByAddress,
    getProfileByHandle,
    createSetProfileWithMetadata,
} from '../clientApi';
import connectContract from '../utils/connectContract';
// Components
import Form from '../components/UI/Form';
import Input from '../components/UI/Input';

const defaultFormValues = {
        name: '',
        nameIsValid: null,
        email: '',
        emailIsValid: null,
        username: '',
        usernameIsValid: null,
        website: '',
        websiteIsValid: null,
        bio: '',
        bioIsValid: null,
        links: {
            twitter: { value: '', isValid: null },
            lenster: { value: '', isValid: null },
            instagram: { value: '', isValid: null },
            discord: { value: '', isValid: null },
            github: { value: '', isValid: null },
        },
    },
    userFormReducer = (state, action) => {
        const validators = {
            email: /[^@]+@[A-Za-z0-9-]+\.[A-Za-z]+/,
            username: { grep: /[A-Za-z0-9-]+/, len: 2 },
            website: { grep: /[A-Za-z0-9-]+\.[A-Za-z]+/, len: 5 },
            bio: { min: 1, max: 120 },
            twitter: /https:\/\/twitter\.com\/[A-Za-z0-9]+/,
            lenster: /https:\/\/lenster\.xyz\/u\/[A-Za-z0-9]+/,
            instagram: /https:\/\/www.instagram.com\/[A-Za-z0-9]+/,
            discord: /[A-Za-z0-9]+#\d{4}/,
            github: /https:\/\/github\.com\/[A-Za-z0-9]+/,
        };
        let currentLink, actionType;
        if (
            [
                'TWITTER_INPUT',
                'LENSTER_INPUT',
                'INSTAGRAM_INPUT',
                'DISCORD_INPUT',
                'GITHUB_INPUT',
            ].includes(action.type)
        ) {
            currentLink = action.type.replace('_INPUT', '').toLowerCase();
            actionType = 'LINKS_INPUT';
        } else {
            actionType = action.type;
        }
        switch (actionType) {
            case 'NAME_INPUT':
                return {
                    ...state,
                    name: action.val,
                    nameIsValid:
                        action.val.match(validators.username.grep) &&
                        action.val.trim().length > validators.username.len,
                };
            case 'EMAIL_INPUT':
                return {
                    ...state,
                    email: action.val,
                    emailIsValid: action.val.match(validators.email),
                };
            case 'USERNAME_INPUT':
                return {
                    ...state,
                    username: action.val,
                    usernameIsValid:
                        action.val.match(validators.username.grep) &&
                        action.val.trim().length > validators.username.len,
                };
            case 'WEBSITE_INPUT':
                return {
                    ...state,
                    website: action.val,
                    websiteIsValid:
                        action.val.match(validators.website.grep) &&
                        action.val.trim().length > validators.website.len,
                };
            case 'BIO_INPUT':
                return {
                    ...state,
                    bio: action.val,
                    bioIsValid:
                        action.val.trim().length >= validators.bio.min &&
                        action.val.trim().length <= validators.bio.max,
                };
            case 'LINKS_INPUT':
                return {
                    ...state,
                    links: {
                        ...state.links,
                        [currentLink]: {
                            value: action.val,
                            isValid: action.val.match(validators[currentLink]),
                        },
                    },
                };
            case 'LENSTER_INPUT':
                return {
                    ...state,
                    links: {
                        ...links,
                        lenster: {
                            value: action.val,
                            isValid: action.val.match(validators.lenster),
                        },
                    },
                };
            case 'INSTAGRAM_INPUT':
                return {
                    ...state,
                    links: {
                        ...links,
                        instagram: {
                            value: action.val,
                            isValid: action.val.match(validators.instagram),
                        },
                    },
                };
            case 'DISCORD_INPUT':
                return {
                    ...state,
                    links: {
                        ...links,
                        discord: {
                            value: action.val,
                            isValid: action.val.match(validators.discord),
                        },
                    },
                };
            case 'GITHUB_INPUT':
                return {
                    ...state,
                    links: {
                        ...links,
                        github: {
                            value: action.val,
                            isValid: action.val.match(validators.github),
                        },
                    },
                };
            case 'INPUT_BLUR':
                return state;
            case 'FORM_RESET':
                return { ...defaultFormValues };
        }
    };

export default function UserTest(props) {
    const [nameRef, emailRef, usernameRef, websiteRef, bioRef] = [
            useRef(),
            useRef(),
            useRef(),
            useRef(),
            useRef(),
        ],
        links = [
            { name: 'Twitter', ref: useRef(), type: 'url' },
            { name: 'Lenster', ref: useRef(), type: 'url' },
            { name: 'Instagram', ref: useRef(), type: 'url' },
            { name: 'Discord', ref: useRef(), type: 'text' },
            { name: 'GitHub', ref: useRef(), type: 'url' },
        ],
        [userFormState, dispatchUserForm] = useReducer(userFormReducer, {
            ...defaultFormValues,
        }),
        [hasIPFonts, setHasIPFonts] = useState(false),
        [lensHandle, setLensHandle] = useState(''),
        [txStatus, setTxStatus] = useState('DEFAULT'),
        formInputChangeHandler = e => {
            let rawID = e.target.id.replace('user-', '');
            dispatchUserForm({
                type: `${rawID.toUpperCase()}_INPUT`,
                val: e.target.value,
            });
        },
        validateFormInputHandler = () => {
            dispatchUserForm({ type: 'INPUT_BLUR' });
        },
        resetForm = () => {
            dispatchUserForm({ type: 'FORM_RESET' });
            setTxStatus('DEFAULT');
        };

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
                const getLensUser = await lensClient.mutate({
                        mutation: getProfileByAddress,
                        variables: { owner: props.address },
                    }),
                    hasLens = Boolean(getLensUser.data.profiles.items.length);
                setLensHandle(
                    hasLens ? getLensUser.data.profiles.items[0].handle : ''
                );
            } catch (err) {
                setHasIPFonts('');
                setLensHandle('');
            }
        })();
    }, [props.address]);

    async function handleCreateUser(e) {
        e.preventDefault();
        const body = {
            name: userFormState.name,
            email: userFormState.email,
            username: userFormState.username || lensHandle.replace('.test', ''),
            website: userFormState.website,
            bio: userFormState.bio,
            links: Object.fromEntries(
                Object.entries(userFormState.links).map(([link, values]) => {
                    console.log();
                    if (values.value) {
                        return [link, values.value];
                    }
                })
            ),
        };
        // Deactivate inpute while waiting
        setTxStatus('WAIT');
        // Creates a test lens profile with the username as handle
        if (!lensHandle) {
            try {
                const createLensProfile = await lensClient.mutate({
                    mutation: createProfile(userFormState.username),
                });
                if (createLensProfile.data)
                    setLensHandle(userFormState.username);
            } catch (err) {
                alert(
                    `There was an error creating your lens test profile ${err}`
                );
            }
            resetForm();
        }
        try {
            const ipfontsContract = await connectContract();
            if (ipfontsContract) {
                const response = await fetch('./api/user-profile-data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                if (response.status !== 200) {
                    alert(
                        'Oops! Something went wrong. Please refresh and try again.'
                    );
                } else {
                    const responseJSON = await response.json(),
                        cid = `https://${responseJSON.cid}.ipfs.w3s.link/data.json`;
                    if (!hasIPFonts) {
                        const txn = await ipfontsContract.createUser(
                            lensHandle,
                            cid,
                            Date.now(),
                            { gasLimit: 900000 }
                        );
                        const wait = await txn.wait();
                        setTxStatus(!wait && 'SENT');
                        const reset = setTimeout(resetForm, 2000);
                        clearTimeout(reset);
                    } else {
                        alert('Modify user logic goes here!');
                        if (lensHandle) {
                            const getProfile = await lensClient.query({
                                query: getProfileByHandle,
                                variables: { handle: lensHandle },
                            });
                            console.log(getProfile.data.profile);
                            const setLensProfile = await lensClient.mutate({
                                mutation: createSetProfileWithMetadata(
                                    getProfile.data.profile.id,
                                    cid
                                ),
                            });
                            console.log(setLensProfile.data);
                        }
                        resetForm();
                    }
                }
            } else {
                alert("Couldn't connect contract!");
            }
        } catch (error) {
            alert(`Oops! Something went wrong. Please refresh and try again.`);
            resetForm();
        }
    }

    return (
        <Form onSubmit={handleCreateUser}>
            {!props.connected && (
                <h5>Connect your wallet to create or edit your user</h5>
            )}
            {props.connected && (
                <>
                    <h6>{lensHandle ? `Welcome ${lensHandle}` : 'Welcome'}</h6>
                    <Input
                        ref={nameRef}
                        id='user-name'
                        label='Full Name'
                        type='text'
                        onChange={formInputChangeHandler}
                        onBlur={validateFormInputHandler}
                        value={userFormState.name}
                        isValid={userFormState.nameIsValid}
                    />
                    <Input
                        ref={emailRef}
                        id='user-email'
                        label='E-Mail'
                        type='email'
                        onChange={formInputChangeHandler}
                        onBlur={validateFormInputHandler}
                        value={userFormState.email}
                        isValid={userFormState.emailIsValid}
                    />
                    {lensHandle ? (
                        ''
                    ) : (
                        <Input
                            ref={usernameRef}
                            id='username'
                            label='Username'
                            type='text'
                            onChange={formInputChangeHandler}
                            onBlur={validateFormInputHandler}
                            value={userFormState.username}
                            isValid={userFormState.usernameIsValid}
                        />
                    )}
                    <Input
                        ref={websiteRef}
                        id='user-website'
                        label='Website'
                        type='url'
                        onChange={formInputChangeHandler}
                        onBlur={validateFormInputHandler}
                        value={userFormState.website}
                        isValid={userFormState.websiteIsValid}
                    />
                    <Input
                        ref={bioRef}
                        id='user-bio'
                        label='Biography'
                        type='text-area'
                        onChange={formInputChangeHandler}
                        onBlur={validateFormInputHandler}
                        value={userFormState.bio}
                        isValid={userFormState.bioIsValid}
                    />
                    {links.map(link => (
                        <Input
                            key={`create-edit-user-link-${link.name}`}
                            ref={link.ref}
                            id={`user-${link.name.toLowerCase()}`}
                            label={link.name}
                            type={link.type}
                            onChange={formInputChangeHandler}
                            onBlur={validateFormInputHandler}
                            value={
                                userFormState.links[link.name.toLowerCase()]
                                    .value
                            }
                            isValid={
                                userFormState.links[link.name.toLowerCase()]
                                    .isValid
                            }
                        />
                    ))}
                    {txStatus === 'DEFAULT' ? (
                        <input
                            type='submit'
                            value={hasIPFonts ? 'Edit user' : 'Create user'}
                        />
                    ) : txStatus === 'WAIT' ? (
                        <input
                            type='submit'
                            disabled={true}
                            value={
                                hasIPFonts ? 'Editing user' : 'Creating user'
                            }
                        />
                    ) : txStatus === 'SENT' ? (
                        <input
                            type='submit'
                            disabled={true}
                            value={
                                hasIPFonts ? 'User edited!' : 'User created!'
                            }
                        />
                    ) : (
                        ''
                    )}
                </>
            )}
        </Form>
    );
}
