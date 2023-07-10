import { UploadIcon } from '@components/icons/upload-icon';
import { useErrorLogger } from '@hooks/index';
import { useAppDispatch } from '@hooks/useFiles';
import { notify } from '@lib/notify';
import { apiURL } from '@utils/utils';
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
}

export default function Uploader({ setLoading, mediaId = null, refetch }: any) {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  useErrorLogger(error);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxSize: 5 * (1024 * 1024),
    onDrop: async (acceptedFiles, fileRejections) => {
      setLoading(true);

      try {
        fileRejections.forEach((file) => {
          file.errors.forEach((err) => {
            if (err.code === 'file-too-large') {
              notify(`Error: Image is larger than 5MB`, 'error');
            }

            if (err.code === 'file-invalid-type') {
              notify(`Error: ${err.message}`, 'error');
            }
          });
          setLoading(false);
        });

        for await (const file of acceptedFiles) {
          if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
            var formData = new FormData();
            formData.append('image', file);
            formData.append('mediaId', mediaId ?? '');
            fetch(`${apiURL}/upload`, {
              credentials: 'include',
              method: 'POST',
              body: formData
            }).then(async (res) => {
              const image = (await res.json()) as ImageType;

              if (image.success) {
                setLoading(false);
                refetch();
              }

              // @ts-ignore
              if (image?.error?.message) {
                // @ts-ignore
                notify(image?.error?.message, 'error');
                setError(image?.error);
              }
              console.log(`<:FINISHED UPLOAD:>`, image);
            });
          } else {
            notify('Image type is not supported!', 'error');
            setLoading(false);
          }
        }
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
          className:
            'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none'
        })}
      >
        <input {...getInputProps()} />
        <UploadIcon className="text-gray-400" />
        <p className="text-body text-sm mt-4 text-center">
          <span className="text-accent font-semibold">
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
