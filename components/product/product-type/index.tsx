import Accordion from '@components/ui/accordion';
import { Product, ProductType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

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

  const { getValues, control } = useFormContext();

  const type = useWatch({ control, name: 'type' }) ?? getValues('type');

  const renderSimpleForm = () => {
    if (type?.id === ProductType.Simple) {
      return <ProductSimpleForm initialValues={initialValues} />;
    }
    return null;
  };

  const renderVariationForm = () => {
    if (type?.id === ProductType.Variable) {
      return (
        <ProductVariableForm
          initialValues={initialValues}
          variationState={variationState}
          dispatchVariationState={dispatchVariationState}
        />
      );
    }
    return null;
  };

  const renderTitle = () => {
    if (type?.id === ProductType.Variable) {
      return <>{t('form:form-title-variation-product-info')}</>;
    }
    return <>{t('form:form-title-simple-product-info')}</>;
  };

  return (
    <Accordion Title={() => renderTitle()}>
      {renderSimpleForm()}
      {renderVariationForm()}
    </Accordion>
  );
};

export default ProductTypeComponent;
