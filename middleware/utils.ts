import { JwtPayload } from '@ts-types/custom.types';
import { CookieNames } from '@ts-types/enums';
import Cookies from 'cookies';
import Tokens from 'csrf';
import jwt, { Algorithm } from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';
import { GetServerSidePropsContext } from 'next';
import { serializeError } from 'serialize-error';

import { StaffService } from '../services/grpc-service';

const tokens = new Tokens();

const ENV = process.env;
const PRODUCTION_ENV = ENV.NODE_ENV === 'production';

const PublicKEY = Buffer.from(process.env.JWTRS256_KEY_PUB, 'base64').toString(
  'ascii'
);

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token and client info
 */
export async function verifyAuth(context: GetServerSidePropsContext) {
  const { req, res } = context;

  const cookies = new Cookies(req, res);
  const jwtToken = cookies.get(CookieNames.STAFF_TOKEN_NAME);

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
      !payload?.uid ||
      !payload.ali ||
      payload.iss !== process.env.TOKEN_ISSUER
    ) {
      return { error: 'Invalid Access Token' };
    }

    // fetch for client info
    const staffId = payload?.uid;
    const aliasName = payload?.ali;

    const staffService = new StaffService();
    const result = await staffService.getStaffInfo(staffId, aliasName);

    const staff = result?.data;
    const staffError = result?.error;

    if (!isEmpty(staffError)) {
      console.log({ staffError });
      return {
        error: { message: staffError.message }
      };
    }

    return {
      client: { ...staff, ...payload }
    };
  } catch (error) {
    console.log('verifyAuth Error:>>', { error });
    const cookies = new Cookies(req, res);
    cookies.set(CookieNames.STAFF_TOKEN_NAME, '', {
      httpOnly: true,
      maxAge: 0,
      sameSite: 'strict',
      secure: PRODUCTION_ENV
    });
    return { error: { message: error?.message, jwtToken } };
  }
}

export function verifyJWT(context: GetServerSidePropsContext) {
  const { req, res } = context;

  const cookies = new Cookies(req, res);
  const jwtToken = cookies.get(CookieNames.STAFF_TOKEN_NAME);

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

export async function XSRFHandler(context: GetServerSidePropsContext) {
  const { req, res } = context;

  const cookies = new Cookies(req, res);

  let csrfToken: string | null = null;
  let csrfSecret: string | null = null;
  let csrfError: string | null = null;

  try {
    // generate & set new secret
    csrfSecret = tokens.secretSync();
    // create new token
    csrfToken = tokens.create(csrfSecret);

    if (csrfSecret) {
      cookies.set(CookieNames.XSRF_TOKEN, csrfSecret, {
        httpOnly: true,
        maxAge: 5 * 60 * 60 * 1000, // 5 hours
        sameSite: 'strict',
        secure: PRODUCTION_ENV
      });
    }
  } catch (err) {
    console.log('err :>> ', err.message);
    csrfError = err.message;
  }

  return { csrfToken, csrfError };
}
