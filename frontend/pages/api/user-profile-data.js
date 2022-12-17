import { Web3Storage, File } from 'web3.storage';
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
        return res.status(200).json({ success: true, cid: cid });
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
    const client = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
    const cid = await client.put([file]);
    return cid;
}

export default withIronSessionApiRoute(handler, ironOptions);
