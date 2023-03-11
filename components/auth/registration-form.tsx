import 'react-phone-input-2/lib/style.css';

import { useLazyQuery, useMutation } from '@apollo/client';
import { ArrowSync } from '@components/icons/arrow-sync';
import EditSvg from '@components/icons/pen';
import SecureX from '@components/icons/secure-x';
import ShieldCheck from '@components/icons/shield-check';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import { ALIAS_NAME_CHECK, CREATE_STORE } from '@graphql/create-store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { ROUTES } from '@utils/routes';
import { isValidPhoneNumber } from 'libphonenumber-js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import * as yup from 'yup';

import FormFooter from './form-footer';

type FormValues = {
  firstName: string;
  lastName: string;
  aliasName: string;
  phoneNumber: string;
  storeName: string;
};

const registrationFormSchema = yup.object().shape({
  firstName: yup.string().required('form:error-first-name-required'),
  lastName: yup.string().required('form:error-last-name-required'),
  storeName: yup.string().required('form:error-store-name-required'),
  aliasName: yup
    .string()
    .test(
      'len',
      'Store name must be less then 63 characters',
      (val) => val.length <= 63 && val.length >= 2
    )
    .required('form:error-store-name-required'),
  phoneNumber: yup
    .string()
    .typeError('form:error-phone-number-required')
    .required('form:error-phone-number-required')
});

const RegistrationForm = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [executeCheckQuery, setExecuteCheckQuery] = useState(false);
  const [iso2, setIso2] = useState('ma');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    resetField
  } = useForm<FormValues>({
    resolver: yupResolver(registrationFormSchema)
  });

  const { staffInfo } = useGetStaff();

  const csrfToken = staffInfo?.csrfToken;

  const [createStore, { loading, error }] = useMutation(CREATE_STORE, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createStore: FormValues }) => {
      if (data?.createStore?.storeName) {
        resetField('firstName');
        resetField('lastName');
        resetField('storeName');
        resetField('aliasName');
        setSuccessMessage('form:success-register');
        router.push(ROUTES.LOGIN);
      }
    }
  });

  useErrorLogger(error, false);

  async function onSubmit({
    firstName,
    lastName,
    aliasName,
    storeName,
    phoneNumber
  }: FormValues) {
    const variables = {
      firstName,
      lastName,
      phoneNumber,
      aliasName: aliasName
        ?.toString()
        ?.toLowerCase()
        ?.replace(/[^a-zA-Z0-9]/g, ''),
      storeName,
      country: { iso2 }
    };

    setErrorMessage(null);

    if (isValidPhoneNumber(`+${phoneNumber}`)) {
      createStore({ variables }).catch((error) => {
        const err = error?.graphQLErrors[0];
        setErrorMessage(`error:${err?.t ?? 'SOMETHING_HAPPENED'}`);
      });
    } else {
      setErrorMessage('error:INVALID_PHONE_NUMBER');
    }
  }

  const aliasName = watch('aliasName');

  const alias = useMemo(
    () =>
      aliasName
        ?.toString()
        ?.toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, ''),
    [aliasName]
  );

  useEffect(() => {
    // Prefetch login bundle
    router.prefetch(ROUTES.LOGIN);
    // Get current country code
    fetch('api/hi')
      .then((response) => response.json())
      .then((data) => setIso2(data?.iso2 ?? 'ma'));
  }, []);

  const phoneNumber = watch('phoneNumber');

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-5 phone-number-class">
          <Label>{t('form:input-label-whatsapp-number')}</Label>
          <PhoneInput
            country={iso2?.toLowerCase()}
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
          <p className="pt-1 text-gray-400 text-sm">
            {t('form:input-info-whatsapp-number')}
          </p>
          {/* @ts-ignore */}
          <ValidationError message={t(errors.phoneNumber?.message)} />
        </div>
        <Label>{t('form:input-label-store-info')}</Label>
        <div className="flex items-center justify-between">
          <Input
            {...register('firstName')}
            placeholder={t('form:input-label-first-name')}
            variant="outline"
            className="mb-4 mr-2 w-full"
            error={t(errors?.firstName?.message!)}
          />
          <Input
            {...register('lastName')}
            placeholder={t('form:input-label-last-name')}
            variant="outline"
            className="mb-4 ml-2 w-full"
            error={t(errors?.lastName?.message!)}
          />
        </div>
        <div className="mb-5">
          <Input
            {...register('storeName')}
            placeholder={t('form:input-label-store-name')}
            variant="outline"
            className="mb-4 mr-2 w-full"
            error={t(errors?.storeName?.message!)}
          />
        </div>
        <Input
          {...register('aliasName')}
          type="text"
          variant="outline"
          placeholder="Store link"
          error={t(errors?.aliasName?.message!)}
          onKeyDown={() => setExecuteCheckQuery(false)}
          onKeyUp={() => setExecuteCheckQuery(true)}
        />
        <p className="pt-1 mb-4 text-gray-400 text-sm">
          {t('form:input-info-store-link')}
        </p>
        <AliasViewer aliasName={alias} executeCheckQuery={executeCheckQuery} />
        <Button className="w-full" loading={loading} disabled={loading}>
          {t('common:sign-up')}
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
        <div className="shadow p-5 text-center border rounded-sm mt-12">
          <Link href={ROUTES.LOGIN}>
            <a className="text-blue-500 font-normal text-sm">
              {t('already-have-account')}
            </a>
          </Link>
        </div>
      </form>
      <FormFooter isSignUp />
    </div>
  );
};

const AliasViewer = ({ aliasName, executeCheckQuery }) => {
  const timeout = useRef(null);

  const { staffInfo } = useGetStaff();

  const csrfToken = staffInfo?.csrfToken;

  const [aliasCheck, { data, loading, error }] = useLazyQuery(
    ALIAS_NAME_CHECK,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      fetchPolicy: 'no-cache'
    }
  );

  const aliasCheckQueryResults = data?.aliasCheck as {
    exists: boolean;
  };

  const exists = aliasCheckQueryResults?.exists;

  useErrorLogger(error);

  useEffect(() => {
    if (executeCheckQuery && timeout.current === null && aliasName) {
      timeout.current = setTimeout(() => {
        aliasCheck({ variables: { name: aliasName } });
        clearTimeout(timeout.current);
        timeout.current = null;
      }, 900);
    } else {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  }, [executeCheckQuery, aliasName]);

  return aliasName ? (
    <div
      style={{
        background: '#f7f7f7',
        minWidth: '100%',
        width: 'fit-content'
      }}
      className="flex items-center border border-slate-200 rounded my-5 justify-center p-3 shadow"
    >
      {loading ? (
        <div style={{ color: '#969594' }} className="animate-spin mr-2">
          <ArrowSync width={30} height={30} />
        </div>
      ) : exists ? (
        <div style={{ color: '#e43a1c' }} className="mr-2">
          <SecureX width={30} height={30} />
        </div>
      ) : (
        <div style={{ color: '#12c508' }} className="mr-2">
          <ShieldCheck width={30} height={30} />
        </div>
      )}
      <div className="font-medium">
        {exists ? (
          <span>https://</span>
        ) : (
          <span style={{ color: '#12c508' }}>https://</span>
        )}
        <span
          style={{ color: exists ? '#e43a1c' : '#006ce7' }}
          className="break-all"
        >
          {aliasName}
        </span>
        <span>.dropgala.com</span>
      </div>
      <div style={{ color: '#919191' }} className="ml-2">
        <EditSvg width={25} height={25} />
      </div>
    </div>
  ) : null;
};

export default RegistrationForm;
