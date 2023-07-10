import StarIcon from '@components/icons/star';
import ImageComponent from '@components/ImageComponent';
import { ThemeType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

type IProps = {
  themes: ThemeType[] | null | undefined;
};
const ThemeListing = ({ themes }: IProps) => {
  const { t } = useTranslation();

  const image = {
    image: 'store/images/2023/5/1684555033_klcgqdchug.png',
    placeholder: 'store/images/2023/5/1684555033_klcgqdchug_placeholder.png'
  };

  return (
    <>
      <div className="overflow-hidden mb-6 flex flex-wrap items-center justify-start">
        {themes?.map((theme, idx) => (
          <Link key={idx} href={`${ROUTES.MARKETPLACE_THEME_PAGE}/${theme.id}`}>
            <a
              key={idx}
              className="card m-3 border w-[250px] h-[370px] cursor-pointer hover:shadow-lg"
            >
              <div>
                <ImageComponent
                  alt={'alt'}
                  src={image.image}
                  customPlaceholder={image.placeholder}
                  width={250}
                  height={200}
                  objectFit="cover"
                />
              </div>
              <div className="pl-3 pr-2 py-1 h-[100px]">
                <span className="cut-line-1">{theme?.title}</span>
                <p className="cut-line-3 text-gray-500 text-xs">
                  {theme?.description}
                </p>
                <div className="flex items-center justify-between mt-11 pr-3">
                  <div className="flex items-center justify-end">
                    {Array.from({ length: theme?.ratingStarCount })?.map(
                      (_, idx) => (
                        <StarIcon key={idx} />
                      )
                    )}
                    <span className="text-gray-400 text-xs pt-[5px] mx-[3px]">
                      {theme?.ratingStarCount}
                    </span>
                    <span className="text-blue-500 underline text-sm">
                      ({theme?.reviewsCount})
                    </span>
                  </div>
                  {theme?.isFree ? (
                    <div className="font-medium text-gray-700">Free</div>
                  ) : (
                    <div className="font-medium text-gray-700">
                      {theme?.price}
                    </div>
                  )}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ThemeListing;
