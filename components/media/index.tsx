/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ApolloQueryResult } from '@apollo/client';
import Uploader from '@components/common/uploader';
import { ArrowPrev } from '@components/icons/arrow-prev';
import EmptyFolderSvg from '@components/icons/emoty-folder';
import ImageComponent from '@components/ImageComponent';
import Button from '@components/ui/button';
import Loader from '@components/ui/loader/loader';
import Modal from '@components/ui/modal/modal';
import { MediaType } from '@ts-types/generated';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Folder from './folder';
import ImageViewModal from './Image-view-modal';

type IProps = {
  media: {
    parent: MediaType;
    children: MediaType[];
  };
  refetch: (variables?: Partial<any>) => Promise<ApolloQueryResult<any>>;
};

type FormValues = {
  name: string;
};

const defaultValues = {
  name: ''
};

const MediaList = ({ media, refetch }: IProps) => {
  const { t } = useTranslation();
  const { query, back } = useRouter();

  const id = query.id as string;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: defaultValues
  });

  const [newFolderClicked, setNewFolderClicked] = useState(false);
  const [loadingImage, setLoading] = useState<boolean>(false);

  const handleNewFolderButton = () => {
    setNewFolderClicked((prev) => !prev);
  };

  const renderEmptyMedia = () => {
    if (isEmpty(media?.children)) {
      return (
        <div className=" w-full flex items-center justify-center flex-col pt-8">
          <div className="text-blue-400">
            <EmptyFolderSvg />
          </div>
          <span className="text-gray-600 font-medium text-lg capitalize">
            Nothing found
          </span>
          <p className="text-gray-500 text-sm">
            Try to create a new folder or upload an image
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <ImageViewModal />
      <div className="relative py-4 m-2">
        <Uploader setLoading={setLoading} mediaId={id} refetch={refetch} />
      </div>
      <div className="mb-6">
        <div
          className={cn('flex justify-end items-center', {
            'justify-between': id
          })}
        >
          {id && (
            <Button
              variant="outline"
              onClick={back}
              className="me-4 flex justify-center items-center"
              type="button"
            >
              <ArrowPrev width={18} height={18} />
              <span className="pl-2">{media.parent.name}</span>
            </Button>
          )}
          <Button
            onClick={handleNewFolderButton}
            variant="outline"
            size="small"
            className="!border-blue-400 text-blue-400 hover:!bg-blue-400 hover:text-white"
          >
            {t('form:button-label-add-folder')}
          </Button>
        </div>
        <div className="mt-14 flex flex-wrap">
          {loadingImage && (
            <Loader height="10vh" text={t('common:text-loading')} />
          )}
          {newFolderClicked && (
            <Folder
              folder={{}}
              isCreateMode
              refetch={refetch}
              handleNewFolderButton={handleNewFolderButton}
            />
          )}
          {media?.children?.map((child) => (
            <Folder key={child.id} folder={child} />
          ))}
          {renderEmptyMedia()}
        </div>
      </div>
    </>
  );
};

export default MediaList;
