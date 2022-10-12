import { useUI } from '@contexts/ui.context';
import { siteSettings } from '@settings/site.settings';
import { useTranslation } from 'next-i18next';
import React, { useMemo, useState } from 'react';

import Drawer from '../ui/drawer';
import DrawerWrapper from '../ui/drawer-wrapper';
import SidebarItem from './sidebar/sidebar-item';

interface Props {
  id: string;
  href: string;
  icon?: string;
  label?: string;
  subLinks?: {
    id: string;
    href: string;
    icon?: string;
    label: string;
    line?: boolean;
    padding: string;
    subLinks?: {
      id: string;
      href: string;
      icon?: string;
      label: string;
      line?: boolean;
      padding: string;
    }[];
  }[];
}

const SublevelNavigation: React.FC = () => {
  const { displaySublevelSidebar, SublevelSidebarId, closeSublevelSidebar } =
    useUI();
  const { t } = useTranslation();
  const [showLinkIdLevel1, setShowLinkIdLevel1] = useState<string>('');

  const SublevelBarLinks = useMemo(
    () =>
      siteSettings?.sidebarLinks?.admin?.find(
        ({ id }) => id === SublevelSidebarId
      ),
    [SublevelSidebarId]
  );

  return (
    <div>
      <Drawer
        open={displaySublevelSidebar}
        onClose={closeSublevelSidebar}
        variant="left"
      >
        <DrawerWrapper
          onClose={closeSublevelSidebar}
          label={t(SublevelBarLinks?.label)}
        >
          <div className="flex flex-col py-3">
            {SublevelBarLinks?.subLinks?.map(
              //#8c8c8c
              ({ id, href, label, icon, subLinks }: Props) => (
                <SidebarItem
                  id={id}
                  key={id}
                  href={href}
                  label={t(label)}
                  icon={icon}
                  includes={href}
                  subLinks={subLinks}
                  showLinkId={showLinkIdLevel1}
                  setShowLinkId={setShowLinkIdLevel1}
                  padding={'10px'}
                  isSublevel
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
export default SublevelNavigation;
