import { useMutation } from '@apollo/client';
import { ArrowPrev } from '@components/icons/arrow-prev';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import { FORGET_PASSWORD } from '@graphql/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required('common:email-required')
});

const ForgetPassword = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { userInfo } = useGetUser();

  const csrfToken = userInfo?.csrfToken;

  const [errorMsg, setErrorMsg] = useState<string | null | undefined>('');
  const [success, setSuccess] = useState(false);

  const [forgetPassword, { loading }] = useMutation(FORGET_PASSWORD, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { forgetPassword: { success: boolean } }) => {
      if (data?.forgetPassword?.success) {
        setSuccess(true);
        reset();
      }
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<{ email: string }>({ resolver: yupResolver(schema) });

  useErrorLogger(errorMsg);

  async function onSubmit(values: { email: string }) {
    console.log({ values });

    const variables = {
      email: values.email
    };

    forgetPassword({ variables }).catch((err) => {
      setErrorMsg(err.message);
      setSuccess(false);
    });
  }

  return (
    <>
      {errorMsg && (
        <Alert
          variant="error"
          message={t(errorMsg)}
          className="mb-6"
          closeable={true}
          onClose={() => setErrorMsg('')}
        />
      )}
      {success && (
        <Alert
          variant="success"
          message={t('common:message-email-sent')}
          className="mb-6"
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t('form:input-label-email')}
          {...register('email')}
          error={t(errors?.email?.message)}
        />
        <Button
          className="w-full h-11 mt-8"
          loading={loading}
          disabled={loading}
        >
          {t('form:text-send')}
        </Button>
      </form>
      <div className="mt-5 flex justify-center text-gray-700">
        <Button
          variant="custom"
          onClick={() => router.push(ROUTES.LOGIN)}
          className="me-4 text-gray-500"
          type="button"
        >
          <ArrowPrev />
          {t('common:back-to-login-page')}
        </Button>
      </div>
    </>
  );
};

export default ForgetPassword;
