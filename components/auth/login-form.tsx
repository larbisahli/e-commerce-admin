import { useMutation } from '@apollo/client';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import { STORE_LOGIN } from '@graphql/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormValues = {
  email: string;
  password: string;
  remember_me: boolean;
  success: boolean;
};

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
  password: yup.string().required('form:error-password-required')
});

const defaultValues = {
  email: '',
  password: '',
  rememberMe: false
};

const LoginForm = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [errorMsg, setErrorMsg] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema)
  });

  const [staffLogin, { loading, error }] = useMutation(STORE_LOGIN, {
    onCompleted: (data: { staffLogin: FormValues }) => {
      if (data?.staffLogin?.success) {
        router.push(ROUTES.DASHBOARD);
      }
    }
  });

  useErrorLogger(error);

  async function onSubmit({ email, password, remember_me }: FormValues) {
    const variables = {
      email,
      password,
      remember_me
    };
    staffLogin({ variables });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t('form:input-label-email')}
          {...register('email')}
          type="email"
          variant="outline"
          className="mb-4"
          error={t(errors?.email?.message!)}
        />
        <PasswordInput
          label={t('form:input-label-password')}
          forgotPassHelpText={t('form:input-forgot-password-label')}
          {...register('password')}
          error={t(errors?.password?.message!)}
          variant="outline"
          className="mb-4"
          forgotPageLink="/forgot-password"
        />
        <Checkbox
          label={t('form:input-label-remember-me')}
          {...register('remember_me')}
          className="mb-4"
        />
        <Button className="w-full" loading={loading} disabled={loading}>
          {t('form:button-label-login')}
        </Button>

        {errorMsg ? (
          <Alert
            message={t(errorMsg)}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setErrorMsg('')}
          />
        ) : null}
      </form>
    </>
  );
};

export default LoginForm;
