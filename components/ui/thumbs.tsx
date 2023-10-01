import { CloseIcon } from '@components/icons/close-icon';
import ImageComponent from '@components/ImageComponent';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

const Thumbs = ({ isThumbnail, photos, handleImageRemoval }) => {
  if (isEmpty(photos) && isThumbnail) {
    return (
      <ul className="flex flex-wrap items-center">
        <li className="m-2">
          <div
            style={{ border: '2px dashed #d1d9e0' }}
            className="flex h-22 w-22 items-center justify-center rounded border-dotted"
          >
            <ImageComponent
              src={'placeholders/image.jpg'}
              customPlaceholder={'placeholders/image__placeholder.png'}
              width={45}
              height={45}
              objectFit="cover"
            />
          </div>
        </li>
      </ul>
    );
  }

  if (isEmpty(photos) && !isThumbnail) {
    return (
      <ul className="flex flex-wrap items-center">
        {Array.from({ length: 3 })?.map((_, idx) => (
          <li key={idx} className="mt-2 mr-2">
            <div
              style={{ border: '2px dashed #d1d9e0' }}
              className="flex h-22 w-22 items-center justify-center rounded border-dotted"
            >
              <ImageComponent
                src={'placeholders/image.jpg'}
                customPlaceholder={'placeholders/image__placeholder.png'}
                width={45}
                height={45}
                objectFit="cover"
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-wrap items-center">
      {photos?.map(({ id, image, placeholder }) => {
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <li
            className="relative mt-2 cursor-auto rounded-sm me-2"
            key={id}
            // onClick={() => openModal(IMAGE_MODAL, modalId)}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="button"
          >
            <button
              onClick={(e) => handleImageRemoval(e, id)}
              className="absolute right-0 z-10 flex h-5 w-5 items-center justify-center bg-red-600 text-white"
            >
              <CloseIcon width={15} height={15} />
            </button>
            <div className="relative h-22 w-22 min-w-0 overflow-hidden rounded-sm">
              <ImageComponent
                src={image}
                customPlaceholder={placeholder}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Thumbs;
