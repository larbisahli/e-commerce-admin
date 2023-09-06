/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import 'rc-pagination/assets/index.css';

import Uploader from '@components/common/uploader';
import { ArrowPrev } from '@components/icons/arrow-prev';
import { ImagesSvg } from '@components/icons/images';
import { UploadIcon } from '@components/icons/upload-icon';
import Button from '@components/ui/button';
import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import Modal from '@components/ui/modal/modal';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import Thumbs from '@components/ui/thumbs';
import { useFiles } from '@hooks/useFiles';
import { IMAGE_MODAL } from '@ts-types/constants';
import { ImageType } from '@ts-types/generated';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import Folder from './folder';
import ImageThumb from './thumb';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onSelect: ([{ id, image, placeholder }]: ImageType[]) => void;
  selected: ImageType[];
  isThumbnail?: boolean;
  modalId?: string;
  label?: string;
  isRequiredLabel?: boolean;
}

const ImageModal = ({
  onSelect,
  selected,
  isThumbnail,
  isRequiredLabel = false,
  modalId = 'image_modal',
  label = 'Add product images'
}: Props) => {
  const { t } = useTranslation();

  const { closeModal, openModal } = useModalAction();
  const { isOpen, view, id } = useModalState();

  const [loadingImage, setLoading] = useState<boolean>(false);
  const [uploadVisible, setUploadVisible] = useState<boolean>(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedImages, setSelectedImages] = useState<ImageType[]>(
    () => selected
  );

  const {
    fileStore: { parent, children },
    loading,
    refetch
  } = useFiles({ id: selectedFolderId });

  useEffect(() => {
    if (!isOpen) {
      setSelectedImages(selected);
    }
  }, [isOpen, selected]);

  const isCurrentModal = modalId === id;

  useEffect(() => {
    if (!isOpen) {
      setUploadVisible(false);
    } else {
      setSelectedFolderId(null);
    }
  }, [isOpen]);

  const handleClick = (id) => {
    setSelectedFolderId(id);
  };

  const handleImageRemoval = (e, id) => {
    e.preventDefault();
    onSelect(selected?.filter((img) => img.id !== id) ?? []);
  };

  return (
    <div className="w-full">
      {/* BUTTON */}
      <div className="flex items-center justify-between border-b pb-5">
        <Label isRequiredLabel={isRequiredLabel}>{t(label)}</Label>
        <Button
          onClick={(e) => {
            e.preventDefault();
            openModal(IMAGE_MODAL, modalId);
          }}
          variant="normal"
        >
          <div className="flex items-center">
            <div className="mr-2">
              <ImagesSvg />
            </div>
            <div className="font-medium capitalize">Open media</div>
          </div>
        </Button>
      </div>
      {/* SELECTED IMAGES */}
      <Thumbs
        isThumbnail={isThumbnail}
        photos={selected}
        handleImageRemoval={handleImageRemoval}
      />
      {/* MODEL */}
      <Modal open={isOpen && isCurrentModal} onClose={closeModal}>
        {view === IMAGE_MODAL && (
          <div className="flex h-[100vh] max-h-screen w-[100vw] flex-col overflow-y-auto bg-white md:h-fit md:w-[70vw] 2xl:w-[60vw]">
            <div className="bg-blue-600 p-4 text-lg font-semibold capitalize text-white">
              Choose media
            </div>
            <div className="h-fit min-h-[400px] w-full p-4">
              <div className="w-fit text-sm text-gray-500">
                Your media files are encrypted for security reasons and only
                accessed by you.
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
                <div className="m-2 py-4">
                  <Uploader
                    setLoading={setLoading}
                    mediaId={parent?.id}
                    refetch={refetch}
                  />
                </div>
              )}
              <div className="item-center flex">
                {!!parent?.name && (
                  <button
                    className={cn(
                      'flex items-center justify-center p-2 text-lg text-gray-500 underline hover:text-black'
                    )}
                    onClick={() => handleClick(parent?.parentId)}
                  >
                    <div className="mx-2">
                      <ArrowPrev width="16px" height="16px" />
                    </div>
                    <div>{parent?.name}</div>
                  </button>
                )}
              </div>
              <div className="relative my-5 flex flex-1 flex-col justify-between border-t">
                <div className="absolute top-1/3 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
                  {loading && (
                    <Loader height="20vh" text={t('common:text-loading')} />
                  )}
                </div>
                <div className="h-full w-full">
                  <ul className="my-4 flex min-h-[400px] w-full flex-wrap overflow-y-auto md:max-h-[600px]">
                    {loadingImage && (
                      <li className="relative mt-2 h-40 w-36 rounded-sm bg-blue-100 me-2">
                        <div className="relative h-40 w-36 min-w-0 overflow-hidden rounded-sm">
                          <div className="flex h-full items-center justify-center">
                            <Loader simple={true} className="h-6 w-6" />
                          </div>
                        </div>
                      </li>
                    )}
                    {children?.map((child) => {
                      if (isEmpty(child.image)) {
                        return (
                          <Folder
                            key={child.id}
                            folder={child}
                            onClick={handleClick}
                          />
                        );
                      }
                      return (
                        <ImageThumb
                          key={child.id}
                          name={child.name}
                          photo={child?.image[0]}
                          {...{
                            setSelectedImages,
                            selectedImages,
                            isThumbnail
                          }}
                        />
                      );
                    })}
                  </ul>
                </div>
                <div className="mt-3 flex items-center justify-end pb-8 md:mb-0">
                  <Button
                    variant="outline"
                    className="mr-4"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      onSelect(selectedImages);
                      setSelectedImages([]);
                      closeModal();
                    }}
                  >
                    Add media
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
