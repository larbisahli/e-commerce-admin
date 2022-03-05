import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTES } from '@utils/routes';
import { apiURL } from '@utils/utils';
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
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const registrationFormSchema = yup.object().shape({
  first_name: yup.string().required('form:error-first-name-required'),
  last_name: yup.string().required('form:error-last-name-required'),
  email: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'form:error-match-passwords')
    .required('form:error-confirm-password'),
  password: yup.string().required('form:error-password-required')
});

const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: yupResolver(registrationFormSchema)
  });
  const router = useRouter();
  const { t } = useTranslation();

  async function onSubmit({
    first_name,
    last_name,
    email,
    confirm_password,
    password
  }: FormValues) {
    if (confirm_password !== password) {
      setErrorMessage('form:error-match-passwords');
    }
    setLoading(true);

    try {
      const res = await fetch(`${apiURL}/admin-register`, {
        credentials: 'include',
        mode: 'cors',
        headers: new Headers({
          'content-type': 'application/json',
          'x-client-mode': 'admin'
        }),
        method: 'POST',
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password
        })
      });

      const { success, error }: RespondType = await res.json();

      if (success) {
        router.push(ROUTES.LOGIN);
        reset();
        setSuccessMessage('form:success-register');
      }

      if (error) {
        setErrorMessage('form:error-enough-permission');
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
          label={t('form:input-label-first-name')}
          {...register('first_name')}
          variant="outline"
          className="mb-4"
          error={t(errors?.first_name?.message!)}
        />
        <Input
          label={t('form:input-label-last-name')}
          {...register('last_name')}
          variant="outline"
          className="mb-4"
          error={t(errors?.last_name?.message!)}
        />
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
          {...register('password')}
          error={t(errors?.password?.message!)}
          variant="outline"
          className="mb-4"
        />
        <PasswordInput
          label={t('form:input-label-confirm-password')}
          {...register('confirm_password')}
          error={t(errors?.confirm_password?.message!)}
          variant="outline"
          className="mb-4"
        />
        <Button className="w-full" loading={loading} disabled={loading}>
          {t('form:text-register')}
        </Button>

        {errorMessage ? (
          <Alert
            message={t(errorMessage)}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setErrorMessage(null)}
          />
        ) : null}
        {successMessage ? (
          <Alert
            message={t(successMessage)}
            variant="success"
            closeable={true}
            className="mt-5"
            onClose={() => setSuccessMessage(null)}
          />
        ) : null}
      </form>
    </>
  );
};

export default RegistrationForm;
