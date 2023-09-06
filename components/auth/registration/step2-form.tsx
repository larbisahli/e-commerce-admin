import { useLazyQuery } from '@apollo/client';
import { ArrowSync } from '@components/icons/arrow-sync';
import InfoSvg from '@components/icons/info';
import EditSvg from '@components/icons/pen';
import SecureX from '@components/icons/secure-x';
import ShieldCheck from '@components/icons/shield-check';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { ALIAS_NAME_CHECK } from '@graphql/create-store';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { CURRENCY } from '@utils/currency';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const Step2Form = ({ control, register, errors, alias }) => {
  const { t } = useTranslation();
  const [executeCheckQuery, setExecuteCheckQuery] = useState(false);

  const aliasValidation = useMemo(
    () =>
      alias
        ?.toString()
        ?.toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, ''),
    [alias]
  );

  return (
    <div className="h-full">
      <AliasViewer
        alias={aliasValidation}
        executeCheckQuery={executeCheckQuery}
      />
      <Input
        {...register('alias')}
        type="text"
        variant="outline"
        label="Store slug"
        error={t(errors?.alias?.message!)}
        onKeyDown={() => setExecuteCheckQuery(false)}
        onKeyUp={() => setExecuteCheckQuery(true)}
      />
      <div className="mb-4 flex items-center pt-1 text-xs text-gray-500 ">
        <span className="pr-1">
          <InfoSvg width="0.9rem" height="0.9rem" />
        </span>
        <p className="pt-1">{t('common:input-info2-store-link')}</p>
      </div>

      <div className="mb-5">
        <Input
          {...register('storeName')}
          label={t('form:input-label-store-name')}
          variant="outline"
          className="mb-4 mr-2 w-full"
          error={t(errors?.storeName?.message!)}
        />
      </div>
      <div className="mb-5">
        <Label>{t('form:input-label-currency')}</Label>
        <SelectInput
          name="currency"
          control={control}
          getOptionLabel={(option: any) => option?.name}
          getOptionValue={(option: any) => option?.code}
          options={CURRENCY}
        />
        <ValidationError message={t(errors.currency?.message)} />
      </div>
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
    <div className="mb-3 flex w-fit min-w-full items-center justify-center p-3">
      {loading ? (
        <div style={{ color: '#969594' }} className="mr-2 animate-spin">
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
        <span>.dropgala.shop</span>
      </div>
      <div style={{ color: '#919191' }} className="ml-2 mb-2">
        <EditSvg width={20} height={20} />
      </div>
    </div>
  ) : null;
};

export default Step2Form;
