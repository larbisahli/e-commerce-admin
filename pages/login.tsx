import LoginForm from '@components/auth/login-form';
import LogoSvg from '@components/icons/logo';
import { useGetStaff } from '@hooks/useGetStaff';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment, useEffect } from 'react';

import shop from '../public/shop.jpg';

const LoginPage = ({ client }: SSRProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  useGetStaff(client);

  useEffect(() => {
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
          <div className="flex flex-col items-center justify-center">
            <LogoSvg width="5rem" height="5rem" />
            <h3 className="text-center text-xl font-medium mt-4 mb-10">
              {t('admin-login-manage-store')}
            </h3>
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
  const { csrfToken, csrfError } = await XSRFHandler(context);
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['error', 'common', 'form'])),
      error,
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};

export default LoginPage;
