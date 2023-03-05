import { useMutation } from '@apollo/client';
import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import { UPDATE_PRODUCT_GALLERY } from '@graphql/product';
import { useDifferenceWith } from '@hooks/useDifferenceWith';
import { useGetStaff } from '@hooks/useGetStaff';
import { notify } from '@lib/notify';
import { ImageType, Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { Dispatch, memo, useState } from 'react';

import { Actions, useFormReducer } from '../context/form.context';

interface Props {
  initialValues: Product;
  setError: Dispatch<any>;
  state: {
    gallery: Product['gallery'];
    isUpdateMode: boolean;
  };
}

const ProductGallery = ({ state, initialValues, setError }: Props) => {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const { id: productId } = initialValues;

  const [initGallery, setInitGallery] = useState(() => initialValues?.gallery);

  const { gallery, isUpdateMode } = state;

  const { additions, deletions } = useDifferenceWith(
    gallery,
    initGallery,
    isUpdateMode
  );

  const { staffInfo } = useGetStaff();
  const csrfToken = staffInfo?.csrfToken;

  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT_GALLERY, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateProductGallery: { id: number } }) => {
      if (!isEmpty(data?.updateProductGallery)) {
        setInitGallery(gallery);
        notify(t('common:successfully-updated'), 'success');
      }
    }
  });

  const onUpdate = (e) => {
    e.preventDefault();
    console.log({
      id: productId,
      additions: { gallery: additions },
      deletions: { gallery: deletions }
    });
    // Check if the image exits
    updateProduct({
      variables: {
        id: productId,
        additions: { gallery: additions },
        deletions: { gallery: deletions }
      }
    }).catch((err) => {
      setError(err);
    });
  };

  const renderSaveButton = () => {
    if (!isEmpty(additions) || !isEmpty(deletions)) {
      return (
        <div className="mt-3 flex justify-end border-t pt-4">
          <Button onClick={onUpdate} loading={loading} disabled={loading}>
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
