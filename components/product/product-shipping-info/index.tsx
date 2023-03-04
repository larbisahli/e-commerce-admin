import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { Nullable } from '@ts-types/custom.types';
import { Product } from '@ts-types/generated';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, memo, useState } from 'react';

import { Actions, useFormReducer } from '../context/form.context';

type Props = {
  initialValues: Nullable<Product>;
  state: {
    productShippingInfo: Product['productShippingInfo'];
    isUpdateMode: boolean;
  };
};

const weightUnits = [{ unit: 'kg' }, { unit: 'g' }];

const volumeUnits = [{ unit: 'l' }, { unit: 'ml' }];

const dimensionUnits = [{ unit: 'l' }, { unit: 'ml' }];

function ProductShippingInfoForm({ state, initialValues }: Props) {
  const { t } = useTranslation();

  const {
    productShippingInfo: {
      weight,
      weightUnit,
      volume,
      volumeUnit,
      dimensionWidth,
      dimensionHeight,
      dimensionDepth,
      dimensionUnit
    },
    isUpdateMode
  } = state;

  const dispatch = useFormReducer();

  const [isUpdated, setIsUpdated] = useState(false);

  const checkForUpdateHandler = () => {
    if (!isUpdateMode) return;

    const productShippingInfo = initialValues.productShippingInfo ?? {};
    const initialProductContent = {
      weight: productShippingInfo.weight,
      weightUnit: productShippingInfo.weightUnit,
      volume: productShippingInfo.volume,
      volumeUnit: productShippingInfo.volumeUnit,
      dimensionWidth: productShippingInfo.dimensionWidth,
      dimensionHeight: productShippingInfo.dimensionHeight,
      dimensionDepth: productShippingInfo.dimensionDepth,
      dimensionUnit: productShippingInfo.dimensionUnit
    };
    const currentProductContent = {
      weight,
      weightUnit,
      volume,
      volumeUnit,
      dimensionWidth,
      dimensionHeight,
      dimensionDepth,
      dimensionUnit
    };

    setIsUpdated(!isEqual(initialProductContent, currentProductContent));
  };

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const inputValue = Number(value) < 0 ? 0 : Number(value);

    dispatch({
      type: Actions.PRODUCT_SHIPPING_INFO,
      payload: {
        field: name,
        value: inputValue
      }
    });
  };

  const onSelectChange = (value, field) => {
    dispatch({
      type: Actions.PRODUCT_SHIPPING_INFO,
      payload: {
        field,
        value
      }
    });
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
          {/* Width */}
          <Label>{t('form:input-label-weight')}</Label>
          <div className="flex items-center mb-5">
            <Input
              name="weight"
              value={weight}
              onChange={handleChange}
              onBlur={checkForUpdateHandler}
              type="number"
              variant="outline"
              className="mr-2"
            />
            <div className="w-36">
              <Select
                options={weightUnits}
                value={weightUnit}
                name="weightUnit"
                getOptionLabel={(option: any) => option.unit}
                getOptionValue={(option: any) =>
                  option.unit?.charAt(0)?.toUpperCase() + option.unit?.slice(1)
                }
                onBlur={checkForUpdateHandler}
                onChange={(value) => onSelectChange(value, 'weightUnit')}
                className="w-full"
              />
            </div>
          </div>
          {/* <ValidationError
            message={t(errors.productShippingInfo?.weight?.message!)}
          /> */}
          {/* Volume */}
          <Label>{t('form:input-label-volume')}</Label>
          <div className="flex items-center mb-5">
            <Input
              name="volume"
              value={volume}
              onChange={handleChange}
              onBlur={checkForUpdateHandler}
              type="number"
              variant="outline"
              className="mr-2"
            />
            <div className="w-36">
              <Select
                options={volumeUnits}
                value={volumeUnit}
                name="volumeUnit"
                getOptionLabel={(option: any) => option.unit}
                getOptionValue={(option: any) =>
                  option.unit?.charAt(0)?.toUpperCase() + option.unit?.slice(1)
                }
                onBlur={checkForUpdateHandler}
                onChange={(value) => onSelectChange(value, 'volumeUnit')}
                className="w-full"
              />
            </div>
          </div>
          {/* <ValidationError
            message={t(errors.productShippingInfo?.volume?.message!)}
          /> */}
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
                name="dimensionWidth"
                value={dimensionWidth}
                onChange={handleChange}
                onBlur={checkForUpdateHandler}
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
                name="dimensionHeight"
                value={dimensionHeight}
                onChange={handleChange}
                onBlur={checkForUpdateHandler}
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
                name="dimensionDepth"
                value={dimensionDepth}
                onChange={handleChange}
                onBlur={checkForUpdateHandler}
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
              <Select
                options={dimensionUnits}
                value={dimensionUnit}
                name="dimensionUnit"
                getOptionLabel={(option: any) => option.unit}
                getOptionValue={(option: any) =>
                  option.unit?.charAt(0)?.toUpperCase() + option.unit?.slice(1)
                }
                onBlur={checkForUpdateHandler}
                onChange={(value) => onSelectChange(value, 'dimensionUnit')}
                className="w-full"
              />
            </div>
            {/* <ValidationError
              message={
                t(errors.productShippingInfo?.dimensionDepth?.message!) ||
                t(errors.productShippingInfo?.dimensionHeight?.message!) ||
                t(errors.productShippingInfo?.dimensionWidth?.message!)
              }
            /> */}
          </div>
          {renderSaveButton()}
        </Card>
      </div>
    </Accordion>
  );
}

export default memo(ProductShippingInfoForm);
