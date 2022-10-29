import { useUI } from '@contexts/ui.context';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { siteSettings } from '@settings/site.settings';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useState } from 'react';

import Drawer from '../ui/drawer';
import DrawerWrapper from '../ui/drawer-wrapper';
import SidebarItem from './sidebar/sidebar-item';

interface Props {
  id: string;
  href: string;
  icon?: string;
  label?: string;
  isSubLink?: boolean;
  subLinks?: {
    id: string;
    href: string;
    icon?: string;
    label: string;
    line?: boolean;
    padding: string;
    isSubLink?: boolean;
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

  const closeSublevelMd = useMediaQuery('max-width', 768);
  const closeSublevelLg = useMediaQuery('min-width', 1024);
  const closeSublevel = closeSublevelMd || closeSublevelLg;

  /**
   * Close sidebar when mini side bar disappears
   */
  useEffect(() => {
    if (closeSublevel) {
      closeSublevelSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeSublevel]);

  return (
    <Drawer
      open={displaySublevelSidebar}
      onClose={closeSublevelSidebar}
      variant="left"
    >
      <DrawerWrapper
        onClose={closeSublevelSidebar}
        label={t(SublevelBarLinks?.label)}
        className="pl-22 xl:pl-76 lg:block"
      >
        <div className="flex flex-col py-3">
          {SublevelBarLinks?.subLinks?.map(
            ({ id, href, label, icon, subLinks, isSubLink }: Props) => (
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
                isSubLink={isSubLink}
              />
            )
          )}
          <div className="w-full h-32"></div>
        </div>
      </DrawerWrapper>
    </Drawer>
  );
};
export default SublevelNavigation;
