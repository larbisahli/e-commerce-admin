import RegistrationChoice from '@components/auth/registration/registration-choice';
import RegistrationForm from '@components/auth/registration/registration-form';
import { useGetUser } from '@hooks/index';
import { XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment, useEffect, useState } from 'react';

export default function SignUp({ client }: SSRProps) {
  const router = useRouter();
  const [googleCredentials, setGoogleCredentials] = useState(null);

  useGetUser(client);

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
        client_id:
          '334672365238-6sat8ta6unldrefjd33ngah67bih7jfk.apps.googleusercontent.com',
        callback: handleGoogle
      });
      const divRef = document.getElementById('signUpDiv');
      google.accounts.id.renderButton(divRef, {
        type: 'standard',
        theme: 'filled_blue',
        size: 'large',
        text: 'signup_with',
        logo_alignment: 'left',
        width: 400,
        shape: 'pill'
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
      <RegistrationChoice googleCredentials={googleCredentials} />
      {/* <div className="flex h-fit min-h-screen items-center justify-center">
        <div className="mx-auto h-fit min-h-screen w-full max-w-xl p-5 sm:p-8">
          <RegistrationForm />
        </div>
      </div> */}
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
