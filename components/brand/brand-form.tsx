/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import 'react-phone-input-2/lib/style.css';

import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { LanguageDefaultDescInfo } from '@components/common/commonComponents';
import FormActions from '@components/common/FormActions';
import ImageModal from '@components/image-modal';
import Alert from '@components/ui/alert';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import TextArea from '@components/ui/text-area';
import { CREATE_BRAND, UPDATE_BRAND } from '@graphql/brand';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/index';
import { setEtag } from '@store/client';
import type { BrandType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { translationFallback } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormValues = BrandType;

type IProps = {
  initialValues?: BrandType | any;
};

const defaultValues = {
  name: '',
  website: null,
  description: null
};

export default function CreateOrUpdateBrandForm({ initialValues }: IProps) {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { selectedLanguage } = useSettings();

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: initialValues ? { ...initialValues } : defaultValues
  });

  const dispatch = useAppDispatch();
  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [createBrand, { loading: creating }] = useMutation(CREATE_BRAND, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createBrand: BrandType }) => {
      const { id } = data.createBrand;
      if (id) {
        const { etag: newEtag } = data.createBrand ?? {};
        dispatch(setEtag({ etag: newEtag }));
        notify(t('common:successfully-created'), 'success');
        router.push(`${ROUTES.BRAND}/edit/${id}`);
      }
    }
  });

  const [updateBrand, { loading: updating }] = useMutation(UPDATE_BRAND, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateBrand: BrandType }) => {
      if (!isEmpty(data?.updateBrand)) {
        notify(t('common:successfully-updated'), 'success');
        const { etag: newEtag } = data?.updateBrand ?? {};
        dispatch(setEtag({ etag: newEtag }));
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = (values: FormValues) => {
    const variables = {
      ...values,
      language: selectedLanguage,
      logo: values.logo?.map(({ id }) => ({ id }))
    };

    if (isEmpty(initialValues)) {
      createBrand({ variables }).catch((err) => {
        setError(err);
      });
    } else {
      updateBrand({
        variables: { ...variables, id: initialValues.id }
      }).catch((err) => {
        setError(err);
      });
    }
  };

  const logo = watch('logo');

  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormActions
          backLink={ROUTES.BRAND}
          forceSystemLang={isEmpty(initialValues)}
          title={
            isEmpty(initialValues)
              ? t('form:form-title-new-delivery-time')
              : t('form:form-title-edit-delivery-time')
          }
          loading={creating || updating}
          disabled={creating || updating}
        />
        <LanguageDefaultDescInfo
          label="New Brand"
          isVisible={isEmpty(initialValues)}
        />
        <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
          <Description
            title={t('form:input-label-logo')}
            details={t('form:brand-image-helper-text')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <ImageModal
              label="form:label-add-brand-logo"
              onSelect={(logo) => setValue('logo', logo)}
              selected={logo}
              isThumbnail
            />
          </Card>
        </div>
        <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
          <Description
            title={t('common:brand')}
            details={`${
              initialValues
                ? t('form:item-description-update')
                : t('form:item-description-add')
            } ${t('form:form-description-brand-name')}`}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="grid grid-cols-2 gap-5">
              <Input
                label={t('form:input-label-brand-name')}
                isRequiredLabel
                {...register('name', { required: 'Name is required' })}
                error={t(errors.name?.message!)}
                placeholder={translationFallback(
                  initialValues,
                  'name',
                  'Enter brand name'
                )}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={t('form:input-label-website')}
                {...register('link')}
                error={t(errors.link?.message!)}
                placeholder="Enter Brand website url"
                variant="outline"
                className="mb-5"
              />
            </div>
            <TextArea
              label={t('form:item-description')}
              {...register('description')}
              placeholder={translationFallback(
                initialValues,
                'description',
                'Enter a description'
              )}
              error={t(errors.description?.message!)}
              variant="outline"
              className="mt-5"
            />
          </Card>
        </div>
      </form>
    </>
  );
}
