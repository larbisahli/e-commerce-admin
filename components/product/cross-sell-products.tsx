import Button from '@components/ui/button';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { CROSS_SELL_PRODUCTS, PRODUCT_MODAL } from '@ts-types/constants';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import ProductList from './product-list';

const CrossSellProducts = () => {
  const { t } = useTranslation();

  const { setValue, watch } = useFormContext();

  const { openModal } = useModalAction();
  const { id, meta } = useModalState();

  const selectedProducts = watch('crossSellProduct');

  const handleClick = (e) => {
    e.preventDefault();
    openModal(PRODUCT_MODAL, CROSS_SELL_PRODUCTS, { selectedProducts });
  };

  useEffect(() => {
    const { selectedProducts = [] } = meta ?? {};
    if (id === CROSS_SELL_PRODUCTS && !isEmpty(selectedProducts)) {
      setValue('crossSellProduct', selectedProducts);
    }
  }, [id, meta]);

  return (
    <>
      <div className="flex items-end justify-between flex-wrap xl:flex-nowrap">
        <div className="xl:mb-0 mb-3">
          <span className="font-medium text-base">Cross-Sell Products</span>
          <p className="text-sm text-body xl:max-w-[75%] max-w-full">{`These "impulse-buy" products appear next to the shopping cart as cross-sells to the items already in the shopping cart.`}</p>
        </div>
        <div className="ml-0 xl:ml-2">
          <Button
            loading={false}
            disabled={false}
            size="small"
            className="w-max"
            onClick={handleClick}
          >
            <div>Add Cross-Sell Products</div>
          </Button>
        </div>
      </div>
      {!isEmpty(selectedProducts) && (
        <div className="mt-5">
          <ProductList
            products={selectedProducts}
            selectedColumns={[
              'thumbnail',
              'name',
              'sku',
              'quantity',
              'published'
            ]}
          />
        </div>
      )}
    </>
  );
};

export default CrossSellProducts;
