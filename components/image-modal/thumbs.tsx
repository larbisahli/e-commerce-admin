import ImageComponent from '@components/ImageComponent';
import Checkbox from '@components/ui/checkbox';
import { ImageType } from '@ts-types/generated';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

interface Props {
  photos: ImageType[];
  setSelectedImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
  selectedImages: ImageType[];
  isThumbnail: boolean;
}

const ImageThumbs = ({
  photos,
  setSelectedImages,
  selectedImages,
  isThumbnail
}: Props) => {
  const handleSelectImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    photo: ImageType
  ) => {
    const target = e.target;
    const checked = target['checked'];
    if (isThumbnail) {
      if (checked) {
        setSelectedImages([photo]);
      } else {
        setSelectedImages([]);
      }
    } else {
      if (checked) {
        setSelectedImages((prev) => [...(prev ?? []), photo]);
      } else {
        setSelectedImages((prev) => [
          ...((prev ?? [])?.filter((img) => img.id !== photo?.id) ?? [])
        ]);
      }
    }
  };

  if (isEmpty(photos)) {
    return null;
  }

  return (
    <React.Fragment>
      {photos?.map((photo) => {
        const isCurrentImage = !isEmpty(
          selectedImages?.find((value) => value.id === photo?.id)
        );
        const size = photo?.size?.formatBytes();
        return (
          <li key={photo?.id} className="relative me-2 w-24 h-24 rounded-sm">
            <label
              htmlFor={photo?.id?.toString()}
              title={size ? `size: ${size}` : ''}
              className={cn(
                'flex transition-all overflow-hidden border-2 w-24 h-24 border-border-200 rounded relative cursor-pointer',
                {
                  '!border-2': isCurrentImage,
                  '!border-green-300': isCurrentImage,
                  shadow: isCurrentImage
                }
              )}
            >
              <div className="absolute top-0 right-0 left-0 bottom-0 w-24 h-24 z-40 flex justify-center items-center text-white">
                <ImageComponent
                  src={photo?.image}
                  customPlaceholder={photo?.placeholder}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </label>
            <Checkbox
              name="image"
              id={photo?.id?.toString()}
              className="transition-all absolute"
              inputClassName="checkbox-rounded"
              onChange={(e) => handleSelectImage(e, photo)}
              checked={isCurrentImage}
              style={{
                transform: isCurrentImage ? 'translateY(-5px)' : null,
                zIndex: isCurrentImage ? 100 : null,
                top: '-6px',
                left: '-6px'
              }}
            />
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default ImageThumbs;
