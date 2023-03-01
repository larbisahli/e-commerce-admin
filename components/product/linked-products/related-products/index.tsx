import {
  Actions,
  useForm,
  useFormReducer
} from '@components/product/context/form.context';
import Button from '@components/ui/button';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { PRODUCT_MODAL, RELATED_PRODUCTS } from '@ts-types/constants';
import { Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useEffect } from 'react';

import ProductList from '../../product-list';

const RelatedProducts = ({
  relatedProducts
}: {
  relatedProducts: Product['relatedProducts'];
}) => {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const { openModal } = useModalAction();
  const { id, meta } = useModalState();

  const handleClick = (e) => {
    e.preventDefault();
    openModal(PRODUCT_MODAL, RELATED_PRODUCTS, {
      selectedProducts: relatedProducts
    });
  };

  useEffect(() => {
    const { selectedProducts = [] } = meta ?? {};
    if (id === RELATED_PRODUCTS) {
      dispatch({
        type: Actions.INSERT_PRODUCT_LIST,
        payload: {
          field: 'relatedProducts',
          values: selectedProducts
        }
      });
    }
  }, [dispatch, id, meta]);

  return (
    <>
      <div className="flex items-end justify-between flex-wrap xl:flex-nowrap">
        <div className="xl:mb-0 mb-3">
          <span className="font-medium text-base">Related Products</span>
          <p className="text-sm text-body xl:max-w-[75%] max-w-full">
            Related products are shown to customers in addition to the item the
            customer is looking at.
          </p>
        </div>
        <div className="ml-0 xl:ml-2">
          <Button
            loading={false}
            disabled={false}
            size="small"
            className="w-max"
            onClick={handleClick}
          >
            <div>Add Related Products</div>
          </Button>
        </div>
      </div>
      {!isEmpty(relatedProducts) && (
        <div className="mt-5">
          <ProductList
            products={relatedProducts}
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

export default memo(RelatedProducts);
