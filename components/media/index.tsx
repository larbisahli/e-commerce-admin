/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ApolloQueryResult } from '@apollo/client';
import FormActions from '@components/common/FormActions';
import { ArrowPrev } from '@components/icons/arrow-prev';
import EmptyFolderSvg from '@components/icons/emoty-folder';
import Button from '@components/ui/button';
import Loader from '@components/ui/loader/loader';
import { MediaItemPlaceholder } from '@components/ui/placeholders/MediaItem';
import { MediaType } from '@ts-types/generated';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';

import Folder from './folder';
import ImageViewModal from './Image-view-modal';

const Uploader = dynamic(() => import('@components/common/uploader'), {
  ssr: false,
  loading: () => (
    <div
      className=" flex h-36 items-center rounded
  border-2 border-dashed border-border-base"
    >
      <Loader text={'Loading'} />
    </div>
  )
});

type IProps = {
  media: {
    parent: MediaType;
    children: MediaType[];
    mediaTotalCount: { count: number };
  };
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  refetch: (variables?: Partial<any>) => Promise<ApolloQueryResult<any>>;
};

const MediaList = ({ media, refetch, loading }: IProps) => {
  const { t } = useTranslation();
  const { query, back } = useRouter();

  const children = useMemo(() => {
    let childrenCopy = [...(media?.children ?? [])];
    try {
      childrenCopy
        ?.sort((x, y) => Number(y?.createdAt) - Number(x?.createdAt))
        ?.sort((x, y) => Number(isEmpty(y?.image)) - Number(isEmpty(x?.image)));
    } catch (err) {
      console.log('sorting media', { err });
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return childrenCopy;
    }
  }, [media]);

  const id = query.id as string;

  const [newFolderClicked, setNewFolderClicked] = useState(false);
  const [loadingImage, setLoading] = useState<boolean>(false);

  const handleNewFolderButton = () => {
    setNewFolderClicked((prev) => !prev);
  };

  const isMediaReady = !loadingImage && !newFolderClicked && isEmpty(children);

  const renderEmptyMedia = () => {
    if (isMediaReady) {
      return (
        <div className="flex w-full flex-col items-center justify-center pt-8">
          <div className="text-blue-400">
            <EmptyFolderSvg />
          </div>
          <span className="text-lg font-medium capitalize text-gray-600">
            Nothing found
          </span>
          <p className="text-sm text-gray-500">
            Try to create a new folder or upload an image
          </p>
        </div>
      );
    }
    return null;
  };

  const { count = 0 } = media?.mediaTotalCount ?? {};

  const isLoading = loading && isEmpty(media);

  const renderLoader = () => {
    if (isLoading) {
      return (
        <div>
          <div className="mt-8 flex w-full justify-center">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {Array.from({ length: 8 })?.map((_, idx) => (
                <MediaItemPlaceholder key={idx} />
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderImageLoader = () => {
    if (!loadingImage) {
      return null;
    }
    return <MediaItemPlaceholder loader />;
  };

  const renderMediaContent = () => {
    if (isLoading) {
      return null;
    }
    return (
      <div className="mb-6 mt-8 flex w-full justify-center">
        <div
          className={cn(
            'grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
            {
              hidden: isMediaReady
            }
          )}
        >
          {renderImageLoader()}
          {newFolderClicked && (
            <Folder
              folder={{}}
              isCreateMode
              refetch={refetch}
              handleNewFolderButton={handleNewFolderButton}
            />
          )}
          {children?.map((child) => <Folder key={child.id} folder={child} />)}
        </div>
        {renderEmptyMedia()}
      </div>
    );
  };

  return (
    <>
      <ImageViewModal />
      <FormActions isCustom>
        <div
          className={cn('flex w-full items-center justify-between', {
            'justify-between': id
          })}
        >
          <div className="flex items-center">
            {id && (
              <Button
                variant="outline"
                onClick={back}
                className="flex items-center justify-center me-4"
                type="button"
              >
                <ArrowPrev width={18} height={18} />
                <span className="pl-2">{media?.parent?.name}</span>
              </Button>
            )}
            <div className="text-sm font-semibold text-gray-600">{`${count} ${
              count > 1 ? 'images' : 'image'
            } found`}</div>
          </div>
          <Button
            onClick={handleNewFolderButton}
            variant="outline"
            size="small"
            className="!border-blue-500 text-blue-500 hover:!bg-blue-500 hover:text-white"
          >
            {t('form:button-label-add-folder')}
          </Button>
        </div>
      </FormActions>
      <div className="relative my-2 bg-white">
        <Uploader
          setLoading={setLoading}
          mediaId={id}
          refetch={refetch}
          disable={isLoading}
        />
      </div>
      {renderLoader()}
      {renderMediaContent()}
    </>
  );
};

export default MediaList;
