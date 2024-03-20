import { CloseIcon } from '@components/icons/close-icon';
import ImageComponent from '@components/ImageComponent';
import isEmpty from 'lodash/isEmpty';
import Image from 'next/image';
import placeholder from 'public/placeholders/image.jpg';
import React, { useState } from 'react';

const Thumbs = ({
  isThumbnail,
  photos,
  handleImageRemoval,
  setSelectedImages,
  onSelect
}) => {
  const [draggedItem, setDraggedItem] = useState(null);

  if (isEmpty(photos) && isThumbnail) {
    return (
      <ul className="flex flex-wrap items-center">
        <li className="m-2">
          <div
            style={{ border: '2px dashed #d1d9e0' }}
            className="flex h-22 w-22 items-center justify-center rounded border-dotted"
          >
            <Image
              src={placeholder}
              placeholder="blur"
              alt="placeholder"
              width={88}
              height={88}
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
              <Image
                src={placeholder}
                placeholder="blur"
                alt="placeholder"
                width={88}
                height={88}
                objectFit="cover"
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
    setDraggedItem(id);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    const draggedOverItem = photos.find((task) => task.id === id);
    if (draggedItem === draggedOverItem?.id) {
      return;
    }
    let images = photos.filter((task) => task.id !== draggedItem);
    let index = photos.map((x) => x.id).indexOf(draggedOverItem.id);
    images.splice(
      index,
      0,
      photos.find((task) => task.id === draggedItem)
    );
    setSelectedImages(images);
    onSelect(images);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <ul className="flex flex-wrap items-center">
      {photos?.map(({ id, image, placeholder }) => {
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <li
            className="relative mt-2 cursor-grab rounded-sm border-2 border-white transition-transform duration-500 ease-in-out me-2 hover:border-black hover:opacity-70"
            key={id}
            // onClick={() => openModal(IMAGE_MODAL, modalId)}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="button"
            draggable
            onDragStart={(e) => handleDragStart(e, id)}
            onDragOver={(e) => handleDragOver(e, id)}
            onDragEnd={handleDragEnd}
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
