import { CookieNames } from '@ts-types/enums';
import { ROUTES } from '@utils/routes';
import { PRODUCTION_ENV } from '@utils/utils';
import Cookies from 'cookies';
import { GetServerSideProps } from 'next';

function SignOut() {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const cookies = new Cookies(req, res);
  cookies.set(CookieNames.USER_TOKEN_NAME, 'abc', {
    httpOnly: true,
    maxAge: Date.now(),
    sameSite: 'strict',
    domain: PRODUCTION_ENV ? '.dropgala.com' : 'localhost',
    overwrite: true
  });
  return {
    redirect: {
      permanent: true,
      destination: ROUTES.LOGIN
    }
  };
};

export default SignOut;
