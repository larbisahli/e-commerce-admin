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
import { useRef, useState } from 'react';
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
    <>
      <div className="absolute z-50">
        <ReCAPTCHA
          sitekey={process.env.RECAPTCHA_SITE_KEY}
          badge="bottomright"
          onChange={onReCaptchaChange}
          size="invisible"
          ref={_reCaptchaRef}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="pt-8">
        <div className="phone-number-class mb-5">
          <Input
            {...register('email')}
            type="email"
            placeholder={t('form:input-label-email')}
            variant="outline"
            className="mb-4 w-full"
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
          className="mt-8 w-full rounded-sm"
          loading={loading && !isEmpty(error)}
          disabled={loading}
        >
          {t('form:button-label-login')}
        </Button>

        {!isEmpty(error) ? (
          <Alert
            message={t(error?.message)}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setError(null)}
          />
        ) : null}
        <div className=" p-5 text-center">
          <span className="mr-1 text-gray-600">{t('dont-have-account')}</span>
          <Link href={ROUTES.SIGNUP}>
            <div className="font-normal text-blue-500">
              {t('create-an-account')}
            </div>
          </Link>
        </div>
      </form>
      <FormFooter />
    </>
  );
};

export default LoginForm;
