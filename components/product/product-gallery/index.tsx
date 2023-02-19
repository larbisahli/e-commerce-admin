import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import { useDifferenceWith } from '@hooks/useDifferenceWith';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const ProductGallery = ({ initialValues }) => {
  const { t } = useTranslation();

  const { getValues, setValue, control } = useFormContext();
  const [gallery, setGallery] = useState([]);
  const watchGallery = useWatch({ control, name: 'gallery', exact: true });

  useEffect(() => {
    // When the initialValues is not empty the watchThumbnail
    // doesn't initially update itself
    if (!isEmpty(initialValues) && isEmpty(watchGallery)) {
      setGallery(getValues('gallery'));
    } else {
      setGallery(watchGallery);
    }
  }, [getValues, initialValues, watchGallery]);

  const { additions, deletions } = useDifferenceWith(
    gallery,
    initialValues?.gallery
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

  return (
    <div>
      <ImageModal
        onSelect={(photo) => setValue('gallery', photo)}
        selected={gallery}
        modalId="gallery"
        label="form:label-add-product-images"
      />
      {renderSaveButton()}
    </div>
  );
};

export default memo(ProductGallery);
