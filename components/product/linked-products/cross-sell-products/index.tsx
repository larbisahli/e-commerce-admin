import {
  Actions,
  useFormReducer
} from '@components/product/context/form.context';
import { RenderTooltipCrossSell } from '@components/product/ToolTips';
import Button from '@components/ui/button';
import Label from '@components/ui/label';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { CROSS_SELL_PRODUCTS, PRODUCT_MODAL } from '@ts-types/constants';
import { Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useEffect } from 'react';

import ProductList from '../../product-list';

const CrossSellProducts = ({
  crossSellProducts
}: {
  crossSellProducts: Product['crossSellProducts'];
}) => {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const { openModal } = useModalAction();
  const { id, meta } = useModalState();

  const handleClick = (e) => {
    e.preventDefault();
    openModal(PRODUCT_MODAL, CROSS_SELL_PRODUCTS, {
      selectedProducts: crossSellProducts
    });
  };

  useEffect(() => {
    const { selectedProducts = [] } = meta ?? {};
    if (id === CROSS_SELL_PRODUCTS) {
      dispatch({
        type: Actions.INSERT_PRODUCT_LIST,
        payload: {
          field: 'crossSellProducts',
          values: selectedProducts
        }
      });
    }
  }, [dispatch, id, meta]);

  return (
    <>
      <div className="w-full">
        <Label
          tooltipId="cross-sell"
          className="text-base font-medium"
          spaceBetween={false}
          renderTooltip={<RenderTooltipCrossSell />}
        >
          Cross-Sell Products
        </Label>
      </div>
      <div className="flex flex-wrap items-start justify-between xl:flex-nowrap">
        <div className="mb-3 xl:mb-0">
          <p className="max-w-full text-sm text-body xl:max-w-[75%]">{`These "impulse-buy" products appear next to the shopping cart as cross-sells to the items already in the shopping cart.`}</p>
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
      {!isEmpty(crossSellProducts) && (
        <div className="mt-5">
          <ProductList
            products={crossSellProducts}
            loading={false}
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

export default memo(CrossSellProducts);
