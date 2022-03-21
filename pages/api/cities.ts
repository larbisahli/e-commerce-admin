import { getClientTokenAPI, verifyAuth } from '@middleware/utils';
import cities from '@utils/cities.min.json';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { country } = req.body;

  try {
    const { token }: { token: string } = getClientTokenAPI(req);
    const { client } = verifyAuth(token);

    if (!client) {
      res.status(403).json({});
    }
    if (req.method === 'POST') {
      res.status(200).json({ cities: cities[country.name] });
    } else {
      res.status(403).json({});
    }
  } catch (error) {
    res.status(403).json({});
  }
};

export default handler;
