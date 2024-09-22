import { ApolloQueryResult, useMutation } from '@apollo/client';
import DotsIcon from '@components/icons/dots';
import FolderSvg from '@components/icons/folder';
import ImageComponent from '@components/ImageComponent';
import { useModalAction } from '@components/ui/modal/modal.context';
import { CREATE_FOLDER } from '@graphql/media';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch } from '@hooks/useGetClient';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
import { MEDIA_ITEM_MODAL } from '@ts-types/constants';
import { MediaType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

type IProps = {
  folder?: MediaType;
  isCreateMode?: boolean;
  handleNewFolderButton?: () => void;
  // eslint-disable-next-line no-unused-vars
  refetch?: (variables?: Partial<any>) => Promise<ApolloQueryResult<any>>;
};

export default function Folder({
  folder,
  isCreateMode = false,
  handleNewFolderButton,
  refetch
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const { openModal } = useModalAction();

  const id = router.query.id as string;

  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();
  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [createFolder, { loading: creating }] = useMutation(CREATE_FOLDER, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createMediaFolder: MediaType }) => {
      if (data.createMediaFolder?.id) {
        const { etag } = data.createMediaFolder;
        dispatch(setEtag({ etag }));
        notify(t('common:successfully-created'), 'success');
        refetch();
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = async () => {
    const name = document.getElementById('editable_input').innerText?.trim();

    const variables = {
      parentId: id,
      name
    };

    if (isEmpty(name)) {
      notify('Folder could not be saved: Please enter a name.', 'error');
      handleNewFolderButton();
      return;
    }
    handleNewFolderButton();
    createFolder({ variables }).catch((err) => {
      setError(err);
    });
  };

  useEffect(() => {
    if (isCreateMode) {
      document.getElementById('editable_input').focus();
    }
  }, [isCreateMode]);

  const renderTitle = () => {
    if (isCreateMode) {
      return (
        <span
          onBlur={onSubmit}
          contentEditable={isCreateMode}
          id="editable_input"
          className="mt-4 w-44 break-all rounded-sm px-2
       text-center capitalize text-gray-500 outline-none focus:outline-blue-300"
        ></span>
      );
    }
    return (
      <span className="cut-line-2 mt-4 break-all text-center capitalize text-gray-500">
        {folder?.name}
      </span>
    );
  };

  const renderSpinner = () => {
    if (creating) {
      return (
        <span className="absolute my-2 h-8 w-8 animate-spin rounded-full border-2 border-t-2 border-transparent border-t-blue-400 ms-2" />
      );
    }
    return null;
  };

  const { image = [] } = folder;
  const photo = image[0] ?? {};

  const handleModalClick = (e) => {
    e.preventDefault();
    openModal(MEDIA_ITEM_MODAL, id, folder);
  };

  const renderFolder = () => {
    return (
      <Link href={`${ROUTES.MEDIA}/${folder?.id}`}>
        <div
          title={folder?.name}
          className="relative flex h-fit w-48 cursor-pointer flex-col items-center p-5 hover:bg-blue-100"
        >
          {renderSpinner()}
          <div className="group relative flex h-40 w-40 items-center justify-center rounded border border-gray-300 bg-gray-100">
            <button
              onClick={handleModalClick}
              className="absolute top-0 right-0 z-30 hidden cursor-pointer bg-white px-1 text-black group-hover:block"
            >
              <div className="rotate-90">
                <DotsIcon />
              </div>
            </button>
            <div className="m-2">
              <FolderSvg width={55} height={55} />
            </div>
          </div>
          {renderTitle()}
        </div>
      </Link>
    );
  };

  const renderImage = () => {
    return (
      <div
        title={folder?.name}
        className="group flex h-fit w-48 flex-col items-center p-5 hover:bg-blue-100"
      >
        <button
          onClick={handleModalClick}
          className="relative flex h-40 w-40 items-center justify-center rounded border border-gray-300 bg-gray-100"
        >
          <button className="absolute top-0 right-0 z-30 hidden cursor-pointer bg-white px-1 text-black group-hover:block">
            <div className="rotate-90">
              <DotsIcon />
            </div>
          </button>
          <div className="absolute top-0 left-0 z-30 rounded-sm bg-black p-[2px] text-xs text-white">
            {photo?.size?.formatBytes()}
          </div>
          <ImageComponent
            src={photo?.image}
            customPlaceholder={photo?.placeholder}
            width={160}
            height={160}
            objectFit="cover"
          />
        </button>
        {renderTitle()}
      </div>
    );
  };

  if (isEmpty(image)) {
    return renderFolder();
  }

  return renderImage();
}
