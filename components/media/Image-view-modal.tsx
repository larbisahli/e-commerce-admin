/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import 'rc-pagination/assets/index.css';

import { useMutation } from '@apollo/client';
import { DownloadIcon } from '@components/icons/download-icon';
import TrashIcon from '@components/icons/trash';
import ImageComponent from '@components/ImageComponent';
import Button from '@components/ui/button';
import Modal from '@components/ui/modal/modal';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_IMAGE, MEDIA } from '@graphql/media';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch, useGetClient } from '@hooks/useGetClient';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
import { MEDIA_ITEM_MODAL } from '@ts-types/constants';
import { mediaURL } from '@utils/utils';
import cn from 'classnames';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import ReactPlayer from 'react-player';

const ImageViewModal = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();
  const { closeModal } = useModalAction();
  const { isOpen, view, id: parentId = null, meta } = useModalState();

  const {
    userInfo: { csrfToken, store: { etag } = {} }
  } = useGetClient();

  const [deletePhoto, { loading }] = useMutation(DELETE_IMAGE, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    refetchQueries: [
      {
        variables: {
          id: parentId,
          page: 1,
          limit: 10,
          etag: etag?.mediaEtag
        },
        query: MEDIA
      }
    ]
  });

  useErrorLogger(error);

  const {
    id: mediaId,
    name = '',
    image = [],
    itemsCount,
    createdAt
  } = meta ?? {};

  const photo = image[0] ?? {};

  const isFolder = isEmpty(photo);

  const renderImage = () => {
    if (isFolder) {
      return null;
    }

    const { width, height } =
      photo.width > 600
        ? {
            width: Math.round(photo.width / 2),
            height: Math.round(photo.height / 2)
          }
        : photo;

    if (photo.mimeType === 'video/mp4') {
      return (
        <div className="flex-2 relative mx-2 min-h-[200px] min-w-[500px] rounded-xl border shadow">
          <div className="flex-0 absolute top-0 right-0 z-30 p-2">
            {renderActionButtons()}
          </div>
          <ReactPlayer
            className="max-h-[500px]"
            url={`${mediaURL}/${photo?.image}`}
            width={500}
            height={500}
            controls={true}
          />
        </div>
      );
    }

    return (
      <div
        className="flex-2 relative mx-2 flex items-center justify-center rounded-lg border shadow"
        style={{ height: `${height}px`, minHeight: '150px' }}
      >
        <div className="flex-0 absolute top-0 right-0 z-30 p-2">
          {renderActionButtons()}
        </div>
        <ImageComponent
          src={photo?.image}
          customPlaceholder={photo?.placeholder}
          width={width}
          height={height}
          className="rounded-lg"
          objectFit="cover"
        />
      </div>
    );
  };

  const renderSize = () => {
    if (isFolder) {
      return null;
    }

    return (
      <div className="my-3">
        <div className="pr-1 text-sm font-medium text-black">Size</div>
        <div className="text-sm text-gray-600">
          {photo?.size?.formatBytes()}
        </div>
      </div>
    );
  };

  const renderType = () => {
    if (isFolder) {
      return null;
    }

    let fileTypeEle = <div className="text-gray-600">Image</div>;

    if (photo.mimeType === 'video/mp4') {
      fileTypeEle = <div className="text-gray-600">Video</div>;
    }

    return (
      <>
        <div className="my-3">
          <div className="pr-1 text-sm font-medium text-black">File type</div>
          {fileTypeEle}
        </div>
        <div className="my-3">
          <div className="pr-1 text-sm font-medium text-black">MIME-Type:</div>
          <div className="text-sm text-gray-600">{photo.mimeType}</div>
        </div>
      </>
    );
  };

  const renderItems = () => {
    if (isFolder) {
      return (
        <div className="my-3">
          <div className="pr-1 text-sm font-medium text-black">Items</div>
          <div className="text-sm text-gray-600">{itemsCount}</div>
        </div>
      );
    }
    return null;
  };

  const renderImageDimensions = () => {
    if (isFolder || photo.mimeType === 'video/mp4') {
      return null;
    }
    return (
      <>
        <div className="my-3">
          <div className="pr-1 text-sm font-medium text-black">Width</div>
          <div className="text-sm text-gray-600">{`${photo.width}px`}</div>
        </div>
        <div className="my-3">
          <div className="pr-1 text-sm font-medium text-black">Height</div>
          <div className="text-sm text-gray-600">{`${photo.height}px`}</div>
        </div>
      </>
    );
  };

  const deleteMediaPhoto = () => {
    deletePhoto({ variables: { parentId, mediaId, imageId: photo.id } })
      .then(({ data }) => {
        const {
          deleteMediaImage: { id, etag }
        } = data;
        if (id) {
          dispatch(setEtag({ etag }));
          notify(t('common:successfully-deleted'), 'success');
        }
        closeModal();
      })
      .catch((err) => {
        setError(err);
      });
  };

  const renderActionButtons = () => {
    if (isFolder) {
      return;
    }

    return (
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={deleteMediaPhoto}
          loading={loading}
          disabled={loading}
          variant="outline"
          className={cn(
            '!h-8 !w-8 !rounded !bg-red-600 py-2 px-4 !text-white hover:!border-red-900 hover:!bg-red-700'
          )}
        >
          <div className="px-2">
            <TrashIcon width={16} height={16} />
          </div>
        </Button>
        <Button
          onClick={() => saveAs(`${mediaURL}/${photo.image}`, `${name}.png`)}
          variant="outline"
          className="!h-8 !w-8 !rounded !bg-blue-600 !text-white hover:!border-blue-900 hover:!bg-blue-700"
        >
          <div className="px-2">
            <DownloadIcon width={16} height={16} />
          </div>
        </Button>
      </div>
    );
  };

  const renderDate = () => {
    return (
      <div className="my-3">
        <div className="pr-1 text-sm font-medium text-black">Created</div>
        <div className="text-sm text-gray-600">{`${dayjs(createdAt).format(
          'MMM D, YYYY'
        )} at ${dayjs(createdAt).format('h:mm A')}`}</div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* MODEL */}
      <Modal open={isOpen} onClose={closeModal} align="right">
        {view === MEDIA_ITEM_MODAL && (
          <div className="flex h-full w-full flex-col overflow-auto">
            <div
              className="border-b border-gray-200 bg-gray-100 p-4 text-lg font-semibold capitalize
              text-gray-600"
            >
              {name}
            </div>
            <div className="mt-2 flex h-full flex-col gap-3">
              {renderImage()}
              <div className="mt-2 flex h-full w-full flex-1 flex-col pb-8">
                <div className="flex h-full flex-col">
                  <div className="relative flex-1">
                    <div className="border-t border-gray-300 px-3 pt-4">
                      <div className="pb-2 font-medium">File details</div>
                      <div className="mb-2">
                        <div className="pr-1 text-sm font-medium text-black">
                          Name
                        </div>
                        <div className="text-sm text-gray-600">{name}</div>
                      </div>
                      {renderType()}
                      {renderSize()}
                      {renderItems()}
                      {renderDate()}
                      {renderImageDimensions()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageViewModal;
