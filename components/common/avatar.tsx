// import Image from 'next/image';
import ImageComponent from '@components/ImageComponent/index';
import cn from 'classnames';
import Image from 'next/image';
import React from 'react';

type AvatarProps = {
  className?: string;
  src: string;
  customPlaceholder: string;
  alt?: string;
  width?: number;
  height?: number;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  customPlaceholder,
  className,
  alt = 'Avatar',
  ...rest
}) => {
  return (
    <div
      className={cn(
        'relative cursor-pointer w-10 h-10 overflow-hidden rounded-full',
        className
      )}
      {...rest}
    >
      {src ? (
        <ImageComponent
          alt={alt}
          src={src}
          customPlaceholder={customPlaceholder}
          layout="fill"
          priority={true}
        />
      ) : (
        <Image
          alt={alt}
          src="/placeholders/avatar.svg"
          layout="fill"
          priority={true}
        />
      )}
    </div>
  );
};

export default Avatar;
