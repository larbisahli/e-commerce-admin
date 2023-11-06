import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import { AttributeTypes } from '@ts-types/enums';
import type { AttributeValue, VariationType } from '@ts-types/generated';
import { Attribute } from '@ts-types/generated';
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
  checkForUpdateHandler: () => void;
  productAttribute: VariationType;
  attributes: Attribute[];
  selectedAttributes: VariationType[];
  loading: boolean;
}

const AttributesOptionComponent = ({
  checkForUpdateHandler,
  productAttribute,
  attributes,
  selectedAttributes,
  loading
}: VCProps) => {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const { id, attribute, selectedValue } = productAttribute;

  const remove = () => {
    dispatch({
      type: Actions.REMOVE_ATTRIBUTE,
      payload: {
        id
      }
    });
  };

  const changeAttribute = (attribute: Attribute) => {
    console.log({ attribute });
    dispatch({
      type: Actions.CHANGE_ATTRIBUTE,
      payload: {
        value: attribute,
        id
      }
    });
  };

  const changeValues = (value: AttributeValue) => {
    dispatch({
      type: Actions.CHANGE_ATTRIBUTE_VALUE,
      payload: {
        value,
        id
      }
    });
  };

  const _attributes = useMemo(() => {
    const att = attributes?.map(({ id, type, name, translated, values }) => {
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

    return att?.filter((at) => {
      return !selectedAttributes?.find((st) => st.attribute?.id === at.id);
    });
  }, [attributes, selectedAttributes]);

  const values = useMemo(() => {
    if (loading && !id) {
      return [];
    }
    return attributes?.find((att) => att.id === attribute?.id)?.values;
  }, [loading, id, attributes, attribute?.id]);

  return (
    <div className="border-b border-dashed border-border-200 py-5 last:border-0">
      <div className="flex items-center justify-end">
        <button
          onClick={remove}
          type="button"
          className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none"
        >
          {t('form:button-label-remove')}
        </button>
      </div>

      <div className="grid grid-cols-fit gap-5">
        <div className="mt-3">
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
            onBlur={checkForUpdateHandler}
          />
        </div>

        <div className="col-span-2 mt-3">
          <Label isRequiredLabel>{t('form:input-label-attribute-value')}</Label>
          <Select
            value={selectedValue}
            getOptionLabel={(option: any) => option.value}
            getOptionValue={(option: any) => option.id}
            isLoading={loading}
            closeMenuOnSelect
            hideSelectedOptions
            options={values}
            onChange={changeValues}
            onBlur={checkForUpdateHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default AttributesOptionComponent;
