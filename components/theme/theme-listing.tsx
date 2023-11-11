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
      <div className="mb-6 flex flex-wrap items-center justify-start overflow-hidden">
        {themes?.map((theme, idx) => (
          <Link key={idx} href={`${ROUTES.MARKETPLACE_THEME_PAGE}/${theme.id}`}>
            <a
              key={idx}
              className="card m-3 h-[370px] w-[250px] cursor-pointer border hover:shadow-lg"
            >
              <div className="p-2 pb-0">
                <ImageComponent
                  alt={'alt'}
                  src={image.image}
                  customPlaceholder={image.placeholder}
                  width={250}
                  height={200}
                  objectFit="cover"
                />
              </div>
              <div className="h-[100px] py-1 pl-3 pr-2">
                <span className="cut-line-1">{theme?.title}</span>
                <p className="cut-line-3 text-xs text-gray-500">
                  {theme?.description}
                </p>
                <div className="mt-11 flex items-center justify-between pr-3">
                  <div className="flex items-center justify-end">
                    {Array.from({ length: theme?.ratingStarCount })?.map(
                      (_, idx) => <StarIcon key={idx} />
                    )}
                    <span className="mx-[3px] pt-[5px] text-xs text-gray-400">
                      {theme?.ratingStarCount}
                    </span>
                    <span className="text-sm text-blue-500 underline">
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
