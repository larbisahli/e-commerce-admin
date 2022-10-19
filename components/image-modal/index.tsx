/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { useQuery } from '@apollo/client';
import Uploader from '@components/common/uploader';
import { CheckMark } from '@components/icons/checkmark';
import ImageComponent from '@components/ImageComponent';
import Button from '@components/ui/button';
import Loader from '@components/ui/loader/loader';
import Modal from '@components/ui/modal/modal';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import Thumbs from '@components/ui/thumbs';
import { PHOTOS } from '@graphql/photo';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { IMAGE_MODAL } from '@ts-types/constants';
import { ImageType, OrderBy, SortOrder } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import Pagination from 'rc-pagination';
import { useEffect, useMemo, useState } from 'react';

interface TPhotos {
  getPhotos: ImageType[];
  getPhotosCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

interface Props {
  // eslint-disable-next-line no-unused-vars
  onSelect: ([{ id, image, placeholder }]: ImageType[]) => void;
  selected: ImageType[];
  isThumbnail?: boolean;
}

const limit = 20;

const ImageModal = ({ onSelect, selected, isThumbnail }: Props) => {
  const { t } = useTranslation();

  const { closeModal, openModal } = useModalAction();
  const { isOpen, view } = useModalState();

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<ImageType[]>(
    () => selected
  );
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  useEffect(() => {
    if (!isOpen) {
      setSelectedImages(selected);
    }
  }, [isOpen, selected]);

  const {
    data,
    loading: loadingPhotos,
    error,
    fetchMore
  } = useQuery<TPhotos, OptionsVariable>(PHOTOS, {
    variables: {
      page,
      limit,
      orderBy,
      sortedBy: SortOrder.Desc
    }
  });

  const photosCount = data?.getPhotosCount?.count;
  const photos = data?.getPhotos;

  useErrorLogger(error);

  function handlePagination(current: any) {
    setPage(current);
    fetchMore({
      variables: {
        page: current,
        limit,
        orderBy,
        sortedBy: SortOrder.Desc
      }
    });
  }

  // ----------------------------------

  const thumbs = useMemo(() => {
    if (isEmpty(photos)) {
      return null;
    }

    return photos?.map(({ id, image, placeholder }) => {
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <li
          className="rounded-sm mt-2 me-2 relative cursor-pointer"
          key={id}
          onClick={() => {
            if (isThumbnail) {
              setSelectedImages([{ id, image, placeholder }]);
            } else {
              setSelectedImages((prev) => [
                ...prev,
                { id, image, placeholder }
              ]);
            }
            onSelect;
          }}
          role="button"
        >
          {!isEmpty(selectedImages?.find((value) => value.id === id)) && (
            <div className="absolute top-0 right-0 left-0 bottom-0 w-24 h-24 z-40 flex justify-center items-center text-white">
              <CheckMark simple={true} className="w-8 h-8 z-50" />
            </div>
          )}

          <div className="relative min-w-0 w-24 h-24 overflow-hidden rounded-sm">
            <ImageComponent
              src={image}
              customPlaceholder={placeholder}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </li>
      );
    });
  }, [isThumbnail, onSelect, photos, selectedImages]);

  return (
    <div className="h-full w-full">
      {/* BUTTON */}
      <div className="flex items-center justify-between border-b pb-5">
        <div className="font-medium">Add product images</div>
        <Button onClick={() => openModal(IMAGE_MODAL)} variant="outline">
          Manage
        </Button>
      </div>
      {/* SELECTED IMAGES */}
      <Thumbs photos={selected} />
      {/* MODEL */}
      <Modal open={isOpen} onClose={closeModal}>
        {view === IMAGE_MODAL && (
          <div className="bg-white min-h-[600px] h-full w-full md:w-[80vw]">
            <div className="w-fit p-4 font-semibold text-lg">Store Images</div>
            <div className="m-4">
              <Uploader setLoading={setLoading} />
            </div>
            <div className="flex flex-col justify-between p-4 relative my-5 min-h-full">
              {loadingPhotos && (
                <Loader height="40vh" text={t('common:text-loading')} />
              )}
              {(!!thumbs || loadingPhotos) && (
                <div className="overflow-y-auto md:h-[350px] h-full">
                  <ul className="flex flex-wrap items-center justify-center md:justify-start">
                    {loading && (
                      <li className="rounded-sm mt-2 me-2 relative">
                        <div className="relative min-w-0 w-24 h-24 overflow-hidden rounded-sm">
                          <div className="h-16 flex items-center justify-center mt-2 ms-2">
                            <Loader simple={true} className="w-6 h-6" />
                          </div>
                        </div>
                      </li>
                    )}
                    {!!thumbs && thumbs}
                  </ul>
                </div>
              )}
              {!!photosCount && (
                <div className="flex justify-end items-center mt-3">
                  <Pagination
                    total={photosCount}
                    current={page}
                    pageSize={limit}
                    onChange={handlePagination}
                  />
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
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageModal;
