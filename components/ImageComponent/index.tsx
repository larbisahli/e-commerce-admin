import { useGetDataUrl } from '@hooks/useGetDataUrl';
import { mediaURL } from '@utils/utils';
import classNames from 'classnames';
import Image, { ImageProps } from 'next/legacy/image';
import React, { memo } from 'react';

interface Props extends ImageProps {
  customPlaceholder: string;
  src: string;
}

const ImageComponent = ({ src, customPlaceholder, ...props }: Props) => {
  const Base64Placeholder = useGetDataUrl(customPlaceholder);

  return (
    <Image
      blurDataURL={Base64Placeholder}
      placeholder="blur"
      alt={props.alt}
      src={`${mediaURL}/${src}`}
      className={classNames('pointer-events-none', props.className)}
      {...props}
    />
  );
};

export default memo(ImageComponent);
