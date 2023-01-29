/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import 'rc-pagination/assets/index.css';

import { useQuery } from '@apollo/client';
import ProductListMini from '@components/product/product-list-mini';
import Button from '@components/ui/button';
import Loader from '@components/ui/loader/loader';
import Modal from '@components/ui/modal/modal';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import Pagination2 from '@components/ui/pagination2';
import { PRODUCTS } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import {
  CROSS_SELL_PRODUCTS,
  PRODUCT_MODAL,
  RELATED_PRODUCTS,
  UPSELL_PRODUCTS
} from '@ts-types/constants';
import { OrderBy, SortOrder } from '@ts-types/enums';
import { ImageType, Product } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

interface TProduct {
  products: Product[];
  productCount: { count: number };
}

interface ProductVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

const ProductModal = () => {
  const { t } = useTranslation();

  const { closeModal, openModal } = useModalAction();
  const { isOpen, id, meta } = useModalState();

  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<{ id: string }[]>(
    []
  );
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  //  openModal(IMAGE_MODAL, modalId);

  const { data, loading, error, fetchMore } = useQuery<
    TProduct,
    ProductVariable
  >(PRODUCTS, {
    variables: {
      page,
      limit: limit.value,
      orderBy,
      sortedBy: SortOrder.Desc
    },
    fetchPolicy: 'cache-and-network'
  });

  const { products = [], productCount: { count } = { count: 0 } } = data ?? {};

  useErrorLogger(error);

  const handlePagination = (current: number) => {
    setPage(current);
    fetchMore({
      variables: {
        page: current,
        limit,
        orderBy,
        sortedBy: SortOrder.Desc
      }
    });
  };

  useEffect(() => {
    setSelectedProducts(meta?.selectedProducts ?? []);
  }, [meta]);

  const open =
    (id === RELATED_PRODUCTS ||
      id === UPSELL_PRODUCTS ||
      id === CROSS_SELL_PRODUCTS) &&
    isOpen;

  const onCloseSave = () => {
    closeModal(PRODUCT_MODAL, id, { selectedProducts });
  };

  const onClose = () => {
    closeModal(PRODUCT_MODAL, id);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex overflow-y-auto flex-col bg-white md:h-fit h-[100vh] w-[100vw] md:w-[60vw] 2xl:w-[50vw]">
        <div className="p-4 font-semibold text-lg bg-green-600 text-white uppercase">
          Products
        </div>
        {loading ? (
          <Loader text={t('common:text-loading')} />
        ) : (
          <>
            <ProductListMini
              products={products}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
            <div className="p-5 flex items-center m-3 md:mb-0 justify-between mb-16">
              <div className="flex-1">
                <Pagination2
                  total={count}
                  current={page}
                  pageSize={limit.value}
                  onChange={handlePagination}
                />
              </div>
              <Button onClick={onCloseSave}>Add Selected Products</Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ProductModal;
