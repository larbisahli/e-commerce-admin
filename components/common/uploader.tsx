import { CloseIcon } from '@components/icons/close-icon';
import { UploadIcon } from '@components/icons/upload-icon';
import ImageComponent from '@components/ImageComponent';
import Loader from '@components/ui/loader/loader';
import { notify } from '@lib/notify';
import { apiURL } from '@utils/utils';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageType {
  bucket: string;
  image: string;
  mimeType: string;
  originalname: string;
  placeholder: string;
  success: boolean;
}

export default function Uploader({
  onChange,
  value,
  multiple,
  setUnsavedChanges
}: any) {
  const { t } = useTranslation();

  const [images, setImages] = useState<ImageType | ImageType[]>(value);
  const [loading, setLoading] = useState<boolean>(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple,
    maxSize: 5 * (1024 * 1024),
    onDrop: async (acceptedFiles) => {
      try {
        setLoading(true);
        if (!isEmpty(images) && !multiple) {
          notify('You should remove the current image first', 'warning');
          setLoading(false);
          return;
        }

        for await (const file of acceptedFiles) {
          var formData = new FormData();
          formData.append('image', file);
          fetch(`${apiURL}/upload`, {
            credentials: 'include',
            method: 'POST',
            body: formData
          }).then(async (res) => {
            const image = (await res.json()) as ImageType;

            if (image.success) {
              if (multiple) {
                setImages((prev) => [...((prev as ImageType[]) ?? []), image]);
                onChange((prev) => [...(prev ?? []), image]);
              } else {
                setImages(image as ImageType);
                onChange(image);
              }
              setUnsavedChanges((prev) => [...(prev ?? []), image]);
            }

            // @ts-ignore
            if (image?.error?.message) {
              // @ts-ignore
              notify(image?.error?.message, 'error');
            }

            setLoading(false);
            console.log(`<:FINISHED UPLOAD:>`, image);
          });
        }
      } catch (error) {
        // send error to sentry
        console.log('error :>> ', error);
        setLoading(false);
      }
    }
  });

  const handleDelete = (e, image?: string) => {
    e.preventDefault();
    let images_;
    if (isArray(images) && image) {
      images_ = images.filter((file) => file.image !== image);
    } else {
      images_ = null;
    }

    setImages(images_);
    onChange(images_);
    setUnsavedChanges(images_);
  };

  const thumbs = useMemo(() => {
    if (isEmpty(images)) {
      return null;
    }

    if (isArray(images)) {
      return images?.map(({ image, placeholder }, idx) => {
        return (
          <div
            className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative"
            key={idx}
          >
            <div className="relative flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <ImageComponent
                src={image}
                customPlaceholder={placeholder ?? '/placeholders/no-image.svg'}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <button
              type="button"
              className="w-4 h-4 flex items-center justify-center rounded-full 
                bg-red-600 text-xs text-light absolute top-1 
                  end-1 shadow-xl outline-none"
              onClick={(e) => handleDelete(e, image)}
            >
              <CloseIcon width={10} height={10} />
            </button>
          </div>
        );
      });
    } else {
      return (
        <div className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative">
          <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <ImageComponent
              src={images?.image ?? '/placeholders/no-image.svg'}
              customPlaceholder={images?.placeholder}
              // width={64}
              // height={64}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <button
            type="button"
            className="w-4 h-4 flex items-center justify-center rounded-full 
        bg-red-600 text-xs text-light absolute top-1 
          end-1 shadow-xl outline-none"
            onClick={(e) => handleDelete(e)}
          >
            <CloseIcon width={10} height={10} />
          </button>
        </div>
      );
    }
  }, [images]);

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

      {(!!thumbs || loading) && (
        <aside className="flex flex-wrap mt-2">
          {!!thumbs && thumbs}
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
