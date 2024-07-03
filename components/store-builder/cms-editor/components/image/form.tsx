import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import ImageModal from '@components/image-modal';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { useModalAction } from '@components/ui/modal/modal.context';
import { UPDATE_LAYOUT_COMPONENT_CONTENT } from '@graphql/content';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useAppDispatch } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import { setEtag } from '@store/client';
import type { ImageType, StoreLayoutComponentType } from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';

type FormValues = {
  thumbnail: ImageType[];
  link: string;
  newWindow: boolean;
};

const defaultValues = {};

type IProps = {
  initialValues?: StoreLayoutComponentType;
};

const ImageForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const data = initialValues.data;
  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();

  const { updateBuilderInfo } = useUI();
  const dispatch = useAppDispatch();

  const { watch, handleSubmit, setValue, register } = useForm<FormValues>({
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
      data: {
        thumbnail: values.thumbnail,
        link: values.link,
        target: values.newWindow ? '_blank' : '_self'
      }
    };

    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const thumbnail = watch('thumbnail');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        btnLabel={t('form:button-label-save-content')}
        title="Component Content"
        disabled={updating}
        loading={updating}
      />
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:image-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={'Links to (URL)'}
            {...register('link')}
            placeholder={'/collections/all'}
            variant="outline"
            className="mb-5"
          />
          <div className="mb-3">
            <Checkbox
              {...register('newWindow' as const)}
              label={'Open in new window'}
            />
          </div>
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

export default memo(ImageForm);
