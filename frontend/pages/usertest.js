import { useRef, useReducer } from 'react';
// Components
import Form from '../components/UI/Form';
import Input from '../components/UI/Input';

const userFormReducer = (state, action) => {
    const validators = {
        email: /[^@]+@[A-Za-z0-9-]+\.[A-Za-z]+/,
        username: { grep: /[A-Za-z0-9-]+/, len: 2 },
        website: { grep: /[A-Za-z0-9-]+\.[A-Za-z]+/, len: 5 },
        bio: { min: 1, max: 120 },
        links: 1,
    };
    switch (action.type) {
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
                links: action.val,
                linksAreValid: action.val.trim().length >= validators.links,
            };
        case 'INPUT_BLUR':
            return state;
    }
};

export default function UserTest(props) {
    const [emailRef, usernameRef, websiteRef, bioRef, linksRef] = [
            useRef(),
            useRef(),
            useRef(),
            useRef(),
            useRef(),
        ],
        [userFormState, dispatchUserForm] = useReducer(userFormReducer, {
            email: '',
            emailIsValid: null,
            username: '',
            usernameIsValid: null,
            website: '',
            websiteIsValid: null,
            bio: '',
            bioIsValid: null,
            links: '', // Will change to an array later
            linksAreValid: null,
        }),
        formInputChangeHandler = e => {
            const rawID = e.target.id.replace('user-', '');
            dispatchUserForm({
                type: `${rawID.toUpperCase()}_INPUT`,
                val: e.target.value,
            });
        },
        validateFormInputHandler = _ => {
            dispatchUserForm({ type: 'INPUT_BLUR' });
        };

    async function handleCreateUser(e) {
        e.preventDefault();
        const body = {
            email: userFormState.email,
            name: userFormState.username,
            website: userFormState.website,
            bio: userFormState.bio,
            links: userFormState.links,
        };
        try {
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
                let responseJSON = await response.json();
                alert(
                    `User data successfully submitted! Check it at https://${responseJSON.cid}.ipfs.w3s.link/data.json`
                );
            }
        } catch (error) {
            alert(
                `Oops! Something went wrong. Please refresh and try again. Error ${error}`
            );
        }
    }
    console.log(props);
    return (
        <>
            <h1>Create/Edit user</h1>
            {props.connected && (
                <Form onSubmit={handleCreateUser}>
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
                        type='text'
                        onChange={formInputChangeHandler}
                        onBlur={validateFormInputHandler}
                        value={userFormState.bio}
                        isValid={userFormState.bioIsValid}
                    />
                    <Input
                        ref={linksRef}
                        id='user-links'
                        label='Links'
                        type='url'
                        onChange={formInputChangeHandler}
                        onBlur={validateFormInputHandler}
                        value={userFormState.links}
                        isValid={userFormState.linksAreValid}
                    />
                    <input
                        type='submit'
                        value={
                            props.connected && props.token
                                ? 'Edit User'
                                : 'Create User'
                        }
                    />
                </Form>
            )}
        </>
    );
}
