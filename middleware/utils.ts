import { CookieNames } from '@ts-types/enums';
import cookie from 'cookie';
import jwt, { Algorithm } from 'jsonwebtoken';
import { GetServerSidePropsContext, NextApiRequest } from 'next';
import { serializeError } from 'serialize-error';

const PublicKEY = process.env.JWTRS256_KEY_PUB;

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
