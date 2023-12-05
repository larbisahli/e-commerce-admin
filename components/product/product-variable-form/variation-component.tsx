import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import Title from '@components/ui/title';
import { AttributeTypes } from '@ts-types/enums';
import type { VariationType } from '@ts-types/generated';
import { Attribute } from '@ts-types/generated';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { memo, useMemo } from 'react';

import { useFormReducer } from '../context/form.context';
import { Actions } from '../context/form.types';

const Select = dynamic(() => import('@components/ui/select/select'), {
  loading: () => <Loader height="100px" showText={false} />,
  ssr: false
});
interface VCProps {
  attributeValuesChanges: any[];
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

  const AttributeId = variant?.attribute.id;

  const _attributes = useMemo(() => {
    return attributes?.map(({ id, type, name, translated, values }) => {
      return {
        id,
        type,
        name: name ?? translated?.name,
        values: values?.map((value) => {
          if (type === AttributeTypes.COLOR) {
            return {
              id: value?.id,
              name: value?.name ?? value?.translated?.name,
              value: value?.name ?? value?.translated?.name
            };
          }
          return {
            id: value?.id,
            name: value?.name ?? value?.translated?.name,
            value: value?.value ?? value?.translated?.value
          };
        })
      };
    });
  }, [attributes]);

  const values = useMemo(() => {
    if (loading && !AttributeId) {
      return [];
    }
    return _attributes?.find((attribute) => attribute.id === AttributeId)
      ?.values;
  }, [loading, AttributeId, _attributes]);

  const { attribute = {}, selectedValues = [] } = variant ?? {};

  return (
    <div className="border-b border-dashed border-border-200 p-5 last:border-0 md:p-8">
      <div className="flex items-center justify-between">
        <Title className="mb-0">
          {t('form:form-title-options')} {index + 1}
        </Title>
        <button
          onClick={remove}
          type="button"
          className="text-sm text-red-500 transition-colors
            duration-200 hover:text-red-700 focus:outline-none"
        >
          {t('form:button-label-remove')}
        </button>
      </div>

      <div className="grid grid-cols-fit gap-5">
        <div className="mt-5">
          <Label isRequiredLabel>{t('form:input-label-attribute-name')}</Label>
          <Select
            value={attribute}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.id}
            isLoading={loading}
            closeMenuOnSelect
            hideSelectedOptions
            options={_attributes}
            onChange={changeAttribute}
            onBlur={updateHandler}
          />
        </div>

        <div className="col-span-2 mt-5">
          <Label isRequiredLabel>{t('form:input-label-attribute-value')}</Label>
          <Select
            value={selectedValues}
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

export default memo(VariationComponent);
