/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import ImageComponent from '@components/ImageComponent';
import Label from '@components/ui/label';
import { IMGType } from '@ts-types/generated';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';
import type {
  FieldValues,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';

interface VariationImagesProps {
  gallery: IMGType[];
  index: number;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const VariationImages = ({
  gallery,
  index,
  watch,
  setValue
}: VariationImagesProps) => {
  const { t } = useTranslation();

  const selectedImg = watch(`variation_options.${index}.image`);

  const setImage = (img: string) => {
    if (selectedImg === img) {
      setValue(`variation_options.${index}.image`, null);
    } else {
      setValue(`variation_options.${index}.image`, img);
    }
  };

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
