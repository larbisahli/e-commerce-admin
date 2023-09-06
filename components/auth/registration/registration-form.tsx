import 'react-phone-input-2/lib/style.css';

import { useMutation } from '@apollo/client';
import { CheckMarkCircle } from '@components/icons/checkmark-circle';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import { CREATE_STORE } from '@graphql/create-store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { CurrencyType } from '@ts-types/custom.types';
import { CountryType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
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

const RegistrationForm = () => {
  const _reCaptchaRef = useRef<any>();
  const router = useRouter();
  const { t } = useTranslation();

  const [iso2, setIso2] = useState('us');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [step, setStep] = useState(0);
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
    defaultValues: {
      acceptCondition: false
    },
    resolver: yupResolver(registrationFormSchema)
  });

  const { userInfo } = useGetUser();

  const csrfToken = userInfo?.csrfToken;

  const [createStore, { loading, error }] = useMutation(CREATE_STORE, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createStore: FormValues }) => {
      if (data?.createStore?.storeName) {
        setSuccessMessage('form:success-register');
        setStep((step) => step + 1);
        reset();
        setTimeout(() => {
          router.push(ROUTES.LOGIN);
        }, 5000);
      }
    }
  });

  useErrorLogger(error, false);

  function onReCaptchaChange(token) {
    const values = getValues();

    const variables = {
      ...values,
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
        name_plural: values?.currency.name_plural
      },
      token
    };

    console.log({ values, variables, token });

    setErrorMessage(null);
    createStore({ variables }).catch((error) => {
      const err = error?.graphQLErrors[0];
      setErrorMessage(err?.message ?? 'Something happened');
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
      console.log({
        alias: values.alias,
        storeName: values.storeName,
        currency: values.currency
      });
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

  console.log({ errors, countries });

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
            <a className="pt-2 text-center leading-normal text-blue-600">
              <Image src={'/logo.svg'} alt="logo" width={120} height={30} />
            </a>
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
              <a className="text-sm font-normal text-blue-600">
                {t('already-have-account')}
              </a>
            </Link>
          </div>
        )}
      </form>
      <FormFooter isSignUp />
    </div>
  );
};

export default RegistrationForm;
