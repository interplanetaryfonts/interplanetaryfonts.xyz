import { useReducer } from 'react';
// Components
import Button from '../components/UI/Button';
import Form from '../components/UI/Form';
import Input from '../components/UI/Input';

const userFormReducer = (state, action) => {
    console.log('Reducer');
};

export default function UserTest() {
    const [userFormState, dispatchUserForm] = useReducer(userFormReducer, {
            email: '',
            username: '',
            website: '',
            bio: '',
            links: [],
        }),
        formInputChangeHandler = e => {
            if (e.target.id === 'user-email') {
                dispatchUserForm({
                    type: 'EMAIL_INPUT',
                    val: e.target.value,
                });
            } else if (e.target.id === 'username') {
                dispatchUserForm({
                    type: 'USERNAME_INPUT',
                    val: e.target.value,
                });
            } else if (e.target.id === 'user-website') {
                dispatchUserForm({
                    type: 'WEBSITE_INPUT',
                    val: e.target.value,
                });
            } else if (e.target.id === 'user-bio') {
                dispatchUserForm({
                    type: 'BIO_INPUT',
                    val: e.target.value,
                });
            } else if (e.target.id === 'user-links') {
                dispatchUserForm({
                    type: 'LINKS_INPUT',
                    val: e.target.value,
                });
            }
        },
        validateFormInputHandler = e => {
            dispatchUserForm({ type: 'INPUT_BLUR' });
        };

    async function handleCreateUser() {
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
    return (
        <Form>
            <Input id='user-email' htmlFor='user-email' label='E-Mail' />
            <Button onClick={handleCreateUser}>Create User</Button>
        </Form>
    );
}
