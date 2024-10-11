import { UpgradeIcon } from '@components/icons/sidebar/upgrade';
import Button from '@components/ui/button';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { siteSettings } from '@settings/site.settings';
import { ROUTES } from '@utils/routes';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useMemo, useState } from 'react';

import Drawer from '../ui/drawer';
import DrawerWrapper from '../ui/drawer-wrapper';
import SidebarItem from './sidebar/sidebar-item';

const MobileNavigation: React.FC = () => {
  const {
    ui: { displayMobileSidebar },
    handleSidebar
  } = useUI();
  const { t } = useTranslation();
  const [showLinkIdLevel1, setShowLinkIdLevel1] = useState<string>('');

  const { createdAt, tier } = useSettings();

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
    <div>
      <Drawer
        open={displayMobileSidebar}
        onClose={() =>
          handleSidebar({ field: 'displayMobileSidebar', display: false })
        }
        variant="left"
      >
        <DrawerWrapper
          onClose={() =>
            handleSidebar({ field: 'displayMobileSidebar', display: false })
          }
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <div className="mb-3 w-fit rounded-sm p-1 text-sm text-gray-500">
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
            </div>
            <Link href={`${ROUTES.BILLING}`}>
              <div className="flex w-full items-center px-4">
                <Button className="w-full !rounded-full">
                  <div className="flex items-center justify-center">
                    <div>
                      <UpgradeIcon width={25} height={25} />
                    </div>
                    <div className="font-medium">Upgrade plan</div>
                  </div>
                </Button>
              </div>
            </Link>
          </div>
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
            <div className="h-32 w-full"></div>
          </div>
        </DrawerWrapper>
      </Drawer>
    </div>
  );
};
export default MobileNavigation;
