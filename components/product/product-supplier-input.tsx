import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
// import { useTypesQuery } from '@data/type/use-types.query';
import { useTranslation } from 'next-i18next';
import { Control } from 'react-hook-form';

interface Props {
  control: Control<any>;
  error: string | undefined;
}

const ProductSupplierInput = ({ control, error }: Props) => {
  const { t } = useTranslation();

  // const { data, isLoading: loading } = useTypesQuery({
  //   limit: 200
  // });

  const data = [];
  const loading = false;

  return (
    <div className="mb-5">
      <Label>{t('form:input-label-suppliers')}</Label>
      <SelectInput
        name="type"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        options={data?.types!}
        isLoading={loading}
      />
      <ValidationError message={t(error!)} />
    </div>
  );
};

export default ProductSupplierInput;
