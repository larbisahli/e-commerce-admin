import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import FormActions from '@components/common/FormActions';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import InputForLocal from '@components/ui/input-for-locale';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio';
import Scrollbar from '@components/ui/scrollbar';
import SelectInput from '@components/ui/select-input';
import { CREATE_LANGUAGE, UPDATE_LANGUAGE } from '@graphql/language';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import { fetchStoreSettings } from '@store/settings';
import { LanguageType } from '@ts-types/generated';
import { locales } from '@utils/locales';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { tagValidationSchema } from './tag-validation-schema';

type FormValues = {
  locale: { name: string; localeId: string };
  direction: { label: 'LTR' | 'RTL' };
  status: 'enabled' | 'disabled';
  active: boolean;
  translation: { [key: string]: { [key: string]: string } };
};

const defaultValues = {
  locale: {
    localeId: 'en-us',
    name: 'English (US)'
  },
  direction: { label: 'LTR' },
  active: true,
  status: 'enabled',
  translation: {}
};

type IProps = {
  initialValues?: LanguageType | any;
  localeFiles: { [key: string]: string };
  isFork?: boolean;
};

export default function LanguageForm({
  initialValues,
  localeFiles,
  isFork = false
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const createMode = isEmpty(initialValues);

  const [error, setError] = useState(null);
  const [currentLocale, setCurrentLocale] = useState<{ [key: string]: string }>(
    { actions: localeFiles['actions'] }
  );

  function compare(a, b) {
    const A = a.displayName?.split('-')[0];
    const B = b.displayName?.split('-')[0];
    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 0;
  }

  const locales_ = useMemo(() => {
    return locales?.sort(compare);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: !createMode
      ? {
          ...initialValues,
          status: initialValues?.active ? 'enabled' : 'disabled',
          locale: locales?.find(
            (locale) =>
              locale.localeId?.toLowerCase() === initialValues.localeId
          ),
          direction: { label: initialValues.direction },
          translation: {
            ...localeFiles,
            ...(initialValues?.translation ?? {})
          }
        }
      : defaultValues,
    resolver: yupResolver(tagValidationSchema)
  });

  const dispatch = useAppDispatch();

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updateLanguage, { loading: updating }] = useMutation(UPDATE_LANGUAGE, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateLanguage: LanguageType }) => {
      if (!isEmpty(data?.updateLanguage)) {
        // Updalocalete store languages
        dispatch(fetchStoreSettings());
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.LANGUAGES);
      }
    }
  });

  const [createLanguage, { loading: creating }] = useMutation(CREATE_LANGUAGE, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createLanguage: LanguageType }) => {
      if (!isEmpty(data?.createLanguage)) {
        // Update store languages
        dispatch(fetchStoreSettings());
        notify(t('common:successfully-created'), 'success');
        router.push(ROUTES.LANGUAGES);
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    const variables = {
      name: values.locale.name,
      localeId: values.locale.localeId,
      direction: values.direction?.label,
      active: values.status === 'enabled',
      translation: values.translation
    };

    if (createMode || isFork) {
      createLanguage({ variables }).catch((err) => {
        setError(err);
      });
    } else {
      updateLanguage({
        variables: { id: initialValues.id, ...variables }
      }).catch((err) => {
        setError(err);
      });
    }
  };

  useEffect(() => {
    const translation = {
      ...localeFiles,
      ...(initialValues?.translation ?? {})
    };

    Object.keys(translation)?.forEach((ns) => {
      Object.keys(translation[ns])?.forEach((field) => {
        setValue(`translation.${ns}.${field}`, translation[ns][field]);
      });
    });
  }, [initialValues?.translation, localeFiles, setValue]);

  const currentLocalLabel = (Object.keys(currentLocale) ?? [])[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        backLink={ROUTES.LANGUAGES}
        forceSystemLang={createMode}
        title={
          createMode
            ? t('form:label-new-language')
            : t('form:label-edit-language')
        }
        showSelectLanguage={false}
        loading={creating || updating}
        disabled={creating || updating}
      />
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:tag-description-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-1/4 sm:py-8 sm:pe-4 md:w-1/4 md:pe-5 "
        />

        <Card className="w-full sm:w-3/4 md:w-3/4">
          <div className="mb-5">
            <Label isRequiredLabel>{t('form:input-label-language')}</Label>
            <SelectInput
              name="locale"
              control={control}
              getOptionLabel={(option: { name: string }) => option?.name}
              getOptionValue={(option: { localeId: string }) =>
                option?.localeId
              }
              options={locales_}
            />
            <ValidationError message={t(errors?.locale?.message)} />
          </div>
          <div className="mb-5">
            <Label isRequiredLabel>{t('form:input-label-direction')}</Label>
            <SelectInput
              name="direction"
              control={control}
              getOptionLabel={(option: { label: string }) => option?.label}
              getOptionValue={(option: { label: string }) => option?.label}
              options={[{ label: 'LTR' }, { label: 'RTL' }]}
            />
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
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <div className="w-full px-0 pb-5 sm:w-1/4 sm:pe-4 md:w-1/4 md:pe-5">
          <Scrollbar
            autoHide="never"
            className="card os-theme-thin-light h-64 w-full px-5 py-4 sm:h-96"
          >
            <div className="flex flex-col">
              {Object.keys(localeFiles)?.map((name) => {
                return (
                  <button
                    key={name}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentLocale({ [name]: localeFiles[name] });
                    }}
                    className={cn(
                      'mb-2 rounded-md border border-gray-300 p-2 text-left capitalize',
                      {
                        'bg-blue-100 font-medium text-blue-700':
                          name === currentLocalLabel
                      }
                    )}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </Scrollbar>
        </div>
        <Card className="w-full sm:w-3/4 md:w-3/4">
          {Object.keys(localeFiles)?.map((locale) => {
            return Object.keys(localeFiles[locale])?.map((field) => {
              return (
                <InputForLocal
                  key={field}
                  label={field}
                  {...register(`translation.${locale}.${field}`)}
                  className={cn('mb-5', {
                    hidden: locale !== currentLocalLabel
                  })}
                />
              );
            });
          })}
        </Card>
      </div>
    </form>
  );
}
