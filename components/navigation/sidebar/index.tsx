import Logo from '@components/ui/logo';
import Scrollbar from '@components/ui/scrollbar';
import { siteSettings } from '@settings/site.settings';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import SidebarItem from './sidebar-item';

interface Props {
  absolute?: boolean;
}

const Sidebar: React.FC<Props> = ({ absolute = false }) => {
  const { t } = useTranslation();
  const [showLinkIdLevel1, setShowLinkIdLevel1] = useState<string>('');

  return (
    <aside
      className={classNames(
        'w-64 xl:w-64 overflow-y-auto bg-sidenav fixed start-0 bottom-0 h-full',
        { hidden: !absolute, 'lg:block': !absolute, block: absolute }
      )}
    >
      <Scrollbar className="flex flex-col w-full h-full space-y-5">
        {siteSettings.sidebarLinks.admin.map(
          ({ id, href, label, icon, line, subLinks }) => (
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
              // showTriangle
            />
          )
        )}
        <div className="w-full h-32"></div>
      </Scrollbar>
    </aside>
  );
};
export default Sidebar;
