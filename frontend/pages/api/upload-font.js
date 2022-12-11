import { withIronSessionApiRoute } from 'iron-session/next';
import { Web3Storage, File, getFilesFromPath } from "web3.storage";
import ironOptions from '../../config/ironOptions';
import { storeFilesIPFS } from '../../utils/storeFilesIPFS';

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        // Check that user has signed in and is authorized to uplaod files
        if (!req.session.siwe) {
          return res.status(401).json({ message: 'You have to sign-in first' });
        } 
        // TODO: Validate and Upload fonts to IPFS
        // await storeFilesIPFS(files);

        res.json({ ok: true });
      } catch (_error) {
        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
