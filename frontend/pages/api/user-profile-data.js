import { Web3Storage, File } from 'web3.storage';

export default async function handler(req, res) {
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
        const files = await makeFileObjects(body);
        const cid = await storeFiles(files);
        return res.status(200).json({ success: true, cid: cid });
    } catch (err) {
        return res
            .status(500)
            .json({ error: 'Error creating user', success: false });
    }
}

async function makeFileObjects(body) {
    const buffer = Buffer.from(JSON.stringify(body));
    return new File([buffer], 'data.json');
}

function makeStorageClient() {
    return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

async function storeFiles(files) {
    const client = makeStorageClient(),
        cid = await client.put(files);
    return cid;
}
