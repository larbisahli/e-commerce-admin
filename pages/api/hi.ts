import geoip from 'geoip-country';
import { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';

export default async function hi(req: NextApiRequest, res: NextApiResponse) {
  const detectedIp = requestIp.getClientIp(req);
  var geo = geoip.lookup('196.119.250.140');
  return res.json({ country: geo?.country });
}
