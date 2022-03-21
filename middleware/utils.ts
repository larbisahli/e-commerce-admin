import { CookieNames } from '@ts-types/enums';
import cookie from 'cookie';
import fs from 'fs';
import jwt, { Algorithm } from 'jsonwebtoken';
import { GetServerSidePropsContext, NextApiRequest } from 'next';
import path from 'path';
import { serializeError } from 'serialize-error';

let PublicKEY: string;

if (process.env.NODE_ENV === 'production') {
  const jwtRS256File = path.join(process.cwd(), 'jwtRS256.key.pub');
  PublicKEY = fs.readFileSync(jwtRS256File, 'utf8');
} else {
  PublicKEY = fs.readFileSync('./middleware/jwtRS256.key.pub', 'utf8');
}

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */
export function verifyAuth(jwtToken: string | null) {
  try {
    if (!jwtToken) {
      return {
        client: null,
        error: { message: 'No jwtToken Provided!', jwtToken }
      };
    }
    const Alg: Algorithm = 'RS256';

    const client = jwt.verify(jwtToken, PublicKEY, {
      algorithms: Alg
    });
    return { client, error: null };
  } catch (error) {
    console.log('verifyAuth Error:>>', { error });
    return { client: null, error: { ...serializeError(error), jwtToken } };
  }
}

/*
 * @params {request} extracted from request response
 * @return {object} object of parse jwt cookie decode object
 */

export function getClientToken(context: GetServerSidePropsContext) {
  const { req } = context;
  const token: string =
    cookie.parse(req?.headers?.cookie || '')[CookieNames.STAFF_TOKEN_NAME] ??
    null;
  return { token };
}

export function getClientTokenAPI(req: NextApiRequest) {
  const token: string = req.cookies[CookieNames.STAFF_TOKEN_NAME] ?? null;
  return { token };
}
