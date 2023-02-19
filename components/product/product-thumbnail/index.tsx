import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import { useDifferenceWith } from '@hooks/useDifferenceWith';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const ProductThumbnail = ({ initialValues }) => {
  const { t } = useTranslation();

  const { control, getValues, setValue } = useFormContext();
  const [thumbnail, setThumbnail] = useState([]);
  const watchThumbnail = useWatch({ control, name: 'thumbnail', exact: true });

  useEffect(() => {
    // When the initialValues is not empty the watchThumbnail
    // doesn't initially update itself
    if (!isEmpty(initialValues) && isEmpty(watchThumbnail)) {
      setThumbnail(getValues('thumbnail'));
    } else {
      setThumbnail(watchThumbnail);
    }
  }, [getValues, initialValues, watchThumbnail]);

  const { additions, deletions } = useDifferenceWith(
    thumbnail,
    initialValues?.thumbnail
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
        onSelect={(photo) => {
          console.log('thumbnail', photo);
          setValue('thumbnail', photo);
        }}
        selected={thumbnail}
        isThumbnail
        modalId="thumbnail"
        label="form:label-add-product-thumbnail"
      />
      {renderSaveButton()}
    </div>
  );
};

export default memo(ProductThumbnail);
