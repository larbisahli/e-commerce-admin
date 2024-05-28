import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { AlignCenterIcon } from '@components/icons/builder/align-center';
import { AlignLeftIcon } from '@components/icons/builder/align-left';
import { AlignRightIcon } from '@components/icons/builder/align-right';
import ImageModal from '@components/image-modal';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import TextArea from '@components/ui/text-area';
import { UPDATE_LAYOUT_COMPONENT_CONTENT } from '@graphql/content';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import { TextAlignEnum } from '@ts-types/custom.types';
import type { ImageType, StoreLayoutComponentType } from '@ts-types/generated';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';

type FormValues = {
  thumbnail: ImageType[];
  header: string;
  description: string;
  buttonLink: string;
  buttonLabel: string;
  contentAlignment: string;
};

const defaultValues = {};

type IProps = {
  initialValues?: StoreLayoutComponentType;
};

const ImageBannerForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const data = initialValues.data;
  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();

  console.log('ImageBannerForm', { initialValues });

  const { updateBuilderInfo } = useUI();

  const { register, watch, setValue, handleSubmit } = useForm<FormValues>({
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
        header: values.header,
        description: values.description,
        buttonLabel: values.buttonLabel,
        buttonLink: values.buttonLink,
        contentAlignment: values.contentAlignment
      }
    };

    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const thumbnail = watch('thumbnail');
  const contentAlignment = watch('contentAlignment');

  const handleContentAlignment = (e, value) => {
    e.preventDefault();
    setValue('contentAlignment', value);
  };

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
          <ImageModal
            label="form:label-add-image"
            isRequiredLabel
            onSelect={(photo) => setValue('thumbnail', photo)}
            selected={thumbnail}
            isThumbnail
          />
        </Card>
      </div>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:image-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={'Heading'}
            {...register('header')}
            placeholder={'Heading'}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={'Description'}
            {...register('description')}
            placeholder={'Lorem ipsum dolor sit amet...'}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={'Button text'}
            {...register('buttonLabel')}
            placeholder={'Text'}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={'Links to (URL)'}
            {...register('buttonLink')}
            placeholder={'/collections/all'}
            variant="outline"
            className="mb-5"
          />
          {initialValues.moduleName === 'ImageBannerContentCenter' && (
            <div className="mt-3 flex items-center justify-between">
              <Label>Content alignment</Label>
              <div className="flex items-center justify-center">
                <button
                  onClick={(e) => handleContentAlignment(e, TextAlignEnum.LEFT)}
                  title="Left"
                  className={classNames(
                    'flex h-7 w-10 items-center justify-center rounded-l-sm border-t border-b border-l border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                    {
                      'border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                        contentAlignment === TextAlignEnum.LEFT
                    }
                  )}
                >
                  <AlignLeftIcon width={18} height={18} />
                </button>
                <button
                  onClick={(e) =>
                    handleContentAlignment(e, TextAlignEnum.CENTER)
                  }
                  title="Center"
                  className={classNames(
                    'flex h-7 w-10 items-center justify-center border-t border-b border-r border-l border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 hover:text-blue-700',
                    {
                      'border-accent bg-blue-100 text-accent hover:bg-blue-200':
                        contentAlignment === TextAlignEnum.CENTER,
                      'border-l-accent':
                        contentAlignment === TextAlignEnum.LEFT,
                      '!border-r-0': contentAlignment === TextAlignEnum.RIGHT
                    }
                  )}
                >
                  <AlignCenterIcon width={18} height={18} />
                </button>
                <button
                  onClick={(e) =>
                    handleContentAlignment(e, TextAlignEnum.RIGHT)
                  }
                  title="Right"
                  className={classNames(
                    'flex h-7 w-10 items-center justify-center rounded-r-sm border-t border-b border-r border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                    {
                      'border-l border-accent border-l-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                        contentAlignment === TextAlignEnum.RIGHT
                    }
                  )}
                >
                  <AlignRightIcon width={18} height={18} />
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </form>
  );
};

export default memo(ImageBannerForm);
