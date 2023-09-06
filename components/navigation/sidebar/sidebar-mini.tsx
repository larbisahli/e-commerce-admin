import styles from '@components/navigation/scss/index.module.scss';
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@hooks/useUI';
import { siteSettings } from '@settings/site.settings';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React from 'react';

import SidebarItem from './sidebar-item-mini';

let cx = classNames.bind(styles);

const SidebarMini: React.FC = () => {
  const { t } = useTranslation();

  const {
    toggleSidebar,
    ui: { displayMiniSidebar }
  } = useUI();

  return (
    <aside
      className={cx(
        'fixed bottom-0 z-50 hidden h-full w-22 overflow-y-auto bg-sidenav pt-4 start-0 md:block lg:hidden',
        {
          'md:!block': displayMiniSidebar
        }
      )}
    >
      <Scrollbar className="flex h-full w-full flex-col">
        <div className="relative flex items-center justify-center">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => toggleSidebar({ field: 'displayMiniSidebar' })}
            className="relative flex h-[25px] w-[12px] items-center justify-center rounded p-5"
          >
            <div className={cx('menu-icon-container')}>
              <span
                style={{ backgroundColor: '#b3b3b3' }}
                className={cx('span', 'span--close')}
              ></span>
              <span
                style={{ backgroundColor: '#b3b3b3' }}
                className={cx('span', 'span--close')}
              ></span>
              <span
                style={{ backgroundColor: '#b3b3b3' }}
                className={cx('span', 'span--close')}
              ></span>
            </div>
          </motion.button>
        </div>
        <div className="my-2 flex justify-center">
          <div className="h-[2px] w-[76%] bg-sidenav-divider"></div>
        </div>
        {siteSettings.sidebarLinks?.admin?.map(
          ({ id, href, label, icon, line, subLinks, disabled }) => (
            <SidebarItem
              key={id}
              id={id}
              href={href}
              label={t(label)}
              icon={icon}
              includes={href}
              line={line}
              subLinks={subLinks}
              disabled={disabled}
              showTriangle
            />
          )
        )}
        <div className="h-32 w-full"></div>
      </Scrollbar>
    </aside>
  );
};
export default SidebarMini;
