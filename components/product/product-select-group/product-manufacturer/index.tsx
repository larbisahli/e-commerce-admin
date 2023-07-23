import { useQuery } from '@apollo/client';
import {
  Actions,
  useFormReducer
} from '@components/product/context/form.context';
// import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { MANUFACTURERS_FOR_SELECT } from '@graphql/manufacturer';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { Category, ManufacturerType, OrderBy } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';

interface TManufacturerSelect {
  manufacturersForSelect: ManufacturerType[];
}

interface Props {
  manufacturers: ManufacturerType[];
  // setInitProductCategories: React.Dispatch<React.SetStateAction<ManufacturerType[]>>;
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
}

const ProductManufacturer = ({ manufacturers }: Props) => {
  const { t } = useTranslation('common');

  const dispatch = useFormReducer();

  const { data, loading, error } = useQuery<
    TManufacturerSelect,
    OptionsVariable
  >(MANUFACTURERS_FOR_SELECT, {
    variables: {
      page: 1,
      limit: 999,
      orderBy: OrderBy.CREATED_AT
    },
    fetchPolicy: 'cache-and-network'
  });

  const { manufacturersForSelect: options = [] } = data ?? {};

  useErrorLogger(error);

  const onChange = (values: Category[]) => {
    dispatch({
      type: Actions.MANUFACTURERS,
      payload: {
        values
      }
    });
  };

  return (
    <div className="mb-5">
      <Label>{t('form:input-label-manufacturers')}</Label>
      <Select
        options={options}
        value={manufacturers}
        name="manufacturers"
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

export default memo(ProductManufacturer);
