import RegistrationChoice from '@components/auth/registration/registration-choice';
import RegistrationForm from '@components/auth/registration/registration-form';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { SignupMethods } from '@ts-types/enums';
import { apiURL } from '@utils/utils';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment, useEffect, useState } from 'react';

export default function SignUp({ client }: SSRProps) {
  const router = useRouter();
  const { query, pathname } = router;

  const credentialParam = query['credential'] as string;

  const [error, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [googleCredentials, setGoogleCredentials] = useState(null);
  const [googlePayload, setGooglePayload] = useState(null);
  const [signupMethod, setSignupMethod] = useState(null);

  const { userInfo } = useGetClient(client);
  const csrfToken = userInfo?.csrfToken;

  useErrorLogger(error);

  const getGoogleCredentialsPayload = () => {
    const credential = googleCredentials?.credential;

    setLoading(true);
    setFetchError(null);

    fetch(`${apiURL}/gsignup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken
      },
      body: JSON.stringify({ credential })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        setLoading(false);
        if (data?.success) {
          setSignupMethod(SignupMethods.GOOGLE);
          setGooglePayload(data?.payload);
        } else if (data?.message) {
          setFetchError(data);
          router.replace(pathname, undefined, { shallow: true });
          setSignupMethod(SignupMethods.NONE);
        }
      })
      .catch((err) => {
        setLoading(false);
        setFetchError(err);
        setSignupMethod(SignupMethods.NONE);
      });
  };

  useEffect(() => {
    if (credentialParam) {
      setGoogleCredentials({ credential: credentialParam });
    }
  }, [credentialParam]);

  useEffect(() => {
    if (googleCredentials?.credential) {
      getGoogleCredentialsPayload();
    } else {
      setSignupMethod(SignupMethods.NONE);
    }
  }, [googleCredentials]);

  useEffect(() => {
    router.prefetch('/dashboard');
  }, []);

  const handleGoogle = async (response) => {
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
        text: 'continue_with',
        logo_alignment: 'left',
        width: 400,
        shape: 'rectangular'
      });
      !credentialParam && google.accounts.id.prompt();
    }
  };

  return (
    <Fragment>
      {/* Google Signup/signin script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        onReady={() => {
          setTimeout(initGoogleAuth, 300);
        }}
      />
      {!signupMethod && (
        <div className="w flex h-screen w-screen items-center justify-center">
          <Loader special />
        </div>
      )}
      {signupMethod === SignupMethods.NONE && (
        <RegistrationChoice
          loading={loading}
          setSignupMethod={setSignupMethod}
        />
      )}
      {(signupMethod === SignupMethods.GOOGLE ||
        signupMethod === SignupMethods.EMAIL) && (
        <div className="flex h-fit min-h-screen items-center justify-center">
          <div className="mx-auto h-fit min-h-screen w-full max-w-xl p-5 sm:p-8">
            <RegistrationForm
              googleCredentials={googleCredentials}
              googlePayload={googlePayload}
              signupMethod={signupMethod}
            />
          </div>
        </div>
      )}
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
