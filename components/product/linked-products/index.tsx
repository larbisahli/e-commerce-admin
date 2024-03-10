import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import ProductModal from '@components/products-modal';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import { LINKED_PRODUCTS, UPDATE_LINKED_PRODUCTS } from '@graphql/product';
import { useDifferenceWith } from '@hooks/useDifferenceWith';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { LanguageProps } from '@ts-types/custom.types';
import type { Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useEffect, useMemo, useState } from 'react';

import { Actions, useFormReducer } from '../context/form.context';
import CrossSellProducts from './cross-sell-products';
import RelatedProducts from './related-products';
import UpSellProducts from './up-sell-products';

interface Props {
  initialValues: Product | any;
  state: TProduct;
}

interface TProduct {
  relatedProducts: Product['relatedProducts'];
  upsellProducts: Product['upsellProducts'];
  crossSellProducts: Product['crossSellProducts'];
  isUpdateMode: boolean;
}

interface productVariable extends LanguageProps {
  id: number;
}

const LinkedProducts = ({ state, initialValues }: Props) => {
  const { t } = useTranslation('common');

  const dispatch = useFormReducer();

  const { upsellProducts, relatedProducts, crossSellProducts, isUpdateMode } =
    state;

  const { query } = useRouter();

  const productId = parseInt(query.productId as string, 10);

  const { selectedLanguage } = useSettings();

  const [error, setError] = useState(null);

  const {
    data,
    loading,
    error: queryError,
    refetch
  } = useQuery<TProduct, productVariable>(LINKED_PRODUCTS, {
    variables: { id: productId, language: selectedLanguage },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(initialValues) && isEmpty(selectedLanguage)
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updateLinkedProducts, { loading: updateLoading }] = useMutation(
    UPDATE_LINKED_PRODUCTS,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateLinkedProducts: Product }) => {
        if (!isEmpty(data?.updateLinkedProducts)) {
          // setInitProductShippingInfo(data?.updateProductShippingInfo?.productShippingInfo);
          notify(t('common:successfully-updated'), 'success');
          refetch();
        }
      }
    }
  );

  useErrorLogger(error);
  useErrorLogger(queryError);

  useEffect(() => {
    const {
      relatedProducts = [],
      crossSellProducts = [],
      upsellProducts = []
    } = data ?? {};

    // relatedProducts
    dispatch({
      type: Actions.INSERT_PRODUCT_LIST,
      payload: {
        field: 'relatedProducts',
        values: relatedProducts
      }
    });
    // crossSellProducts
    dispatch({
      type: Actions.INSERT_PRODUCT_LIST,
      payload: {
        field: 'crossSellProducts',
        values: crossSellProducts
      }
    });
    // upsellProducts
    dispatch({
      type: Actions.INSERT_PRODUCT_LIST,
      payload: {
        field: 'upsellProducts',
        values: upsellProducts
      }
    });
  }, [data, dispatch]);

  // __ upsellProducts __
  const {
    additions: additionalUpsellProducts,
    deletions: deletedUpsellProducts
  } = useDifferenceWith(upsellProducts, data?.upsellProducts, isUpdateMode);

  // __ relatedProducts __
  const {
    additions: additionalRelatedProducts,
    deletions: deletedRelatedProducts
  } = useDifferenceWith(relatedProducts, data?.relatedProducts, isUpdateMode);

  // __ TAGS __
  const {
    additions: additionalCrossSellProducts,
    deletions: deletedCrossSellProducts
  } = useDifferenceWith(
    crossSellProducts,
    data?.crossSellProducts,
    isUpdateMode
  );

  const isUpdated = useMemo(() => {
    return (
      !isEmpty(additionalUpsellProducts) ||
      !isEmpty(deletedUpsellProducts) ||
      !isEmpty(additionalRelatedProducts) ||
      !isEmpty(deletedRelatedProducts) ||
      !isEmpty(additionalCrossSellProducts) ||
      !isEmpty(deletedCrossSellProducts)
    );
  }, [
    additionalUpsellProducts,
    deletedUpsellProducts,
    additionalRelatedProducts,
    deletedRelatedProducts,
    additionalCrossSellProducts,
    deletedCrossSellProducts
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLinkedProducts({
      variables: {
        id: productId,
        additions: {
          relatedProducts: additionalRelatedProducts,
          upsellProducts: additionalUpsellProducts,
          crossSellProducts: additionalCrossSellProducts
        },
        deletions: {
          relatedProducts: deletedRelatedProducts,
          upsellProducts: deletedUpsellProducts,
          crossSellProducts: deletedCrossSellProducts
        }
      }
    }).catch((err) => {
      setError(err);
    });
  };

  const renderSaveButton = () => {
    if (isUpdated) {
      return (
        <div className="mt-8 flex justify-end border-t pt-4">
          <Button
            loading={updateLoading}
            disabled={updateLoading}
            onClick={handleSubmit}
            renderIcon={<SaveIcon width="1.3rem" height="1.3rem" />}
          >
            <div>{t('form:button-label-save')}</div>
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <Accordion
      loading={loading}
      isUpdated={isUpdated}
      Title={() => t('form:related-up-sells-cross-sells-product')}
    >
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          details={t('form:type-product-group-help-text')}
          className="w-full px-0 pb-5 sm:w-1/4 sm:py-8 sm:pe-4 md:w-1/4 md:pe-5"
        />
        <Card className="w-full sm:w-3/4 md:w-3/4">
          <div className="m-4">
            <RelatedProducts relatedProducts={relatedProducts} />
          </div>
          <div className="m-4">
            <UpSellProducts upsellProducts={upsellProducts} />
          </div>
          <div className="m-4">
            <CrossSellProducts crossSellProducts={crossSellProducts} />
          </div>
          <ProductModal />
          {renderSaveButton()}
        </Card>
      </div>
    </Accordion>
  );
};

export default memo(LinkedProducts);
