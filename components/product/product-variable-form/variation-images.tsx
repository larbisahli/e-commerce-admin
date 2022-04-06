/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import ImageComponent from '@components/ImageComponent';
import Label from '@components/ui/label';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface VariationImagesProps {
  index: number;
}

const VariationImages = ({ index }: VariationImagesProps) => {
  const { t } = useTranslation();

  const { watch, setValue } = useFormContext();

  const gallery = watch('gallery');
  const selectedImg = watch(`variation_options.${index}.image`);

  const setImage = (img: string) => {
    if (selectedImg === img) {
      setValue(`variation_options.${index}.image`, null);
    } else {
      setValue(`variation_options.${index}.image`, img);
    }
  };

  if (isEmpty(gallery)) return null;

  return (
    <div className="mb-5 mt-5">
      <Label>{t('form:input-label-select-image')}</Label>
      {gallery?.map(({ image, placeholder }) => {
        return (
          <div
            role="button"
            onClick={() => setImage(image)}
            className={cn(
              'inline-flex flex-col transition-all overflow-hidden border-2 border-border-200 rounded mt-2 me-2 relative cursor-pointer',
              {
                '!border-2': selectedImg === image,
                shadow: selectedImg === image
              }
            )}
            style={{
              borderColor: selectedImg === image ? '#46d934' : null,
              transform: selectedImg === image ? 'translateY(-8px)' : null
            }}
            key={image}
          >
            <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
              <ImageComponent
                src={image ?? '/placeholders/no-image.svg'}
                customPlaceholder={placeholder}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(VariationImages);
