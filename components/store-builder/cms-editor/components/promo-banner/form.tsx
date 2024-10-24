import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import { useModalAction } from '@components/ui/modal/modal.context';
import Radio from '@components/ui/radio';
import SelectInput from '@components/ui/select-input';
import SwitchInput from '@components/ui/switch-input';
import { UPDATE_LAYOUT_COMPONENT_CONTENT } from '@graphql/content';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useAppDispatch } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import { setEtag } from '@store/client';
import type { PromoBannerType } from '@ts-types/content.types';
import type { StoreLayoutComponentType } from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';
import { animationSpeedOptions, delaySpeedOptions } from '../common/data';

const Editor = dynamic(() => import('@components/ui/editor'), {
  loading: () => <Loader height="150px" text="Editor..." />,
  ssr: false
});

type FormValues = PromoBannerType;

const defaultValues = {};

type IProps = {
  initialValues?: StoreLayoutComponentType;
};

const PromoBannerForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const data = initialValues.data;
  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();

  console.log('???????', { initialValues });

  const { updateBuilderInfo } = useUI();
  const dispatch = useAppDispatch();

  const { watch, register, handleSubmit, control, setValue } =
    useForm<FormValues>({
      defaultValues: !isEmpty(data)
        ? cloneDeep({ ...data })
        : (defaultValues as PromoBannerType)
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
    keyName: 'key'
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
          closeModal(null, null, { componentId: initialValues.componentId });
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
        direction: values.direction,
        animationSpeed: values?.animationSpeed,
        delaySpeed: values?.delaySpeed,
        loop: values.loop,
        slidesPerView: values.slidesPerView,
        langDirection: values.langDirection,
        draggable: values.draggable,
        items: values?.items?.map((slider, idx) => ({
          ...slider,
          position: idx
        }))
      }
    };

    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const loop = watch('loop');
  const draggable = watch('draggable');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        btnLabel="Save"
        title="Banner"
        disabled={updating}
        loading={updating}
      />
      <div className="my-5 flex flex-wrap sm:my-8">
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
            <Label>{t('form:input-label-animation-speed')}</Label>
            <SelectInput
              name="animationSpeed"
              control={control}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.value}
              options={animationSpeedOptions}
            />
          </div>
          <div className="mb-5">
            <Label>{t('form:input-label-delay-speed')}</Label>
            <SelectInput
              name="delaySpeed"
              control={control}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.value}
              options={delaySpeedOptions}
            />
          </div>
          <div>
            <Label>{t('form:input-label-lang-direction')}</Label>
            <SelectInput
              name="langDirection"
              control={control}
              getOptionLabel={(option: { value: string }) => option?.value}
              getOptionValue={(option: { value: string }) => option?.value}
              options={[{ value: 'LTR' }, { value: 'RTL' }]}
            />
          </div>
          <Input
            label={`${t('form:input-label-slides-per-view')}`}
            type="number"
            min={1}
            max={fields?.length ?? 1}
            {...register('slidesPerView')}
            variant="outline"
            className="mt-5"
          />
          <div className="mt-5">
            <Label>{t('form:input-label-direction')}</Label>
            <Radio
              {...register('direction')}
              label={t('form:input-label-vertical')}
              id="vertical"
              value="vertical"
              className="mb-2"
            />
            <Radio
              {...register('direction')}
              id="horizontal"
              value="horizontal"
              label={t('form:input-label-horizontal')}
            />
          </div>
          <div className="mt-4">
            <Label>Infinite loop</Label>
            <SwitchInput
              name="loop"
              label={loop ? 'On' : 'Off'}
              control={control}
              labelClassName="font-normal"
            />
          </div>
          <div className="mt-4">
            <Label>Draggable</Label>
            <SwitchInput
              name="draggable"
              label={draggable ? 'On' : 'Off'}
              control={control}
              labelClassName="font-normal"
            />
          </div>
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-content')}
          details={`${
            data
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:hero-slider-style-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div>
            {fields.map((slide, index) => (
              <div
                className="mb-5 border-b border-dashed border-gray-300 last:border-0 md:py-8"
                key={index}
              >
                <div className="mb-3 flex justify-center bg-gray-100 py-1">
                  <span className="text-lg font-semibold text-gray-600">{`Slide ${
                    index + 1
                  }`}</span>
                </div>
                <div className="flex flex-col justify-between">
                  <Label>{t('form:input-label-title')}</Label>
                  <Editor
                    name={`items.${index}.content`}
                    value={slide.content}
                    onChange={(value) =>
                      setValue(`items.${index}.content`, value)
                    }
                    className="mb-5  sm:col-span-2"
                    defaultValue=""
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => remove(index)}
                      type="button"
                      className="rounded-sm border border-red-400 px-2 py-1 text-sm text-red-500 transition-colors
                                 duration-200 hover:bg-red-400 hover:text-white focus:outline-none sm:col-span-1 sm:mt-4"
                    >
                      {t('form:button-label-remove')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={() =>
              append({
                content: '',
                position: 0
              })
            }
            className="w-full sm:w-auto"
          >
            {t('form:button-label-add-slide')}
          </Button>
        </Card>
      </div>
    </form>
  );
};

export default memo(PromoBannerForm);
