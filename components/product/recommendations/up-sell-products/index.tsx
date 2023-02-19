import Button from '@components/ui/button';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { PRODUCT_MODAL, UPSELL_PRODUCTS } from '@ts-types/constants';
import { Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import ProductList from '../../product-list';

interface Props {
  initialValues: Product | any;
}

const UpSellProducts = ({ initialValues }: Props) => {
  const { t } = useTranslation();

  const { setValue, getValues, control } = useFormContext();

  const { openModal } = useModalAction();
  const { id, meta } = useModalState();

  const selectedProducts =
    useWatch({ control, name: 'upsellProducts' }) ?? !isEmpty(initialValues)
      ? getValues('upsellProducts')
      : [];

  const handleClick = (e) => {
    e.preventDefault();
    openModal(PRODUCT_MODAL, UPSELL_PRODUCTS, { selectedProducts });
  };

  useEffect(() => {
    const { selectedProducts = [] } = meta ?? {};
    if (id === UPSELL_PRODUCTS) {
      setValue('upsellProducts', selectedProducts);
    }
  }, [id, meta, setValue]);

  return (
    <>
      <div className="flex items-end justify-between flex-wrap xl:flex-nowrap">
        <div className="xl:mb-0 mb-3">
          <span className="font-medium text-base">Up-Sell Products</span>
          <p className="text-sm text-body xl:max-w-[75%] max-w-full">
            An up-sell item is offered to the customer as a pricier or
            higher-quality alternative to the product the customer is looking
            at.
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
            <div>Add Up-Sell Products</div>
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

export default memo(UpSellProducts);
