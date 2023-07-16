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
    userInfo: { ali: alias }
  } = useGetUser();

  return (
    <header
      className={cx(
        'w-full fixed bg-white border border-b-400 top-0 right-0 left-0 z-40',
        { 'shadow-md': show }
      )}
    >
      <nav
        className={cx(
          'md:ps-20 nlg:ps-20 nxl:ps-20 lg:ps-64 xl:ps-64',
          'px-5 md:px-8 py-2 flex items-center justify-between',
          {
            'md:!ps-20': displayMiniSidebar
          }
        )}
      >
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => toggleSidebar({ field: 'displayMobileSidebar' })}
          className="relative items-center justify-center focus:outline-none flex lg:hidden md:hidden border h-[25px] w-[12px] p-5 rounded bg-white"
        >
          <div className={cx('menu-icon-container')}>
            <span className={menuSpanClass}></span>
            <span className={menuSpanClass}></span>
            <span className={menuSpanClass}></span>
          </div>
        </motion.button>
        <div className="px-8 flex-1 flex justify-center">
          <div className="max-w-[600px] flex-1">
            <SearchBar />
          </div>
        </div>
        <div className="flex items-center space-s-5">
          <Link
            target="_blank"
            className="bg-white hover:text-accent text-gray-700 shadow hover:border-blue-300 border rounded-sm w-10 h-10 flex items-center justify-center"
            href={`https://${alias}.dropgala.com`}
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
