import 'react-phone-input-2/lib/style.css';

import { useMutation } from '@apollo/client';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import ValidationError from '@components/ui/form-validation-error';
import PasswordInput from '@components/ui/password-input';
import { STAFF_LOGIN } from '@graphql/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { ROUTES } from '@utils/routes';
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import * as yup from 'yup';

import FormFooter from './form-footer';

type FormValues = {
  phoneNumber: string;
  password: string;
  rememberMe: boolean;
  success: boolean;
};

const loginFormSchema = yup.object().shape({
  phoneNumber: yup.string().required('form:error-email-required'),
  password: yup.string().required('form:error-password-required')
});

const defaultValues = {
  phoneNumber: '',
  password: '',
  rememberMe: false
};

const LoginForm = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [country, setCountry] = useState('ma');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema)
  });

  const [staffLogin, { loading }] = useMutation(STAFF_LOGIN, {
    onCompleted: (data: { staffLogin: FormValues }) => {
      if (data?.staffLogin?.success) {
        router.push(ROUTES.DASHBOARD);
      }
    }
  });

  useErrorLogger(error);

  async function onSubmit({ phoneNumber, password, rememberMe }: FormValues) {
    const variables = {
      phoneNumber,
      password,
      rememberMe
    };
    staffLogin({ variables }).catch((err) => {
      setError(err);
    });
  }

  useEffect(() => {
    // Prefetch dashboard bundle
    router.prefetch(ROUTES.DASHBOARD);
    // Get current country code
    fetch('api/hi')
      .then((response) => response.json())
      .then((data) => setCountry(data?.country ?? 'ma'));
  }, []);

  const phoneNumber = watch('phoneNumber');

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-5 phone-number-class">
          <PhoneInput
            country={country?.toLowerCase()}
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true
            }}
            disableSearchIcon
            enableSearch
            inputClass="phone-number-class py-5"
            value={`+${phoneNumber}`}
            isValid={(value, country: { dialCode: string }) => {
              if (country?.dialCode != value) {
                return isValidPhoneNumber(`+${value}`);
              }
              return true;
            }}
            onChange={(phone) => {
              setValue(
                'phoneNumber',
                parsePhoneNumber(`+${phone}`)?.number ?? phone
              );
            }}
          />
          {/* @ts-ignore */}
          <ValidationError message={t(errors.phoneNumber?.message)} />
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
        <Checkbox
          label={t('form:input-label-remember-me')}
          {...register('rememberMe')}
          className="mb-4"
        />
        <Button
          className="w-full"
          loading={loading && !error}
          disabled={loading && !error}
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
      </form>
      <FormFooter />
    </>
  );
};

export default LoginForm;
