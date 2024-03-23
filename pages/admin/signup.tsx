import RegistrationForm from '@components/auth/registration/registration-form';
import { useGetUser } from '@hooks/index';
import { XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import type { GetServerSideProps } from 'next';
import Script from 'next/script';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment, useEffect } from 'react';

export default function SignUp({ client }: SSRProps) {
  useGetUser(client);

  const handleGoogle = async (response) => {
    console.log('handleGoogle :>> ', { response });
  };

  const initGoogleAuth = () => {
    const google = (window as any).google;
    console.log({ google });
    if (google) {
      google.accounts.id.initialize({
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        callback: handleGoogle
      });

      google.accounts.id.renderButton(document.getElementById('signUpDiv'), {
        type: 'standard',
        theme: 'outline',
        text: 'continue_with',
        shape: 'pill'
      });
      // google.accounts.id.prompt()
    }
  };

  return (
    <Fragment>
      {/* Google Signup/signin script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        onReady={initGoogleAuth}
      />
      <div className="flex h-fit min-h-screen items-center justify-center">
        <div className="mx-auto h-fit min-h-screen w-full max-w-xl p-5 sm:p-8">
          <RegistrationForm />
        </div>
      </div>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { csrfToken, csrfError, csrfSecret } = await XSRFHandler(context);
  return {
    props: {
      ...(await serverSideTranslations(locale, ['form', 'common', 'error'])),
      client: { csrfToken, csrfError, csrfSecret }
    }
  };
};
