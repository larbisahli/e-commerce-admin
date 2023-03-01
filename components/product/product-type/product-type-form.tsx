import Accordion from '@components/ui/accordion';
import { Product, ProductType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';

import ProductSimpleForm from '../product-simple-form';
import ProductVariableForm from '../product-variable-form';

type Props = {
  initialValues: Product | any;
  state: {
    type: Product['type'];
    variationOptions: Product['variationOptions'];
    variations: Product['variations'];
    salePrice: Product['salePrice'];
    comparePrice: Product['comparePrice'];
    buyingPrice: Product['buyingPrice'];
    quantity: Product['quantity'];
    sku: Product['sku'];
  };
};

const ProductTypeFormComponent = ({ state, initialValues }: Props) => {
  const { t } = useTranslation();

  const {
    type: { id: productType },
    variationOptions,
    variations,
    salePrice,
    comparePrice,
    buyingPrice,
    quantity,
    sku
  } = state;

  const renderSimpleForm = () => {
    if (productType === ProductType.Simple) {
      return (
        <ProductSimpleForm
          state={{ salePrice, comparePrice, buyingPrice, quantity, sku }}
          initialValues={initialValues}
        />
      );
    }
    return null;
  };

  const renderVariationForm = () => {
    if (productType === ProductType.Variable) {
      return (
        <ProductVariableForm
          state={{ variationOptions, variations }}
          initialValues={initialValues}
        />
      );
    }
    return null;
  };

  const renderTitle = () => {
    if (productType === ProductType.Variable) {
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

export default memo(ProductTypeFormComponent);
