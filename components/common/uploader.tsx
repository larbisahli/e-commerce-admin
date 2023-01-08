import { UploadIcon } from '@components/icons/upload-icon';
import { useErrorLogger } from '@hooks/index';
import { appendFile, useAppDispatch } from '@hooks/useFiles';
import { notify } from '@lib/notify';
import { apiURL } from '@utils/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageType {
  bucket: string;
  image: string;
  mimeType: string;
  originalname: string;
  placeholder: string;
  success: boolean;
  error?: any;
}

export default function Uploader({ setLoading }: any) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [error, setError] = useState(null);

  useErrorLogger(error);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxSize: 5 * (1024 * 1024),
    onDrop: async (acceptedFiles) => {
      try {
        setLoading(true);

        for await (const file of acceptedFiles) {
          if (['image/png', 'image/jpeg'].includes(file.type)) {
            var formData = new FormData();
            formData.append('image', file);
            fetch(`${apiURL}/upload`, {
              credentials: 'include',
              method: 'POST',
              body: formData
            }).then(async (res) => {
              const image = (await res.json()) as ImageType;

              if (image.success) {
                setLoading(false);
                dispatch(appendFile({ image }));
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
            notify('Image type not supported!', 'error');
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
          {t('text-upload-message')} <br />
          <span className="text-xs text-body">{t('text-img-format')}</span>
        </p>
      </div>
    </section>
  );
}
