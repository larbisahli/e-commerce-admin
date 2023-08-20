/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import 'rc-pagination/assets/index.css';

import { useMutation } from '@apollo/client';
import { DownloadIcon } from '@components/icons/download-icon';
import ImageComponent from '@components/ImageComponent';
import Button from '@components/ui/button';
import Modal from '@components/ui/modal/modal';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_IMAGE, MEDIA } from '@graphql/media';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import { MEDIA_ITEM_MODAL } from '@ts-types/constants';
import { mediaURL } from '@utils/utils';
import cn from 'classnames';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const ImageViewModal = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { closeModal } = useModalAction();
  const { isOpen, view, id: parentId = null, meta } = useModalState();

  console.log({ parentId });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

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
          limit: 10
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
            width: Math.round(photo.width / 1.5),
            height: Math.round(photo.height / 1.5)
          }
        : photo;

    return (
      <div className="flex-2 mx-auto">
        <ImageComponent
          src={photo?.image}
          customPlaceholder={photo?.placeholder}
          width={width}
          height={height}
          className="rounded-sm shadow"
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
      <div className="my-2">
        <span className="font-medium pr-1">Size:</span>
        <span className="text-gray-800">{photo?.size?.formatBytes()}</span>
      </div>
    );
  };

  const renderType = () => {
    if (isFolder) {
      return null;
    }

    return (
      <>
        <div className="my-2">
          <span className="font-medium pr-1">File type:</span>
          <span className="text-gray-800 uppercase">
            {photo.mimeType?.split('/')[1]}
          </span>
        </div>
        <div className="my-2">
          <span className="font-medium pr-1">MIME-Type:</span>
          <span className="text-gray-800">{photo.mimeType}</span>
        </div>
      </>
    );
  };

  const renderItems = () => {
    if (isFolder) {
      return (
        <div className="my-2">
          <span className="font-medium pr-1">Items:</span>
          <span className="text-gray-800">{itemsCount}</span>
        </div>
      );
    }
    return null;
  };

  const renderImageDimensions = () => {
    if (isFolder) {
      return null;
    }
    return (
      <>
        <div className="my-2">
          <span className="font-medium pr-1">Width:</span>
          <span className="text-gray-800">{`${photo.width}px`}</span>
        </div>
        <div className="my-2">
          <span className="font-medium pr-1">Height:</span>
          <span className="text-gray-800">{`${photo.height}px`}</span>
        </div>
      </>
    );
  };

  const deleteMediaPhoto = () => {
    deletePhoto({ variables: { parentId, mediaId, imageId: photo.id } })
      .then(({ data }) => {
        const {
          deleteMediaImage: { id }
        } = data;
        if (id) {
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
      <div className="pb-8 pt-10 flex justify-end items-center w-full">
        <Button
          onClick={() => saveAs(`${mediaURL}/${photo.image}`, `${name}.png`)}
          variant="outline"
          className="text-blue-500 mr-6"
        >
          <div className="px-2">
            <DownloadIcon width={25} height={25} />
          </div>
          {'Download'}
        </Button>
        <Button
          onClick={deleteMediaPhoto}
          loading={loading}
          disabled={loading}
          variant="custom"
          className={cn(
            'w-fit py-2 px-4 bg-red-600 focus:outline-none hover:bg-red-700',
            'focus:bg-red-700 text-light transition ease-in duration-200',
            'text-center text-base font-semibold rounded shadow-md'
          )}
        >
          {t('button-delete')}
        </Button>
      </div>
    );
  };

  const renderDate = () => {
    if (isFolder) {
      return (
        <div className="my-2">
          <span className="font-medium pr-1">Created at:</span>
          <span className="">{`${dayjs(createdAt).format(
            'MMM D, YYYY'
          )} at ${dayjs(createdAt).format('h:mm A')}`}</span>
        </div>
      );
    }
    return (
      <div className="my-2">
        <span className="font-medium pr-1">Uploaded at:</span>
        <span className="">{`${dayjs(photo.createdAt).format(
          'MMM D, YYYY'
        )} at ${dayjs(photo.createdAt).format('h:mm A')}`}</span>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* MODEL */}
      <Modal open={isOpen} onClose={closeModal}>
        {view === MEDIA_ITEM_MODAL && (
          <div
            className={cn(
              'flex max-h-screen overflow-y-auto flex-col bg-white md:h-fit',
              'h-[100vh] w-[100vw] md:w-[70vw] 2xl:w-[60vw]',
              { '!w-[450px] !h-[400px]': isFolder }
            )}
          >
            <div className="p-4 h-fit min-h-[400px] w-full">
              <h3 className="cut-line-1">{name}</h3>
              <div className="flex flex-wrap mt-8">
                {renderImage()}
                <div className="flex flex-col w-full">
                  <div className="flex-1">
                    <div className="flex-1 p-3 pt-0 relative">
                      <div className="mb-2">
                        <span className="font-medium pr-1">Name:</span>
                        <span className="">{name}</span>
                      </div>
                      {renderSize()}
                      {renderItems()}
                      {renderType()}
                      {renderDate()}
                      {renderImageDimensions()}
                    </div>
                  </div>
                  {renderActionButtons()}
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
