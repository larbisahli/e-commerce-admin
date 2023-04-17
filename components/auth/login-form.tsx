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
import { useState } from 'react';
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
  alias: yup
    .string()
    .test(
      'len',
      'Store name must be less then 63 characters',
      (val) => val.length <= 63 && val.length >= 2
    )
    .required('form:error-store-name-required'),
  email: yup.string().email().required('form:error-email-required'),
  password: yup.string().required('form:error-password-required')
});

const defaultValues = {
  email: '',
  password: ''
};

const LoginForm = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
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

  console.log({ errors });

  async function onSubmit({ alias, email, password }: FormValues) {
    const variables = {
      alias,
      email,
      password
    };

    setLoading(true);
    userLogin({ variables }).catch((error) => {
      const err = error?.graphQLErrors[0];
      setLoading(false);
      setError(err.message);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-5">
          <InputSlug
            {...register('alias')}
            placeholder={t('form:input-slug')}
            variant="outline"
            className="mb-4 mr-2 w-full"
            error={t(errors?.alias?.message!)}
          />
        </div>
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
          forgotPageLink="/forgot-password"
        />
        <Button
          className="w-full"
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
        <div className="shadow p-5 text-sm  text-center border rounded-sm mt-12">
          <span className="mr-1">{t('not-yet-registered')}</span>
          <Link href={ROUTES.SIGNUP}>
            <a className="text-blue-500 font-normal">
              {t('create-your-store')}
            </a>
          </Link>
        </div>
      </form>
      <FormFooter />
    </>
  );
};

export default LoginForm;
