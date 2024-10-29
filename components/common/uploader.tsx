import { UploadIcon } from '@components/icons/upload-icon';
import { useErrorLogger } from '@hooks/index';
import { useAppDispatch } from '@hooks/useGetClient';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
import { EtagGroupsType } from '@ts-types/generated';
import { apiURL } from '@utils/utils';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageType {
  id: number;
  image: string;
  placeholder: string;
  success: boolean;
  size: number;
  error?: any;
  disable?: boolean;
  etag?: EtagGroupsType;
}

export default function Uploader({
  setLoading,
  mediaId = null,
  refetch,
  disable = false
}: any) {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  useErrorLogger(error);
  const dispatch = useAppDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxSize: 5 * (1024 * 1024),
    maxFiles: 10,
    onDrop: async (acceptedFiles, fileRejections = []) => {
      setLoading(true);
      console.log({ acceptedFiles });

      try {
        fileRejections?.forEach((file) => {
          (file.errors ?? [])?.forEach((err) => {
            if (err.code === 'file-too-large') {
              notify(`Error: File is larger than 5MB`, 'error');
            }
            if (err.code === 'file-invalid-type') {
              notify(`Error: ${err.message}`, 'error');
            }
            if (err.code === 'too-many-files') {
              notify(`Error: Max upload is 10 files`, 'error');
            }
          });
          setLoading(false);
        });

        const formData = new FormData();
        acceptedFiles.forEach((file) => {
          if (
            [
              'image/png',
              'image/jpeg',
              'image/jpg',
              'image/gif',
              'video/mp4'
            ].includes(file.type)
          ) {
            formData.append('file', file);
          } else {
            notify(`File type ${file.type} is not supported!`, 'error');
            setLoading(false);
          }
        });

        if (!formData.has('file')) return;

        formData.append('mediaId', mediaId ?? '');
        fetch(`${apiURL}/upload`, {
          credentials: 'include',
          method: 'POST',
          body: formData
        })
          .then(async (res) => {
            const payload = (await res.json()) as ImageType;
            if (payload.success) {
              setLoading(false);
              dispatch(setEtag({ etag: payload.etag }));
              refetch();
            }
            // @ts-ignore
            if (payload?.error) {
              // @ts-ignore
              notify(payload?.error, 'error');
              setError(payload?.error);
              setLoading(false);
            }
            console.log(`<:FINISHED UPLOAD:>`, { payload });
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } catch (error) {
        // send error to sentry
        console.log('error :>> ', error);
        setLoading(false);
      }
    }
  });

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className: cn(
            'border-dashed border-2 border-border-base h-36 rounded',
            'flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none',
            { 'pointer-events-none bg-gray-100 opacity-0 opa': disable }
          )
        })}
      >
        <input {...getInputProps()} />
        <UploadIcon className="text-gray-400" />
        <p className="mt-4 text-center text-sm text-body">
          <span className="font-semibold text-accent">
            {t('text-upload-highlight')}
          </span>{' '}
          {t('text-upload-message')}
          <span className="px-1 text-xs text-body">{`(${t(
            'text-img-format'
          )})`}</span>
          <br />
          <p className="text-xs text-body">{t('text-upload-limit')}</p>
        </p>
      </div>
    </section>
  );
}
