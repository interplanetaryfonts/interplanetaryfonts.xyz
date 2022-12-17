import { withIronSessionApiRoute } from "iron-session/next";
import multer from "multer";
import ironOptions from "../../config/ironOptions";
import { storeFilesIPFS } from "../../utils/storeFilesIPFS";
import { runMiddleware } from "../../utils/runMiddleware";

const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("font/")) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  },
  limits: {
    fields: 1,
    fileSize: 2097152,
  },
});

// Front-end example usage of the upload font endpoint
//
// const onSubmit = async (event) => {
//   event.preventDefault();

//   const formData = new FormData();
//   const { files } = fileInputRef.current;
//   for (let i = 0; i < files.length; i++) {
//     formData.append('fonts', files[i]);
//   };

//   const res = await fetch('/api/upload-font', {
//     method: 'POST',
//     body: formData,
//   });
// };
//
//
// const fileInputRef = useRef(null);
// <form onSubmit={onSubmit}>
//  <div>
//    <input accept=".ttf,.otf,.woff,.woff2" ref={fileInputRef} type="file" name="fonts" multiple="multiple" />
//    <input type="submit" value="Get me the stats!" />
//  </div>
// </form>

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        // Check that user has signed in and is authorized to uplaod files
        if (!req.session.siwe) {
          return res.status(401).json({ message: "You have to sign-in first" });
        }
        // Parse multi-part upload request with multer middleware
        await runMiddleware(req, res, uploadMiddleware.array("fonts", 4));

        // Get all the local paths of the uploaded files
        const files = req.files.map(({ originalname, buffer }) => ({
          name: originalname,
          buffer,
        }));
        // Upload files to IPFS
        const cid = await storeFilesIPFS(files);

        res.json({
          ok: true,
          cid,
        });
      } catch (_error) {
        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);

export const config = {
  api: {
    bodyParser: false,
  },
};
