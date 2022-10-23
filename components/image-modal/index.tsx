/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { useQuery } from '@apollo/client';
import Uploader from '@components/common/uploader';
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
import { useEffect, useState } from 'react';

import ImageThumbs from './thumbs';

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

  return (
    <div className="h-full w-full">
      {/* BUTTON */}
      <div className="flex items-center justify-between border-b pb-5">
        <div className="font-medium">Add product images</div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            openModal(IMAGE_MODAL);
          }}
          variant="outline"
        >
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
              {(!isEmpty(photos) || loadingPhotos) && (
                <div className="overflow-y-auto md:h-[350px] h-full">
                  <ul className="flex flex-wrap items-center justify-center md:justify-start px-[8px]">
                    {loading && (
                      <li className="rounded-sm mt-2 me-2 relative">
                        <div className="relative min-w-0 w-24 h-24 overflow-hidden rounded-sm">
                          <div className="h-16 flex items-center justify-center mt-2 ms-2">
                            <Loader simple={true} className="w-6 h-6" />
                          </div>
                        </div>
                      </li>
                    )}
                    {!isEmpty(photos) && (
                      <ImageThumbs
                        {...{
                          photos,
                          setSelectedImages,
                          selectedImages,
                          isThumbnail
                        }}
                      />
                    )}
                  </ul>
                </div>
              )}
              {!!photosCount && (
                <div className="flex items-center mt-3 justify-between">
                  <div className="flex-1">
                    <Pagination
                      total={photosCount}
                      current={page}
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
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageModal;
