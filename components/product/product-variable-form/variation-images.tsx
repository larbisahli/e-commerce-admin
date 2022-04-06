/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import ImageComponent from '@components/ImageComponent';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface VariationImagesProps {
  index: number;
}

const VariationImages = ({ index }: VariationImagesProps) => {
  const { t } = useTranslation();

  const { watch } = useFormContext();

  const gallery = watch('gallery');

  const selectedImg = watch(`variation_options.${index}.image`);

  if (isEmpty(gallery)) return null;

  return (
    <div className="mb-5 mt-5">
      <Label>{t('form:input-label-select-image')}</Label>
      <div className="flex items-center">
        {gallery?.map(({ image, placeholder }, idx) => {
          return (
            <ImageVar
              key={image}
              index={index}
              idx={idx}
              selectedImg={selectedImg}
              image={image}
              placeholder={placeholder}
            />
          );
        })}
      </div>
    </div>
  );
};

interface ImageVrProp {
  index: number;
  image: string;
  idx: number;
  placeholder: string;
  selectedImg: string;
}

const ImageVar = memo(
  ({ index, image, idx, placeholder, selectedImg }: ImageVrProp) => {
    const { register } = useFormContext();

    return (
      <div className="relative mt-2 me-2 w-16 h-16">
        <label
          htmlFor={`${idx}-${index}.image`}
          className={cn(
            'flex transition-all overflow-hidden border-2 w-16 h-16 border-border-200 rounded relative cursor-pointer',
            {
              '!border-2': selectedImg === image,
              shadow: selectedImg === image
            }
          )}
          style={{
            borderColor: selectedImg === image ? '#46d934' : null,
            transform: selectedImg === image ? 'translateY(-8px)' : null
          }}
        >
          <ImageComponent
            src={image ?? '/placeholders/no-image.svg'}
            customPlaceholder={placeholder}
            layout="fill"
            objectFit="cover"
          />
        </label>
        <Radio
          {...register(`variation_options.${index}.image`)}
          id={`${idx}-${index}.image`}
          value={image}
          className="transition-all absolute"
          style={{
            transform: selectedImg === image ? 'translateY(-8px)' : null,
            top: '-6px',
            left: '-6px'
          }}
        />
      </div>
    );
  }
);

ImageVar.displayName = 'ImageVar';

export default memo(VariationImages);
