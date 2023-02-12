import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ProductGallery = ({ initialValues }) => {
  const { t } = useTranslation();

  const { getValues, setValue, watch } = useFormContext();
  const [gallery, setGallery] = useState([]);
  const watchGallery = watch('gallery');

  useEffect(() => {
    if (!isEmpty(initialValues) && isEmpty(watchGallery)) {
      setGallery(getValues('gallery'));
    } else {
      setGallery(watchGallery);
    }
  }, [getValues, initialValues, watchGallery]);

  return (
    <div>
      <ImageModal
        onSelect={(photo) => setValue('gallery', photo)}
        selected={gallery}
        modalId="gallery"
        label="form:label-add-product-images"
      />
      {!isEmpty(initialValues) && (
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
      )}
    </div>
  );
};

export default ProductGallery;
