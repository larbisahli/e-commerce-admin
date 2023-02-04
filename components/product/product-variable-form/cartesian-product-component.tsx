// import Checkbox from '@components/ui/checkbox';
import ImageModal from '@components/image-modal';
import Accordion from '@components/ui/accordion';
import Input from '@components/ui/input';
import Title from '@components/ui/title';
import { useSettings } from '@hooks/useSettings';
import type { ImageType, VariationOptionsType } from '@ts-types/generated';
import { VariationActions } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import React, { memo, useMemo } from 'react';

import { VariationAction } from '../variations-reducer';

interface CartesianProductProps {
  variationOption: VariationOptionsType;
  dispatchVariationState?: React.Dispatch<VariationAction>;
  index: number;
}

const CartesianProductComponent = ({
  variationOption,
  dispatchVariationState,
  index
}: CartesianProductProps) => {
  const { t } = useTranslation();

  const { currency } = useSettings();

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

    dispatchVariationState({
      type: VariationActions.CHANGE_VARIATION_OPTION,
      payload: {
        value: target.type === 'number' ? Number(value) : value,
        field: name,
        options
      }
    });
  };

  const handleSelectedImage = (photo: ImageType[]) => {
    dispatchVariationState({
      type: VariationActions.CHANGE_VARIATION_OPTION,
      payload: {
        value: photo,
        field: 'thumbnail',
        options
      }
    });
  };

  return (
    <Accordion
      btnClassName="mt-1"
      Title={() => (
        <Title className="!text-lg">
          {t('form:form-title-variant')}:{' '}
          <span className="text-blue-600 font-semibold">
            {variationOption.title}
          </span>
        </Title>
      )}
    >
      <div
        key={`fieldAttributeValues-${index}`}
        className="border-b last:border-0 border-dashed border-border-200 p-5 md:p-8 md:last:pb-0 mb-5 last:mb-8 mt-5"
      >
        <div className="grid grid-cols-3 gap-3">
          <Input
            label={`${t('form:input-label-sale-price')} (${currency.symbol})*`}
            type="number"
            id={`salePrice-${index}`}
            name="salePrice"
            onChange={HandleInputChange}
            value={variationOption.salePrice}
            // error={t(errors.variation_options?.[index]?.sale_price?.message)}
            variant="outline"
            className="mb-2 ml-1"
          />
          <Input
            label={`${t('form:input-label-compare-price')} (${
              currency.symbol
            })`}
            name="comparePrice"
            onChange={HandleInputChange}
            value={variationOption.comparePrice}
            type="number"
            // error={t(errors.variation_options?.[index]?.compare_price?.message)}
            variant="outline"
            className="mb-2 ml-1"
          />
          <Input
            label={`${t('form:input-label-buying-price')} (${currency.symbol})`}
            type="number"
            name="buyingPrice"
            onChange={HandleInputChange}
            value={variationOption.buyingPrice}
            // error={t(errors.variation_options?.[index]?.buying_price?.message)}
            variant="outline"
            className="mb-2 ml-1"
          />
          <Input
            label={`${t('form:input-label-quantity')}*`}
            type="number"
            name="quantity"
            onChange={HandleInputChange}
            value={variationOption.quantity}
            // error={t(errors.variation_options?.[index]?.quantity?.message)}
            variant="outline"
            className="mb-2 ml-1"
            note={'Zero means out of stock'}
          />
          <Input
            label={`${t('form:input-label-sku')}`}
            name="sku"
            onChange={HandleInputChange}
            value={variationOption.sku}
            // error={t(errors.variation_options?.[index]?.sku?.message)}
            variant="outline"
            className="mb-2 ml-1"
          />
        </div>

        <ImageModal
          isThumbnail
          onSelect={handleSelectedImage}
          selected={variationOption.thumbnail ?? []}
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
