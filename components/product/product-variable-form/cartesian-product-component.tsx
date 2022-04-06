import Title from '@components/ui/title';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import TitleAndOptionsInput from './title-option-input';
import { useSettings } from '@contexts/settings.context';
import Checkbox from '@components/ui/checkbox';
import Input from '@components/ui/input';
import VariationImages from './variation-images';

interface CartesianType {
  id: string;
  attribute_name: string;
  attribute_value: string;
}

interface CartesianProductProps {
  fieldAttributeValue: CartesianType[];
  index: number;
}

const CartesianProductComponent = ({
  fieldAttributeValue,
  index
}: CartesianProductProps) => {
  const { t } = useTranslation();

  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useFormContext();

  const { currency } = useSettings();

  const sale_price = getValues('sale_price');
  const compare_price = getValues('compare_price');
  const buying_price = getValues('buying_price');
  const quantity = watch(`variation_options.${index}.quantity`);

  useEffect(() => {
    if (Number(quantity) <= 0) {
      setValue(`variation_options.${index}.is_disable`, true);
    }
  }, [quantity]);

  return (
    <div
      key={`fieldAttributeValues-${index}`}
      className="border-b last:border-0 border-dashed border-border-200 p-5 md:p-8 md:last:pb-0 mb-5 last:mb-8 mt-5"
    >
      <Title className="!text-lg mb-8">
        {t('form:form-title-variant')}:{' '}
        <span className="text-blue-600 font-semibold">
          {Array.isArray(fieldAttributeValue)
            ? fieldAttributeValue?.map((a) => a?.attribute_value).join('/')
            : (fieldAttributeValue as { attribute_value: string })
                ?.attribute_value}
        </span>
      </Title>

      {/* Hidden inputs title and option */}
      <TitleAndOptionsInput
        register={register}
        setValue={setValue}
        index={index}
        fieldAttributeValue={fieldAttributeValue}
      />

      <div className="grid grid-cols-2 gap-5">
        <Input
          label={`${t('form:input-label-sale-price')} (${currency})*`}
          type="number"
          {...register(`variation_options.${index}.sale_price`)}
          defaultValue={sale_price}
          error={t(errors.variation_options?.[index]?.sale_price?.message)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-compare-price')} (${currency})`}
          defaultValue={compare_price}
          type="number"
          {...register(`variation_options.${index}.compare_price`)}
          error={t(errors.variation_options?.[index]?.compare_price?.message)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-buying-price')} (${currency})`}
          defaultValue={buying_price}
          type="number"
          {...register(`variation_options.${index}.buying_price`)}
          error={t(errors.variation_options?.[index]?.buying_price?.message)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-sku')}`}
          {...register(`variation_options.${index}.sku`)}
          error={t(errors.variation_options?.[index]?.sku?.message)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-quantity')}*`}
          type="number"
          defaultValue={1}
          {...register(`variation_options.${index}.quantity`)}
          error={t(errors.variation_options?.[index]?.quantity?.message)}
          variant="outline"
          className="mb-5"
        />
      </div>

      {/* use dynamic import */}
      <VariationImages index={index} />

      <div className="mb-5 mt-5">
        <Checkbox
          {...register(`variation_options.${index}.is_disable`)}
          error={t(errors.variation_options?.[index]?.is_disable?.message)}
          label={t('form:input-label-disable-variant')}
        />
      </div>
    </div>
  );
};

export default React.memo(CartesianProductComponent);
