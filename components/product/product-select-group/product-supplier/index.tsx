import { useQuery } from '@apollo/client';
import {
  Actions,
  useFormReducer
} from '@components/product/context/form.context';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { SUPPLIERS_FOR_SELECT } from '@graphql/supplier';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { LanguageType, OrderBy, Product, Suppliers } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';

interface TSupplierSelect {
  suppliersForSelect: Suppliers[];
}

interface Props {
  suppliers: Suppliers[];
  // setInitProductSuppliers: React.Dispatch<React.SetStateAction<Suppliers[]>>;
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  language: LanguageType;
}

const ProductSupplier = ({ suppliers }: Props) => {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TSupplierSelect, OptionsVariable>(
    SUPPLIERS_FOR_SELECT,
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

  const { suppliersForSelect: options = [] } = data ?? {};

  useErrorLogger(error);

  const onChange = (values: Suppliers[]) => {
    dispatch({
      type: Actions.SUPPLIERS,
      payload: {
        values
      }
    });
  };

  return (
    <div className="mb-5">
      <Label>{t('form:input-label-suppliers')}</Label>
      <Select
        options={options}
        value={suppliers}
        name="suppliers"
        isMulti
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        onChange={onChange}
        isLoading={loading}
      />
      <p className="pt-1 text-xs text-gray-500">{t('form:hidden-info-note')}</p>
    </div>
  );
};

export default memo(ProductSupplier);
