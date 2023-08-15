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
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { tagValidationSchema } from './tag-validation-schema';

type FormValues = {
  direction: string;
};

const defaultValues = {
  direction: { label: 'LTR' }
};

type IProps = {
  initialValues?: Tag | any;
};

const locales = [
  { name: 'Common' },
  { name: 'Exception' },
  { name: 'Auth' },
  { name: 'Checkout' },
  { name: 'Actions' },
  { name: 'Gateways' },
  { name: 'Order' },
  { name: 'Cart' },
  { name: 'Reviews' },
  { name: 'Pages' },
  { name: 'Marketing' },
  { name: 'Category' },
  { name: 'Collection' },
  { name: 'Messages' },
  { name: 'Emails' },
  { name: 'Image' },
  { name: 'Shipping' },
  { name: 'Billing' },
  { name: 'Error_codes' },
  { name: 'Print_order' }
];

export default function LanguageForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: initialValues ? initialValues : defaultValues,
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
      direction: values.direction
    };

    if (isEmpty(initialValues)) {
      createTag({ variables: input }).catch((err) => {
        setError(err);
      });
    } else {
      updateTag({ variables: { id: initialValues.id, ...input } }).catch(
        (err) => {
          setError(err);
        }
      );
    }
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
      ?.map(({ code_2 }) => {
        return CountryLanguage.getCountryMsLocales(code_2)?.map((locale) => {
          return {
            ...locale,
            language: CountryLanguage.getLanguage(code_2)
          };
        });
      })
      ?.filter(Boolean)
      ?.flat()
      ?.sort(compare);
  }, []);

  console.log({
    A: CountryLanguage.getCountries(),
    CountryLanguage,
    locals,
    f: CountryLanguage.getLanguages()
  });

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
            className="card px-5 py-4 w-full h-[300px] sm:h-[450px] os-theme-thin-light"
          >
            <div className="flex flex-col">
              {locales?.map((local) => {
                return (
                  <button
                    key={local.name}
                    className={cn(
                      'border border-gray-300 p-2 rounded-md mb-2 text-left',
                      {
                        'font-medium text-blue-700 bg-blue-100':
                          local.name === 'Common'
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
          <InputForLocal
            label={t('form:input-label-name')}
            {...register('name')}
            error={t(errors.name?.message!)}
            className="mb-5"
          />
          <InputForLocal
            label={t('form:input-label-name')}
            {...register('name')}
            error={t(errors.name?.message!)}
            className="mb-5"
          />
          <InputForLocal
            label={t('form:input-label-name')}
            {...register('name')}
            error={t(errors.name?.message!)}
            className="mb-5"
          />
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
