import { sentry } from '@lib/index';
import { mediaURL } from '@utils/utils';
import Image, { ImageProps } from 'next/image';
import React, { memo, useEffect, useState } from 'react';

interface Props extends ImageProps {
  src: string;
  customPlaceholder: string;
}

const ImageComponent = ({ customPlaceholder, ...props }: Props) => {
  const [src, setSrc] = useState(
    () => customPlaceholder ?? '/placeholders/no-image.svg'
  );
  const [Base64Placeholder, setBase64Placeholder] = useState<string>(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+utrPQAJNQNlcqdyCgAAAABJRU5ErkJggg=='
  );

  useEffect(() => {
    async function toBase64() {
      try {
        const arr: string[] = props.src?.split('.');
        const URL = arr ? `${mediaURL}${arr[0]}_placeholder.${arr[1]}` : '';

        const data = await fetch(URL);
        const blob = await data.blob();

        // eslint-disable-next-line no-undef
        return await new Promise((resolve) => {
          const reader = new window.FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            return resolve(base64data);
          };
        })
          .then((res: string) => {
            setBase64Placeholder(res);
            return res;
          })
          .catch((error) => {
            console.log('ImageComponent error /u :>', error);
            sentry({ message: 'ImageComponent /u', error });
          });
      } catch (error) {
        console.log('ImageComponent error /d :>', error);
        sentry({ message: 'ImageComponent /d', error });
      }
    }

    if (props.src) {
      setSrc(mediaURL + props?.src);
      toBase64();
    }

    return () => {
      setSrc(customPlaceholder ?? '/placeholders/no-image.svg');
    };
  }, [props.src]);

  return (
    <Image
      {...props}
      blurDataURL={Base64Placeholder}
      placeholder="blur"
      alt={props.alt}
      src={src}
      onError={() => setSrc(customPlaceholder)}
    />
  );
};

export default ImageComponent;
