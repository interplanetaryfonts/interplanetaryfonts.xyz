import { withIronSessionApiRoute } from 'iron-session/next';
import ironOptions from '../../config/ironOptions';

async function handler(req, res) {
    if (req.method === 'POST') {
        return await storeUserData(req, res);
    } else {
        return res
            .status(405)
            .json({ message: 'Method not allowed', success: false });
    }
}

async function storeUserData(req, res) {
    const body = req.body;
    try {
        const file = await makeFileObject(body),
            cid = await storeFile(file);
        return res.status(200).json({ success: true, ...cid });
    } catch (err) {
        return res
            .status(500)
            .json({ error: 'Error creating user', success: false });
    }
}

async function makeFileObject(body) {
    const buffer = Buffer.from(JSON.stringify(body));
    return new File([buffer], 'data.json');
}

async function storeFile(file) {
    const ipfs = ipfsHttpClient({
        url: 'https://ipfs.infura.io:5001/api/v0',
        headers: { authorization },
    });
    const result = await ipfs.add(file);
    console.log('Result', result.path);
    return { cid: result.cid, path: result.path };
}

export default withIronSessionApiRoute(handler, ironOptions);
