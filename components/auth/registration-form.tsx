import { useLazyQuery, useMutation } from '@apollo/client';
import { ArrowSync } from '@components/icons/arrow-sync';
import EditSvg from '@components/icons/pen';
import SecureX from '@components/icons/secure-x';
import ShieldCheck from '@components/icons/shield-check';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import { ALIAS_NAME_CHECK, CREATE_STORE } from '@graphql/create-store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { ROUTES } from '@utils/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import FormFooter from './form-footer';

type FormValues = {
  firstName: string;
  lastName: string;
  alias: string;
  email: string;
  storeName: string;
};

const registrationFormSchema = yup.object().shape({
  firstName: yup.string().required('form:error-first-name-required'),
  lastName: yup.string().required('form:error-last-name-required'),
  storeName: yup.string().required('form:error-store-name-required'),
  alias: yup
    .string()
    .test(
      'len',
      'Store name must be less then 63 characters',
      (val) => val.length <= 63 && val.length >= 2
    )
    .required('form:error-store-name-required'),
  email: yup
    .string()
    .email()
    .typeError('form:error-email-required')
    .required('form:error-email-required')
});

const RegistrationForm = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [executeCheckQuery, setExecuteCheckQuery] = useState(false);
  const [iso2, setIso2] = useState('us');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    resetField
  } = useForm<FormValues>({
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
        resetField('firstName');
        resetField('lastName');
        resetField('storeName');
        resetField('alias');
        setSuccessMessage('form:success-register');
        router.push(ROUTES.LOGIN);
      }
    }
  });

  useErrorLogger(error, false);

  async function onSubmit({
    firstName,
    lastName,
    alias,
    storeName,
    email
  }: FormValues) {
    const variables = {
      firstName,
      lastName,
      email,
      alias: alias
        ?.toString()
        ?.toLowerCase()
        ?.replace(/[^a-zA-Z0-9]/g, ''),
      storeName,
      country: { iso2 }
    };

    setErrorMessage(null);

    createStore({ variables }).catch((error) => {
      const err = error?.graphQLErrors[0];
      setErrorMessage(`error:${err?.t ?? 'SOMETHING_HAPPENED'}`);
    });
  }

  const alias = watch('alias');

  const aliasValidation = useMemo(
    () =>
      alias
        ?.toString()
        ?.toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, ''),
    [alias]
  );

  useEffect(() => {
    // Prefetch login bundle
    router.prefetch(ROUTES.LOGIN);
    // Get current country code
    fetch('api/hi')
      .then((response) => response.json())
      .then((data) => setIso2(data?.iso2 ?? 'ma'));
  }, []);

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-5 phone-number-class">
          <Label>{t('form:input-label-email')}</Label>
          <Input
            {...register('email')}
            type="email"
            placeholder={t('form:input-label-email')}
            variant="outline"
            className="mb-4 w-full"
            error={t(errors?.email?.message!)}
          />
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
          {...register('alias')}
          type="text"
          variant="outline"
          placeholder="Store link"
          error={t(errors?.alias?.message!)}
          onKeyDown={() => setExecuteCheckQuery(false)}
          onKeyUp={() => setExecuteCheckQuery(true)}
        />
        <p className="pt-1 mb-4 text-gray-400 text-sm">
          {t('form:input-info-store-link')}
        </p>
        <AliasViewer
          alias={aliasValidation}
          executeCheckQuery={executeCheckQuery}
        />
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

const AliasViewer = ({ alias, executeCheckQuery }) => {
  const timeout = useRef(null);

  const { userInfo } = useGetUser();

  const csrfToken = userInfo?.csrfToken;

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
    if (executeCheckQuery && timeout.current === null && alias) {
      timeout.current = setTimeout(() => {
        aliasCheck({ variables: { name: alias } });
        clearTimeout(timeout.current);
        timeout.current = null;
      }, 900);
    } else {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  }, [executeCheckQuery, alias, aliasCheck]);

  return alias ? (
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
          {alias}
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
