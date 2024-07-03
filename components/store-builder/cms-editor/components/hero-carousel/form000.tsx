/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import ImageModal from '@components/image-modal';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import Radio from '@components/ui/radio';
import TextArea from '@components/ui/text-area';
import { UPDATE_LAYOUT_COMPONENT_CONTENT } from '@graphql/content';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch, useGetClient } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
import type {
  HeroBannerType,
  ImageType,
  StoreLayoutComponentType
} from '@ts-types/generated';
import { translationFallback } from '@utils/utils';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';

type FormValues = HeroBannerType;

const defaultValues = {
  title: '',
  url: null,
  thumbnail: [],
  description: null,
  btnLabel: null,
  position: 1,
  status: 'draft',
  align: 'left',
  styles: {
    textColor: '#ffffff',
    btnBgc: '#dcdbdb',
    btnTextColor: '#222121'
  }
};

type IProps = {
  initialValues?: StoreLayoutComponentType;
  handleBack: any;
};

export default function CarouselForm({ initialValues, handleBack }: IProps) {
  const { t } = useTranslation();

  const data = initialValues.data;
  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();

  const { updateBuilderInfo } = useUI();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: !isEmpty(data)
      ? cloneDeep({ ...data })
      : (defaultValues as FormValues)
  });

  const { userInfo } = useGetClient();
  const { closeModal } = useModalAction();
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
        if (!isEmpty(data?.updateLayoutComponent)) {
          const { etag: newEtag } = data?.updateLayoutComponent ?? {};
          dispatch(setEtag({ etag: newEtag }));
          notify(t('common:successfully-updated'), 'success', {
            position: 'top-center',
            autoClose: 2000
          });
          updateBuilderInfo({ isReloadIframe: true });
          closeModal(null, null, { sectionId: initialValues.componentId });
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
      data: { values }
    };

    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const thumbnail = watch('thumbnail') as ImageType[];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        btnLabel={t('form:button-label-save-content')}
        title="Component Content"
        disabled={updating}
        loading={updating}
      />
      <div className="flex flex-wrap border-b border-dashed border-border-base pb-8 first-line:my-5 sm:my-8">
        <Card className="w-full sm:w-3/4 md:w-3/4">
          <ImageModal
            onSelect={(photo) => setValue('thumbnail', photo)}
            selected={thumbnail}
            isThumbnail
          />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:hero-slider-description-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-1/4 sm:py-8 sm:pe-4 md:w-1/4 md:pe-5"
        />

        <Card className="w-full sm:w-3/4 md:w-3/4">
          <Input
            label={t('form:input-label-title')}
            {...register('title')}
            variant="outline"
            className="mb-5"
            placeholder={translationFallback(
              initialValues,
              'title',
              'Enter a title'
            )}
          />
          <TextArea
            label={t('form:input-label-description')}
            {...register('description')}
            variant="outline"
            placeholder={translationFallback(
              initialValues,
              'description',
              'Enter a description'
            )}
            className="mb-5"
          />
          <Input
            label={t('form:input-label-destination-url')}
            {...register('url')}
            variant="outline"
            className="mb-5"
            placeholder="Enter destination url"
          />
          <Input
            label={t('form:input-label-button-label')}
            {...register('btnLabel')}
            variant="outline"
            className="mb-5"
            placeholder={translationFallback(
              initialValues,
              'btnLabel',
              'Enter a button label'
            )}
          />
          <Input
            label={`${t('form:input-label-display-order')}`}
            type="number"
            min={0}
            {...register('position')}
            error={t(errors.position?.message!)}
            variant="outline"
            className="mb-5"
          />
          <div className="my-5 flex items-center">
            <Label className="mb-0">{t('form:input-label-alignment')}:</Label>
            <Radio
              {...register('align')}
              label={t('form:input-label-left')}
              id="left"
              value="left"
              className="mx-2"
            />
            <Radio
              {...register('align')}
              id="center"
              value="center"
              label={t('form:input-label-center')}
              className="mx-2"
            />
            <Radio
              {...register('align')}
              id="right"
              value="right"
              label={t('form:input-label-right')}
              className="mx-2"
            />
          </div>
          <div>
            <Label>{t('form:input-label-status')}</Label>
            <Radio
              {...register('status')}
              label={t('form:input-label-published')}
              id="published"
              value="publish"
              className="mb-2"
            />
            <Radio
              {...register('status')}
              id="draft"
              label={t('form:input-label-draft')}
              value="draft"
            />
          </div>
        </Card>
      </div>
    </form>
  );
}
