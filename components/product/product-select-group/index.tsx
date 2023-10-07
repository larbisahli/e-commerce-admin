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
import {
  Category,
  ManufacturerType,
  Product,
  Suppliers,
  Tag
} from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useMemo, useState } from 'react';

import ProductCategory from './product-category';
import ProductManufacturer from './product-manufacturer';
import ProductSupplier from './product-supplier';
import ProductTag from './product-tag';

interface Props {
  initialValues: Product;
  state: {
    categories: Product['categories'];
    manufacturers: Product['manufacturers'];
    tags: Product['tags'];
    suppliers: Product['suppliers'];
    isUpdateMode: boolean;
  };
}

const ProductSelectGroup = ({ state, initialValues }: Props) => {
  const { t } = useTranslation('common');
  const { query } = useRouter();

  const productId = parseInt(query.productId as string, 10);

  const { categories, manufacturers, suppliers, tags, isUpdateMode } = state;

  const [initProductCategories, setInitProductCategories] = useState<
    Category[]
  >(() => initialValues?.categories);
  const [initProductTags, setInitProductTags] = useState<Tag[]>(
    () => initialValues?.tags
  );
  const [initProductSuppliers, setInitProductSuppliers] = useState<Suppliers[]>(
    () => initialValues?.suppliers
  );
  const [initProductManufacturers, setInitProductManufacturers] = useState<
    ManufacturerType[]
  >(() => initialValues?.manufacturers);

  // __ CATEGORIES __
  const { additions: additionalCategories, deletions: deletedCategories } =
    useDifferenceWith(categories, initProductCategories, isUpdateMode);

  // __ SUPPLIERS __
  const { additions: additionalSuppliers, deletions: deletedSuppliers } =
    useDifferenceWith(suppliers, initProductSuppliers, isUpdateMode);

  // __ TAGS __
  const { additions: additionalTags, deletions: deletedTags } =
    useDifferenceWith(tags, initProductTags, isUpdateMode);

  // __ TAGS __
  const { additions: additionalManufacturer, deletions: deletedManufacturer } =
    useDifferenceWith(manufacturers, initProductManufacturers, isUpdateMode);

  const isUpdated = useMemo(() => {
    return (
      !isEmpty(additionalCategories) ||
      !isEmpty(deletedCategories) ||
      !isEmpty(additionalSuppliers) ||
      !isEmpty(deletedSuppliers) ||
      !isEmpty(additionalTags) ||
      !isEmpty(deletedTags) ||
      !isEmpty(additionalManufacturer) ||
      !isEmpty(deletedManufacturer)
    );
  }, [
    additionalCategories,
    deletedCategories,
    additionalSuppliers,
    deletedSuppliers,
    additionalTags,
    deletedTags,
    additionalManufacturer,
    deletedManufacturer
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
        if (!isEmpty(data.updateProductSelectGroup)) {
          const {
            categories = [],
            tags = [],
            suppliers = [],
            manufacturers
          } = data.updateProductSelectGroup;
          setInitProductCategories(categories);
          setInitProductTags(tags);
          setInitProductSuppliers(suppliers);
          setInitProductManufacturers(manufacturers);
          notify(t('common:successfully-updated'), 'success');
        }
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // In case removed all the categories
    if (isEmpty(categories)) {
      return notify('Product category should not be empty', 'error');
    }

    updateProductSelectGroup({
      variables: {
        id: productId,
        additions: {
          categories: additionalCategories,
          tags: additionalTags,
          suppliers: additionalSuppliers,
          manufacturers: additionalManufacturer
        },
        deletions: {
          categories: deletedCategories,
          tags: deletedTags,
          suppliers: deletedSuppliers,
          manufacturers: deletedManufacturer
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
    <Accordion isUpdated={isUpdated} Title={() => t('form:type-product-group')}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          details={t('form:type-product-group-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ProductCategory categories={categories} />
          <ProductManufacturer manufacturers={manufacturers} />
          <ProductSupplier suppliers={suppliers} />
          <ProductTag tags={tags} />
          {renderSaveButton()}
        </Card>
      </div>
    </Accordion>
  );
};

export default memo(ProductSelectGroup);
