/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Card from '@components/common/card';
import ImageModal from '@components/image-modal';
import ColorPicker from '@components/ui/color-picker/color-picker';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio';
import TextArea from '@components/ui/text-area';
import type { HeroBannerType, ImageType } from '@ts-types/generated';
import { translationFallback } from '@utils/utils';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';

import HeroBannerCard from './hero-banner-card';

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
  initialValues?: HeroBannerType | any;
  onSubmit: (e: FormValues) => void;
};

export default function CreateOrUpdateSlideForm({
  initialValues,
  onSubmit
}: IProps) {
  const { t } = useTranslation();
  const createMode = isEmpty(initialValues);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: !createMode
      ? cloneDeep({
          ...initialValues,
          align: translationFallback(initialValues, 'align', 'left'),
          status: (initialValues as HeroBannerType)?.published
            ? 'publish'
            : 'draft'
        })
      : (defaultValues as HeroBannerType)
  });

  const styles = watch('styles');
  const thumbnail = watch('thumbnail') as ImageType[];
  const btnLabel = watch('btnLabel');
  const title = watch('title');
  const description = watch('description');
  const align = watch('align');

  const ImageInformation = (
    <span>
      {t('form:hero-slider-image-helper-text')} &nbsp;
      <span className="font-bold">
        {'500x1400'} {t('common:pixel')}
      </span>
    </span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap border-b border-dashed border-border-base pb-8 first-line:my-5 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={ImageInformation}
          className="w-full px-0 pb-5 sm:w-1/4 sm:py-8 sm:pe-4 md:w-1/4 md:pe-5"
        />
        <Card className="w-full sm:w-3/4 md:w-3/4">
          <ImageModal
            onSelect={(photo) => setValue('thumbnail', photo)}
            selected={thumbnail}
            isThumbnail
          />
          <div className="w-full">
            {!isEmpty(thumbnail) && (
              <div className="relative">
                <div className="my-2 border-b border-dashed border-border-base"></div>
                <Label>{t('form:input-label-demo')}</Label>
                <HeroBannerCard
                  thumbnail={thumbnail}
                  btnLabel={btnLabel}
                  title={title}
                  description={description}
                  styles={styles}
                  align={align}
                />
              </div>
            )}
          </div>
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
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-slider-styles')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:hero-slider-style-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-1/4 sm:py-8 sm:pe-4 md:w-1/4 md:pe-5"
        />

        <Card className="w-full sm:w-3/4 md:w-3/4">
          <ColorPicker
            label={t('form:input-text-color')}
            {...register(`styles.textColor`)}
            className="mt-5"
          >
            <DisplayColorCode color={styles?.textColor} />
          </ColorPicker>

          <ColorPicker
            label={t('form:input-button-text-color')}
            {...register(`styles.btnTextColor`)}
            className="mt-5"
          >
            <DisplayColorCode color={styles?.btnTextColor} />
          </ColorPicker>

          <ColorPicker
            label={t('form:input-button-background-color')}
            {...register(`styles.btnBgc`)}
            className="mt-5"
          >
            <DisplayColorCode color={styles?.btnBgc} />
          </ColorPicker>
        </Card>
      </div>
    </form>
  );
}

const DisplayColorCode = ({ color }: { color: string }) => {
  return (
    <>
      {color !== null && (
        <span className="rounded border border-border-200 bg-gray-100 px-2 py-1 text-sm text-heading ms-3">
          {color}
        </span>
      )}
    </>
  );
};
