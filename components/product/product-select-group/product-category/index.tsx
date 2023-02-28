import { useQuery } from '@apollo/client';
import { Actions, useForm } from '@components/product/context/form.context';
// import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { CATEGORIES_FOR_SELECT_ALL } from '@graphql/category';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { Category, OrderBy } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';

interface TCategorySelect {
  categorySelectAll: Category[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
}

const ProductCategory = () => {
  const { t } = useTranslation('common');

  const {
    state: { categories },
    dispatch
  } = useForm();

  const { data, loading, error } = useQuery<TCategorySelect, OptionsVariable>(
    CATEGORIES_FOR_SELECT_ALL,
    {
      variables: {
        page: 1,
        limit: 999,
        orderBy: OrderBy.CREATED_AT
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  const { categorySelectAll: options = [] } = data ?? {};

  useErrorLogger(error);

  const onChange = (values: Category[]) => {
    dispatch({
      type: Actions.CATEGORIES,
      payload: {
        values
      }
    });
  };

  return (
    <div className="mb-5">
      <Label>{t('form:input-label-categories')}*</Label>
      <Select
        options={options}
        value={categories}
        name="categories"
        isMulti
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        onChange={onChange}
        isLoading={loading}
      />
      {/* <ValidationError message={t(errors.categories?.message)} /> */}
    </div>
  );
};

export default memo(ProductCategory);
