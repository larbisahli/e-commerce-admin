import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTES } from '@utils/routes';
import { apiURL } from '@utils/utils';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
interface RespondType {
  success: boolean;
  error: { error: any; message: string } | null;
  staff: { uid: string } | null;
}

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
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
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema)
  });

  async function onSubmit({ email, password, rememberMe }: FormValues) {
    setLoading(true);

    try {
      const res = await fetch(`${apiURL}/login`, {
        credentials: 'include',
        mode: 'cors',
        headers: new Headers({
          'content-type': 'application/json',
          'x-client-mode': 'admin'
        }),
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          remember_me: rememberMe
        })
      });

      const { success, error }: RespondType = await res.json();

      if (success) router.push(ROUTES.DASHBOARD);

      if (!_.isEmpty(error)) {
        setErrorMsg('form:error-credential-wrong');
      }
    } catch (err) {
      console.log('err :>> ', err);
    }
    setLoading(false);
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
          {...register('rememberMe')}
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
