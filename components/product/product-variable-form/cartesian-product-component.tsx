// import Checkbox from '@components/ui/checkbox';
import ImageModal from '@components/image-modal';
import Accordion from '@components/ui/accordion';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import Title from '@components/ui/title';
import { useSettings } from '@hooks/useSettings';
import type { ImageType, VariationOptionsType } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import React, { memo, useEffect, useMemo } from 'react';

import { Actions, useFormReducer } from '../context/form.context';
import { RenderTooltipMeasureAndPackaging } from '../ToolTips';

const weightUnits = [{ unit: 'kg' }, { unit: 'g' }];

const dimensionUnits = [{ unit: 'cm' }, { unit: 'mm' }];

interface CartesianProductProps {
  updateHandler: () => void;
  variationOption: VariationOptionsType;
  updatedVariationOptions: VariationOptionsType[];
  index: number;
}

const CartesianProductComponent = ({
  updateHandler,
  variationOption,
  updatedVariationOptions,
  index
}: CartesianProductProps) => {
  const { t } = useTranslation();

  const { systemCurrency } = useSettings();

  const {
    id,
    title,
    salePrice,
    comparePrice,
    buyingPrice,
    quantity,
    sku,
    thumbnail,
    weight,
    weightUnit,
    dimensionWidth,
    dimensionHeight,
    dimensionLength,
    dimensionUnit
  } = variationOption;

  const dispatch = useFormReducer();

  const options = useMemo(
    () => variationOption?.options,
    [variationOption?.options]
  );

  const HandleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target['checked'] : target.value;
    const name = target.name;

    dispatch({
      type: Actions.CHANGE_VARIATION_OPTION,
      payload: {
        value:
          target.type === 'number'
            ? Number(value) < 0
              ? 0
              : Number(value)
            : value,
        field: name,
        options
      }
    });
  };

  const handleSelectedImage = (photo: ImageType[]) => {
    dispatch({
      type: Actions.CHANGE_VARIATION_OPTION,
      payload: {
        value: photo,
        field: 'thumbnail',
        options
      }
    });
  };

  const isUpdated = useMemo(() => {
    return !isEmpty(updatedVariationOptions?.find((v) => v.id === id));
  }, [id, updatedVariationOptions]);

  useEffect(() => {
    if (!isEmpty(thumbnail)) {
      updateHandler();
    }
  }, [thumbnail, updateHandler]);

  const onSelectChange = (value, field) => {
    dispatch({
      type: Actions.CHANGE_VARIATION_OPTION,
      payload: {
        field,
        value,
        options
      }
    });
  };

  console.log('CartesianProductComponent :>>', index)

  return (
    <Accordion
      isUpdated={isUpdated}
      btnClassName="mt-1 bg-gray-100"
      Title={() => (
        <Title className="!text-lg">
          {t('form:form-title-variant')}:{' '}
          <span className="font-semibold text-blue-600">{title}</span>
        </Title>
      )}
    >
      <div
        key={`fieldAttributeValues-${index}`}
        className="mb-5 mt-5 border-b border-dashed border-border-200 p-5 last:mb-8 last:border-0 md:p-8 md:last:pb-0"
      >
        <div className="grid grid-cols-3 gap-3">
          <Input
            label={t('form:input-label-sale-price')}
            isRequiredLabel
            type="number"
            id={`salePrice-${index}`}
            name="salePrice"
            onChange={HandleInputChange}
            onBlur={updateHandler}
            min={0}
            renderLabel={<>{systemCurrency?.symbol}</>}
            value={salePrice}
            // error={t(errors.variation_options?.[index]?.sale_price?.message)}
            variant="outline"
            className="mb-2 ml-1"
          />
          <Input
            label={t('form:input-label-compare-price')}
            name="comparePrice"
            min={0}
            onChange={HandleInputChange}
            onBlur={updateHandler}
            value={comparePrice}
            type="number"
            renderLabel={<>{systemCurrency?.symbol}</>}
            // error={t(errors.variation_options?.[index]?.compare_price?.message)}
            variant="outline"
            className="mb-2 ml-1"
          />
          <Input
            label={t('form:input-label-buying-price')}
            type="number"
            name="buyingPrice"
            min={0}
            onChange={HandleInputChange}
            onBlur={updateHandler}
            value={buyingPrice}
            // error={t(errors.variation_options?.[index]?.buying_price?.message)}
            variant="outline"
            className="mb-2 ml-1"
          />
          <Input
            label={t('form:input-label-quantity')}
            isRequiredLabel
            type="number"
            name="quantity"
            min={0}
            onChange={HandleInputChange}
            onBlur={updateHandler}
            value={quantity}
            // error={t(errors.variation_options?.[index]?.quantity?.message)}
            variant="outline"
            className="mb-2 ml-1"
            note={'Zero means out of stock'}
          />
          <Input
            label={`${t('form:input-label-sku')}`}
            name="sku"
            onChange={HandleInputChange}
            onBlur={updateHandler}
            value={sku}
            // error={t(errors.variation_options?.[index]?.sku?.message)}
            variant="outline"
            className="mb-2 ml-1"
          />
        </div>
        {/* --------------------- */}
        <div className="mt-5">
          <Label
            tooltipId="measures-packaging"
            spaceBetween={false}
            renderTooltip={<RenderTooltipMeasureAndPackaging />}
          >
            {`${t('form:form-title-measures-packaging')} (${t(
              'form:form-title-optional'
            )})`}{' '}
          </Label>
          <div className="flex flex-wrap items-center">
            <div className="flex items-center">
              {/* Width */}
              <div className="mr-2 mb-5 flex items-center">
                <div>
                  <Label>{t('form:input-label-weight')}</Label>
                  <div className="mr-2 flex items-center justify-center rounded-sm border bg-gray-100">
                    <Input
                      name="weight"
                      value={weight}
                      onChange={HandleInputChange}
                      type="number"
                      variant="outline"
                      className="w-40"
                      min={0}
                      placeholder="e.g. 0.4..."
                      renderLabel={<>{weightUnit?.unit}</>}
                    />
                  </div>
                </div>
                <div className="w-22">
                  <Label>{t('form:input-label-dimensions-units')}</Label>
                  <Select
                    options={weightUnits}
                    value={weightUnit}
                    name="weightUnit"
                    getOptionLabel={(option: any) => option.unit}
                    getOptionValue={(option: any) =>
                      option.unit?.charAt(0)?.toUpperCase() +
                      option.unit?.slice(1)
                    }
                    onChange={(value) => onSelectChange(value, 'weightUnit')}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            {/* Dimensions */}
            <div className="mb-5 flex flex-wrap items-center">
              <div className="my-2">
                <Label>{t('form:input-label-dimensions-width')}</Label>
                <div className="mr-2 flex items-center justify-center rounded-sm border bg-gray-100">
                  <Input
                    name="dimensionWidth"
                    value={dimensionWidth}
                    onChange={HandleInputChange}
                    type="number"
                    variant="custom"
                    className="w-40"
                    min={0}
                    placeholder="e.g. 500..."
                    renderLabel={<>{dimensionUnit?.unit}</>}
                  />
                </div>
              </div>
              <div className="my-2">
                <Label>{t('form:input-label-dimensions-height')}</Label>
                <div className="mr-2 flex items-center justify-center rounded-sm border bg-gray-100">
                  <Input
                    name="dimensionHeight"
                    value={dimensionHeight}
                    onChange={HandleInputChange}
                    type="number"
                    variant="custom"
                    className="w-40"
                    min={0}
                    placeholder="e.g. 200..."
                    renderLabel={<>{dimensionUnit?.unit}</>}
                  />
                </div>
              </div>
              <div className="my-2">
                <Label>{t('form:input-label-dimensions-length')}</Label>
                <div className="mr-2 flex items-center justify-center rounded-sm border bg-gray-100">
                  <Input
                    name="dimensionLength"
                    value={dimensionLength}
                    onChange={HandleInputChange}
                    type="number"
                    variant="custom"
                    className="w-40"
                    min={0}
                    placeholder="e.g. 100..."
                    renderLabel={<>{dimensionUnit?.unit}</>}
                  />
                </div>
              </div>
              <div className="my-2 w-24">
                <Label>{t('form:input-label-dimensions-units')}</Label>
                <Select
                  options={dimensionUnits}
                  value={dimensionUnit}
                  name="dimensionUnit"
                  getOptionLabel={(option: any) => option.unit}
                  getOptionValue={(option: any) =>
                    option.unit?.charAt(0)?.toUpperCase() +
                    option.unit?.slice(1)
                  }
                  onChange={(value) => onSelectChange(value, 'dimensionUnit')}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        {/* --------------------- */}
        <ImageModal
          isThumbnail
          onSelect={handleSelectedImage}
          selected={thumbnail ?? []}
          modalId={`fieldAttributeValues-modal-${index}`}
          label="form:label-add-variant-thumbnail"
        />

        {/* <div className="mb-5 mt-5">
          <Checkbox
            name="isDisable"
            id={`${index}-isDisable`}
            onChange={HandleInputChange}
            checked={variationOption.isDisable}
            // error={t(errors.variationOptions?.[index]?.isDisable?.message)}
            label={t('form:input-label-out-of-stock')}
          />
        </div> */}
      </div>
    </Accordion>
  );
};

export default memo(CartesianProductComponent);
