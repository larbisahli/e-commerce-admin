/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import 'rc-pagination/assets/index.css';

import Uploader from '@components/common/uploader';
import { ImagesSvg } from '@components/icons/images';
import Button from '@components/ui/button';
import Loader from '@components/ui/loader/loader';
import Modal from '@components/ui/modal/modal';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import Pagination2 from '@components/ui/pagination2';
import Thumbs from '@components/ui/thumbs';
import { useFiles } from '@hooks/useFiles';
import { IMAGE_MODAL } from '@ts-types/constants';
import { ImageType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import ImageThumbs from './thumbs';

const limit = 45;

interface Props {
  // eslint-disable-next-line no-unused-vars
  onSelect: ([{ id, image, placeholder }]: ImageType[]) => void;
  selected: ImageType[];
  isThumbnail?: boolean;
  modalId?: string;
  label?: string;
}

const ImageModal = ({
  onSelect,
  selected,
  isThumbnail,
  modalId = 'image_modal',
  label = 'Add product images'
}: Props) => {
  const { t } = useTranslation();

  const { closeModal, openModal } = useModalAction();
  const { isOpen, view, id } = useModalState();

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<ImageType[]>(
    () => selected
  );

  const {
    photos: { items },
    currentPage,
    photosCount,
    loadingPhotos,
    handlePagination
  } = useFiles({ limit });

  useEffect(() => {
    if (!isOpen) {
      setSelectedImages(selected);
    }
  }, [isOpen, selected]);

  const isCurrentModal = modalId === id;

  return (
    <div className="w-full">
      {/* BUTTON */}
      <div className="flex items-center justify-between border-b pb-5">
        <div className="font-medium">{t(label)}</div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            openModal(IMAGE_MODAL, modalId);
          }}
          variant="outline"
        >
          <div className="flex items-center">
            <div className="mr-2">
              <ImagesSvg />
            </div>
            <div className="font-medium">Manage</div>
          </div>
        </Button>
      </div>
      {/* SELECTED IMAGES */}
      <Thumbs photos={selected} modalId={modalId} />
      {/* MODEL */}
      <Modal open={isOpen && isCurrentModal} onClose={closeModal}>
        {view === IMAGE_MODAL && (
          <div className="flex flex-col p-4 bg-white md:min-h-[600px] min-h-[100vh] h-full w-full md:w-[80vw] w-[100vw] 2xl:w-[70vw]">
            <div className="w-fit font-semibold text-lg">Your Image Store</div>
            <div className="py-4 m-2">
              <Uploader setLoading={setLoading} />
            </div>
            <div className="flex m-2 flex-col justify-between relative my-5 min-h-full flex-1">
              <div className="absolute z-10 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {loadingPhotos && (
                  <Loader height="20vh" text={t('common:text-loading')} />
                )}
              </div>
              <div className="overflow-y-auto h-full">
                <ul className="flex flex-wrap items-center md:justify-start px-[8px]">
                  {loading && (
                    <li className="rounded-sm mt-2 me-2 relative">
                      <div className="relative min-w-0 w-24 h-24 overflow-hidden rounded-sm">
                        <div className="h-16 flex items-center justify-center mt-2 ms-2">
                          <Loader simple={true} className="w-6 h-6" />
                        </div>
                      </div>
                    </li>
                  )}
                  <ImageThumbs
                    photos={items}
                    {...{
                      setSelectedImages,
                      selectedImages,
                      isThumbnail
                    }}
                  />
                </ul>
              </div>
              <div className="flex items-center mt-3 justify-between">
                <div className="flex-1">
                  <Pagination2
                    total={photosCount}
                    current={currentPage}
                    pageSize={limit}
                    onChange={handlePagination}
                  />
                </div>
                <Button
                  onClick={() => {
                    onSelect(selectedImages);
                    setSelectedImages([]);
                    closeModal();
                  }}
                >
                  Select
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageModal;
