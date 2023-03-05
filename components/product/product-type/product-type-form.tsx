import Accordion from '@components/ui/accordion';
import { Product, ProductType } from '@ts-types/generated';
import { differenceWith, isEmpty } from 'lodash';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'next-i18next';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

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

  const checkForUpdateHandler = useCallback(
    (values?: any) => {
      if (!isUpdateMode) return;

      if (productType === ProductType.Variable) {
        const { additions, deletions } = values;
        setIsUpdated(!isEmpty(additions) || !isEmpty(deletions));
        return;
      }

      const {
        salePrice: initSalePrice,
        comparePrice: initComparePrice,
        buyingPrice: initBuyingPrice,
        quantity: initQuantity,
        initSku
      } = initialValues;

      const initialProductContent = {
        salePrice: initSalePrice ?? 0,
        comparePrice: initComparePrice ?? 0,
        buyingPrice: initBuyingPrice ?? 0,
        quantity: initQuantity ?? 0,
        sku: initSku ?? 0
      };
      const currentProductContent = {
        salePrice,
        comparePrice,
        buyingPrice,
        quantity,
        sku
      };

      setIsUpdated(!isEqual(initialProductContent, currentProductContent));
    },
    [
      buyingPrice,
      comparePrice,
      initialValues,
      isUpdateMode,
      productType,
      quantity,
      salePrice,
      sku
    ]
  );

  const getUpdatedVariationOptions = useCallback(() => {
    if (!isUpdateMode) return { additions: [], deletions: [] };

    return {
      additions: differenceWith(
        variationOptions,
        initialValues?.variationOptions,
        isEqual
      ),
      deletions: initialValues?.variationOptions?.filter((vo) => {
        return isEmpty(variationOptions?.find((v) => v?.id === vo?.id));
      })
    };
  }, [initialValues?.variationOptions, isUpdateMode, variationOptions]);

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
          getUpdatedVariationOptions={getUpdatedVariationOptions}
          state={{ variationOptions, variations, isUpdateMode }}
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
