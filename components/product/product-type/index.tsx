import Card from '@components/common/card';
import Description from '@components/ui/description';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { Product, ProductType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';

import { Actions, useFormReducer } from '../context/form.context';

type Props = {
  initialValues: Product | any;
  state: { type: Product['type'] };
};

const productTypes = [
  { name: 'Simple Product', id: ProductType.Simple },
  { name: 'Variable Product', id: ProductType.Variable }
];

const ProductTypeComponent = ({ state, initialValues }: Props) => {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const { type } = state;

  const onChange = (value: Product['type']) => {
    dispatch({
      type: Actions.CONTENT,
      payload: {
        field: 'type',
        value
      }
    });
  };

  return (
    <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
      <Description
        title={t('form:form-title-product-type')}
        details={`${
          initialValues
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:product-type-help-text')}`}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />
      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Label>{t('form:form-title-product-type')}</Label>
        <Select
          value={type}
          name="type"
          hideSelectedOptions={false}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          onChange={onChange}
          options={productTypes}
        />
      </Card>
    </div>
  );
};

export default memo(ProductTypeComponent);
