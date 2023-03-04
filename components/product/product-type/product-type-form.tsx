import Accordion from '@components/ui/accordion';
import { Product, ProductType } from '@ts-types/generated';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'next-i18next';
import React, { memo, useState } from 'react';

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
    isUpdateMode: boolean;
  };
};

const ProductTypeFormComponent = ({ state, initialValues }: Props) => {
  const { t } = useTranslation();

  const [isUpdated, setIsUpdated] = useState(false);

  const {
    type: { id: productType },
    variationOptions,
    variations,
    salePrice,
    comparePrice,
    buyingPrice,
    quantity,
    sku,
    isUpdateMode
  } = state;

  const checkForUpdateHandler = () => {
    if (!isUpdateMode) return;

    const initialProductContent = {
      salePrice: initialValues.salePrice ?? 0,
      comparePrice: initialValues.comparePrice ?? 0,
      buyingPrice: initialValues.buyingPrice ?? 0,
      quantity: initialValues.quantity ?? 0,
      sku: initialValues.sku ?? 0
    };
    const currentProductContent = {
      salePrice,
      comparePrice,
      buyingPrice,
      quantity,
      sku
    };

    setIsUpdated(!isEqual(initialProductContent, currentProductContent));
  };

  const renderSimpleForm = () => {
    if (productType === ProductType.Simple) {
      return (
        <ProductSimpleForm
          isUpdated={isUpdated}
          checkForUpdateHandler={checkForUpdateHandler}
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
          isUpdated={isUpdated}
          checkForUpdateHandler={checkForUpdateHandler}
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
    <Accordion isUpdated={isUpdated} Title={() => renderTitle()}>
      {renderSimpleForm()}
      {renderVariationForm()}
    </Accordion>
  );
};

export default memo(ProductTypeFormComponent);
