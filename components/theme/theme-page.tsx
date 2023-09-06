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
      <div className="mx-auto mb-6 max-w-[1000px] overflow-hidden">
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
            <div className="flex h-full flex-wrap justify-between sm:flex-nowrap">
              <div className="flex-2 mb-5 flex h-full">
                <div className="">
                  <div className="h-full w-20 pr-3">
                    <ImageComponent
                      src={'placeholders/image.jpg'}
                      customPlaceholder={'placeholders/image__placeholder.png'}
                      width={80}
                      height={80}
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="h-full max-w-[700px] flex-col p-1">
                  <h2 className="text-xl font-bold">{theme?.title}</h2>
                  <div className="mt-1 text-xs text-gray-400">{`Version: ${
                    theme?.version ?? 'v1'
                  }`}</div>
                  <span className="text-xs text-gray-400">by:</span>
                  <span className="mx-1 text-xs text-blue-400">{`Dropgala`}</span>
                  <p className="my-2 text-sm text-gray-600">
                    {theme?.description}
                  </p>
                  <div className="flex items-center justify-between pr-3">
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
                  </div>
                </div>
              </div>
              <div className="w-fit flex-grow">
                {theme?.installed ? (
                  <div className="flex max-w-[170px] flex-col justify-end self-start sm:min-w-[170px]">
                    <Button className="rounded-md bg-green-500 text-sm hover:bg-green-500">
                      <CheckMark />
                      <span className="pl-1">Theme added</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex max-w-[170px] flex-col justify-end self-start sm:min-w-[170px]">
                    <Button
                      loading={loading}
                      onClick={handleThemeCall}
                      className="rounded-md text-sm"
                    >
                      Add Theme
                    </Button>
                    {theme?.isFree ? (
                      <div className="mt-3 text-right text-lg font-semibold text-gray-900">
                        Free
                      </div>
                    ) : (
                      <div className="mt-2 text-right text-lg font-semibold text-gray-900">
                        {theme?.price}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* ------ GALLERY */}
            <div className="mt-11">
              <div className="m-3 h-full w-full">
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
