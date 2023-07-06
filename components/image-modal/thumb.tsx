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
    const { id, image, placeholder } = photo;
    const target = e.target;
    const checked = target['checked'];

    if (isThumbnail) {
      if (checked) {
        setSelectedImages([{ id, image, placeholder }]);
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
        className="w-36 h-48 hover:bg-blue-100 flex justify-center flex-col items-center rounded-sm"
      >
        <label
          htmlFor={photo?.id?.toString()}
          title={size ? `size: ${size}` : ''}
          className={cn(
            'flex transition-all overflow-hidden border-2 w-28 h-28 border-border-200 rounded relative cursor-pointer',
            {
              '!border-2': isCurrentImage,
              '!border-green-300': isCurrentImage,
              shadow: isCurrentImage
            }
          )}
        >
          <div className="absolute top-0 right-0 left-0 bottom-0 w-28 h-28 z-40 flex justify-center items-center text-white">
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
            className="transition-all absolute z-30"
            onChange={(e) => handleSelectImage(e, photo)}
            checked={isCurrentImage}
            style={{
              // transform: isCurrentImage ? 'translateY(-5px)' : null,
              zIndex: isCurrentImage ? 100 : null,
              top: '6px',
              left: '6px'
            }}
          />
        </label>
        <span className="text-gray-500 mt-4  text-sm cut-line-1 text-center break-all">
          {name}
        </span>
      </li>
    </React.Fragment>
  );
};

export default ImageThumb;
