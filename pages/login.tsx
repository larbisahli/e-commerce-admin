import LoginForm from '@components/auth/login-form';
import { verifyAuth } from '@middleware/utils';
import { ROUTES } from '@utils/routes';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment, useEffect } from 'react';

import shop from '../public/shop.jpg';

const LoginPage = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/dashboard');
  }, []);

  return (
    <Fragment>
      <div
        className="fixed h-full w-full overflow-hidden"
        style={{ zIndex: -1 }}
      >
        <Image
          alt="Shop-bg"
          src={shop}
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen h-fit">
        <div className="border border-gray-100 mx-auto max-w-xl bg-white p-5 sm:p-8 min-h-screen h-fit w-full">
          <h3 className="text-center mt-4 text-xl font-medium">
            {t('admin-login')}
          </h3>
          <div className="text-center mb-6 mt-2 font-normal">
            <span className="mr-1">OR</span>
            <Link href="/signup">
              <a className="text-blue-500 text-base font-normal">
                {t('sign-up')}
              </a>
            </Link>
          </div>
          <LoginForm />
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { client, error } = verifyAuth(context);

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
