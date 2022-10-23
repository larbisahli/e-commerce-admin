import LinkButton from '@components/ui/link-button';
import { useUI } from '@contexts/ui.context';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { ROUTES } from '@utils/routes';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import NavMenu from './menu';
import NavNotification from './notification';
import styles from './scss/index.module.scss';

let cx = classNames.bind(styles);

const Navbar = () => {
  const { t } = useTranslation();
  const { toggleSidebar, closeSidebarIfPresent } = useUI();

  const menuIsOpen = false;

  const menuSpanClass = cx('span', {
    'span--open': menuIsOpen,
    'span--close': !menuIsOpen
  });

  const closeSideBar = useMediaQuery('min-width', 768);

  /**
   * Close sidebar when mini side bar appears
   */
  useEffect(() => {
    if (closeSideBar) {
      closeSidebarIfPresent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeSideBar]);

  return (
    <header className="w-full">
      <nav className="px-5 md:px-8 py-2 flex items-center justify-between lg:justify-end md:justify-end">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={toggleSidebar}
          className="relative items-center justify-center focus:outline-none flex lg:hidden md:hidden border h-[30px] w-[18px] p-5 rounded bg-white"
        >
          <div className={cx('menu-icon-container')}>
            <span className={menuSpanClass}></span>
            <span className={menuSpanClass}></span>
            <span className={menuSpanClass}></span>
          </div>
        </motion.button>
        <div className="flex items-center space-s-8">
          <LinkButton
            href={`${ROUTES.PRODUCTS}/create`}
            className="ms-4 md:ms-6"
            size="small"
          >
            {t('common:text-create-product')}
          </LinkButton>
          <NavNotification />
          <NavMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
