/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as sidebarIcons from '@components/icons/sidebar';
import ActiveLink from '@components/ui/activeLink';
import { useUI } from '@hooks/useUI';
import cn from 'classnames';
import classNames from 'classnames/bind';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import styles from '../scss/index.module.scss';

let cx = classNames.bind(styles);

interface Props {
  id: string;
  href: string;
  icon: string;
  label: string;
  includes: string;
  line?: boolean;
  margin?: boolean;
  showTriangle?: boolean;
  subLinks?: {
    id: string;
    href: string;
    icon?: string;
    label: string;
    padding: string;
  }[];
}

const SidebarItem = ({
  id,
  href,
  icon,
  label,
  includes,
  line,
  margin = false,
  subLinks
}: Props) => {
  const { asPath } = useRouter();

  const {
    ui: { SublevelSidebarId, displaySublevelSidebar },
    openSublevelSidebar,
    closeSublevelSidebar
  } = useUI();
  const hadSubLinks = useMemo(() => !isEmpty(subLinks), [subLinks]);

  const currentLink = useMemo(() => asPath?.split('/'), [asPath]);
  const inLink = useMemo(() => href?.split('/'), [href]);

  const linkHighlight =
    currentLink[0] === inLink[0] && SublevelSidebarId === id;

  const sublevelOpen = SublevelSidebarId === id && displaySublevelSidebar;

  return (
    <React.Fragment>
      {hadSubLinks ? (
        <div
          className={cn(
            'overflow-hidden flex flex-col relative justify-center w-full py-4 pb-5 hover:!bg-sidenav-active-hover-color p-2 items-center text-base text-start text-sidenav-color-secondary focus:text-accent hover:border-blue-300 border-l-2 border-transparent border-solid cursor-pointer',
            {
              'mb-12': margin,
              'border-blue-300 !text-white': currentLink[1] === inLink[1],
              'border-blue-300 !text-white !bg-sidenav-active-color hover:!bg-sidenav-active-hover-color':
                sublevelOpen || linkHighlight
            }
          )}
          onClick={() => openSublevelSidebar({ id })}
        >
          <SidebarLabel icon={icon} label={label} />
        </div>
      ) : (
        <ActiveLink
          href={href}
          onClick={closeSublevelSidebar}
          activeClassName={cn(
            'relative !bg-sidenav-active-color hover:!bg-sidenav-active-hover-color !text-white border-green-300',
            {
              'sidebar-triangle': !displaySublevelSidebar
            }
          )}
          className={cn(
            'overflow-hidden flex flex-col relative justify-center w-full pb-5 hover:bg-sidenav-active-hover-color p-2 items-center text-base text-start text-sidenav-color-secondary focus:text-white hover:border-green-300 border-l-2 border-transparent border-solid',
            { 'mb-12': margin }
          )}
          includes={includes}
        >
          <SidebarLabel icon={icon} label={label} />
        </ActiveLink>
      )}
      {line && (
        <div className="flex justify-center mb-2">
          <div className="h-[2px] w-[76%] bg-sidenav-divider"></div>
        </div>
      )}
    </React.Fragment>
  );
};

const SidebarLabel = ({ icon, label }: { icon: string; label: string }) => {
  const TagName = sidebarIcons[icon];

  return (
    <React.Fragment>
      {icon && TagName && <TagName className="w-6 h-6" />}
      <span className={`${cx('mini-slider-container')}`}>{label}</span>
    </React.Fragment>
  );
};

export default SidebarItem;
