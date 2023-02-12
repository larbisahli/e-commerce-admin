import Button from '@components/ui/button';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { PRODUCT_MODAL, RELATED_PRODUCTS } from '@ts-types/constants';
import { Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import ProductList from '../../product-list';

interface Props {
  initialValues: Product | any;
}

const RelatedProducts = ({ initialValues }: Props) => {
  const { t } = useTranslation();

  const { setValue, getValues, watch } = useFormContext();

  const { openModal } = useModalAction();
  const { id, meta } = useModalState();

  const selectedProducts =
    watch('relatedProducts') ?? !isEmpty(initialValues)
      ? getValues('relatedProducts')
      : [];

  const handleClick = (e) => {
    e.preventDefault();
    openModal(PRODUCT_MODAL, RELATED_PRODUCTS, { selectedProducts });
  };

  useEffect(() => {
    const { selectedProducts = [] } = meta ?? {};
    if (id === RELATED_PRODUCTS && !isEmpty(selectedProducts)) {
      setValue('relatedProducts', selectedProducts);
    }
  }, [id, meta]);

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

export default RelatedProducts;
