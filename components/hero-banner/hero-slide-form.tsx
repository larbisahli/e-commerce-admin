/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { LanguageDefaultDescInfo } from '@components/common/commonComponents';
import FormActions from '@components/common/FormActions';
import ImageModal from '@components/image-modal';
import ColorPicker from '@components/ui/color-picker/color-picker';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio';
import TextArea from '@components/ui/text-area';
import { CREATE_HERO_SLIDE, UPDATE_HERO_SLIDE } from '@graphql/hero-banner';
import {
  useErrorLogger,
  useGetUser,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/index';
import type { HeroBannerType, ImageType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { translationFallback } from '@utils/utils';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
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
};

export default function CreateOrUpdateSlideForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const { selectedLanguage } = useSettings();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: !isEmpty(initialValues)
      ? cloneDeep({
          ...initialValues,
          align: translationFallback(initialValues, 'align', 'left'),
          status: (initialValues as HeroBannerType)?.published
            ? 'publish'
            : 'draft'
        })
      : (defaultValues as HeroBannerType)
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const styles = watch('styles');
  const thumbnail = watch('thumbnail') as ImageType[];
  const btnLabel = watch('btnLabel');
  const title = watch('title');
  const description = watch('description');
  const align = watch('align');

  const [createHeroSlider, { loading: creating, reset: resetCreateMutation }] =
    useMutation(CREATE_HERO_SLIDE, {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { createHeroSlide: HeroBannerType }) => {
        const { id } = data.createHeroSlide;
        if (id) {
          notify(t('common:successfully-created'), 'success');
          router.push(`${ROUTES.HERO_BANNER}/edit/${id}`);
        }
      }
    });
  const [updateHeroSlider, { loading: updating, reset: resetUpdateMutation }] =
    useMutation(UPDATE_HERO_SLIDE, {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateCategory: HeroBannerType }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success');
        }
      }
    });

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    if (isEmpty(values.thumbnail)) {
      notify('form:category-image-required', 'warning');
      return;
    }

    const variables = {
      title: values.title,
      url: values.url,
      thumbnail: [
        {
          id: values.thumbnail[0]?.id
        }
      ],
      description: values.description,
      btnLabel: values.btnLabel,
      position: Number(values.position),
      published: values.status === 'publish',
      language: selectedLanguage,
      align: values.align,
      styles: {
        textColor: values.styles.textColor,
        btnBgc: values.styles.btnBgc,
        btnTextColor: values.styles.btnTextColor
      }
    };

    setUnsavedChanges(false);
    if (isEmpty(initialValues)) {
      createHeroSlider({ variables }).catch((err) => {
        setError(err);
        resetCreateMutation();
      });
    } else {
      const { id = null } = initialValues as HeroBannerType;
      updateHeroSlider({
        variables: { id, ...variables }
      }).catch((err) => {
        setError(err);
        resetUpdateMutation();
      });
    }
  };

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        backLink={ROUTES.HERO_BANNER}
        forceSystemLang={isEmpty(initialValues)}
        title={
          isEmpty(initialValues)
            ? t('form:form-title-new-banner')
            : t('form:form-title-edit-banner')
        }
        loading={creating || updating}
        disabled={creating || updating}
      />
      <LanguageDefaultDescInfo
        label="New hero banner"
        isVisible={isEmpty(initialValues)}
      />
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:hero-slider-image-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
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
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
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
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
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
