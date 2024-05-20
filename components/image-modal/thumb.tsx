import ImageComponent from '@components/ImageComponent';
import Checkbox from '@components/ui/checkbox';
import { ImageType } from '@ts-types/generated';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

interface Props {
  photo: ImageType;
  name: string;
  setSelectedImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
  selectedImages: ImageType[];
  isThumbnail: boolean;
}

const ImageThumb = ({
  photo,
  name,
  setSelectedImages,
  selectedImages,
  isThumbnail
}: Props) => {
  const handleSelectImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    photo: ImageType
  ) => {
    console.log({ photo });
    const { id, image, placeholder, height, width } = photo;
    const target = e.target;
    const checked = target['checked'];

    if (isThumbnail) {
      if (checked) {
        setSelectedImages([{ id, image, placeholder, height, width }]);
      } else {
        setSelectedImages([]);
      }
    } else {
      if (checked) {
        setSelectedImages((prev) => [
          ...(prev ?? []),
          { id, image, placeholder }
        ]);
      } else {
        setSelectedImages((prev) => [
          ...((prev ?? [])?.filter((img) => img.id !== id) ?? [])
        ]);
      }
    }
  };

  const isCurrentImage = !isEmpty(
    selectedImages?.find((value) => value.id === photo?.id)
  );
  const size = photo?.size?.formatBytes();

  return (
    <React.Fragment>
      <li
        key={photo?.id}
        title={name}
        className="flex h-48 w-36 flex-col items-center justify-center rounded-sm hover:bg-blue-100"
      >
        <label
          htmlFor={photo?.id?.toString()}
          title={size ? `size: ${size}` : ''}
          className={cn(
            'relative flex h-28 w-28 cursor-pointer overflow-hidden rounded border-2 border-border-200 transition-all',
            {
              '!border-2': isCurrentImage,
              '!border-green-300': isCurrentImage,
              shadow: isCurrentImage
            }
          )}
        >
          <div className="absolute top-0 right-0 left-0 bottom-0 z-40 flex h-28 w-28 items-center justify-center text-white">
            <ImageComponent
              src={photo?.image}
              customPlaceholder={photo?.placeholder}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <Checkbox
            name="image"
            id={photo?.id?.toString()}
            className="absolute z-30 transition-all"
            onChange={(e) => handleSelectImage(e, photo)}
            checked={isCurrentImage}
            style={{
              // transform: isCurrentImage ? 'translateY(-5px)' : null,
              zIndex: 100,
              top: '6px',
              left: '6px'
            }}
          />
        </label>
        <span className="cut-line-1 mt-4  break-all text-center text-sm text-gray-500">
          {name}
        </span>
      </li>
    </React.Fragment>
  );
};

export default ImageThumb;
