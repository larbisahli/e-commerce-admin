import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { ROUTES } from '@utils/routes';
import { apiURL } from '@utils/utils';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

type FormValues = {
  alias: string;
  email: string;
  password: string;
  success: boolean;
};

const defaultValues = {
  email: '',
  password: ''
};

type GoogleCredentials = {
  credential: string;
  select_by: string;
};

interface Props {
  googleCredentials: GoogleCredentials;
}

const LoginForm = ({ googleCredentials }: Props) => {
  const _reCaptchaRef = useRef<any>();
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues
  } = useForm<FormValues>({ defaultValues });

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  useEffect(() => {
    if (googleCredentials?.credential) {
      onSubmit();
    }
  }, [googleCredentials]);

  useErrorLogger(error);

  function onReCaptchaChange(token) {
    const variables = getValues();

    const credential = googleCredentials?.credential;

    setLoading(true);
    setFetchError(null);

    if (!credential && !variables?.email) {
      setError('email', {
        type: 'required',
        message: t('form:error-email-required')
      });
      setLoading(false);
      return;
    }
    if (!credential && !variables?.password) {
      setError('password', {
        type: 'required',
        message: t('form:error-password-required')
      });
      setLoading(false);
      return;
    }

    fetch(`${apiURL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken
      },
      body: JSON.stringify({
        ...variables,
        credential,
        token
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('?????????', { data });
        setLoading(false);
        if (!isEmpty(data?.registration)) {
          router.push(
            `/admin/signup?credential=${data?.registration?.credential}`
          );
          return;
        }
        if (data?.success) {
          router.push(ROUTES.DASHBOARD);
        } else if (data?.message) {
          setFetchError(data);
          _reCaptchaRef.current.reset();
        }
      })
      .catch((err) => {
        console.log({ err, message: err?.message });
        setLoading(false);
        setFetchError(err);
        _reCaptchaRef.current.reset();
      });
  }

  async function onSubmit() {
    _reCaptchaRef.current.execute();
  }

  return (
    <div className="flex flex-col items-center px-5">
      <div className="absolute z-50">
        <ReCAPTCHA
          sitekey={process.env.RECAPTCHA_SITE_KEY}
          badge="bottomleft"
          onChange={onReCaptchaChange}
          size="invisible"
          ref={_reCaptchaRef}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-8 w-[350px] md:w-[400px]"
      >
        <div className="phone-number-class mb-5">
          <Input
            {...register('email')}
            type="email"
            placeholder={t('form:input-label-email')}
            variant="outline"
            className="mb-4"
            error={t(errors?.email?.message!)}
          />
        </div>
        <PasswordInput
          placeholder={t('form:input-label-password')}
          forgotPassHelpText={t('form:input-forgot-password-label')}
          {...register('password')}
          error={t(errors?.password?.message!)}
          variant="outline"
          className="mb-4"
          forgotPageLink={ROUTES.FORGET_PASSWORD}
        />
        <Button
          className="mt-8 h-[40px] w-full rounded-[4px] !py-5"
          loading={loading && !isEmpty(error)}
          disabled={loading}
        >
          {t('form:button-label-login')}
        </Button>
        <div>
          <div className="relative flex items-center justify-center py-5">
            <div className="absolute h-[1px] w-full bg-gray-300"></div>
            <div className="z-10 bg-white px-3 text-xs uppercase text-gray-500">
              or
            </div>
          </div>
          <div
            id="signUpDiv"
            data-text="signup_with"
            className="flex items-center justify-center"
          ></div>
        </div>
        {!isEmpty(error) ? (
          <Alert
            message={t(error?.message)}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setFetchError(null)}
          />
        ) : null}
        {/* <div className="pt-5 text-center">
          <div className="py-5 flex justify-center items-center relative">
            <div className="absolute w-full h-[1px] bg-gray-300"></div>
            <div className="text-sm uppercase bg-white z-10 px-3 text-gray-600">{t("dont-have-account")}</div>
        </div>
        </div> */}
      </form>
    </div>
  );
};

export default LoginForm;
