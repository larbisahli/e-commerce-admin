import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import FormActions from '@components/common/FormActions';
import Button from '@components/ui/button';
import ColorPicker from '@components/ui/color-picker/color-picker';
import Description from '@components/ui/description';
import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import Radio from '@components/ui/radio';
import SelectInput from '@components/ui/select-input';
import { UPDATE_PROMO_SLIDE } from '@graphql/promo-slide';
import {
  useErrorLogger,
  useGetUser,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/index';
import type { PromoBannerType } from '@ts-types/generated';
import ReactHtmlParser from 'html-react-parser';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const Slider = dynamic(() => import('react-slick'), {
  loading: () => <Loader height="40px" />,
  ssr: false
});

const Editor = dynamic(() => import('@components/ui/editor'), {
  loading: () => <Loader height="150px" text="Editor..." />,
  ssr: false
});

const animationSpeedOptions = [
  { value: 1000, name: '1 second' },
  { value: 2000, name: '2 seconds' },
  { value: 3000, name: '3 seconds' },
  { value: 4000, name: '4 seconds' },
  { value: 5000, name: '5 seconds' },
  { value: 6000, name: '6 seconds' },
  { value: 7000, name: '7 seconds' },
  { value: 8000, name: '8 seconds' },
  { value: 9000, name: '9 seconds' },
  { value: 10000, name: '10 seconds' },
  { value: 15000, name: '15 seconds' },
  { value: 20000, name: '20 seconds' }
];

const delaySpeedOptions = [
  { value: 3000, name: '3 seconds' },
  { value: 4000, name: '4 seconds' },
  { value: 5000, name: '5 seconds' },
  { value: 6000, name: '6 seconds' },
  { value: 7000, name: '7 seconds' },
  { value: 8000, name: '8 seconds' },
  { value: 9000, name: '9 seconds' },
  { value: 10000, name: '10 seconds' }
];

type FormValues = PromoBannerType;

const defaultValues = {
  animationSpeed: { value: 500, name: '500 Milliseconds' },
  delaySpeed: { value: 3000, name: '3 seconds' },
  backgroundColor: '#da7c25',
  direction: 'LTR',
  status: 'draft',
  sliders: []
};

type IProps = {
  initialValues?: PromoBannerType | any;
};

export default function CreateOrUpdatePromoSlideForm({
  initialValues
}: IProps) {
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const { selectedLanguage } = useSettings();

  const { watch, register, handleSubmit, control, setValue } =
    useForm<FormValues>({
      defaultValues: !isEmpty(initialValues)
        ? cloneDeep({
            ...initialValues,
            animationSpeed: animationSpeedOptions?.find(
              (e) => e.value === initialValues.animationSpeed
            ),
            delaySpeed: delaySpeedOptions?.find(
              (e) => e.value === initialValues.delaySpeed
            ),
            status: (initialValues as PromoBannerType)?.published
              ? 'publish'
              : 'draft'
          })
        : (defaultValues as PromoBannerType)
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sliders',
    keyName: 'key'
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updatePromoSlider, { loading: updating }] = useMutation(
    UPDATE_PROMO_SLIDE,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updatePromoSlide: PromoBannerType }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success');
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    const variables = {
      direction: values.direction,
      backgroundColor: values.backgroundColor,
      animationSpeed: values?.animationSpeed?.value,
      delaySpeed: values?.delaySpeed?.value,
      published: values.status === 'publish',
      language: selectedLanguage,
      sliders: values?.sliders?.map((slider, idx) => ({
        ...slider,
        position: idx
      }))
    };

    updatePromoSlider({
      variables: { id: initialValues.id, ...variables }
    }).catch((err) => {
      setError(err);
    });

    setUnsavedChanges(false);
  };

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  const backgroundColor = watch('backgroundColor');
  const direction = watch('direction');
  const animationSpeed = watch('animationSpeed');
  const delaySpeed = watch('delaySpeed');
  const sliders = watch('sliders');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        hideBackLink
        showCancel={false}
        title={
          isEmpty(initialValues)
            ? t('form:form-title-new-banner')
            : t('form:form-title-edit-banner')
        }
        loading={updating}
        disabled={updating}
      />
      <div className="">
        <Label>{t('form:input-label-demo')}</Label>
        <PromoSlider
          {...{
            delaySpeed: delaySpeed?.value,
            animationSpeed: animationSpeed?.value,
            direction,
            sliders,
            backgroundColor
          }}
        />
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
          <ColorPicker
            label={t('form:input-background-color')}
            {...register(`backgroundColor`)}
            className="mt-5"
          >
            <DisplayColorCode color={backgroundColor} />
          </ColorPicker>
          <div className="mt-5">
            <Label>{t('form:input-label-slide-direction')}</Label>
            <Radio
              {...register('direction')}
              label={t('form:input-label-rtl')}
              id="rtl"
              value="RTL"
              className="mb-2"
            />
            <Radio
              {...register('direction')}
              id="ltr"
              label={t('form:input-label-ltr')}
              value="LTR"
            />
          </div>
          <div className="mt-5">
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
          title={t('form:input-label-sliders')}
          details={`${
            initialValues
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
                    name={`sliders.${index}.content`}
                    value={slide.content}
                    onChange={(value) =>
                      setValue(`sliders.${index}.content`, value)
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
}

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

const settings = {
  dots: false,
  infinite: true,
  arrows: false,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1
};

const PromoSlider = ({
  animationSpeed = 500,
  direction,
  sliders,
  backgroundColor,
  delaySpeed = 5000
}) => {
  console.log({ animationSpeed, delaySpeed });
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className="mb-22 bg-blue-300"
    >
      <Slider
        {...settings}
        rtl={direction === 'RTL'}
        speed={animationSpeed}
        autoplaySpeed={delaySpeed}
      >
        {sliders?.map(({ content }, idx) => (
          <div
            key={idx}
            className="!flex h-[40px] w-full items-center justify-center"
          >
            <div className="w-fit">{ReactHtmlParser(content ?? '')}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
