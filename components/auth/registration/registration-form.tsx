import 'react-phone-input-2/lib/style.css';

import { CheckMarkCircle } from '@components/icons/checkmark-circle';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { CurrencyType } from '@ts-types/custom.types';
import { SignupMethods } from '@ts-types/enums';
import { CountryType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { apiURL } from '@utils/utils';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { PasswordFeedback } from 'react-password-strength-bar';
import * as yup from 'yup';

import FormFooter from '../form-footer';
import FinalStepForm from './final-step-form';
import Step1Form from './step1-form';
import Step2Form from './step2-form';
import Step3Form from './step3-form';

type FormValues = {
  firstName: string;
  lastName: string;
  alias: string;
  email: string;
  storeName: string;
  acceptCondition: boolean;
  phoneNumber: string;
  password: string;
  currency: CurrencyType;
  country: CountryType;
};

const registrationFormSchema = yup.object().shape({
  firstName: yup.string().required('form:error-first-name-required'),
  lastName: yup.string().required('form:error-last-name-required'),
  // storeName: yup.string().required('form:error-store-name-required'),
  // alias: yup
  //   .string()
  //   .test(
  //     'len',
  //     'Store name must be less then 63 characters',
  //     (val) => val.length <= 63 && val.length >= 2
  //   )
  //   .required('form:error-store-name-required'),
  email: yup
    .string()
    .email()
    .typeError('form:error-email-required')
    .required('form:error-email-required'),
  password: yup.string().required('form:error-password-required'),
  acceptCondition: yup
    .bool()
    .oneOf([true], 'You must accept the terms and conditions')
});

const defaultValues = {
  acceptCondition: false,
  currency: {
    symbol: '$',
    name: 'US Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'USD',
    name_plural: 'US dollars'
  }
};

const RegistrationForm = ({
  googleCredentials,
  googlePayload,
  signupMethod
}: any) => {
  const _reCaptchaRef = useRef<any>();
  const router = useRouter();
  const { t } = useTranslation();

  const [iso2, setIso2] = useState('us');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: PasswordFeedback;
  }>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(registrationFormSchema)
  });

  const { userInfo } = useGetClient();

  const csrfToken = userInfo?.csrfToken;

  useErrorLogger(error, false);

  function onReCaptchaChange(token) {
    const values = getValues();

    const credential = googleCredentials?.credential;

    const variables = {
      ...values,
      credential,
      googleProfileImage: googlePayload?.picture,
      password: !credential ? values.password : null,
      alias: alias
        ?.toString()
        ?.toLowerCase()
        ?.replace(/[^a-zA-Z0-9]/g, ''),
      country: {
        name: values?.country?.name,
        currency: values?.country?.currency,
        iso2: values?.country?.iso2,
        subregion: values?.country?.subregion,
        region: values?.country?.region,
        phoneCode: values?.country?.phone_code
      },
      currency: {
        symbol: values?.currency.symbol,
        code: values?.currency.code,
        name: values?.currency.name,
        symbol_native: values?.currency.symbol_native,
        decimal_digits: values?.currency.decimal_digits,
        rounding: values?.currency.rounding,
        name_plural: values?.currency.name_plural,
        is_default: true
      },
      token
    };

    setError(null);
    setLoading(true);
    fetch(`${apiURL}/store/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken
      },
      body: JSON.stringify({ ...variables })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        if (data?.storeName) {
          setSuccessMessage('form:success-register');
          setStep((step) => step + 1);
          reset();
          setTimeout(() => {
            router.push(ROUTES.LOGIN);
          }, 5000);
        } else if (data.message) {
          setError(data);
          setErrorMessage(data?.message ?? 'Something happened');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setErrorMessage(err?.message ?? 'Something happened');
        setLoading(false);
      });
  }

  async function onSubmit() {
    if (step !== 2) {
      handleStep();
      return;
    }
    _reCaptchaRef.current.execute();
  }

  const handleStep = () => {
    const values = getValues();
    if (step === 1) {
      if (isEmpty(values.alias)) {
        setErrorMessage('Store slug is required');
        return;
      }
      if (values.alias?.length < 4) {
        setErrorMessage('Store slug length must be greater than 4 characters');
        return;
      }
      if (isEmpty(values.storeName)) {
        setErrorMessage('Store name is required');
        return;
      }
      if (isEmpty(values.currency)) {
        setErrorMessage('Store currency is required');
        return;
      }
    }
    setErrorMessage(null);
    setStep((step) => step + 1);
  };

  useEffect(() => {
    // Prefetch login bundle
    router.prefetch(ROUTES.LOGIN);
    // Get current country code
    fetch('/api/hi')
      .then((response) => response.json())
      .then((data) => setIso2(data?.iso2 ?? 'ma'));
  }, []);

  // Get Countries
  useEffect(() => {
    async function getCountries() {
      const { Countries } = await import('@utils/countries');
      setCountries(Countries);
    }
    getCountries();
  }, []);

  useEffect(() => {
    if (!isEmpty(countries)) {
      setValue('country', countries?.find(({ iso2: iso }) => iso == iso2));
    }
  }, [countries, iso2, setValue]);

  // Set placeholder password and other values when google signup
  useEffect(() => {
    if (signupMethod === SignupMethods.GOOGLE) {
      setValue('password', '0');
      setValue('firstName', googlePayload?.given_name);
      setValue('lastName', googlePayload?.family_name);
      setValue('email', googlePayload?.email);
    }
  }, [setValue, signupMethod, googlePayload]);

  const alias = watch('alias');
  const country = watch('country');
  const phoneNumber = watch('phoneNumber');
  const password = watch('password');

  // Render methods (turn them into small components later)

  const renderStep = (current) => {
    return (
      <div
        className={cn('h-2 w-full rounded-sm bg-gray-200 transition-all', {
          '!bg-blue-500': step >= current
        })}
      ></div>
    );
  };

  const renderStepChecker = () => {
    if (step === 3) {
      return (
        <div
          className="absolute right-0 flex items-center rounded
        border bg-green-100 p-2 text-sm font-medium text-green-700 shadow"
        >
          <div className="pr-1">
            {' '}
            <CheckMarkCircle width={18} height={18} />
          </div>
          Success
        </div>
      );
    }
    return (
      <div className="absolute right-0 text-sm font-medium text-gray-700">{`Step ${step}/3`}</div>
    );
  };

  const renderStepDesc = () => {
    if (step === 0) {
      return (
        <p className="pt-2 text-gray-600">{t('common:sign-up-step1-desc')}</p>
      );
    } else if (step === 1) {
      <p className="pt-2 text-gray-600">{t('common:sign-up-step2-desc')} </p>;
    } else if (step === 2) {
      <p className="pt-2 text-gray-600">{t('common:sign-up-step3-desc')} </p>;
    }
    return null;
  };

  return (
    <div className="h-full">
      <div className="invisible absolute">
        <ReCAPTCHA
          sitekey={process.env.RECAPTCHA_SITE_KEY}
          badge="bottomright"
          onChange={onReCaptchaChange}
          size="invisible"
          ref={_reCaptchaRef}
        />
      </div>
      <div className="mb-9 flex flex-col items-center justify-center">
        <div className="relative m-2 mx-12 mt-5 flex w-full justify-center">
          <Link href={'/'}>
            <div className="pt-2 text-center leading-normal text-blue-600">
              <Image src={'/logo.svg'} alt="logo" width={120} height={30} />
            </div>
          </Link>
          {renderStepChecker()}
        </div>
        <div className="mb-5 grid w-full grid-cols-3 gap-2">
          {renderStep(1)}
          {renderStep(2)}
          {renderStep(3)}
        </div>
        <h3 className="mt-4 text-center text-lg font-medium">
          {step !== 3 && t('common:sign-up-create-store')}
        </h3>
        {renderStepDesc()}
      </div>
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={cn({ hidden: step !== 0 })}>
          <Step1Form
            signupMethod={signupMethod}
            register={register}
            errors={errors}
            password={password}
            setPasswordStrength={setPasswordStrength}
          />
        </div>
        <div className={cn({ hidden: step !== 1 })}>
          <Step2Form
            control={control}
            register={register}
            errors={errors}
            alias={alias}
          />
        </div>
        <div className={cn({ hidden: step !== 2 })}>
          <Step3Form
            countries={countries}
            control={control}
            setValue={setValue}
            country={country}
            phoneNumber={phoneNumber}
          />
        </div>
        {step === 3 && <FinalStepForm />}
        {step !== 3 && (
          <div>
            <Button className="w-full" loading={loading} disabled={loading}>
              {step === 2 && t('common:create-my-account')}
              {step !== 2 && t('common:continue')}
            </Button>
            {step !== 0 && (
              <Button
                className="mt-2 w-full !border-none text-gray-500 !outline-none"
                variant="custom"
                onClick={(e) => {
                  e.preventDefault();
                  setStep((step) => step - 1);
                }}
              >
                {t('common:back')}
              </Button>
            )}
          </div>
        )}
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
        {step !== 3 && (
          <div className="mt-9 p-5 text-center">
            <Link href={ROUTES.LOGIN}>
              <div className="text-sm font-normal text-blue-600">
                {t('already-have-account')}
              </div>
            </Link>
          </div>
        )}
      </form>
      <FormFooter isSignUp />
    </div>
  );
};

export default RegistrationForm;
