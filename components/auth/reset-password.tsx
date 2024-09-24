import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import PasswordInput from '@components/ui/password-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { ROUTES } from '@utils/routes';
import { apiURL } from '@utils/utils';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import PasswordStrengthBar, {
  PasswordFeedback
} from 'react-password-strength-bar';
import * as yup from 'yup';

const schema = yup.object().shape({
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'form:error-match-passwords')
    .required('form:error-confirm-password'),
  password: yup.string().required('form:error-password-required')
});

const ResetPassword = () => {
  const { t } = useTranslation();

  const _reCaptchaRef = useRef<any>();
  const router = useRouter();

  const { token } = router.query;

  const { userInfo } = useGetClient();
  const [error, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: PasswordFeedback;
  }>(null);

  const csrfToken = userInfo?.csrfToken;

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors }
  } = useForm<{ password: string; passwordConfirmation: string }>({
    resolver: yupResolver(schema)
  });

  useErrorLogger(error);

  function onReCaptchaChange(reCaptchaToken) {
    const values = getValues();
    fetch(`${apiURL}/pass/reset-password`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken
      },
      body: JSON.stringify({
        password: values.password,
        reCaptchaToken,
        token
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data?.success) {
          router.push(ROUTES.LOGIN);
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

    if (values.password !== values.passwordConfirmation) {
      setFetchError(t('form:error-match-passwords'));
      return;
    }

    if (passwordStrength.score <= 2) {
      setFetchError(t('error-weak-password'));
      return;
    }

    _reCaptchaRef.current.execute();
  }

  useEffect(() => {
    if (!token) {
      router.push(ROUTES.FORGET_PASSWORD);
    }
  }, [router, token]);

  const password = watch('password');

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
      {!isEmpty(passwordStrength?.feedback?.warning) && (
        <Alert
          variant="warning"
          message={passwordStrength.feedback.warning}
          className="mb-6"
        />
      )}
      {!isEmpty(passwordStrength?.feedback?.suggestions) && (
        <Alert
          variant="info"
          message={passwordStrength?.feedback?.suggestions
            ?.map((s) => s)
            .join('\n')}
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
        <PasswordInput
          label={t('form:input-label-new-password')}
          {...register('password')}
          variant="outline"
          error={t(errors.password?.message!)}
          className="mb-2"
        />
        <PasswordStrengthBar
          onChangeScore={(score, feedback) => {
            setPasswordStrength({ score, feedback });
          }}
          className="mb-5"
          password={password}
          scoreWords={['Very weak', 'Weak', 'Good', 'Strong']}
        />
        <PasswordInput
          label={t('form:input-label-confirm-password')}
          {...register('passwordConfirmation')}
          variant="outline"
          error={t(errors.passwordConfirmation?.message!)}
        />
        <Button
          className="mt-8 h-11 w-full"
          loading={loading}
          disabled={loading}
        >
          {t('form:text-update-password')}
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
