import { useMutation } from '@apollo/client';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import PasswordInput from '@components/ui/password-input';
import { RESET_PASSWORD } from '@graphql/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { ROUTES } from '@utils/routes';
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

  console.log({ token });

  const { userInfo } = useGetUser();

  const csrfToken = userInfo?.csrfToken;

  const [errorMsg, setErrorMsg] = useState<string | null | undefined>('');
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: PasswordFeedback;
  }>(null);

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { resetPassword: { success: boolean } }) => {
      if (data?.resetPassword?.success) {
        router.push(ROUTES.LOGIN);
      }
    }
  });

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

  useErrorLogger(errorMsg);

  function onReCaptchaChange(reCaptchaToken) {
    const values = getValues();

    resetPassword({
      variables: {
        password: values.password,
        reCaptchaToken,
        token
      }
    }).catch((error) => {
      const err = error?.graphQLErrors[0];
      setErrorMsg(err?.message);
      _reCaptchaRef.current.reset();
      reset();
    });
  }

  async function onSubmit() {
    const values = getValues();

    if (values.password !== values.passwordConfirmation) {
      setErrorMsg(t('form:error-match-passwords'));
      return;
    }

    if (passwordStrength.score <= 2) {
      setErrorMsg(t('error-weak-password'));
      return;
    }

    _reCaptchaRef.current.execute();
  }

  useEffect(() => {
    if (!token) {
      router.push(ROUTES.LOGIN);
    }
  }, [token]);

  const password = watch('password');

  console.log({ passwordStrength });

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
