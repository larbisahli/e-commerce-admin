import { CloseIcon } from '@components/icons/close-icon';
import ImageComponent from '@components/ImageComponent';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

const Thumbs = ({ photos, handleImageRemoval }) => {
  if (isEmpty(photos)) {
    return null;
  }

  return (
    <ul className="flex flex-wrap items-center">
      {photos?.map(({ id, image, placeholder }) => {
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <li
            className="rounded-sm mt-2 me-2 relative cursor-auto"
            key={id}
            // onClick={() => openModal(IMAGE_MODAL, modalId)}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="button"
          >
            <button
              onClick={(e) => handleImageRemoval(e, id)}
              className="bg-red-600 flex justify-center items-center text-white h-5 w-5 absolute z-30 right-0"
            >
              <CloseIcon width={15} height={15} />
            </button>
            <div className="relative min-w-0 w-22 h-22 overflow-hidden rounded-sm">
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
