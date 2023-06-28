import { ApolloQueryResult, useMutation } from '@apollo/client';
import FolderSvg from '@components/icons/folder';
import Loader from '@components/ui/loader/loader';
import { CREATE_FOLDER, MEDIA, UPDATE_FOLDER } from '@graphql/media';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/notify';
import { MediaType, Tag } from '@ts-types/generated';
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

  const id = router.query.id as string;

  const [error, setError] = useState(null);

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [createFolder, { loading: creating }] = useMutation(CREATE_FOLDER, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createMediaFolder: MediaType }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-created'), 'success');
        refetch();
      }
    }
  });

  const [updateFolder, { loading: updating }] = useMutation(UPDATE_FOLDER, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateTag: Tag }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
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

    console.log({ variables });

    handleNewFolderButton();

    if (isEmpty({})) {
      createFolder({ variables }).catch((err) => {
        setError(err);
      });
    } else {
      // updateFolder({ variables: { id: folder.id, ...input } }).catch(
      //   (err) => {
      //     setError(err);
      //   }
      // );
    }
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
          className="text-gray-500 mt-4 break-all outline-none capitalize
      focus:border px-2 py-1 rounded-sm focus:border-green-500 w-44 text-center"
        ></span>
      );
    }
    return (
      <span className="text-gray-500 mt-4 break-all capitalize">
        {folder?.name}
      </span>
    );
  };

  const renderSpinner = () => {
    if (creating || updating) {
      return (
        <span className="absolute border-t-blue-400 my-2 h-8 w-8 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin" />
      );
    }
    return null;
  };

  return (
    <Link href={`${ROUTES.MEDIA}/${folder?.id}`}>
      <a className="relative flex flex-col items-center w-fit h-fit p-5 hover:bg-blue-100 cursor-pointer">
        {renderSpinner()}
        <div className="border border-gray-300 flex justify-center bg-gray-100 items-center h-40 w-40 rounded">
          <div className="m-2">
            <FolderSvg width={55} height={55} />
          </div>
        </div>
        {renderTitle()}
      </a>
    </Link>
  );
}
