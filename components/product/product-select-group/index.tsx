import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import { UPDATE_PRODUCT_SELECT_GROUP } from '@graphql/product';
import { useDifferenceWith } from '@hooks/useDifferenceWith';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import { Category, Product, Suppliers, Tag } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useMemo, useState } from 'react';

import ProductCategory from './product-category';
import ProductSupplier from './product-supplier';
import ProductTag from './product-tag';

interface Props {
  initialValues: Product;
  state: {
    categories: Product['categories'];
    tags: Product['tags'];
    suppliers: Product['suppliers'];
    isUpdateMode: boolean;
  };
}

const ProductSelectGroup = ({ state, initialValues }: Props) => {
  const { t } = useTranslation('common');
  const { query } = useRouter();

  const productId = parseInt(query.productId as string, 10);

  const { categories, suppliers, tags, isUpdateMode } = state;

  const [initProductCategories, setInitProductCategories] = useState<
    Category[]
  >(() => initialValues?.categories);
  const [initProductTags, setInitProductTags] = useState<Tag[]>(
    () => initialValues?.tags
  );
  const [initProductSuppliers, setInitProductSuppliers] = useState<Suppliers[]>(
    () => initialValues?.suppliers
  );

  // __ CATEGORIES __
  const { additions: additionalCategories, deletions: deletedCategories } =
    useDifferenceWith(categories, initProductCategories, isUpdateMode);

  // __ SUPPLIERS __
  const { additions: additionalSuppliers, deletions: deletedSuppliers } =
    useDifferenceWith(suppliers, initProductSuppliers, isUpdateMode);

  // __ TAGS __
  const { additions: additionalTags, deletions: deletedTags } =
    useDifferenceWith(tags, initProductTags, isUpdateMode);

  const isUpdated = useMemo(() => {
    return (
      !isEmpty(additionalCategories) ||
      !isEmpty(deletedCategories) ||
      !isEmpty(additionalSuppliers) ||
      !isEmpty(deletedSuppliers) ||
      !isEmpty(additionalTags) ||
      !isEmpty(deletedTags)
    );
  }, [
    additionalCategories,
    deletedCategories,
    additionalSuppliers,
    deletedSuppliers,
    additionalTags,
    deletedTags
  ]);

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updateProductSelectGroup, { loading }] = useMutation(
    UPDATE_PRODUCT_SELECT_GROUP,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateProductSelectGroup: Product }) => {
        const {
          categories = [],
          tags = [],
          suppliers = []
        } = data?.updateProductSelectGroup;
        if (!isEmpty(categories) || !isEmpty(tags) || !isEmpty(suppliers)) {
          if (!isEmpty(categories)) {
            setInitProductCategories(categories);
          }
          if (!isEmpty(tags)) {
            setInitProductTags(tags);
          }
          if (!isEmpty(suppliers)) {
            setInitProductSuppliers(suppliers);
          }
          notify(t('common:successfully-updated'), 'success');
        }
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // In case removed all the categories
    if (isEmpty(additionalCategories) && !isEmpty(deletedCategories)) {
      return notify('Product category should not be empty', 'error');
    }

    updateProductSelectGroup({
      variables: {
        id: productId,
        additions: {
          categories: additionalCategories,
          tags: additionalTags,
          suppliers: additionalSuppliers
        },
        deletions: {
          categories: deletedCategories,
          tags: deletedTags,
          suppliers: deletedSuppliers
        }
      }
    }).catch((err) => {
      console.log({ err });
      // TODO: Error product context
      // setError(err);
    });
  };

  const renderSaveButton = () => {
    if (isUpdated) {
      return (
        <div className="mt-12 flex justify-end border-t pt-4">
          <Button loading={loading} disabled={loading} onClick={handleSubmit}>
            <div className="mr-1">
              <SaveIcon width="1.3rem" height="1.3rem" />
            </div>
            <div>{t('form:button-label-save')}</div>
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <Accordion isUpdated={isUpdated} Title={() => t('form:type-and-category')}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          details={t('form:type-and-category-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ProductCategory
            categories={categories}
            setInitProductCategories={setInitProductCategories}
          />
          <ProductSupplier
            suppliers={suppliers}
            setInitProductSuppliers={setInitProductSuppliers}
          />
          <ProductTag tags={tags} setInitProductTags={setInitProductTags} />
          {renderSaveButton()}
        </Card>
      </div>
    </Accordion>
  );
};

export default memo(ProductSelectGroup);
