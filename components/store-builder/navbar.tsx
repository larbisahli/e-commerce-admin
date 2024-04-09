import DesktopIcon from '@components/icons/desktop-icon';
import MobileIcon from '@components/icons/mobile-icon';
import ThemeIcon from '@components/icons/theme';
import styles from '@components/navigation/scss/index.module.scss';
import Button from '@components/ui/button';
import { useGetUser } from '@hooks/useGetUser';
import { useUI } from '@hooks/useUI';
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
  } = useGetUser();

  const {
    ui: {
      builder: { isMobileView }
    },
    setBuilderDeviceView
  } = useUI();

  return (
    <header
      className={cx(
        'fixed top-0 right-0 left-0 z-40 h-[58px] w-full border-b bg-gray-100 shadow-sm'
      )}
    >
      <nav className={cx('flex items-center justify-between px-5 py-2')}>
        <Link href={ROUTES.DASHBOARD} className="flex items-center pl-6">
          <div className="flex items-center pt-1 text-lg font-medium capitalize text-black">
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
          <button
            onClick={() => setBuilderDeviceView({ isMobileView: false })}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-sm border border-gray-300 text-gray-600 hover:border-accent hover:text-accent',
              { 'border-accent text-accent': !isMobileView }
            )}
          >
            <DesktopIcon width={20} height={20} />
          </button>
          <button
            onClick={() => setBuilderDeviceView({ isMobileView: true })}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-sm border border-gray-300 text-gray-600 hover:border-accent hover:text-accent',
              { 'border-accent text-accent': isMobileView }
            )}
          >
            <MobileIcon width={20} height={20} />
          </button>
          <Button className="bg-green-600 hover:bg-green-700">Publish</Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
