import { useUI } from '@hooks/useUI';
import { siteSettings } from '@settings/site.settings';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import Drawer from '../ui/drawer';
import DrawerWrapper from '../ui/drawer-wrapper';
import SidebarItem from './sidebar/sidebar-item';

const MobileNavigation: React.FC = () => {
  const {
    ui: { displaySidebar },
    handleSidebar
  } = useUI();
  const { t } = useTranslation();
  const [showLinkIdLevel1, setShowLinkIdLevel1] = useState<string>('');

  return (
    <div>
      <Drawer
        open={displaySidebar}
        onClose={() => handleSidebar({ display: false })}
        variant="left"
      >
        <DrawerWrapper onClose={() => handleSidebar({ display: false })}>
          <div className="flex flex-col py-3">
            {siteSettings?.sidebarLinks?.admin?.map(
              ({ id, href, label, icon, line, subLinks }) => (
                <SidebarItem
                  id={id}
                  key={id}
                  href={href}
                  label={t(label)}
                  icon={icon}
                  includes={href}
                  line={line}
                  subLinks={subLinks}
                  showLinkId={showLinkIdLevel1}
                  setShowLinkId={setShowLinkIdLevel1}
                />
              )
            )}
            <div className="w-full h-32"></div>
          </div>
        </DrawerWrapper>
      </Drawer>
    </div>
  );
};
export default MobileNavigation;
