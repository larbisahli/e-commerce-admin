import { USER_AUTH } from '@graphql/user';
import apolloClient from '@lib/apollo-client';
import { JwtPayload } from '@ts-types/custom.types';
import { CookieNames } from '@ts-types/enums';
import { UserType } from '@ts-types/generated';
import Cookies from 'cookies';
import Tokens from 'csrf';
import jwt, { Algorithm } from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';
import { GetServerSidePropsContext } from 'next';
import { serializeError } from 'serialize-error';

const tokens = new Tokens();

const ENV = process.env;
const PRODUCTION_ENV = ENV.NODE_ENV === 'production';

const PublicKEY = Buffer.from(process.env.JWTRS256_KEY_PUB, 'base64').toString(
  'ascii'
);

interface TUser {
  userAuth: UserType;
  error: Error;
}

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token and client info
 */
export async function verifyAuth(context: GetServerSidePropsContext) {
  const { req, res } = context;

  const cookies = new Cookies(req, res);
  const jwtToken = cookies.get(CookieNames.USER_TOKEN_NAME);

  try {
    if (!jwtToken) {
      return {
        error: { message: 'No jwtToken Provided!' }
      };
    }
    const Alg: Algorithm = 'RS256';

    const payload = jwt.verify(jwtToken, PublicKEY, {
      algorithms: Alg
    }) as JwtPayload;

    if (
      !payload ||
      !payload.iss ||
      !payload.ema ||
      !payload.uid ||
      !payload.sid ||
      payload.iss !== process.env.TOKEN_ISSUER
    ) {
      throw Error('Invalid Access Token');
    }

    // fetch for client info
    const { data } = await apolloClient.query<TUser>({
      query: USER_AUTH,
      variables: {},
      context: {
        headers: {
          authorization: jwtToken ? `Bearer ${jwtToken}` : ''
        }
      },
      fetchPolicy: 'no-cache'
    });

    const { userAuth, error } = data ?? {};

    if (!isEmpty(error) || isEmpty(userAuth)) {
      console.log('Auth Error:>>', { error });
      throw Error(error?.message ?? 'Something happened');
    }

    if (!userAuth?.active) {
      throw Error('User not active!');
    }

    return {
      client: { ...userAuth, ...payload }
    };
  } catch (error) {
    console.log('verifyAuth Error:>>', { message: error.message, error });
    const cookies = new Cookies(req, res);
    cookies.set(CookieNames.USER_TOKEN_NAME, '', {
      httpOnly: true,
      maxAge: 0,
      sameSite: 'strict',
      domain: PRODUCTION_ENV ? '.dropgala.com' : 'localhost',
      overwrite: true
    });
    return { error: { message: error?.message, jwtToken } };
  }
}

export function verifyJWT(context: GetServerSidePropsContext) {
  const { req, res } = context;

  const cookies = new Cookies(req, res);
  const jwtToken = cookies.get(CookieNames.USER_TOKEN_NAME);

  try {
    if (!jwtToken) {
      return {
        error: { message: 'No jwtToken Provided!' }
      };
    }
    const Alg: Algorithm = 'RS256';

    const payload = jwt.verify(jwtToken, PublicKEY, {
      algorithms: Alg
    }) as JwtPayload;

    if (
      !payload ||
      !payload.iss ||
      !payload.ali ||
      payload.iss !== process.env.TOKEN_ISSUER
    ) {
      return { error: 'Invalid Access Token' };
    }

    return { client: payload, error: null };
  } catch (error) {
    console.log('verifyAuth Error:>>', { error });
    return { error: { ...serializeError(error), jwtToken } };
  }
}

// TODO: Extend the token when the XSRF_TOKEN is 5 hours before expiring
export async function XSRFHandler(context: GetServerSidePropsContext) {
  const { req, res } = context;

  const cookies = new Cookies(req, res);
  const storedCsrfSecret = cookies.get(CookieNames.XSRF_TOKEN);

  let csrfToken: string | null = null;
  let csrfSecret: string | null = null;
  let csrfError: string | null = null;

  try {
    if (storedCsrfSecret) {
      csrfSecret = storedCsrfSecret;
    } else {
      // generate & set new secret
      csrfSecret = tokens.secretSync();
    }

    // create new token
    csrfToken = tokens.create(csrfSecret);

    if (!storedCsrfSecret && csrfSecret) {
      cookies.set(CookieNames.XSRF_TOKEN, csrfSecret, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // Token is valid for 24 hours
        sameSite: 'strict',
        domain: PRODUCTION_ENV ? '.dropgala.com' : 'localhost',
        overwrite: true
      });
    }
  } catch (err) {
    console.log('err :>> ', err.message);
    csrfError = err.message;
  }

  return { csrfSecret, csrfToken, csrfError };
}
