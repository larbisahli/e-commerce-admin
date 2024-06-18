import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import TextArea from '@components/ui/text-area';
import { UPDATE_LAYOUT_COMPONENT_CONTENT } from '@graphql/content';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import type { StoreLayoutComponentType } from '@ts-types/generated';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import FormActions from '../../helpers/FormActions';

export const validationSchema = yup.object().shape({
  videoUrl: yup.string().required('form:error-url-required')
});

type FormValues = {
  videoUrl: string;
  header: string;
  description: string;
  buttonLink: string;
  buttonLabel: string;
  autoplay: boolean;
  controls: boolean;
  displayContent: boolean;
  mute: boolean;
  loop: boolean;
};

const defaultValues = {
  videoUrl: '',
  header: 'My header',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel',
  buttonLabel: 'See More',
  buttonLink: '/collections/all',
  displayContent: false,
  autoplay: true,
  controls: false,
  mute: true,
  loop: false
};

type IProps = {
  initialValues?: StoreLayoutComponentType;
};

const VideoBannerForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const data = initialValues.data;
  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();

  const { updateBuilderInfo } = useUI();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: !isEmpty(data)
      ? cloneDeep({ ...data })
      : (defaultValues as FormValues)
  });

  const { userInfo } = useGetClient();
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
          updateBuilderInfo({ isReloadIframe: true });
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
        videoUrl: values.videoUrl,
        header: values.header,
        description: values.description,
        buttonLabel: values.buttonLabel,
        buttonLink: values.buttonLink,
        displayContent: values.displayContent,
        autoplay: values.autoplay,
        controls: values.controls,
        mute: values.mute,
        loop: values.loop
      }
    };

    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const displayContent = watch('displayContent');

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
            label={'Video URL (YouTube or Vimeo)'}
            isRequiredLabel
            {...register('videoUrl')}
            error={t(errors?.videoUrl?.message!)}
            placeholder={'https://'}
            variant="outline"
            className="mb-5"
          />
          <div className="mb-3">
            <Checkbox
              {...register(`displayContent` as const)}
              label={'Display content'}
            />
          </div>
          <div
            className={classNames(
              'mb-5 rounded-sm border bg-gray-50 p-3',
              !displayContent && 'opacity-50'
            )}
          >
            <Input
              label={'Heading'}
              {...register('header')}
              placeholder={'Heading'}
              variant="outline"
              className="mb-5"
              disabled={!displayContent}
            />
            <TextArea
              label={'Description'}
              {...register('description')}
              placeholder={'Lorem ipsum dolor sit...'}
              variant="outline"
              className="mb-5"
              disabled={!displayContent}
            />
            <Input
              label={'Button text'}
              {...register('buttonLabel')}
              placeholder={'Text'}
              variant="outline"
              className="mb-5"
              disabled={!displayContent}
            />
            <Input
              label={'Links to (URL)'}
              {...register('buttonLink')}
              placeholder={'/collections/all'}
              variant="outline"
              className="mb-5"
              disabled={!displayContent}
            />
          </div>
          <div className="mb-3">
            <Checkbox
              {...register(`autoplay` as const)}
              label={'Autoplay video'}
            />
          </div>
          <div className="mb-3">
            <Checkbox {...register(`loop` as const)} label={'Loop video'} />
          </div>
          <div className="mb-3">
            <Checkbox
              {...register(`controls` as const)}
              label={'Display video controls'}
            />
          </div>
          <div className="mb-3">
            <Checkbox {...register(`mute` as const)} label={'Mute video'} />
          </div>
        </Card>
      </div>
    </form>
  );
};

export default memo(VideoBannerForm);
