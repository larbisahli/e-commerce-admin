import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import Title from '@components/ui/title';
import type { VariationType } from '@ts-types/generated';
import { Attribute } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

import { useFormReducer } from '../context/form.context';
import { Actions } from '../context/form.types';

const Select = dynamic(() => import('@components/ui/select/select'), {
  loading: () => <Loader height="100px" showText={false} />,
  ssr: false
});

interface VCProps {
  updateHandler: () => void;
  variant: VariationType;
  attributes: Attribute[];
  index: number;
  loading: boolean;
}

const VariationComponent = ({
  updateHandler,
  variant,
  index,
  attributes,
  loading
}: VCProps) => {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const remove = () => {
    dispatch({
      type: Actions.REMOVE_VARIATION,
      payload: {
        id: variant?.id
      }
    });
  };

  const changeAttribute = (attribute) => {
    dispatch({
      type: Actions.CHANGE_VARIATION,
      payload: {
        value: attribute,
        id: variant?.id
      }
    });
  };

  const changeValues = (values) => {
    dispatch({
      type: Actions.CHANGE_VARIATION_VALUES,
      payload: {
        values,
        id: variant?.id
      }
    });
  };

  const values = useMemo(() => {
    if (loading && !isEmpty(variant)) {
      return [];
    }
    return attributes?.find(
      (attribute) => attribute.id === variant?.attribute.id
    )?.values;
  }, [loading, variant, attributes]);

  return (
    <div className="border-b border-dashed border-border-200 last:border-0 p-5 md:p-8">
      <div className="flex items-center justify-between">
        <Title className="mb-0">
          {t('form:form-title-options')} {index + 1}
        </Title>
        <button
          onClick={remove}
          type="button"
          className="text-sm text-red-500 hover:text-red-700
            transition-colors duration-200 focus:outline-none"
        >
          {t('form:button-label-remove')}
        </button>
      </div>

      <div className="grid grid-cols-fit gap-5">
        <div className="mt-5">
          <Label>{t('form:input-label-attribute-name')}*</Label>
          <Select
            value={variant?.attribute}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.id}
            isLoading={loading}
            closeMenuOnSelect
            hideSelectedOptions
            options={attributes}
            onChange={changeAttribute}
            onBlur={updateHandler}
          />
        </div>

        <div className="mt-5 col-span-2">
          <Label>{t('form:input-label-attribute-value')}*</Label>
          <Select
            value={variant?.selectedValues}
            getOptionLabel={(option: any) => option.value}
            getOptionValue={(option: any) => option.id}
            isMulti
            isLoading={loading}
            closeMenuOnSelect
            hideSelectedOptions
            options={values}
            onChange={changeValues}
            onBlur={updateHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default VariationComponent;
