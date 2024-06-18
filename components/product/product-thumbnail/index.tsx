import { useMutation } from '@apollo/client';
import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import { UPDATE_PRODUCT_THUMBNAIL } from '@graphql/product';
import { useDifferenceWith } from '@hooks/useDifferenceWith';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { notify } from '@lib/notify';
import { ImageType, Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';

import { Actions, useFormReducer } from '../context/form.context';

interface Props {
  initialValues: Product;
  state: {
    thumbnail: Product['thumbnail'];
    isUpdateMode: boolean;
  };
}

const ProductThumbnail = ({ state, initialValues }: Props) => {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const [initThumbnail, setInitThumbnail] = useState(
    () => initialValues?.thumbnail
  );

  const { id: productId } = initialValues;

  const { thumbnail, isUpdateMode } = state;

  const [error, setError] = useState(null);
  useErrorLogger(error);

  const { additions, deletions } = useDifferenceWith(
    thumbnail,
    initThumbnail,
    isUpdateMode
  );

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT_THUMBNAIL, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateProductThumbnail: { id: number } }) => {
      if (!isEmpty(data?.updateProductThumbnail)) {
        setInitThumbnail(thumbnail);
        notify(t('common:successfully-updated'), 'success');
      }
    }
  });

  const onUpdate = (e) => {
    e.preventDefault();
    // Check if the image exits
    if (isEmpty(additions)) {
      notify(t('Please add an image'), 'warning');
    }
    updateProduct({
      variables: {
        id: productId,
        additions: { thumbnail: additions },
        deletions: { thumbnail: deletions }
      }
    }).catch((err) => {
      setError(err);
    });
  };

  const renderSaveButton = () => {
    if (!isEmpty(additions) || !isEmpty(deletions)) {
      return (
        <div className="mt-3 flex justify-end border-t pt-4">
          <Button
            onClick={onUpdate}
            loading={loading}
            disabled={loading}
            renderIcon={<SaveIcon width="1.3rem" height="1.3rem" />}
          >
            <div>{t('form:button-label-save')}</div>
          </Button>
        </div>
      );
    }
    return null;
  };

  const onSelect = (image: ImageType[]) => {
    dispatch({
      type: Actions.THUMBNAIL,
      payload: {
        field: 'thumbnail',
        values: image
      }
    });
  };

  return (
    <div>
      <ImageModal
        onSelect={onSelect}
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
