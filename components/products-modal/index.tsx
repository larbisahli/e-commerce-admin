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
import { useSettings } from '@hooks/useSettings';
import {
  CROSS_SELL_PRODUCTS,
  PRODUCT_MODAL,
  RELATED_PRODUCTS,
  UPSELL_PRODUCTS
} from '@ts-types/constants';
import { TableQueryVariables } from '@ts-types/custom.types';
import { OrderBy, SortOrder } from '@ts-types/enums';
import { LanguageType, Product } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

interface TProduct {
  products: Product[];
  productCount: { count: number };
}

interface ProductVariable extends TableQueryVariables {
  id: number;
}

const ProductModal = () => {
  const { t } = useTranslation();

  const { closeModal } = useModalAction();
  const { isOpen, id, meta } = useModalState();

  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<{ id: string }[]>(
    []
  );
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  const { query } = useRouter();

  const { selectedLanguage } = useSettings();

  const productId = parseInt(query.productId as string, 10);

  const { data, loading, error, fetchMore } = useQuery<
    TProduct,
    ProductVariable
  >(PRODUCTS, {
    variables: {
      id: productId,
      page,
      limit: limit.value,
      orderBy,
      sortedBy: SortOrder.Desc,
      language: selectedLanguage
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage)
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
    <Modal open={open} onClose={onClose} align="right">
      <div className="flex h-[100vh] max-h-screen w-[100vw] flex-col overflow-y-auto bg-white md:h-fit md:w-[60vw] 2xl:w-[50vw]">
        <div
          className="border-b border-gray-200 bg-gray-100 p-4 text-lg font-semibold capitalize
           text-gray-800"
        >
          Products
        </div>
        <ProductListMini
          products={products}
          loading={loading}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
        <div className="m-3 mb-16 flex h-fit items-center justify-between p-5 md:mb-0">
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
      </div>
    </Modal>
  );
};

export default ProductModal;
