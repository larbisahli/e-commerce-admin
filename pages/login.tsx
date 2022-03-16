import LoginForm from '@components/auth/login-form';
import { ROUTES } from '@utils/routes';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getClientToken, verifyAuth } from '../middleware/utils';

const LoginPage = (props) => {
  const { t } = useTranslation('common');

  console.log(`props`, { props });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-light sm:bg-gray-100 bg">
      <div className="m-auto max-w-[420px] w-full bg-light sm:shadow p-5 sm:p-8 rounded">
        <h3 className="text-center text-base italic text-body mb-6 mt-4">
          {t('admin-login-title')}
        </h3>
        <LoginForm />
      </div>
      <div className="mt-5 flex justify-center items-center text-white bg-black w-full bg-opacity-40 h-12">
        <p>© dropgala 2022 All rights reserved</p>
        <span
          style={{ width: '1px', height: '20px' }}
          className="mx-2 bg-white"
        ></span>
        <Link href="/" passHref>
          <a>
            <p>Contact Us</p>
          </a>
        </Link>
        <span
          style={{ width: '1px', height: '20px' }}
          className="mx-2 bg-white"
        ></span>
        <Link href="/" passHref>
          <a>
            <p>Terms</p>
          </a>
        </Link>
        <span
          style={{ width: '1px', height: '20px' }}
          className="mx-2 bg-white"
        ></span>
        <Link href="/" passHref>
          <a>
            <p>Terms</p>
          </a>
        </Link>
        <span
          style={{ width: '1px', height: '20px' }}
          className="mx-2 bg-white"
        ></span>
        <Link href="/" passHref>
          <a>
            <p>Privacy</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { token }: { token: string } = getClientToken(context);
  const { client, error } = verifyAuth(token);
  if (client) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.DASHBOARD
      }
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'form'])),
      error
    }
  };
};

export default LoginPage;
