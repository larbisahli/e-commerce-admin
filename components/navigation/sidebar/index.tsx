import styles from '@components/navigation/scss/index.module.scss';
import Scrollbar from '@components/ui/scrollbar';
import { useGetUser } from '@hooks/useGetUser';
import { useUI } from '@hooks/useUI';
import { siteSettings } from '@settings/site.settings';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import SidebarItem from './sidebar-item';

let cx = classNames.bind(styles);

interface Props {
  absolute?: boolean;
}

const Sidebar: React.FC<Props> = ({ absolute = false }) => {
  const { t } = useTranslation();
  const [showLinkIdLevel1, setShowLinkIdLevel1] = useState<string>('');
  const {
    toggleSidebar,
    ui: { displayMiniSidebar }
  } = useUI();

  const {
    userInfo: { storeName = '' }
  } = useGetUser();

  return (
    <aside
      className={cx(
        'w-64 xl:w-64 overflow-y-auto bg-sidenav fixed start-0 bottom-0 h-full z-50',
        {
          hidden: !absolute,
          'lg:block': !absolute,
          block: absolute,
          '!hidden': displayMiniSidebar
        }
      )}
    >
      <Scrollbar className="flex flex-col w-full h-full">
        <div className="py-3 pl-6 flex items-center">
          <div className="relative">
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
          <div className="px-2 pt-1  text-white font-medium text-lg capitalize cut-line-1">
            {storeName}
          </div>
        </div>
        <div className="flex justify-center mb-3">
          <div className="h-[1px] w-[90%] bg-sidenav-divider"></div>
        </div>
        {siteSettings.sidebarLinks.admin.map(
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
              showLinkId={showLinkIdLevel1}
              setShowLinkId={setShowLinkIdLevel1}
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
export default Sidebar;
