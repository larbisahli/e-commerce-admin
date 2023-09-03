import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio';
import SelectInput from '@components/ui/select-input';
import { LANGUAGES_FOR_SELECT } from '@graphql/language';
import { CREATE_STORE_VIEW, UPDATE_STORE_VIEW } from '@graphql/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/notify';
import { OrderBy } from '@ts-types/enums';
import { LanguageType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';

import { storeViewValidationSchema } from './store-view-validation-schema';

type FormValues = {
  name: string;
  code: string;
  active: boolean;
  status: 'enabled' | 'disabled';
  isDefault: boolean;
  language: LanguageType;
};

const defaultValues = {
  name: '',
  code: '',
  active: true,
  status: 'enabled',
  isDefault: false
};

type IProps = {
  initialValues?: LanguageType | any;
};

interface TLanguageSelect {
  languageSelect: LanguageType[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
}

export default function StoreViewForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  console.log({ initialValues });

  const {
    data,
    loading,
    error: QueryError
  } = useQuery<TLanguageSelect, OptionsVariable>(LANGUAGES_FOR_SELECT, {
    variables: {
      page: 1,
      limit: 999,
      orderBy: OrderBy.CREATED_AT
    },
    fetchPolicy: 'cache-and-network'
  });

  const { languageSelect: options = [] } = data ?? {};

  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: !isEmpty(initialValues) ? initialValues : defaultValues,
    resolver: yupResolver(storeViewValidationSchema)
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updateStoreView, { loading: updating }] = useMutation(
    UPDATE_STORE_VIEW,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateStoreView: LanguageType }) => {
        if (!isEmpty(data?.updateStoreView)) {
          notify(t('common:successfully-updated'), 'success');
          router.push(ROUTES.SYSTEM_STORES);
        }
      }
    }
  );

  const [createStoreView, { loading: creating }] = useMutation(
    CREATE_STORE_VIEW,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { createStoreView: LanguageType }) => {
        if (!isEmpty(data?.createStoreView)) {
          notify(t('common:successfully-created'), 'success');
          router.push(ROUTES.SYSTEM_STORES);
        }
      }
    }
  );

  useErrorLogger(error);
  useErrorLogger(QueryError);

  const onSubmit = async (values: FormValues) => {
    if (values.code?.length > 10) {
      notify('Code must be less than 10 characters', 'error');
      return;
    }

    const variables = {
      name: values.name,
      code: values.code,
      isDefault: values.isDefault,
      active: values.status === 'enabled',
      language: { id: values.language?.id }
    };

    console.log({ x: values.code?.length, variables, values });

    if (isEmpty(initialValues)) {
      createStoreView({ variables }).catch((err) => {
        setError(err);
      });
    } else {
      updateStoreView({
        variables: { id: initialValues.id, ...variables }
      }).catch((err) => {
        setError(err);
      });
    }
  };

  const code = watch('code');
  const language = watch('language');

  const generateCode = (code = '') => {
    return slugify(code?.replace(/[^A-Za-z\s!?]/g, '-') ?? '', {
      trim: false,
      replacement: '-',
      lower: true
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:store-view-description-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <Label isRequiredLabel>
              {t('form:input-label-select-language')}
            </Label>
            <SelectInput
              name="language"
              control={control}
              getOptionLabel={(option: { displayName: string }) =>
                option.displayName
              }
              getOptionValue={(option: { id: string }) => option.id}
              options={options}
              isLoading={loading}
            />
            <ValidationError message={t(errors.language?.message)} />
          </div>
          <Input
            label={t('form:input-label-name')}
            isRequiredLabel
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
            placeholder="English store"
          />
          <Input
            label={t('form:input-label-code')}
            isRequiredLabel
            value={code}
            name="code"
            type="text"
            onChange={(v) => {
              setValue('code', generateCode(v.target.value));
            }}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-1"
            placeholder={language?.lcid ?? 'en'}
          />
          <div
            style={{ fontSize: '.75rem' }}
            className="mb-5 flex items-center flex-wrap"
          >
            <p className="text-body mr-2">
              Store code must be between 2-10 characters
            </p>
            {code?.length <= 10 ? (
              <span className="text-green-600">{`(${
                code?.length ?? 0
              }/10 characters max)`}</span>
            ) : (
              <span className="text-red-600">
                {`(${code?.length ?? 0}/10 characters max)`}
              </span>
            )}
          </div>
          <div>
            <Label>{t('form:input-label-status')}</Label>
            <Radio
              {...register('status')}
              label={t('form:input-label-enabled')}
              id={'enabled'}
              value={'enabled'}
              className="mb-2"
            />
            <Radio
              {...register('status')}
              id={'disabled'}
              label={t('form:input-label-disabled')}
              value={'disabled'}
            />
          </div>
          <div className="mt-5">
            <Checkbox
              {...register(`isDefault` as const)}
              label={t('form:input-label-set-default')}
            />
          </div>
        </Card>
      </div>
      <div className="mb-4 flex justify-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t('form:button-label-back')}
          </Button>
        )}

        <Button loading={creating || updating} disabled={creating || updating}>
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div>{t('form:button-label-save')}</div>
        </Button>
      </div>
    </form>
  );
}
