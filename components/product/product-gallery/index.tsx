import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import { ImageType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';

import { Actions, useForm } from '../context/form.context';

const ProductGallery = () => {
  const { t } = useTranslation();

  const {
    state: { gallery },
    dispatch
  } = useForm();

  const renderSaveButton = () => {
    // eslint-disable-next-line no-constant-condition
    if (false) {
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
