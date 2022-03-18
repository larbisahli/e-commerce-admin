import { useQuery } from '@apollo/client';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { CATEGORIES_FOR_SELECT } from '@graphql/category';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { Category, OrderBy } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { Control } from 'react-hook-form';

interface Props {
  control: Control<any>;
}

interface TCategorySelect {
  categoriesSelectForAdmin: Category[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
}

const ProductCategoryInput = ({ control }: Props) => {
  const { t } = useTranslation('common');

  const { data, loading, error } = useQuery<TCategorySelect, OptionsVariable>(
    CATEGORIES_FOR_SELECT,
    {
      variables: {
        page: 1,
        limit: 999,
        orderBy: OrderBy.CREATED_AT
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  const categories = data?.categoriesSelectForAdmin;

  useErrorLogger(error);

  return (
    <div className="mb-5">
      <Label>{t('form:input-label-categories')}*</Label>
      <SelectInput
        name="categories"
        isMulti
        control={control}
        getOptionLabel={(option: Category) => option.category_name}
        getOptionValue={(option: Category) => option.id}
        options={categories}
        isLoading={loading}
      />
    </div>
  );
};

export default ProductCategoryInput;
