import { CookieNames } from '@ts-types/enums';
import { ROUTES } from '@utils/routes';
import Cookies from 'cookies';
import { GetServerSideProps } from 'next';

function SignOut() {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const cookies = new Cookies(req, res);
  cookies.set(CookieNames.USER_TOKEN_NAME, '', { maxAge: Date.now() });
  return {
    redirect: {
      permanent: false,
      destination: ROUTES.DASHBOARD
    }
  };
};

export default SignOut;
