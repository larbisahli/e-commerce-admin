/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import 'rc-pagination/assets/index.css';

import { DownloadIcon } from '@components/icons/download-icon';
import Trash from '@components/icons/trash';
import ImageComponent from '@components/ImageComponent';
import Button from '@components/ui/button';
import Modal from '@components/ui/modal/modal';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { MEDIA_ITEM_MODAL } from '@ts-types/constants';
import { mediaURL } from '@utils/utils';
import cn from 'classnames';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';

interface Props {}

const ImageViewModal = ({}: Props) => {
  const { t } = useTranslation();

  const { closeModal, openModal } = useModalAction();
  const { isOpen, view, id, meta } = useModalState();

  const { name = '', image = [], itemsCount, createdAt } = meta ?? {};

  const photo = image[0] ?? {};

  const renderImage = () => {
    if (isEmpty(photo)) {
      return null;
    }

    return (
      <div className="flex-2 mx-auto">
        <ImageComponent
          src={photo?.image}
          customPlaceholder={photo?.placeholder}
          width={500}
          height={500}
          objectFit="cover"
        />
      </div>
    );
  };

  const renderSize = () => {
    if (isEmpty(photo)) {
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
    if (isEmpty(photo)) {
      return null;
    }

    return (
      <>
        <div className="my-2">
          <span className="font-medium pr-1">File type:</span>
          <span className="text-gray-800">{'PNG'}</span>
        </div>
        <div className="my-2">
          <span className="font-medium pr-1">MIME-Type:</span>
          <span className="text-gray-800">{'image/png'}</span>
        </div>
      </>
    );
  };

  const renderItems = () => {
    if (isEmpty(photo)) {
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
    if (isEmpty(photo)) {
      return null;
    }
    return (
      <>
        <div className="my-2">
          <span className="font-medium pr-1">Width:</span>
          <span className="text-gray-800">{`${785}px`}</span>
        </div>
        <div className="my-2">
          <span className="font-medium pr-1">Height:</span>
          <span className="text-gray-800">{`${504}px`}</span>
        </div>
      </>
    );
  };

  const renderDeleteButton = () => {
    if (isEmpty(photo)) {
      return;
    }

    return (
      <div className="absolute bottom-0 right-0">
        <Button
          // onClick={onDelete}
          // loading={deleteBtnLoading}
          // disabled={deleteBtnLoading}
          variant="custom"
          className={cn(
            'w-fit py-2 px-4 bg-red-600 focus:outline-none hover:bg-red-700 focus:bg-red-700 text-light transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md'
          )}
        >
          {t('button-delete')}
        </Button>
      </div>
    );
  };

  const renderDownloadButton = () => {
    if (isEmpty(photo)) {
      return;
    }

    return (
      <div className="my-5">
        <Button
          onClick={() => saveAs(`${mediaURL}/${photo.image}`, `${name}.png`)}
          variant="outline"
          className="text-blue-500"
        >
          <div className="px-2">
            <DownloadIcon width={25} height={25} />
          </div>
          {'Download'}
        </Button>
      </div>
    );
  };

  const renderDate = () => {
    if (isEmpty(photo)) {
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
          <div className="flex max-h-screen overflow-y-auto flex-col bg-white md:h-fit h-[100vh] w-[100vw] md:w-[70vw] 2xl:w-[60vw]">
            <div className="p-4 h-fit min-h-[400px] w-full">
              <h3 className="cut-line-1">{name}</h3>
              <div className="flex flex-wrap mt-8">
                {renderImage()}
                <div className="flex-1 p-3 relative">
                  <div className="my-2">
                    <span className="font-medium pr-1">Name:</span>
                    <span className="">{name}</span>
                  </div>
                  {renderSize()}
                  {renderItems()}
                  {renderType()}
                  {renderDate()}
                  {renderImageDimensions()}
                  {renderDeleteButton()}
                  {renderDownloadButton()}
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
