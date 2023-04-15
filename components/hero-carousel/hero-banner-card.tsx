/* eslint-disable jsx-a11y/anchor-is-valid */
import ImageComponent from '@components/ImageComponent';
import { HeroCarouselType, ImageType } from '@ts-types/generated';
import cn from 'classnames';

interface ShowCaseProps {
  thumbnail: ImageType[];
  btnLabel?: string;
  title?: string;
  description?: string;
  styles?: HeroCarouselType['styles'];
}

const HeroBannerCard = ({
  thumbnail,
  btnLabel,
  title,
  description,
  styles
}: ShowCaseProps) => {
  return (
    <div
      className={cn(
        'relative w-full bg-no-repeat bg-cover bg-center items-center flex h-[300px]',
        {
          'justify-start': styles.align === 'left',
          'justify-center': styles.align === 'center',
          'justify-end': styles.align === 'right',
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
          ' mx-12 h-fit flex-col flex 2xl:max-w-[600px] max-w-[480px] md:max-w-[550px]',
          {
            'items-center': styles.align === 'center',
            'items-end': styles.align === 'right',
          }
        )}
      >
          <h2
            className={cn(
              'text-3xl 2xl:text-4xl font-manrope font-extrabold leading-snug md:leading-tight xl:leading-[1.3em] mb-3 md:mb-4 xl:mb-3 -mt-2 xl:-mt-3 2xl:-mt-4'
            )}
            style={{ color: styles?.textColor }}
          >
            {title}
          </h2>
          <p
            className={cn(
              'md:text-[17px] leading-7 md:leading-8 xl:leading-[1.92em] text-sm 2xl:text-base',
              {'text-center': styles.align === 'center', 'text-end': styles.align === 'right'}
            )}
            style={{ color: styles?.textColor }}
          >
            {description}
          </p>
          {btnLabel && (
            <a
              href={'#'}
              className="h-[45px] w-fit uppercase mt-2 text-sm inline-flex items-center justify-center transition duration-300 rounded-sm px-6 py-2 font-semibold"
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
