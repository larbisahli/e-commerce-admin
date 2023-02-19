import { useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import ProductModal from '@components/products-modal';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import { RECOMMENDATIONS } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import type { Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import CrossSellProducts from './cross-sell-products';
import RelatedProducts from './related-products';
import UpSellProducts from './up-sell-products';

interface Props {
  initialValues: Product | any;
}

interface TProduct {
  relatedProducts: Product[];
  upsellProducts: Product[];
  crossSellProducts: Product[];
}

interface productVariable {
  id: number;
}

const Recommendations = ({ initialValues }: Props) => {
  const { t } = useTranslation('common');

  const { setValue } = useFormContext();

  const { query } = useRouter();

  const productId = parseInt(query.productId as string, 10);

  const { data, loading, error } = useQuery<TProduct, productVariable>(
    RECOMMENDATIONS,
    {
      variables: { id: productId },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(initialValues)
    }
  );

  useErrorLogger(error);

  useEffect(() => {
    const {
      relatedProducts = [],
      crossSellProducts = [],
      upsellProducts = []
    } = data ?? {};
    setValue('relatedProducts', relatedProducts);
    setValue('crossSellProducts', crossSellProducts);
    setValue('upsellProducts', upsellProducts);
  }, [data, setValue]);

  return (
    <Accordion
      loading={loading}
      isUpdated={false}
      Title={() => t('form:related-up-sells-cross-sells-product')}
    >
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          details={t('form:type-and-category-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="m-4">
            <RelatedProducts initialValues={initialValues} />
          </div>
          <div className="m-4">
            <UpSellProducts initialValues={initialValues} />
          </div>
          <div className="m-4">
            <CrossSellProducts initialValues={initialValues} />
          </div>
          <ProductModal />
          {!isEmpty(initialValues) && (
            <div className="mt-12 flex justify-end border-t pt-4">
              <Button
              // loading={updating || creating}
              // disabled={updating || creating}
              >
                <div className="mr-1">
                  <SaveIcon width="1.3rem" height="1.3rem" />
                </div>
                <div>{t('form:button-label-save')}</div>
              </Button>
            </div>
          )}
        </Card>
      </div>
    </Accordion>
  );
};

export default memo(Recommendations);
