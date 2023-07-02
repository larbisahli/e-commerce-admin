import { CheckMark } from '@components/icons/checkmark';
import { Eye } from '@components/icons/eye-icon';
import ImageComponent from '@components/ImageComponent';
import Button from '@components/ui/button';
import { ThemeType } from '@ts-types/generated';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

type IProps = {
  themes: ThemeType[] | null | undefined;
};
const MyThemeList = ({ themes }: IProps) => {
  const { t } = useTranslation();

  const image = {
    image: 'store/images/2023/5/1684555033_klcgqdchug.png',
    placeholder: 'store/images/2023/5/1684555033_klcgqdchug_placeholder.png'
  };

  return (
    <>
      <div className="overflow-hidden mb-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className={cn(
              'relative card my-5 rounded mx-auto max-w-[900px] flex border cursor-pointer hover:shadow-lg',
              { 'border-green-500': idx === 0 }
            )}
          >
            {idx === 0 && (
              <div className="absolute right-0 top-0 p-1 bg-green-500 text-white">
                <div>
                  <CheckMark />
                </div>
              </div>
            )}
            <div className="min-w-[180px] rounded">
              <ImageComponent
                alt={'alt'}
                src={image.image}
                customPlaceholder={image.placeholder}
                width={350}
                height={300}
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div className="p-3 relative min-h-[200px]">
              <span className="cut-line-1">Free Liberty Responsive Theme</span>
              <p className="cut-line-3 text-gray-500 text-xs">
                LibertyTheme - fully free, mobile theme with lots of
                customizable functions allows setting the skin of your shop
                flexibly and starting the work within a short time.
              </p>
              <div className="absolute mb-5 bottom-0 flex items-center flex-wrap mt-11 pr-3">
                {idx === 0 ? (
                  <Button
                    size="small"
                    className="m-1 bg-blue-600 hover:bg-blue-400"
                  >
                    Edit theme
                  </Button>
                ) : (
                  <Button size="small" className="m-1">
                    Activate
                  </Button>
                )}
                {idx !== 0 && (
                  <Button
                    size="small"
                    className="m-1 bg-red-500 hover:bg-red-400"
                  >
                    Delete
                  </Button>
                )}
                <Button variant="outline" size="small" className="m-1">
                  <div className="mx-1">
                    <Eye width={16} height={16} />
                  </div>
                  Demo
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyThemeList;
