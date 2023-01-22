/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import 'rc-pagination/assets/index.css';

import Uploader from '@components/common/uploader';
import { ImagesSvg } from '@components/icons/images';
import { UploadIcon } from '@components/icons/upload-icon';
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

const limit = 40;

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
  const [uploadVisible, setUploadVisible] = useState<boolean>(false);
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

  useEffect(() => {
    if (!isOpen) {
      setUploadVisible(false);
    }
  }, [isOpen]);

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
          <div className="flex overflow-y-auto flex-col bg-white md:h-fit h-[100vh] w-[100vw] md:w-[70vw] 2xl:w-[60vw]">
            <div className="p-4 font-semibold text-lg bg-green-600 text-white uppercase">
              Images
            </div>
            <div className="p-4 h-fit min-h-[400px] w-full">
              <div className="w-fit text-gray-500 text-sm">
                Your files are encrypted for security reasons and only accessed
                by you.
              </div>
              <div className="flex justify-end pt-5 pb-2">
                <Button
                  className="flex items-center justify-center"
                  onClick={() => setUploadVisible(true)}
                >
                  <div className="mx-2">
                    <UploadIcon width="30px" height="30px" />
                  </div>
                  <div>Upload Images</div>
                </Button>
              </div>
              {uploadVisible && (
                <div className="py-4 m-2">
                  <Uploader setLoading={setLoading} />
                </div>
              )}
              <div className="flex flex-col justify-between relative my-5 flex-1">
                <div className="absolute z-10 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {loadingPhotos && (
                    <Loader height="20vh" text={t('common:text-loading')} />
                  )}
                </div>
                <div className="h-full w-full min-h-[400px]">
                  <ul className="my-4 image-grid-col-auto grid grid-flow-row gap-4 w-full">
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
                <div className="flex items-center mt-3 md:mb-0 justify-between mb-16">
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
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageModal;
