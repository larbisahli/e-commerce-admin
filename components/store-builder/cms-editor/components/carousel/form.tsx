import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Trash from '@components/icons/trash';
import ImageModal from '@components/image-modal';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import SelectInput from '@components/ui/select-input';
import SwitchInput from '@components/ui/switch-input';
import TextArea from '@components/ui/text-area';
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
import { useFieldArray, useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';
import ContentAlignment from '../common/ContentAlignment';
import { animationSpeedOptions, delaySpeedOptions } from '../common/data';

type FormValues = {
  contentAlignment: string;
  slides: {
    thumbnail: ImageType[];
    header: string;
    description: string;
    displayContent: boolean;
    buttonLink: string;
    buttonLabel: string;
    position: number;
  }[];
  sliderConfiguration: {
    animationSpeed: { value: number; name: string };
    delaySpeed: { value: number; name: string };
    langDirection: { value: 'LTR' | 'RTL' };
    loop?: boolean;
    draggable?: boolean;
  };
};

const defaultValues = {};

type IProps = {
  initialValues?: StoreLayoutComponentType;
};

const CarouselForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const data = initialValues.data;

  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();

  const {
    userInfo: { csrfToken }
  } = useGetClient();

  const { updateBuilderInfo } = useUI();
  const dispatch = useAppDispatch();

  const { register, control, setValue, watch, handleSubmit } =
    useForm<FormValues>({
      defaultValues: !isEmpty(data)
        ? cloneDeep({ ...data })
        : (defaultValues as FormValues)
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'slides',
    keyName: 'key'
  });

  const { closeModal } = useModalAction();

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
        contentAlignment: values.contentAlignment,
        slides: values.slides,
        sliderConfiguration: values.sliderConfiguration
      }
    };

    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const loop = watch('sliderConfiguration.loop');
  const draggable = watch('sliderConfiguration.draggable');
  const contentAlignment = watch('contentAlignment');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        btnLabel={t('form:button-label-save-content')}
        title="Component Content"
        disabled={updating}
        loading={updating}
      />
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={'Slider Configuration'}
          details={`Edit your slider configuration here`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <Label>{t('form:input-label-animation-speed')}</Label>
            <SelectInput
              name="sliderConfiguration.animationSpeed"
              control={control}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.value}
              options={animationSpeedOptions}
            />
          </div>
          <div className="mb-5">
            <Label>{t('form:input-label-delay-speed')}</Label>
            <SelectInput
              name="sliderConfiguration.delaySpeed"
              control={control}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.value}
              options={delaySpeedOptions}
            />
          </div>
          <div>
            <Label>{t('form:input-label-lang-direction')}</Label>
            <SelectInput
              name="sliderConfiguration.langDirection"
              control={control}
              getOptionLabel={(option: { value: string }) => option?.value}
              getOptionValue={(option: { value: string }) => option?.value}
              options={[{ value: 'LTR' }, { value: 'RTL' }]}
            />
          </div>
          <div className="mt-4">
            <Label>Infinite loop</Label>
            <SwitchInput
              name="sliderConfiguration.loop"
              label={loop ? 'On' : 'Off'}
              control={control}
              labelClassName="font-normal"
            />
          </div>
          <div className="mt-4">
            <Label>Draggable</Label>
            <SwitchInput
              name="sliderConfiguration.draggable"
              label={draggable ? 'On' : 'Off'}
              control={control}
              labelClassName="font-normal"
            />
          </div>
          <ContentAlignment
            contentAlignment={contentAlignment}
            setValue={setValue}
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
          <div className="mb-5">
            {fields.map((item, index) => {
              const thumbnail = watch(`slides.${index}.thumbnail`);
              const displayContent = watch(`slides.${index}.displayContent`);
              return (
                <Accordion
                  key={index}
                  Title={() => (
                    <h3 className="font-semibold text-blue-500">{`Item #${
                      index + 1
                    }`}</h3>
                  )}
                >
                  <div className="border-b border-dashed border-border-200 py-5 last:border-0 md:py-8">
                    <div className="flex flex-col justify-between">
                      <div className="flex-1">
                        <ImageModal
                          label="form:label-add-image"
                          isRequiredLabel
                          onSelect={(photo) =>
                            setValue(`slides.${index}.thumbnail`, photo)
                          }
                          selected={thumbnail}
                          isThumbnail
                        />
                        <div className="my-3">
                          <Checkbox
                            {...register(
                              `slides.${index}.displayContent` as const
                            )}
                            label={'Display content'}
                          />
                        </div>
                        <Input
                          label={t('form:input-label-title')}
                          {...register(`slides.${index}.header`)}
                          variant="outline"
                          className="mb-5"
                          placeholder="Enter a title"
                          disabled={!displayContent}
                        />
                        <TextArea
                          label={t('form:input-label-description')}
                          {...register(`slides.${index}.description`)}
                          variant="outline"
                          placeholder="Enter a description"
                          className="mb-5"
                        />
                        <Input
                          label={t('form:input-label-button-label')}
                          {...register(`slides.${index}.buttonLabel`)}
                          variant="outline"
                          className="mb-5"
                          placeholder="Enter a button label"
                          disabled={!displayContent}
                        />
                        <Input
                          label={'Links to (URL)'}
                          {...register(`slides.${index}.buttonLink`)}
                          variant="outline"
                          className="mb-5"
                          placeholder={'/collections/all'}
                          disabled={!displayContent}
                        />
                        <Input
                          label={`${t('form:input-label-display-order')}`}
                          type="number"
                          min={0}
                          {...register(`slides.${index}.position`)}
                          variant="outline"
                          className="mb-5"
                          disabled={!displayContent}
                        />
                      </div>
                      <div className="w-full">
                        <button
                          onClick={() => remove(index)}
                          type="button"
                          className="flex h-8 w-full items-center justify-center rounded-sm bg-red-400 text-sm text-white transition-colors
                    duration-200 focus:outline-none sm:col-span-1 sm:mt-4"
                        >
                          <Trash width={15} height={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Accordion>
              );
            })}
          </div>
          <Button
            type="button"
            onClick={() =>
              append({
                header: '',
                description: '',
                thumbnail: null,
                buttonLabel: null,
                buttonLink: null,
                displayContent: true,
                position: 0
              })
            }
            className="w-full sm:w-auto"
          >
            New Slide
          </Button>
        </Card>
      </div>
    </form>
  );
};

export default memo(CarouselForm);
