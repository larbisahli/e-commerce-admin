import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Description from '@components/ui/description';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio';
import SelectInput from '@components/ui/select-input';
import { UPDATE_LAYOUT_COMPONENT_CONTENT } from '@graphql/content';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import type { ImageType, StoreLayoutComponentType } from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';
import ImageModal from '@components/image-modal';

const borderRadiusOptions = [
  { value: 'none' },
  { value: 'sm' },
  { value: 'md' },
  { value: 'lg' },
  { value: 'xl' },
  { value: '2xl' },
  { value: '3xl' }
];

const objectFitOptions = [
  { value: 'fill' },
  { value: 'cover' },
  { value: 'contain' },
  { value: 'scale-down' },
  { value: 'none' }
];

type FormValues = {
  thumbnail: ImageType[];
  sectionSize: string;
  borderRadius: { value: string };
  objectFit: { value: string };
};

const defaultValues = {
  thumbnail: [],
  sectionSize: 'auto',
  borderRadius: { value: 'lg' },
  objectFit: { value: 'none' }
};

type IProps = {
  initialValues?: StoreLayoutComponentType;
};

const ImageForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const data = initialValues.data;
  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();

  const { updateBuilderInfo } = useUI();

  const { watch, register, handleSubmit, control, setValue } =
    useForm<FormValues>({
      defaultValues: !isEmpty(data)
        ? cloneDeep({ ...data })
        : (defaultValues as FormValues)
    });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updateLayoutComponent, { loading: updating }] = useMutation(
    UPDATE_LAYOUT_COMPONENT_CONTENT,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: {
        updateLayoutComponent: StoreLayoutComponentType;
      }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success', {
            position: 'top-center',
            autoClose: 2000
          });
          updateBuilderInfo({ isReloadStoreFront: true });
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    const variables = {
      componentId: initialValues.componentId,
      contentId: initialValues?.contentId,
      language: selectedLanguage,
      data: {
        thumbnail: values.thumbnail,
        sectionSize: values.sectionSize,
        borderRadius: values.borderRadius,
        objectFit: values.objectFit
      }
    };

    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const thumbnail = watch('thumbnail');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions title="Banner" disabled={updating} loading={updating} />
      <div className="rounded- rounded- rounded- rounded- my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-configuration')}
          details={`${
            data
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:hero-slider-description-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <Label>{t('form:input-label-border-radius')}</Label>
            <SelectInput
              name="borderRadius"
              control={control}
              getOptionLabel={(option: { value: string }) => option?.value}
              getOptionValue={(option: { value: string }) => option?.value}
              options={borderRadiusOptions}
            />
          </div>
          <div className="mb-5">
            <Label>{t('form:input-label-object-fit')}</Label>
            <SelectInput
              name="objectFit"
              control={control}
              getOptionLabel={(option) => option.value}
              getOptionValue={(option) => option.value}
              options={objectFitOptions}
            />
            <p className="mt-1 text-xs text-body">
              {`The CSS object-fit property is used to specify how an <img> or <video> should be resized to fit its container.`}
            </p>
          </div>
          <div className="mt-5">
            <Label>{t('form:input-label-section-size')}</Label>
            <Radio
              {...register('sectionSize')}
              label={t('form:input-label-auto')}
              id="auto"
              value="auto"
              className="mb-2"
            />
            <Radio
              {...register('sectionSize')}
              id="full"
              value="full"
              label={t('form:input-label-full')}
            />
          </div>
        </Card>
      </div>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:image-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ImageModal
            label="form:label-add-image"
            isRequiredLabel
            onSelect={(photo) => setValue('thumbnail', photo)}
            selected={thumbnail}
            isThumbnail
          />
        </Card>
      </div>
    </form>
  );
};

const DisplayColorCode = ({ color }: { color: string }) => {
  return (
    <>
      {color !== null && (
        <span
          className="rounded border border-border-200 bg-gray-100 px-2 py-1
                         text-sm text-heading ms-3"
        >
          {color}
        </span>
      )}
    </>
  );
};

export default memo(ImageForm);
