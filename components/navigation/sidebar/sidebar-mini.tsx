// import LogoSvg from '@components/icons/logo';
import Logo from '@components/ui/logo';
import Scrollbar from '@components/ui/scrollbar';
import { siteSettings } from '@settings/site.settings';
import { useTranslation } from 'next-i18next';
import React from 'react';

import SidebarItem from './sidebar-item-mini';

const SidebarMini: React.FC = () => {
  const { t } = useTranslation();

  return (
    <aside className="w-22 xl:w-76 hidden h-full lg:block md:block overflow-y-auto bg-sidenav fixed start-0 bottom-0 pt-4 z-50">
      <div className="relative">
        <Logo />
      </div>
      <Scrollbar className="flex flex-col w-full h-full space-y-12">
        <div className="flex justify-center my-2">
          <div className="h-[2px] w-[76%] bg-sidenav-divider"></div>
        </div>
        {siteSettings.sidebarLinks?.admin?.map(
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
