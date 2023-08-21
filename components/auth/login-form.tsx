import { useMutation } from '@apollo/client';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import InputSlug from '@components/ui/input-slug';
import PasswordInput from '@components/ui/password-input';
import { USER_LOGIN } from '@graphql/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { ROUTES } from '@utils/routes';
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

  const [userLogin] = useMutation(USER_LOGIN, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { login: FormValues }) => {
      setLoading(false);
      if (data?.login?.success) {
        router.push(ROUTES.DASHBOARD);
      }
    }
  });

  useErrorLogger(error);

  function onReCaptchaChange(token) {
    const variables = getValues();

    setLoading(true);
    userLogin({ variables: { ...variables, token } }).catch((error) => {
      const err = error?.graphQLErrors[0];
      setLoading(false);
      setError(err?.message);
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
        <div className="mb-5 phone-number-class">
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
          className="w-full rounded-sm mt-8"
          loading={loading && !error}
          disabled={loading}
        >
          {t('form:button-label-login')}
        </Button>

        {error ? (
          <Alert
            message={t(error)}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setError(null)}
          />
        ) : null}
        <div className=" p-5 text-center">
          <span className="mr-1 text-gray-600">{t('dont-have-account')}</span>
          <Link href={ROUTES.SIGNUP}>
            <a className="text-blue-500 font-normal">
              {t('create-an-account')}
            </a>
          </Link>
        </div>
      </form>
      <FormFooter />
    </>
  );
};

export default LoginForm;
