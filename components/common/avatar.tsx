// import Image from 'next/image';
import ImageComponent from '@components/ImageComponent/index';
import { siteSettings } from '@settings/site.settings';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';

type AvatarProps = {
  className?: string;
  firstName?: string;
  src: string;
  customPlaceholder: string;
  alt?: string;
  width?: string;
  height?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  customPlaceholder,
  firstName = 'A',
  className,
  alt = 'Avatar',
  width = 'w-10',
  height = 'h-10',
  ...rest
}) => {
  const [state, setState] = useState({ src, customPlaceholder });

  useEffect(() => {
    setState({ src, customPlaceholder });
  }, [src, customPlaceholder]);

  return (
    <div
      className={cn(
        'relative cursor-pointer overflow-hidden rounded-sm',
        className,
        width,
        height
      )}
      {...rest}
    >
      {isEmpty(src) ? (
        <div className="avatar-profile">
          {firstName?.charAt(0)?.toUpperCase()}
        </div>
      ) : (
        <ImageComponent
          alt={alt}
          src={state?.src}
          customPlaceholder={state?.customPlaceholder}
          onError={() => {
            console.log('----------------->');
            setState({
              src: siteSettings.avatar.image,
              customPlaceholder: siteSettings.avatar.placeholder
            });
          }}
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      )}
    </div>
  );
};

export default Avatar;
