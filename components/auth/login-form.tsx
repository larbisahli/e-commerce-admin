import 'react-phone-input-2/lib/style.css';

import { useMutation } from '@apollo/client';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ValidationError from '@components/ui/form-validation-error';
import InputSlug from '@components/ui/input-slug';
import PasswordInput from '@components/ui/password-input';
import { STAFF_LOGIN } from '@graphql/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { ROUTES } from '@utils/routes';
import { isValidPhoneNumber } from 'libphonenumber-js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import * as yup from 'yup';

import FormFooter from './form-footer';

type FormValues = {
  aliasName: string;
  phoneNumber: string;
  password: string;
  success: boolean;
};

const loginFormSchema = yup.object().shape({
  aliasName: yup
    .string()
    .test(
      'len',
      'Store name must be less then 63 characters',
      (val) => val.length <= 63 && val.length >= 2
    )
    .required('form:error-store-name-required'),
  phoneNumber: yup.string().required('form:error-email-required'),
  password: yup.string().required('form:error-password-required')
});

const defaultValues = {
  phoneNumber: '',
  password: ''
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

  const { staffInfo } = useGetStaff();

  const csrfToken = staffInfo?.csrfToken;

  const [staffLogin, { loading }] = useMutation(STAFF_LOGIN, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { login: FormValues }) => {
      if (data?.login?.success) {
        router.push(ROUTES.DASHBOARD);
      }
    }
  });

  useErrorLogger(error);

  async function onSubmit({ aliasName, phoneNumber, password }: FormValues) {
    const variables = {
      aliasName,
      phoneNumber,
      password
    };
    console.log({ variables });
    staffLogin({ variables }).catch((error) => {
      const err = error?.graphQLErrors[0];
      setError(`error:${err?.t ?? 'SOMETHING_HAPPENED'}`);
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
        <div className="mb-5">
          <InputSlug
            {...register('aliasName')}
            placeholder={t('form:input-slug')}
            variant="outline"
            className="mb-4 mr-2 w-full"
            error={t(errors?.aliasName?.message!)}
          />
        </div>
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
              setValue('phoneNumber', phone);
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
