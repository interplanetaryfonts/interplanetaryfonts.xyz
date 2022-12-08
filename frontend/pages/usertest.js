import Button from '../components/UI/Button';

export default function UserTest() {
    async function handleCreateUser() {
        const body = {
            email: 'test@ipfonts.xyz',
            name: 'Immafont',
            website: 'ipfonts.xyz',
            bio: "I'm a test account",
            links: [{ name: 'twitter', url: 'https://twitter.com/ipfonts' }],
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
    return <Button onClick={handleCreateUser}>Create User</Button>;
}
