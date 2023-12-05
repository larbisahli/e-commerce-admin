import { ShopIcon } from '@components/icons/sidebar';
import styles from '@components/navigation/scss/index.module.scss';
import SearchBar from '@components/search-bar';
import Link from '@components/ui/link';
import { useGetUser } from '@hooks/useGetUser';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useUI } from '@hooks/useUI';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import NavMenu from './menu';
import NavNotification from './notification';

let cx = classNames.bind(styles);

const Navbar = () => {
  const { t } = useTranslation();
  const {
    toggleSidebar,
    ui: { displayMobileSidebar, displayMiniSidebar },
    closeSidebarIfPresent
  } = useUI();

  const menuSpanClass = cx('span', {
    'span--open': displayMobileSidebar,
    'span--close': !displayMobileSidebar
  });

  const closeSideBar = useMediaQuery('min-width', 768);

  const [show, setShow] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, []);

  /**
   * Close sidebar when mini side bar appears
   */
  useEffect(() => {
    if (closeSideBar) {
      closeSidebarIfPresent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeSideBar]);

  const {
    userInfo: { store: { alias = '' } = {} }
  } = useGetUser();

  const rev = 3439.89;

  return (
    <header
      className={cx(
        'border-b-400 fixed top-0 right-0 left-0 z-40 w-full border bg-white',
        { 'shadow-md': show }
      )}
    >
      <nav
        className={cx(
          'nlg:ps-20 nxl:ps-20 md:ps-20 lg:ps-64 xl:ps-64',
          'flex items-center justify-between px-5 py-2 md:px-8',
          {
            'md:!ps-20': displayMiniSidebar
          }
        )}
      >
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => toggleSidebar({ field: 'displayMobileSidebar' })}
          className="relative flex h-[25px] w-[12px] items-center justify-center rounded border bg-white p-5 focus:outline-none md:hidden lg:hidden"
        >
          <div className={cx('menu-icon-container')}>
            <span className={menuSpanClass}></span>
            <span className={menuSpanClass}></span>
            <span className={menuSpanClass}></span>
          </div>
        </motion.button>
        <div className="flex justify-center px-8">
          <div className="flex flex-col items-center justify-center rounded border p-2 px-3 shadow-sm">
            <span className="text-xs font-medium text-gray-600">
              {t('common:sticker-card-title-today-rev')}
            </span>
            <span className="font-medium text-green-500">
              ${rev?.toCommas()}
            </span>
          </div>
        </div>
        <div className="flex flex-1 justify-center px-8">
          <div className="max-w-[600px] flex-1">
            <SearchBar />
          </div>
        </div>
        <div className="flex items-center space-s-5">
          <Link
            target="_blank"
            className="flex h-10 w-10 items-center justify-center rounded-sm border bg-white text-gray-700 shadow hover:border-blue-300 hover:text-accent"
            href={`https://${alias}.dropgala.shop`}
          >
            <ShopIcon />
          </Link>
          <NavNotification />
          <NavMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
