import DesktopIcon from '@components/icons/desktop-icon';
import MobileIcon from '@components/icons/mobile-icon';
import TabletIcon from '@components/icons/tablet-icon';
import styles from '@components/navigation/scss/index.module.scss';
import { useGetClient } from '@hooks/useGetClient';
import { useUI } from '@hooks/useUI';
import { DEVICE_VIEWS } from '@ts-types/enums';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

let cx = classNames.bind(styles);

const Navbar = () => {
  const { t } = useTranslation();
  const {
    userInfo: { store: { alias = '' } = {} }
  } = useGetClient();

  const {
    ui: {
      builder: { deviceView }
    },
    updateBuilderInfo
  } = useUI();

  return (
    <header
      className={cx(
        'fixed top-0 right-0 left-0 z-40 w-full border-b bg-gray-100 shadow-sm'
      )}
    >
      <nav className={cx('flex h-[58px] items-center justify-between px-5')}>
        <Link href={ROUTES.DASHBOARD} className="flex items-center">
          <div className="flex items-center text-lg font-medium capitalize text-black">
            <Image
              src={'/favicon/icons/icon_android_192x192.png'}
              alt="logo"
              width={25}
              height={25}
            />
            <span className="pl-4 text-gray-700">{alias}</span>
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-end space-s-5">
          <div className="flex flex-1 items-center justify-center">
            <button
              onClick={() =>
                updateBuilderInfo({ deviceView: DEVICE_VIEWS.DESKTOP })
              }
              className={cn(
                'flex h-7 w-10 items-center justify-center rounded-l-sm border-t border-b border-l border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                {
                  'border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                    deviceView === DEVICE_VIEWS.DESKTOP
                }
              )}
            >
              <DesktopIcon width={18} height={18} />
            </button>
            <button
              onClick={() =>
                updateBuilderInfo({ deviceView: DEVICE_VIEWS.TABLET })
              }
              className={cn(
                'flex h-7 w-10 items-center justify-center border-t border-b border-r border-l border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 hover:text-blue-700',
                {
                  'border-accent bg-blue-100 text-accent hover:bg-blue-200':
                    deviceView === DEVICE_VIEWS.TABLET,
                  'border-l-accent': deviceView === DEVICE_VIEWS.DESKTOP,
                  '!border-r-0': deviceView === DEVICE_VIEWS.MOBILE
                }
              )}
            >
              <TabletIcon width={18} height={18} />
            </button>
            <button
              onClick={() =>
                updateBuilderInfo({ deviceView: DEVICE_VIEWS.MOBILE })
              }
              className={cn(
                'flex h-7 w-10 items-center justify-center rounded-r-sm border-t border-b border-r border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                {
                  'border-l border-accent border-l-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                    deviceView === DEVICE_VIEWS.MOBILE
                }
              )}
            >
              <MobileIcon width={18} height={18} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
