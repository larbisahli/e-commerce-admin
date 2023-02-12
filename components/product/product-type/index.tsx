import Accordion from '@components/ui/accordion';
import { Product, ProductType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import ProductSimpleForm from '../product-simple-form';
import ProductVariableForm from '../product-variable-form';
import { VariationAction, VariationReducerType } from '../variations-reducer';

type Props = {
  initialValues: Product | any;
  variationState?: VariationReducerType;
  dispatchVariationState?: React.Dispatch<VariationAction>;
};

const ProductTypeComponent = ({
  initialValues,
  variationState,
  dispatchVariationState
}: Props) => {
  const { t } = useTranslation();

  const { getValues, watch } = useFormContext();

  const currentProductType = watch('type');

  const type = currentProductType?.id ?? getValues('type');

  return (
    <Accordion
      Title={() => (
        <>
          {type === ProductType.Simple
            ? t('form:form-title-simple-product-info')
            : t('form:form-title-variation-product-info')}
        </>
      )}
    >
      {!!type &&
        (type === ProductType.Simple ? (
          <ProductSimpleForm initialValues={initialValues} />
        ) : (
          <ProductVariableForm
            initialValues={initialValues}
            variationState={variationState}
            dispatchVariationState={dispatchVariationState}
          />
        ))}
    </Accordion>
  );
};

export default ProductTypeComponent;
