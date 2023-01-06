import { withIronSessionApiRoute } from 'iron-session/next';
import ironOptions from '../../config/ironOptions';
import { storeMetadataFileIPFS } from '../../utils/storeMetadataFileIPFS';

async function handler(req, res) {
  if (req.method === "POST") {
    // Check that user has signed in and is authorized to uplaod files
    if (!req.session.siwe) {
      return res.status(401).json({ message: 'You have to sign-in first' });
    }

    return await storeFontMetadata(req, res);
  } else {
    return res
      .setHeader('Allow', ['POST'])
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function storeFontMetadata(req, res) {
  const body = req.body;

  try {
    const file = {
      path : '/tmp/data.json',
      content: Buffer.from(body)
    };

    const cid = await storeMetadataFileIPFS(file);

    return res.status(200).json({ ok: true, cid: cid });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Error uploading font metadata", ok: false });
  }
}

export default withIronSessionApiRoute(handler, ironOptions)