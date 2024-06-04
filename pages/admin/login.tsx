import FormFooter from '@components/auth/form-footer';
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
import Script from 'next/script';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment, useEffect, useState } from 'react';

import bgImage from '../../public/no-revisions.jpg';

const LoginPage = ({ client }: SSRProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const [googleCredentials, setGoogleCredentials] = useState(null);

  useGetUser(client);

  useEffect(() => {
    router.prefetch('/dashboard');
  }, []);

  const handleGoogle = async (response) => {
    console.log('handleGoogle :>> ', { response });
    setGoogleCredentials(response);
  };

  const initGoogleAuth = () => {
    const google = (window as any).google;
    if (google) {
      google.accounts.id.initialize({
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        callback: handleGoogle
      });
      const divRef = document.getElementById('signUpDiv');
      google.accounts.id.renderButton(divRef, {
        type: 'standard',
        theme: 'filled_blue',
        size: 'large',
        text: 'signin_with',
        logo_alignment: 'left',
        width: 400,
        shape: 'rectangular'
      });
      google.accounts.id.prompt();
    }
  };

  return (
    <Fragment>
      {/* Google Signup/signin script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        onReady={initGoogleAuth}
      />
      <div className="flex h-screen items-center justify-center">
        {/* --------- */}
        <div className="hidden flex-1 md:block">
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
        {/* --------- */}
        <div className="flex h-full flex-1 flex-col">
          <div className="m-2 mx-12 mt-8 flex justify-between">
            <Link href={'/'}>
              <div className="text-center leading-normal text-blue-600">
                <Image src={'/logo.svg'} alt="logo" width={120} height={30} />
              </div>
            </Link>
            <Link href={ROUTES.SIGNUP} shallow>
              <div className="text-lg font-medium text-black hover:underline">
                Start for free now
              </div>
            </Link>
          </div>
          <div className="mx-auto mt-8 max-w-[400px] bg-white p-4">
            <div className="mb-1 flex flex-col items-center justify-center">
              <h3 className="text-center text-xl font-medium ">
                {t('admin-login-manage-store')}
              </h3>
              <p className="py-1 text-sm text-gray-600">
                Fill in your Dropgala account email and password.
              </p>
            </div>
            <LoginForm googleCredentials={googleCredentials} />
          </div>
          <div className="flex flex-1 items-end justify-center pb-7">
            <FormFooter links={false} />
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
