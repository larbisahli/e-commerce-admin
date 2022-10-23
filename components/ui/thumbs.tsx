import ImageComponent from '@components/ImageComponent';
import { IMAGE_MODAL } from '@ts-types/constants';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import { useModalAction } from './modal/modal.context';

const Thumbs = ({ photos }) => {
  const { openModal } = useModalAction();
  if (isEmpty(photos)) {
    return null;
  }

  return (
    <ul className="flex flex-wrap items-center">
      {photos?.map(({ id, image, placeholder }) => {
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <li
            className="rounded-sm mt-2 me-2 relative cursor-pointer"
            key={id}
            onClick={() => openModal(IMAGE_MODAL)}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="button"
          >
            <div className="relative min-w-0 w-16 h-16 overflow-hidden rounded-sm">
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
