import { UpgradeIcon } from '@components/icons/sidebar/upgrade';
import styles from '@components/navigation/scss/index.module.scss';
import Scrollbar from '@components/ui/scrollbar';
import { useGetClient } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { siteSettings } from '@settings/site.settings';
import { ROUTES } from '@utils/routes';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useMemo, useState } from 'react';

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

  const { tier, storeName } = useSettings();

  return (
    <aside
      className={cx(
        'fixed bottom-0 z-50 h-full w-64 overflow-y-auto border-r bg-white start-0 xl:w-64',
        {
          hidden: !absolute,
          'lg:block': !absolute,
          block: absolute,
          '!hidden': displayMiniSidebar
        }
      )}
    >
      <Scrollbar className="flex h-full w-full flex-col">
        <div className="flex items-center py-2 pl-6">
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => toggleSidebar({ field: 'displayMiniSidebar' })}
              className="relative flex h-[25px] w-[12px] items-center justify-center rounded p-5"
            >
              <div className={cx('menu-icon-container')}>
                <span
                  style={{ backgroundColor: '#333' }}
                  className={cx('span', 'span--close')}
                ></span>
                <span
                  style={{ backgroundColor: '#333' }}
                  className={cx('span', 'span--close')}
                ></span>
                <span
                  style={{ backgroundColor: '#333' }}
                  className={cx('span', 'span--close')}
                ></span>
              </div>
            </motion.button>
          </div>
          <div className="cut-line-1 px-2  pt-1 text-xl font-bold capitalize text-blue-600">
            Dropgala
          </div>
        </div>
        <div className="mb-3 flex justify-center">
          <div className="h-[1px] w-[90%] bg-sidenav-divider"></div>
        </div>
        <div className="flex flex-col">
          <div className="mb-5 pl-6">
            <div className=" item-center flex flex-col px-2 pt-1">
              <div className="cut-line-1 text-lg font-medium capitalize text-black">
                {storeName}
              </div>
              <div className="mt-1 w-fit text-xs font-medium text-gray-600">
                {tier === 'BASIC' && 'Trial Plan Store'}
              </div>
            </div>
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
        </div>
        <div className="h-32 w-full"></div>
      </Scrollbar>
    </aside>
  );
};
export default Sidebar;
