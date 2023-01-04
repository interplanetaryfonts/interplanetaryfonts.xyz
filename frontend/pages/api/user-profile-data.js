import { withIronSessionApiRoute } from 'iron-session/next';
import ironOptions from '../../config/ironOptions';
import { storeMetadataFileIPFS } from '../../utils/storeMetadataFileIPFS';

async function handler(req, res) {
    if (req.method === 'POST') {
        return await storeUserMetadata(req, res);
    } else {
        return res
            .status(405)
            .json({ message: 'Method not allowed', success: false });
    }
}

async function storeUserMetadata(req, res) {
    const body = req.body;

    try {
        const file = {
            path: '/tmp/data.json',
            content: Buffer.from(body),
        };

        const cid = await storeMetadataFileIPFS(file);

        return res.status(200).json({ ok: true, cid: cid });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ error: 'Error creating/editing user', ok: false });
    }
}

export default withIronSessionApiRoute(handler, ironOptions);
