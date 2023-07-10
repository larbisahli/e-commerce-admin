import { useMutation } from '@apollo/client';
import { ArrowPrev } from '@components/icons/arrow-prev';
import { CheckMark } from '@components/icons/checkmark';
import StarIcon from '@components/icons/star';
import ImageComponent from '@components/ImageComponent';
import Button from '@components/ui/button';
import { ADD_STORE_THEME } from '@graphql/theme';
import { useErrorLogger } from '@hooks/index';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/index';
import { ThemeType } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

type IProps = {
  theme: ThemeType | null | undefined;
};

const ThemePage = ({ theme }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { userInfo } = useGetUser();
  const [error, setError] = useState(null);

  const csrfToken = userInfo?.csrfToken;

  const [addStoreTheme, { loading }] = useMutation(ADD_STORE_THEME, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: ({ addStoreTheme }) => {
      if (!isEmpty(addStoreTheme)) {
        notify(t('common:successfully-added'), 'success');
      }
    }
  });

  useErrorLogger(error);

  const handleThemeCall = () => {
    addStoreTheme({
      variables: { id: theme?.id }
    }).catch((err) => {
      setError(err);
    });
  };

  return (
    <>
      <div className="overflow-hidden mb-6 mx-auto max-w-[1000px]">
        <div className="">
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            <ArrowPrev />
            {t('form:button-label-back')}
          </Button>
        </div>
        {!isEmpty(theme) && (
          <div className="mt-8">
            {/* ----- HEAD */}
            <div className="flex h-full sm:flex-nowrap flex-wrap justify-between">
              <div className="flex h-full flex-2 mb-5">
                <div className="">
                  <div className="w-20 h-full pr-3">
                    <ImageComponent
                      src={'placeholders/image.jpg'}
                      customPlaceholder={'placeholders/image__placeholder.png'}
                      width={80}
                      height={80}
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="p-1 flex-col h-full max-w-[700px]">
                  <h2 className="font-bold text-xl">{theme?.title}</h2>
                  <div className="text-gray-400 text-xs mt-1">{`Version: ${
                    theme?.version ?? 'v1'
                  }`}</div>
                  <span className="text-gray-400 text-xs">by:</span>
                  <span className="text-xs mx-1 text-blue-400">{`Dropgala`}</span>
                  <p className="text-gray-600 text-sm my-2">
                    {theme?.description}
                  </p>
                  <div className="flex items-center justify-between pr-3">
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
                  </div>
                </div>
              </div>
              <div className="w-fit flex-grow">
                {theme?.installed ? (
                  <div className="max-w-[170px] sm:min-w-[170px] flex flex-col justify-end self-start">
                    <Button className="text-sm rounded-md bg-green-500 hover:bg-green-500">
                      <CheckMark />
                      <span className="pl-1">Theme added</span>
                    </Button>
                  </div>
                ) : (
                  <div className="max-w-[170px] sm:min-w-[170px] flex flex-col justify-end self-start">
                    <Button
                      loading={loading}
                      onClick={handleThemeCall}
                      className="text-sm rounded-md"
                    >
                      Add Theme
                    </Button>
                    {theme?.isFree ? (
                      <div className="text-lg font-semibold text-gray-900 mt-3 text-right">
                        Free
                      </div>
                    ) : (
                      <div className="text-lg font-semibold text-gray-900 mt-2 text-right">
                        {theme?.price}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* ------ GALLERY */}
            <div className="mt-11">
              <div className="w-full h-full m-3">
                <Image alt="" src="/scandi.webp" width={1000} height={600} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ThemePage;
