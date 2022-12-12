import { withIronSessionApiRoute } from 'iron-session/next';
import multer from 'multer';
import ironOptions from '../../config/ironOptions';
import { storeFilesIPFS } from '../../utils/storeFilesIPFS';
import { runMiddleware } from '../../utils/runMiddleware';

const upload = multer({
  dest: 'font-uploads/',
  fileFilter : (req, file, cb) => {
    if (!file.mimetype.includes('font/')) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  },
  limits: {
    fields: 0,
    fileSize: 2097152
  }
});

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        // Check that user has signed in and is authorized to uplaod files
        // if (!req.session.siwe) {
        //   return res.status(401).json({ message: 'You have to sign-in first' });
        // } 
        // Parse multi-part upload request with multer middleware
        await runMiddleware(req, res, upload.array('fonts', 4));

        // Get all the local paths of the uploaded files
        const filePaths = req.files.map(file => path);
        // Upload files to IPFS
        const cid = await storeFilesIPFS(filePaths);

        res.json({
          ok: true,
          cid 
        });
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

export const config = {
  api: {
    bodyParser: false,
  },
}
