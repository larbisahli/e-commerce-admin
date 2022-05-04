/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Button from '@components/ui/button';
import ColorPicker from '@components/ui/color-picker/color-picker';
import Description from '@components/ui/description';
import FileInput from '@components/ui/file-input';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio';
import TextArea from '@components/ui/text-area';
import { CREATE_HERO_SLIDE, UPDATE_HERO_SLIDE } from '@graphql/hero-carousel';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import { notify } from '@lib/index';
import { Nullable } from '@ts-types/custom.types';
import { HeroCarouselType, IMGType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

import HeroBannerCard from './hero-banner-card';

type FormValues = HeroCarouselType;

const defaultValues = {
  title: '',
  destination_url: null,
  thumbnail: null,
  description: null,
  btn_label: null,
  display_order: 0,
  status: 'draft',
  styles: {
    text_color: '#ffffff',
    btn_bgc: '#dcdbdb',
    btn_text_color: '#222121'
  }
};

type IProps = {
  initialValues?: Nullable<HeroCarouselType>;
};

export default function CreateOrUpdateSlideForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [unsavedChanges, setUnsavedChanges] = useState<string[]>([]);

  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues: initialValues
      ? initialValues
      : (defaultValues as HeroCarouselType)
  });

  const styles = watch('styles');
  const thumbnail = watch('thumbnail') as IMGType;
  const btn_label = watch('btn_label');
  const title = watch('title');
  const description = watch('description');

  const [
    createHeroSlider,
    { loading: creating, error: createHeroSliderError }
  ] = useMutation(CREATE_HERO_SLIDE, {
    onCompleted: (data: { createHeroSlide: HeroCarouselType }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-created'), 'success');
        reset();
        setUnsavedChanges([]);
        // router.push(ROUTES.HERO_CAROUSEL);
      }
    }
  });
  const [
    updateHeroSlider,
    { loading: updating, error: updateHeroSliderError }
  ] = useMutation(UPDATE_HERO_SLIDE, {
    onCompleted: (data: { updateCategory: HeroCarouselType }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        setUnsavedChanges([]);
        // router.push(ROUTES.HERO_CAROUSEL);
      }
    }
  });

  useErrorLogger(createHeroSliderError);
  useErrorLogger(updateHeroSliderError);

  const onSubmit = async (values: FormValues) => {
    if (isEmpty(values.thumbnail)) {
      notify('form:category-image-required', 'warning');
      return;
    }

    const variables = {
      title: values.title,
      destination_url: values.destination_url,
      thumbnail: {
        image: values.thumbnail?.image,
        placeholder: values.thumbnail?.placeholder
      },
      description: values.description,
      btn_label: values.btn_label,
      display_order: Number(values.display_order),
      published: values.status === 'publish',
      styles: values.styles
    };

    if (isEmpty(initialValues)) {
      createHeroSlider({ variables });
    } else {
      updateHeroSlider({ variables: { id: initialValues?.id, ...variables } });
    }
  };

  console.log('thumbnail :>> ', { thumbnail });

  useWarnIfUnsavedChanges(!isEmpty(unsavedChanges), () => {
    return confirm(t('common:UNSAVED_IMAGE'));
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:hero-slider-image-helper-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput
            name="thumbnail"
            control={control}
            multiple={false}
            setUnsavedChanges={setUnsavedChanges}
          />
          {!!thumbnail?.image && (
            <div>
              <div className="my-2 border-b border-dashed border-border-base"></div>
              <HeroBannerCard
                thumbnail={thumbnail}
                btn_label={btn_label}
                title={title}
                description={description}
                styles={styles}
              />
            </div>
          )}
        </Card>
      </div>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:hero-slider-description-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-title')}
            {...register('title')}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('form:input-label-description')}
            {...register('description')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-destination-url')}
            {...register('destination_url')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-button-label')}
            {...register('btn_label')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={`${t('form:input-label-display-order')}`}
            type="number"
            min={0}
            {...register('display_order')}
            error={t(errors.display_order?.message!)}
            variant="outline"
            className="mb-5"
          />
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
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-slider-styles')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:hero-slider-style-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ColorPicker
            label={t('form:input-text-color')}
            {...register(`styles.text_color`)}
            className="mt-5"
          >
            <DisplayColorCode color={styles?.text_color} />
          </ColorPicker>

          <ColorPicker
            label={t('form:input-button-text-color')}
            {...register(`styles.btn_text_color`)}
            className="mt-5"
          >
            <DisplayColorCode color={styles?.btn_text_color} />
          </ColorPicker>

          <ColorPicker
            label={t('form:input-button-background-color')}
            {...register(`styles.btn_bgc`)}
            className="mt-5"
          >
            <DisplayColorCode color={styles?.btn_bgc} />
          </ColorPicker>
        </Card>
      </div>
      <div className="mb-4 text-end">
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
          {initialValues
            ? t('form:button-label-update-slider')
            : t('form:button-label-add-slider')}
        </Button>
      </div>
    </form>
  );
}

const DisplayColorCode = ({ color }: { color: string }) => {
  return (
    <>
      {color !== null && (
        <span className="ms-3 px-2 py-1 text-sm text-heading bg-gray-100 border border-border-200 rounded">
          {color}
        </span>
      )}
    </>
  );
};
