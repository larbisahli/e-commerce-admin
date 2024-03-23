import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { ROUTES } from '@utils/routes';
import { apiURL } from '@utils/utils';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import FormFooter from './form-footer';

type FormValues = {
  alias: string;
  email: string;
  password: string;
  success: boolean;
};

const loginFormSchema = yup.object().shape({
  email: yup.string().email().required('form:error-email-required'),
  password: yup.string().required('form:error-password-required')
});

const defaultValues = {
  email: '',
  password: ''
};

const LoginForm = () => {
  const _reCaptchaRef = useRef<any>();
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema)
  });

  const { userInfo } = useGetUser();

  const csrfToken = userInfo?.csrfToken;

  useErrorLogger(error);

  function onReCaptchaChange(token) {
    const variables = getValues();

    setLoading(true);
    setError(null);
    fetch(`${apiURL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken
      },
      body: JSON.stringify({ ...variables, token })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        setLoading(false);
        if (data?.success) {
          router.push(ROUTES.DASHBOARD);
        } else if (data?.message) {
          setError(data);
          _reCaptchaRef.current.reset();
        }
      })
      .catch((err) => {
        console.log({ err, message: err?.message });
        setLoading(false);
        setError(err);
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
        className="mt-8 w-[400px]"
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
          className="mt-8 w-full rounded-full"
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
            onClose={() => setError(null)}
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
