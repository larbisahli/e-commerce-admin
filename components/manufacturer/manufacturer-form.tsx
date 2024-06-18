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
import {
  CREATE_MANUFACTURER,
  UPDATE_MANUFACTURER
} from '@graphql/manufacturer';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/index';
import type { ManufacturerType, Suppliers } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { translationFallback } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormValues = ManufacturerType;

type IProps = {
  initialValues?: ManufacturerType | any;
};

const defaultValues = {
  name: '',
  website: null,
  description: null
};

export default function CreateOrUpdateManufacturerForm({
  initialValues
}: IProps) {
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

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [createManufacturer, { loading: creating }] = useMutation(
    CREATE_MANUFACTURER,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { createManufacturer: ManufacturerType }) => {
        const { id } = data.createManufacturer;
        if (id) {
          notify(t('common:successfully-created'), 'success');
          router.push(`${ROUTES.MANUFACTURER}/edit/${id}`);
        }
      }
    }
  );

  const [updateManufacturer, { loading: updating }] = useMutation(
    UPDATE_MANUFACTURER,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateSupplier: Suppliers }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success');
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = (values: FormValues) => {
    const variables = {
      ...values,
      language: selectedLanguage,
      logo: values.logo?.map(({ id }) => ({ id }))
    };

    if (isEmpty(initialValues)) {
      createManufacturer({ variables }).catch((err) => {
        setError(err);
      });
    } else {
      updateManufacturer({
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
          backLink={ROUTES.MANUFACTURER}
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
          label="New Manufacturer"
          isVisible={isEmpty(initialValues)}
        />
        <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
          <Description
            title={t('form:input-label-logo')}
            details={t('form:manufacturer-image-helper-text')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <ImageModal
              label="form:label-add-manufacturer-logo"
              onSelect={(logo) => setValue('logo', logo)}
              selected={logo}
              isThumbnail
            />
          </Card>
        </div>
        <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
          <Description
            title={t('common:manufacturer')}
            details={`${
              initialValues
                ? t('form:item-description-update')
                : t('form:item-description-add')
            } ${t('form:form-description-manufacturer-name')}`}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="grid grid-cols-2 gap-5">
              <Input
                label={t('form:input-label-manufacturer-name')}
                isRequiredLabel
                {...register('name', { required: 'Name is required' })}
                error={t(errors.name?.message!)}
                placeholder={translationFallback(
                  initialValues,
                  'name',
                  'Enter manufacturer name'
                )}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={t('form:input-label-website')}
                {...register('link')}
                error={t(errors.link?.message!)}
                placeholder="Enter Manufacturer website url"
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
