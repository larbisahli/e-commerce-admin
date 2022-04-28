import Checkbox from '@components/ui/checkbox';
import Input from '@components/ui/input';
import Title from '@components/ui/title';
import { useSettings } from '@contexts/settings.context';
import type { IMGType, VariationOptionsType } from '@ts-types/generated';
import { VariationOptionActions } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import React, { memo, useMemo } from 'react';

import VariationImages from './variation-images';

interface VariationOptionAction {
  type: VariationOptionActions;
  payload: {
    value?: any;
    field?: string;
    options?: string[];
  };
}

interface CartesianProductProps {
  variationOption: VariationOptionsType;
  dispatchVariationOptions?: React.Dispatch<VariationOptionAction>;
  index: number;
  gallery: IMGType[];
}

const CartesianProductComponent = ({
  variationOption,
  dispatchVariationOptions,
  index,
  gallery
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

    dispatchVariationOptions({
      type: VariationOptionActions.INSERT,
      payload: {
        value: target.type === 'number' ? Number(value) : value,
        field: name,
        options
      }
    });
  };

  return (
    <div
      key={`fieldAttributeValues-${index}`}
      className="border-b last:border-0 border-dashed border-border-200 p-5 md:p-8 md:last:pb-0 mb-5 last:mb-8 mt-5"
    >
      <Title className="!text-lg mb-8">
        {t('form:form-title-variant')}:{' '}
        <span className="text-blue-600 font-semibold">
          {variationOption.title}
        </span>
      </Title>

      <div className="grid grid-cols-2 gap-5">
        <Input
          label={`${t('form:input-label-sale-price')} (${currency})*`}
          type="number"
          id={`sale_price-${index}`}
          name="sale_price"
          onChange={HandleInputChange}
          value={variationOption.sale_price}
          // error={t(errors.variation_options?.[index]?.sale_price?.message)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-compare-price')} (${currency})`}
          name="compare_price"
          onChange={HandleInputChange}
          value={variationOption.compare_price}
          type="number"
          // error={t(errors.variation_options?.[index]?.compare_price?.message)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-buying-price')} (${currency})`}
          type="number"
          name="buying_price"
          onChange={HandleInputChange}
          value={variationOption.buying_price}
          // error={t(errors.variation_options?.[index]?.buying_price?.message)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-sku')}`}
          name="sku"
          onChange={HandleInputChange}
          value={variationOption.sku}
          // error={t(errors.variation_options?.[index]?.sku?.message)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-quantity')}*`}
          type="number"
          name="quantity"
          onChange={HandleInputChange}
          value={variationOption.quantity}
          // error={t(errors.variation_options?.[index]?.quantity?.message)}
          variant="outline"
          className="mb-5"
        />
      </div>

      {/* use dynamic import */}
      <VariationImages
        gallery={gallery}
        selectedImage={variationOption.image}
        dispatchVariationOptions={dispatchVariationOptions}
        options={options}
      />

      <div className="mb-5 mt-5">
        <Checkbox
          name="is_disable"
          id={`${index}-is_disable`}
          onChange={HandleInputChange}
          checked={variationOption.is_disable}
          // error={t(errors.variation_options?.[index]?.is_disable?.message)}
          label={t('form:input-label-disable-variant')}
        />
      </div>
    </div>
  );
};

export default memo(CartesianProductComponent);
