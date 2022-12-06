console.log('Testing');

const body = {
    email: 'test@ipfonts.xyz',
    name: 'Immafont',
    website: 'ipfonts.xyz',
    bio: "I'm a test account",
    links: [{ name: 'twitter', url: 'https://twitter.com/ipfonts' }],
};

async function testSubmit(body) {
    try {
        const response = await fetch('../api/store-font-data.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (response.status !== 200) {
            console.log(
                'Oops! Something went wrong. Please refresh and try again.'
            );
        } else {
            console.log('User data successfully submitted!');
            let responseJSON = await response.json();
            console.log(responseJSON.cid);
        }
    } catch (error) {
        console.log(
            `Oops! Something went wrong. Please refresh and try again. Error ${error}`
        );
    }
}

testSubmit();
