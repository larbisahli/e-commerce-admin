import Card from '@components/common/card';
import Description from '@components/ui/description';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { Product, ProductType } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { memo, useEffect } from 'react';

import { Actions, useFormReducer } from '../context/form.context';
import { ProductTypeTooltipContent } from '../ToolTips';

type Props = {
  initialValues: Product | any;
  state: { type: Product['type'] };
};

const productTypes = [
  { name: 'Simple Product', id: ProductType.Simple },
  { name: 'Configurable Product', id: ProductType.Variable }
];

const ProductTypeComponent = ({ state, initialValues }: Props) => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const productTypeParam = query?.type;

  const dispatch = useFormReducer();

  const { type } = state;

  const onChange = (value: Product['type']) => {
    console.log({ value });
    dispatch({
      type: Actions.CONTENT,
      payload: {
        field: 'type',
        value
      }
    });
  };

  useEffect(() => {
    if (isEmpty(initialValues) && productTypeParam) {
      const value = productTypes?.find(({ id }) => id === productTypeParam);
      if (!isEmpty(value)) {
        dispatch({
          type: Actions.CONTENT,
          payload: {
            field: 'type',
            value
          }
        });
      }
    }
  }, [productTypeParam, initialValues, dispatch]);

  return (
    <div
      className="my-5 flex flex-wrap border-b border-dashed
     border-border-base pb-8 sm:my-8"
    >
      <Description
        title={t('form:form-title-product-type')}
        details={`${
          initialValues
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:product-type-help-text')}`}
        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
      />
      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Label
          tooltipId="manufacturer"
          renderTooltip={<ProductTypeTooltipContent />}
        >
          {t('form:form-title-product-type')}
        </Label>
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
