import Button from '@components/ui/button';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useGetUser } from '@hooks/useGetUser';
import { mediaURL } from '@utils/utils';
import { useTranslation } from 'next-i18next';

const favicons = (alias) => [
  {
    src: `${alias}/webmanifest/favicon/icons/icon_ios_120x120.png`,
    type: 'image/png',
    sizes: '120x120',
    width: 120,
    height: 120
  },
  {
    src: `${alias}/webmanifest/favicon/icons/icon_ios_152x152.png`,
    type: 'image/png',
    sizes: '152x152',
    width: 152,
    height: 152
  },
  {
    src: `${alias}/webmanifest/favicon/icons/icon_ios_167x167.png`,
    type: 'image/png',
    sizes: '167x167',
    width: 167,
    height: 167
  },
  {
    src: `${alias}/webmanifest/favicon/icons/icon_ios_180x180.png`,
    type: 'image/png',
    sizes: '180x180',
    width: 180,
    height: 180
  },
  {
    src: `${alias}/webmanifest/favicon/icons/icon_android_36x36.png`,
    type: 'image/png',
    sizes: '36x36',
    width: 36,
    height: 36
  },
  {
    src: `${alias}/webmanifest/favicon/icons/icon_android_48x48.png`,
    type: 'image/png',
    sizes: '48x48',
    width: 48,
    height: 48
  },
  {
    src: `${alias}/webmanifest/favicon/icons/icon_android_72x72.png`,
    type: 'image/png',
    sizes: '72x72',
    width: 72,
    height: 72
  },
  {
    src: `${alias}/webmanifest/favicon/icons/icon_android_96x96.png`,
    type: 'image/png',
    sizes: '96x96',
    width: 96,
    height: 96
  },
  {
    src: `${alias}/webmanifest/favicon/icons/icon_android_144x144.png`,
    type: 'image/png',
    sizes: '144x144',
    width: 144,
    height: 144
  },
  {
    src: `${alias}/webmanifest/favicon/icons/icon_android_192x192.png`,
    type: 'image/png',
    sizes: '192x192',
    width: 192,
    height: 192
  },
  {
    src: `${alias}/webmanifest/favicon/icons/icon_android_512x512.png`,
    type: 'image/png',
    sizes: '512x512',
    width: 512,
    height: 512
  }
];

const OrderStatusDeleteView = () => {
  const { t } = useTranslation();

  const { closeModal } = useModalAction();

  const {
    userInfo: { ali: alias }
  } = useGetUser();

  console.log({ fav: favicons(alias) });

  return (
    <div className="z-50 flex overflow-y-auto max-h-screen flex-col bg-white md:h-fit h-[100vh] w-[100vw] md:w-[70vw] 2xl:w-[60vw]">
      <div className="p-4 font-semibold text-lg bg-blue-600 text-white capitalize">
        Store favicons
      </div>
      <div className="p-4 h-fit min-h-[400px] w-full">
        <div className="flex item-center">
          <p className="text-gray-500">
            Auto generated favicons for your Progressive Web App (PWA) store.
          </p>
        </div>
        <div className="flex border-t flex-col justify-between relative my-5 flex-1">
          <div className="h-full w-full">
            <ul className="my-4 flex flex-col w-full overflow-y-auto">
              {favicons(alias)
                ?.sort((a, b) => a.width - b.width)
                ?.map((favicon) => {
                  return (
                    <li key={favicon.src} className="flex items-center m-2">
                      <div className="flex flex-col text-sm text-gray-600 font-semibold mr-2">
                        <span className="py-1">{favicon.sizes}</span>
                        <span>{favicon.type}</span>
                      </div>
                      {/* <ImageComponent
                        src={favicon.src}
                        customPlaceholder=""
                        width={favicon.width}
                        height={favicon.height}
                        alt="favicon"
                      /> */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${mediaURL}/${favicon.src}`}
                        alt="favicon"
                        width={favicon.width}
                        height={favicon.height}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="flex items-center mt-3 md:mb-0 justify-end pb-16">
            <Button
              variant="outline"
              className="mr-4"
              onClick={() => closeModal()}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusDeleteView;
