import { ArrowPrev } from '@components/icons/arrow-prev';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { ROUTES } from '@utils/routes';
import { apiURL } from '@utils/utils';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useRef, useState } from 'react';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required('common:email-required')
});

const ForgetPassword = () => {
  const _reCaptchaRef = useRef<any>();
  const { t } = useTranslation();
  const router = useRouter();
  const { userInfo } = useGetClient();
  const [success, setSuccess] = useState(false);
  const [error, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);

  const csrfToken = userInfo?.csrfToken;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset
  } = useForm<{ email: string }>({ resolver: yupResolver(schema) });

  useErrorLogger(error);

  function onReCaptchaChange(reCaptchaToken) {
    const values = getValues();
    fetch(`${apiURL}/pass/forget-password`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken
      },
      body: JSON.stringify({
        email: values.email,
        reCaptchaToken
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data?.success) {
          setSuccess(true);
          reset();
        } else if (data?.message) {
          setFetchError(data?.message);
          _reCaptchaRef.current.reset();
        }
      })
      .catch((err) => {
        console.log({ err, message: err?.message });
        setLoading(false);
        setFetchError(err.message);
        _reCaptchaRef.current.reset();
        reset();
      });
  }

  async function onSubmit() {
    const values = getValues();
    if (!values.email) {
      setFetchError(t('form:error-email-required'));
      return;
    }
    _reCaptchaRef.current.execute();
  }

  return (
    <>
      {error && (
        <Alert
          variant="error"
          message={t(error)}
          className="mb-6"
          closeable={true}
          onClose={() => setFetchError('')}
        />
      )}
      {success && (
        <Alert
          variant="success"
          message={t('common:message-email-sent')}
          className="mb-6"
        />
      )}
      <div className="absolute z-50">
        <ReCAPTCHA
          sitekey={process.env.RECAPTCHA_SITE_KEY}
          badge="bottomright"
          onChange={onReCaptchaChange}
          size="invisible"
          ref={_reCaptchaRef}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t('form:input-label-email')}
          {...register('email')}
          error={t(errors?.email?.message)}
        />
        <Button
          className="mt-8 h-11 w-full"
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
          className="text-gray-500 me-4"
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
