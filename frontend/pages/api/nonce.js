import { withIronSessionApiRoute } from 'iron-session/next';
import { generateNonce } from 'siwe';
import ironOptions from '../../config/ironOptions';

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      req.session.nonce = generateNonce();
      await req.session.save();
      res.setHeader('Content-Type', 'text/plain');
      res.send(req.session.nonce);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
