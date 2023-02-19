import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { Nullable } from '@ts-types/custom.types';
import { Product, ProductShippingInfo } from '@ts-types/generated';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'next-i18next';
import React, { memo, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type Props = {
  initialValues: Nullable<Product>;
};

const weightUnits = [{ unit: 'kg' }, { unit: 'g' }];

const volumeUnits = [{ unit: 'l' }, { unit: 'ml' }];

const dimensionUnits = [{ unit: 'l' }, { unit: 'ml' }];

function ProductShippingInfoForm({ initialValues }: Props) {
  const { t } = useTranslation();

  const {
    control,
    register,
    watch,
    formState: { errors }
  } = useFormContext();

  const productShippingInfo = useWatch({
    control,
    name: 'productShippingInfo'
  }) as ProductShippingInfo;

  const {
    id,
    weight,
    weightUnit,
    volume,
    volumeUnit,
    dimensionWidth,
    dimensionHeight,
    dimensionDepth,
    dimensionUnit
  } = productShippingInfo;

  const currentProductShippingInfo = useMemo(
    () => ({
      id,
      weight: Number(weight),
      weightUnit: {
        unit: weightUnit?.unit
      },
      volume: Number(volume),
      volumeUnit: {
        unit: volumeUnit?.unit
      },
      dimensionWidth: Number(dimensionWidth),
      dimensionHeight: Number(dimensionHeight),
      dimensionDepth: Number(dimensionDepth),
      dimensionUnit: {
        unit: dimensionUnit?.unit
      }
    }),
    [
      dimensionDepth,
      dimensionHeight,
      dimensionUnit?.unit,
      dimensionWidth,
      id,
      volume,
      volumeUnit?.unit,
      weight,
      weightUnit?.unit
    ]
  );

  const initialProductShippingInfo = useMemo(
    () => ({
      id: initialValues?.productShippingInfo?.id,
      weight: initialValues?.productShippingInfo?.weight,
      weightUnit: {
        unit: initialValues?.productShippingInfo?.weightUnit?.unit
      },
      volume: initialValues?.productShippingInfo?.volume,
      volumeUnit: {
        unit: initialValues?.productShippingInfo?.volumeUnit?.unit
      },
      dimensionWidth: initialValues?.productShippingInfo?.dimensionWidth,
      dimensionHeight: initialValues?.productShippingInfo?.dimensionHeight,
      dimensionDepth: initialValues?.productShippingInfo?.dimensionDepth,
      dimensionUnit: {
        unit: initialValues?.productShippingInfo?.dimensionUnit?.unit
      }
    }),
    [initialValues?.productShippingInfo]
  );

  const isUpdated = useMemo(
    () => !isEqual(initialProductShippingInfo, currentProductShippingInfo),
    [initialProductShippingInfo, currentProductShippingInfo]
  );

  const renderSaveButton = () => {
    if (isUpdated) {
      return (
        <div className="mt-12 flex justify-end border-t pt-4">
          <Button
          // loading={updating || creating}
          // disabled={updating || creating}
          >
            <div className="mr-1">
              <SaveIcon width="1.3rem" height="1.3rem" />
            </div>
            <div>{t('form:button-label-save')}</div>
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <Accordion
      isUpdated={isUpdated}
      Title={() => t('form:form-title-product-shipping-info')}
    >
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:form-description-simple-product-info')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <input {...register(`productShippingInfo.id`)} type="hidden" />
          {/* Width */}
          <Label>{t('form:input-label-weight')}</Label>
          <div className="flex items-center mb-5">
            <Input
              {...register('productShippingInfo.weight')}
              type="number"
              variant="outline"
              className="mr-2"
            />
            <div className="w-36">
              <SelectInput
                name="productShippingInfo.weightUnit"
                control={control}
                getOptionLabel={(option: any) => option.unit}
                getOptionValue={(option: any) => option.unit}
                options={weightUnits}
                className="w-full"
              />
            </div>
          </div>
          <ValidationError
            message={t(errors.productShippingInfo?.weight?.message!)}
          />
          {/* Volume */}
          <Label>{t('form:input-label-volume')}</Label>
          <div className="flex items-center mb-5">
            <Input
              {...register('productShippingInfo.volume')}
              type="number"
              variant="outline"
              className="mr-2"
            />
            <div className="w-36">
              <SelectInput
                name={'productShippingInfo.volumeUnit'}
                control={control}
                className="w-full"
                getOptionLabel={(option: any) => option.unit}
                getOptionValue={(option: any) => option.unit}
                options={volumeUnits}
              />
            </div>
          </div>
          <ValidationError
            message={t(errors.productShippingInfo?.volume?.message!)}
          />
          {/* Dimensions */}
          <Label className="mb-3">{t('form:input-label-dimensions')}</Label>
          <div className="flex items-center mb-5 flex-wrap">
            <div>
              <Label
                style={{
                  color: '#929191',
                  fontSize: '0.8rem',
                  marginTop: '0.75rem'
                }}
              >
                {t('form:input-label-dimensions-width')}
              </Label>
              <Input
                {...register('productShippingInfo.dimensionWidth')}
                type="number"
                variant="outline"
                className="w-24 mr-2"
              />
            </div>
            <div>
              <Label
                style={{
                  color: '#929191',
                  fontSize: '0.8rem',
                  marginTop: '0.75rem'
                }}
              >
                {t('form:input-label-dimensions-height')}
              </Label>
              <Input
                {...register('productShippingInfo.dimensionHeight')}
                type="number"
                variant="outline"
                className="w-24 mr-2"
              />
            </div>
            <div>
              <Label
                style={{
                  color: '#929191',
                  fontSize: '0.8rem',
                  marginTop: '0.75rem'
                }}
              >
                {t('form:input-label-dimensions-depth')}
              </Label>
              <Input
                {...register('productShippingInfo.dimensionDepth')}
                type="number"
                variant="outline"
                className="w-24 mr-2"
              />
            </div>
            <div className="w-36">
              <Label
                style={{
                  color: '#929191',
                  fontSize: '0.8rem',
                  marginTop: '0.75rem'
                }}
              >
                {t('form:input-label-dimensions-units')}
              </Label>
              <SelectInput
                name="productShippingInfo.dimensionUnit"
                control={control}
                className="w-full"
                getOptionLabel={(option: any) => option.unit}
                getOptionValue={(option: any) => option.unit}
                options={dimensionUnits}
              />
            </div>
            <ValidationError
              message={
                t(errors.productShippingInfo?.dimensionDepth?.message!) ||
                t(errors.productShippingInfo?.dimensionHeight?.message!) ||
                t(errors.productShippingInfo?.dimensionWidth?.message!)
              }
            />
          </div>
          {renderSaveButton()}
        </Card>
      </div>
    </Accordion>
  );
}

export default memo(ProductShippingInfoForm);
