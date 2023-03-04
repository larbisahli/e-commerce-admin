import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import { useDifferenceWith } from '@hooks/useDifferenceWith';
import { ImageType, Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';

import { Actions, useFormReducer } from '../context/form.context';

interface Props {
  initialValues: Product;
  state: {
    gallery: Product['gallery'];
    isUpdateMode: boolean;
  };
}

const ProductGallery = ({ state, initialValues }: Props) => {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const { gallery, isUpdateMode } = state;

  const { additions, deletions } = useDifferenceWith(
    gallery,
    initialValues?.gallery,
    isUpdateMode
  );

  const renderSaveButton = () => {
    if (!isEmpty(additions) || !isEmpty(deletions)) {
      return (
        <div className="mt-3 flex justify-end border-t pt-4">
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

  const onSelect = (images: ImageType[]) => {
    dispatch({
      type: Actions.GALLERY,
      payload: {
        field: 'gallery',
        values: images
      }
    });
  };

  return (
    <div>
      <ImageModal
        onSelect={onSelect}
        selected={gallery}
        modalId="gallery"
        label="form:label-add-product-images"
      />
      {renderSaveButton()}
    </div>
  );
};

export default memo(ProductGallery);
