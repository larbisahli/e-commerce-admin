import Card from '@components/common/card';
import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { ProductType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';

const productType = [
  { name: 'Simple Product', value: ProductType.Simple },
  { name: 'Variable Product', value: ProductType.Variable }
];

const ProductTypeInput = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const { t } = useTranslation();

  return (
    <Card className="w-full sm:w-8/12 md:w-2/3">
      <div className="mb-5">
        <Label>{t('form:form-title-product-type')}</Label>
        <SelectInput
          name="productTypeValue"
          control={control}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.value}
          options={productType}
        />
        <ValidationError message={t(errors.productTypeValue?.message)} />
      </div>
    </Card>
  );
};

export default ProductTypeInput;
