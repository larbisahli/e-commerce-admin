import { useQuery } from '@apollo/client';
import {
  Actions,
  useFormReducer
} from '@components/product/context/form.context';
import { CategoryTooltipContent } from '@components/product/ToolTips';
// import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { CATEGORIES_FOR_SELECT_ALL } from '@graphql/category';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { Category, LanguageType, OrderBy } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import React, { memo, useMemo } from 'react';

interface TCategorySelect {
  categorySelectAll: Category[];
}

interface Props {
  categories: Category[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  language: LanguageType;
}

const ProductCategory = ({ categories }: Props) => {
  const { t } = useTranslation('common');

  const dispatch = useFormReducer();

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TCategorySelect, OptionsVariable>(
    CATEGORIES_FOR_SELECT_ALL,
    {
      variables: {
        page: 1,
        limit: 999,
        orderBy: OrderBy.CREATED_AT,
        language: selectedLanguage
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage)
    }
  );

  const { categorySelectAll = [] } = data ?? {};

  useErrorLogger(error);

  const onChange = (values: Category[]) => {
    dispatch({
      type: Actions.CATEGORIES,
      payload: {
        values
      }
    });
  };

  const options = useMemo(() => {
    return categorySelectAll?.map(({ id, name, translated }) => {
      return {
        id,
        name: name ?? translated?.name
      };
    });
  }, [categorySelectAll]);

  return (
    <div className="mb-5">
      <Label
        isRequiredLabel
        openTooltipOnClick
        tooltipId="category"
        renderTooltip={<CategoryTooltipContent />}
      >
        {t('form:input-label-categories')}
      </Label>
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
