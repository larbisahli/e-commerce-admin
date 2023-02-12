import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ProductThumbnail = ({ initialValues }) => {
  const { t } = useTranslation();

  const { getValues, setValue, watch } = useFormContext();
  const [thumbnail, setThumbnail] = useState([]);
  const watchThumbnail = watch('thumbnail');
  useEffect(() => {
    // When the initialValues is not empty the watchThumbnail
    // doesn't initially update itself same for gallery
    if (!isEmpty(initialValues) && isEmpty(watchThumbnail)) {
      setThumbnail(getValues('thumbnail'));
    } else {
      setThumbnail(watchThumbnail);
    }
  }, [getValues, initialValues, watchThumbnail]);

  return (
    <div>
      <ImageModal
        onSelect={(photo) => {
          console.log('thumbnail', photo);
          setValue('thumbnail', photo);
        }}
        selected={thumbnail}
        isThumbnail
        modalId="thumbnail"
        label="form:label-add-product-thumbnail"
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

export default ProductThumbnail;
