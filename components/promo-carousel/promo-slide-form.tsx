/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import ColorPicker from '@components/ui/color-picker/color-picker';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio';
import SelectInput from '@components/ui/select-input';
import { UPDATE_PROMO_SLIDE } from '@graphql/promo-slide';
import {
  useErrorLogger,
  useGetUser,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { notify } from '@lib/index';
import type { PromoCarouselType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const animationSpeedOptions = [
  { value: '10s', name: '10 seconds' },
  { value: '20s', name: '20 seconds' },
  { value: '30s', name: '30 seconds' },
  { value: '40s', name: '40 seconds' },
  { value: '50s', name: '50 seconds' },
  { value: '60s', name: '60 seconds' },
  { value: '70s', name: '70 seconds' },
  { value: '80s', name: '80 seconds' },
  { value: '90s', name: '90 seconds' },
  { value: '100s', name: '100 seconds' }
];

type FormValues = PromoCarouselType;

const defaultValues = {
  animationSpeed: { value: '10s', name: '10 seconds' },
  backgroundColor: '#da7c25',
  direction: 'LTR',
  status: 'draft',
  sliders: []
};

type IProps = {
  initialValues?: PromoCarouselType | any;
};

export default function CreateOrUpdatePromoSlideForm({
  initialValues
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormValues>({
    defaultValues: !isEmpty(initialValues)
      ? cloneDeep({
          ...initialValues,
          status: (initialValues as PromoCarouselType)?.published
            ? 'publish'
            : 'draft'
        })
      : (defaultValues as PromoCarouselType)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sliders',
    keyName: 'key'
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updatePromoSlider, { loading: creating }] = useMutation(
    UPDATE_PROMO_SLIDE,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updatePromoSlide: PromoCarouselType }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-created'), 'success');
          reset();
          router.push(ROUTES.HERO_CAROUSEL);
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    console.log({ values });

    setUnsavedChanges(false);
    // if (isEmpty(initialValues)) {
    //   createHeroSlider({ variables }).catch((err) => {
    //     setError(err);
    //     resetCreateMutation();
    //   });
    // } else {
    //   const { id = null } = initialValues as HeroCarouselType;
    //   updateHeroSlider({
    //     variables: { id, ...variables }
    //   }).catch((err) => {
    //     setError(err);
    //     resetUpdateMutation();
    //   });
    // }
  };

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  const backgroundColor = watch('backgroundColor');
  const direction = watch('direction');
  const animationSpeed = watch('animationSpeed');
  const sliders = watch('sliders');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <Label>{t('form:input-label-demo')}</Label>
        <PromoSlider
          {...{
            animationSpeed: animationSpeed.value,
            direction,
            sliders,
            backgroundColor
          }}
        />
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
          <div>
            <Label>{t('form:input-label-animation-speed')}</Label>
            <SelectInput
              name="animationSpeed"
              control={control}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.value}
              options={animationSpeedOptions}
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
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-sliders')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:hero-slider-style-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div>
            {fields.map((slide, index) => (
              <div
                className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8"
                key={index}
              >
                <div className="flex justify-between">
                  <Input
                    className="sm:col-span-2"
                    isRequiredLabel
                    label={t('form:input-label-title')}
                    variant="outline"
                    {...register(`sliders.${index}.text` as const)}
                    defaultValue={slide.text}
                  />
                  <ColorPicker
                    control={control}
                    color={slide.textColor}
                    {...register(`sliders.${index}.textColor` as const)}
                  ></ColorPicker>
                  <button
                    onClick={() => remove(index)}
                    type="button"
                    className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
                  >
                    {t('form:button-label-remove')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={() => append({ text: '', textColor: '#000', position: 0 })}
            className="w-full sm:w-auto"
          >
            {t('form:button-label-add-value')}
          </Button>
        </Card>
      </div>
      <div className="mb-4 flex items-center justify-end">
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

        <Button loading={creating} disabled={creating}>
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div>{t('form:button-label-save')}</div>
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

const PromoSlider = ({
  animationSpeed,
  direction,
  sliders,
  backgroundColor
}) => {
  console.log({ animationSpeed, direction, sliders, backgroundColor });

  const [width, setWidth] = useState(null);

  console.log({ width });

  useEffect(() => {
    var slideWidth = document.getElementById('promoSlide');

    if (!width) {
      setWidth(slideWidth.clientWidth);
    }

    window.addEventListener('resize', () => {
      setWidth(slideWidth.clientWidth);
    });

    return () => {
      window.removeEventListener('resize', () => {
        setWidth(slideWidth.clientWidth);
      });
    };
  }, []);

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      id="promoSlide"
      className="h-[40px] overflow-hidden w-full relative text-white text-center font-medium"
    >
      <div
        style={{ animationDuration: animationSpeed }}
        className={cn(
          'flex absolute',
          {
            'animate-marquee2-infinite':
              direction === 'LTR' && sliders.length > 1
          },
          {
            'animate-marquee-infinite':
              direction === 'RTL' && sliders.length > 1
          }
        )}
      >
        {sliders?.map(({ text, textColor }, idx) => (
          <div
            key={idx}
            style={{ color: textColor, width: `${width}px` }}
            className="flex justify-center items-center h-[40px]"
          >
            <span className="h-fit text-xl">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
