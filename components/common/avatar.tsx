// import Image from 'next/image';
import ImageComponent from '@components/ImageComponent/index';
import cn from 'classnames';
import React from 'react';

type AvatarProps = {
  className?: string;
  src: string;
  customPlaceholder: string;
  alt?: string;
  width?: string;
  height?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  customPlaceholder,
  className,
  alt = 'Avatar',
  width = 'w-10',
  height = 'h-10',
  ...rest
}) => {
  return (
    <div
      className={cn(
        'relative cursor-pointer overflow-hidden rounded-full',
        className,
        width,
        height
      )}
      {...rest}
    >
      <ImageComponent
        alt={alt}
        src={src}
        customPlaceholder={customPlaceholder}
        layout="fill"
        objectFit="cover"
        priority={true}
      />
    </div>
  );
};

export default Avatar;
