import { CloseIcon } from '@components/icons/close-icon';
import { UploadIcon } from '@components/icons/upload-icon';
import ImageComponent from '@components/ImageComponent';
import Loader from '@components/ui/loader/loader';
// import { useUploadMutation } from '@data/upload/use-upload.mutation';
import { useGetStaff } from '@hooks/index';
import { notify } from '@lib/notify';
import { generateShortId } from '@utils/utils';
import { apiURL } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const getPreviewImage = (value: any) => {
  let images: any[] = [];
  if (value) {
    images = Array.isArray(value) ? value : [{ ...value }];
  }
  return images;
};

export default function Uploader({
  onChange,
  value,
  multiple,
  setUnsavedChanges
}: any) {
  const { t } = useTranslation();

  const [files, setFiles] = useState<string[]>(getPreviewImage(value));
  const [loading, setLoading] = useState<boolean>(false);

  // const { mutate: upload, isLoading: loading } = useUploadMutation();

  const { staffInfo } = useGetStaff();

  const token = staffInfo?.token;

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple,
    onDrop: async (acceptedFiles) => {
      try {
        setLoading(true);
        if (!isEmpty(files) && !multiple) {
          notify('You should remove the current image first', 'warning');
          setLoading(false);
          return;
        }

        for await (const file of acceptedFiles) {
          const fileReader = new FileReader();

          // Chunk the image
          fileReader.onload = async (ev) => {
            const fileName = file.name;
            const extension = fileName.slice(fileName.lastIndexOf('.'));
            const newFileName = `${generateShortId()}${extension}`;
            //@ts-ignore
            const CHUNK_SIZE = ev.target?.result.byteLength;

            const response = await fetch(`${apiURL}/upload`, {
              method: 'POST',
              credentials: 'include',
              headers: new Headers({
                Authorization: 'Bearer ' + token,
                'content-type': 'application/octet-stream',
                'content-length': CHUNK_SIZE,
                'x-file-name': newFileName
              }),
              body: ev.target?.result
            });

            const {
              success,
              error,
              image
            }: { success: boolean; error: Error | null; image: string | null } =
              await response.json();
            const status = response?.status;

            console.log(`<:FINISHED UPLOAD:>`, {
              success,
              error,
              image,
              status
            });
            // If an image was uploaded show a message when leaving the page

            if (success) {
              setFiles((prev) => [...(prev ?? []), image]);
              onChange((prev) => [...(prev ?? []), image]);
              setUnsavedChanges((prev) => [...(prev ?? []), image]);
            }

            if (error?.message) {
              notify(error?.message, 'error');
            }

            if (status === 500) {
              // send error to sentry
            }
            setLoading(false);
          };
          fileReader.readAsArrayBuffer(file);
        }
      } catch (error) {
        // send error to sentry
        console.log('error :>> ', error);
        setLoading(false);
      }
    }
  });

  const handleDelete = (e, image: string) => {
    console.log('==========', e, { image });
    e.preventDefault();

    const images = files.filter((file) => file !== image);

    setFiles(images);
    setUnsavedChanges(images);
    if (onChange) {
      onChange(images);
    }
  };

  const thumbs = files?.map((file, idx) => {
    if (file) {
      return (
        <div
          className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative"
          key={idx}
        >
          <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <ImageComponent
              src={file}
              customPlaceholder={'/placeholders/no-image.svg'}
              width={64}
              height={64}
            />
          </div>
          <button
            type="button"
            className="w-4 h-4 flex items-center justify-center rounded-full 
            bg-red-600 text-xs text-light absolute top-1 
              end-1 shadow-xl outline-none"
            onClick={(e) => handleDelete(e, file)}
          >
            <CloseIcon width={10} height={10} />
          </button>
        </div>
      );
    }
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.thumbnail));
    },
    [files]
  );

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className:
            'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none'
        })}
      >
        <input {...getInputProps()} />
        <UploadIcon className="text-muted-light" />
        <p className="text-body text-sm mt-4 text-center">
          <span className="text-accent font-semibold">
            {t('text-upload-highlight')}
          </span>{' '}
          {t('text-upload-message')} <br />
          <span className="text-xs text-body">{t('text-img-format')}</span>
        </p>
      </div>

      {(!!thumbs.length || loading) && (
        <aside className="flex flex-wrap mt-2">
          {!!thumbs.length && thumbs}
          {loading && (
            <div className="h-16 flex items-center mt-2 ms-2">
              <Loader simple={true} className="w-6 h-6" />
            </div>
          )}
        </aside>
      )}
    </section>
  );
}
