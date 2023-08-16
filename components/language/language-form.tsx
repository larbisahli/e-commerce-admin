import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import InputForLocal from '@components/ui/input-for-locale';
import Label from '@components/ui/label';
import Scrollbar from '@components/ui/scrollbar';
import SelectInput from '@components/ui/select-input';
import { CREATE_TAG, UPDATE_TAG } from '@graphql/tag';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import CountryLanguage from '@ladjs/country-language';
import { notify } from '@lib/notify';
import { Tag } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { tagValidationSchema } from './tag-validation-schema';

type FormValues = {
  direction: string;
  translation: { [key: string]: { [key: string]: string } };
};

const defaultValues = {
  direction: { label: 'LTR' },
  translation: {}
};

type IProps = {
  initialValues?: FormValues | any;
};

const locales = [
  { name: 'Common', path: 'en-us/common.ts' },
  { name: 'Exception', path: 'en-us/exception.ts' },
  { name: 'Auth', path: 'en-us/auth.ts' },
  { name: 'Checkout', path: 'en-us/checkout.ts' },
  { name: 'Actions', path: 'en-us/checkout.ts' },
  { name: 'Gateways', path: 'en-us/checkout.ts' },
  { name: 'Order', path: 'en-us/checkout.ts' },
  { name: 'Cart', path: 'en-us/checkout.ts' },
  { name: 'Reviews', path: 'en-us/checkout.ts' },
  { name: 'Pages', path: 'en-us/checkout.ts' },
  { name: 'Marketing', path: 'en-us/checkout.ts' },
  { name: 'Category', path: 'en-us/checkout.ts' },
  { name: 'Collection', path: 'en-us/checkout.ts' },
  { name: 'Messages', path: 'en-us/checkout.ts' },
  { name: 'Emails', path: 'en-us/checkout.ts' },
  { name: 'Image', path: 'en-us/checkout.ts' },
  { name: 'Shipping', path: 'en-us/checkout.ts' },
  { name: 'Billing', path: 'en-us/checkout.ts' },
  { name: 'Error_codes', path: 'en-us/checkout.ts' },
  { name: 'Print_order', path: 'en-us/checkout.ts' }
];

export default function LanguageForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [currentLocaleTranslation, setCurrentLocaleTranslation] = useState({});
  const [currentLocale, setCurrentLocale] = useState(locales[0]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          translation: {
            ...(initialValues?.translation ?? {}),
            ...currentLocaleTranslation
          }
        }
      : defaultValues,
    resolver: yupResolver(tagValidationSchema)
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [createTag, { loading: creating }] = useMutation(CREATE_TAG, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createTag: Tag }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-created'), 'success');
        reset();
        router.push(ROUTES.TAG);
      }
    }
  });

  const [updateTag, { loading: updating }] = useMutation(UPDATE_TAG, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateTag: Tag }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.TAG);
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    const input = {
      direction: values.direction,
      ...values
    };

    console.log('========>', { values });

    // if (isEmpty(initialValues)) {
    //   createTag({ variables: input }).catch((err) => {
    //     setError(err);
    //   });
    // } else {
    //   updateTag({ variables: { id: initialValues.id, ...input } }).catch(
    //     (err) => {
    //       setError(err);
    //     }
    //   );
    // }
  };

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

  const locals = useMemo(() => {
    return CountryLanguage.getCountries()
      ?.map(({ code_2 }) => CountryLanguage.getCountryMsLocales(code_2))
      ?.filter(Boolean)
      ?.flat()
      ?.sort(compare);
  }, []);

  // Get Countries
  useEffect(() => {
    async function getLocaleFile(currentLocale) {
      const { translation } = await import(
        `@utils/locales/${currentLocale.path}`
      );
      setCurrentLocaleTranslation((prev) => {
        return {
          ...prev,
          [currentLocale.name]: translation
        };
      });
    }
    getLocaleFile(currentLocale);
  }, [currentLocale]);

  useEffect(() => {
    const translation = {
      ...(initialValues?.translation ?? {}),
      ...currentLocaleTranslation
    };
    Object.keys(translation ?? [])?.forEach((file) => {
      Object.keys(translation[file] ?? [])?.forEach((field) => {
        setValue(`translation.${file}.${field}`, translation[file][field]);
      });
    });
  }, [
    initialValues?.translation,
    currentLocaleTranslation,
    currentLocale.name,
    setValue
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:tag-description-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          {/* <Input
            label={t('form:input-label-name')}
            isRequiredLabel
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          /> */}
          <div className="mb-5">
            <Label isRequiredLabel>{t('form:input-label-language')}</Label>
            <SelectInput
              name="locale"
              control={control}
              getOptionLabel={(option: { displayName: string }) =>
                option?.displayName
              }
              getOptionValue={(option: { langCultureName: string }) =>
                option?.langCultureName
              }
              options={locals}
            />
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
        </Card>
      </div>
      <div className="flex flex-wrap my-5 sm:my-8">
        <div className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3">
          <Scrollbar
            autoHide="never"
            className="card px-5 py-4 w-full h-64 sm:h-96 os-theme-thin-light"
          >
            <div className="flex flex-col">
              {locales?.map((local) => {
                return (
                  <button
                    key={local.name}
                    onClick={() => setCurrentLocale(local)}
                    className={cn(
                      'border border-gray-300 p-2 rounded-md mb-2 text-left',
                      {
                        'font-medium text-blue-700 bg-blue-100':
                          local.name === currentLocale.name
                      }
                    )}
                  >
                    {local.name}
                  </button>
                );
              })}
            </div>
          </Scrollbar>
        </div>
        <Card className="w-full sm:w-8/12 md:w-2/3">
          {Object.keys(currentLocaleTranslation[currentLocale.name] ?? [])?.map(
            (field) => {
              return (
                <InputForLocal
                  key={field}
                  label={field}
                  {...register(`translation.${currentLocale.name}.${field}`)}
                  className="mb-5"
                />
              );
            }
          )}
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
