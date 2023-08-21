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
        'w-22 lg:hidden md:block hidden h-full overflow-y-auto bg-sidenav fixed start-0 bottom-0 pt-4 z-50',
        {
          'md:!block': displayMiniSidebar
        }
      )}
    >
      <Scrollbar className="flex flex-col w-full h-full">
        <div className="relative flex justify-center items-center">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => toggleSidebar({ field: 'displayMiniSidebar' })}
            className="relative items-center justify-center flex h-[25px] w-[12px] p-5 rounded"
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
        <div className="flex justify-center my-2">
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
        <div className="w-full h-32"></div>
      </Scrollbar>
    </aside>
  );
};
export default SidebarMini;
