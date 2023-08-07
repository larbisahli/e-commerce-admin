import LoginForm from '@components/auth/login-form';
// import LogoSvg from '@components/icons/logo';
import { useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment, useEffect } from 'react';

import bgImage from '../public/no-revisions.jpg';

const LoginPage = ({ client }: SSRProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  useGetUser(client);

  useEffect(() => {
    router.prefetch('/dashboard');
  }, []);

  return (
    <Fragment>
      <div className="flex  h-screen items-center justify-center">
        <div className="flex-1 h-full border border-gray-100">
          <div className="m-2 mt-5 mx-12">
            <Link href={'/'}>
              <a className="leading-normal text-center text-blue-600 pt-2">
                <Image src={'/logo.svg'} alt="logo" width={120} height={30} />
              </a>
            </Link>
          </div>
          <div className="max-w-[570px] mx-auto bg-white p-5 sm:p-8">
            <div className="flex flex-col items-center justify-center mt-4 mb-10">
              <h3 className="text-center text-xl font-medium ">
                {t('admin-login-manage-store')}
              </h3>
              <p className="text-gray-600 text-sm py-2">
                Fill in your Dropgala account email and password.
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
        <div className="flex-1 hidden md:block">
          <div className="relative h-screen overflow-hidden">
            <Image
              alt="bgImage-bg"
              src={bgImage}
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { client, error } = await verifyAuth(context);

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
