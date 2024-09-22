import { useGetDataUrl } from '@hooks/useGetDataUrl';
import { siteSettings } from '@settings/site.settings';
import { mediaURL } from '@utils/utils';
import classNames from 'classnames';
import Image, { ImageProps } from 'next/legacy/image';
import React, { memo, useEffect, useState } from 'react';

interface Props extends ImageProps {
  customPlaceholder: string;
  src: string;
}

const ImageComponent = ({ src, customPlaceholder, ...props }: Props) => {
  const [srcImage, setSrc] = useState(() => ({
    src,
    customPlaceholder
  }));
  const Base64Placeholder = useGetDataUrl(srcImage.customPlaceholder);

  useEffect(() => {
    setSrc({
      src,
      customPlaceholder
    });
  }, [src, customPlaceholder]);

  return (
    <Image
      blurDataURL={Base64Placeholder}
      placeholder="blur"
      alt={props.alt}
      src={`${mediaURL}/${srcImage.src}`}
      className={classNames('pointer-events-none', props.className)}
      onError={() => {
        setSrc({
          src: siteSettings.product.image,
          customPlaceholder: siteSettings.product.placeholder
        });
      }}
      {...props}
    />
  );
};

export default memo(ImageComponent);
