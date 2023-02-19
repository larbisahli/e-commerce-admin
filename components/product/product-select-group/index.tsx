import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import { useDifferenceWith } from '@hooks/useDifferenceWith';
import { Nullable } from '@ts-types/custom.types';
import { Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import ProductCategory from './product-category';
import ProductSupplier from './product-supplier';
import ProductTag from './product-tag';

interface Props {
  initialValues: Nullable<Product>;
}

const ProductSelectGroup = ({ initialValues }: Props) => {
  const { t } = useTranslation('common');

  const { control } = useFormContext();

  const categories = useWatch({ control, name: 'categories' });
  const tags = useWatch({ control, name: 'tags' });
  const suppliers = useWatch({ control, name: 'suppliers' });

  // __ CATEGORIES __
  const { additions: additionalCategories, deletions: deletedCategories } =
    useDifferenceWith(categories, initialValues?.categories);

  // __ SUPPLIERS __
  const { additions: additionalSuppliers, deletions: deletedSuppliers } =
    useDifferenceWith(suppliers, initialValues?.suppliers);

  // __ TAGS __
  const { additions: additionalTags, deletions: deletedTags } =
    useDifferenceWith(tags, initialValues?.tags);

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

  const renderSaveButton = () => {
    if (isUpdated) {
      return (
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
          <ProductCategory />
          <ProductSupplier />
          <ProductTag />
          {renderSaveButton()}
        </Card>
      </div>
    </Accordion>
  );
};

export default memo(ProductSelectGroup);
