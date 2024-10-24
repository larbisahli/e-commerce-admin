import { AddIcon, MyShopIcon } from '@components/icons/sidebar';
import styles from '@components/navigation/scss/index.module.scss';
import Button from '@components/ui/button';
import Link from '@components/ui/link';
import { useGetClient } from '@hooks/useGetClient';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { ROUTES } from '@utils/routes';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';

import LanguageSwitcher from './language-switcher';
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
  } = useGetClient();

  const { createdAt, subscription } = useSettings();
  const settings = useSettings();
  console.log('settings ::>>>', settings);

  const isSubscribed =
    !subscription?.cancel_at_period_end && subscription?.status === 'active';

  const trialDaysLeft = useMemo(() => {
    if (!createdAt) return [];
    const trialDays = 14;
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(createdAt);
    const secondDate = new Date(Date.now() - oneDay * trialDays);
    const diffDays = Math.round(
      Math.abs((Number(firstDate) - Number(secondDate)) / oneDay)
    );
    const arrayNum = diffDays.toString().split('');
    if (arrayNum.length > 1) return arrayNum;
    return [0, ...arrayNum];
  }, [createdAt]);

  return (
    <header
      className={cx(
        'border-b-400 fixed top-0 right-0 left-0 z-40 h-fit w-full border-b bg-white bg-opacity-50 backdrop-blur-xl sm:h-[58px]',
        { 'shadow-sm': show }
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
        {/* <div className="flex justify-center px-8">
          <div className="flex flex-col items-center justify-center rounded border p-2 px-3 shadow-sm">
            <span className="text-xs font-medium text-gray-600">
              {t('common:sticker-card-title-today-rev')}
            </span>
            <span className="font-medium text-green-500">
              ${rev?.toCommas()}
            </span>
          </div>
        </div> */}
        {/* <div className="flex flex-1 justify-center px-8">
          <div className="max-w-[600px] flex-1">
            <SearchBar />
          </div>
        </div> */}
        {!isSubscribed && (
          <div className="hidden sm:block">
            <Link href={ROUTES.BILLING}>
              <div className="flex items-center pl-6">
                <div className="mx-2 w-fit rounded-sm p-1 text-sm text-gray-500">
                  {trialDaysLeft.map((day, idx) => (
                    <span
                      key={idx}
                      className="mx-[2px] w-full rounded-sm border bg-gray-200 px-1 py-1 text-black"
                    >
                      {day}
                    </span>
                  ))}
                  <span className="mx-1">Days left in your trial.</span>
                  {/* <span className="mx-1"> Your trial ends today.</span> */}
                </div>
                <Button className="rounded">
                  <div className="flex items-center">
                    <div className="font-medium">Select a Plan</div>
                  </div>
                </Button>
              </div>
            </Link>
          </div>
        )}
        <div className="flex flex-1 items-center justify-end space-s-5">
          <LanguageSwitcher />
          <Link
            className="hidden h-10 w-10 items-center justify-center rounded-sm border bg-white text-gray-600 hover:border-blue-300 hover:text-accent sm:flex"
            href={`${ROUTES.PRODUCT}/create`}
          >
            <AddIcon width={20} height={20} />
          </Link>
          <Link
            target="_blank"
            title="Create"
            className="hidden h-10 w-10 items-center justify-center rounded-sm border bg-white text-gray-600 hover:border-blue-300 hover:text-accent sm:flex"
            href={`https://${alias}.dropgala.shop`}
          >
            <MyShopIcon width={20} height={20} />
          </Link>
          <NavNotification />
          <NavMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
