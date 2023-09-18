/* eslint-disable jsx-a11y/anchor-is-valid */
import ImageComponent from '@components/ImageComponent';
import type { HeroBannerType, ImageType } from '@ts-types/generated';
import cn from 'classnames';

interface ShowCaseProps {
  thumbnail: ImageType[];
  btnLabel?: string;
  title?: string;
  description?: string;
  styles?: HeroBannerType['styles'];
  align?: HeroBannerType['align'];
}

const HeroBannerCard = ({
  thumbnail,
  btnLabel,
  title,
  description,
  styles,
  align
}: ShowCaseProps) => {
  return (
    <div
      className={cn(
        'relative flex h-[300px] w-full items-center bg-cover bg-center bg-no-repeat',
        {
          'justify-start': align === 'left',
          'justify-center': align === 'center',
          'justify-end': align === 'right'
        }
      )}
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute h-full w-full overflow-hidden"
        style={{ zIndex: -1, borderRadius: '3px' }}
      >
        <ImageComponent
          src={thumbnail[0]?.image}
          customPlaceholder={thumbnail[0]?.placeholder}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div
        className={cn(
          ' mx-12 flex h-fit max-w-[480px] flex-col md:max-w-[550px] 2xl:max-w-[600px]',
          {
            'items-center': align === 'center',
            'items-end': align === 'right'
          }
        )}
      >
        <h2
          className={cn(
            'font-manrope mb-3 -mt-2 text-3xl font-extrabold leading-snug md:mb-4 md:leading-tight xl:mb-3 xl:-mt-3 xl:leading-[1.3em] 2xl:-mt-4 2xl:text-4xl'
          )}
          style={{ color: styles?.textColor }}
        >
          {title}
        </h2>
        <p
          className={cn(
            'text-sm leading-7 md:text-[17px] md:leading-8 xl:leading-[1.92em] 2xl:text-base',
            {
              'text-center': align === 'center',
              'text-end': align === 'right'
            }
          )}
          style={{ color: styles?.textColor }}
        >
          {description}
        </p>
        {btnLabel && (
          <a
            href={'#'}
            className="mt-2 inline-flex h-[45px] w-fit items-center justify-center rounded-sm px-6 py-2 text-sm font-semibold uppercase transition duration-300"
            style={{
              background: styles?.btnBgc,
              color: styles?.btnTextColor
            }}
          >
            {btnLabel}
          </a>
        )}
      </div>
    </div>
  );
};

export default HeroBannerCard;
