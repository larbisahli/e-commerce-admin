import StarIcon from '@components/icons/star';
import ImageComponent from '@components/ImageComponent';
import { ThemeType } from '@ts-types/generated';
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
      <div className="overflow-hidden mb-6 flex flex-wrap items-center justify-center">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div
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
              <span className="cut-line-1">Free Liberty Responsive Theme</span>
              <p className="cut-line-3 text-gray-500 text-xs">
                LibertyTheme - fully free, mobile theme with lots of
                customizable functions allows setting the skin of your shop
                flexibly and starting the work within a short time.
              </p>
              <div className="flex items-center justify-between mt-11 pr-3">
                <div className="flex items-center justify-end">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <span className="text-gray-400 text-xs pt-[5px] mx-[3px]">
                    5
                  </span>
                  <span className="text-blue-500 underline text-sm">(4)</span>
                </div>
                <div className="font-medium text-gray-700">Free</div>
                {/* <div className='font-medium text-gray-700'>$5</div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ThemeListing;
