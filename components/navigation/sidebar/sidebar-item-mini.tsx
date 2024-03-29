/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as sidebarIcons from '@components/icons/sidebar';
import ActiveLink from '@components/ui/activeLink';
import { useUI } from '@hooks/useUI';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
interface Props {
  id: string;
  href: string;
  icon: string;
  label: string;
  includes: string;
  line?: boolean;
  margin?: boolean;
  showTriangle?: boolean;
  disabled?: boolean;
  subLinks?: {
    id: string;
    href: string;
    icon?: string;
    label: string;
    padding: string;
    disabled?: boolean;
  }[];
}

const SidebarItem = ({
  id,
  href,
  icon,
  label,
  includes,
  line,
  disabled,
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
          title={label}
          className={cn(
            'relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden border-l-2 border-solid border-transparent p-2 py-4 text-start text-base text-gray-800 hover:border-blue-300 hover:!bg-gray-100 focus:text-accent',
            {
              'mb-12': margin,
              'border-blue-600': currentLink[1] === inLink[1],
              'border-blue-600 !bg-gray-200 hover:!bg-gray-100':
                sublevelOpen || linkHighlight
            },
            {
              'pointer-events-none opacity-70': disabled
            }
          )}
          onClick={() => openSublevelSidebar({ id })}
        >
          <SidebarLabel icon={icon} label={label} />
        </div>
      ) : (
        <ActiveLink
          href={href}
          title={label}
          onClick={closeSublevelSidebar}
          activeClassName={cn(
            'relative !bg-gray-200 hover:!bg-gray-100 !text-gray-800 border-blue-400'
          )}
          className={cn(
            'relative flex w-full flex-col items-center justify-center overflow-hidden border-l-2 border-solid border-transparent py-3 text-start text-base text-gray-800 hover:border-blue-500 hover:bg-gray-100',
            { 'mb-12': margin },
            {
              'pointer-events-none opacity-70': disabled
            }
          )}
          includes={includes}
        >
          <SidebarLabel icon={icon} label={label} />
        </ActiveLink>
      )}
      {line && (
        <div className="mb-2 flex justify-center">
          <div className="h-[2px] w-[76%] bg-gray-200"></div>
        </div>
      )}
    </React.Fragment>
  );
};

const SidebarLabel = ({ icon, label }: { icon: string; label: string }) => {
  const TagName = sidebarIcons[icon];

  return (
    <React.Fragment>
      {icon && TagName && <TagName className="h-[22px] w-[22px]" />}
      <span className="pt-1 text-xs font-medium text-gray-800">
        {label?.split(' ')[0]}
      </span>
    </React.Fragment>
  );
};

export default SidebarItem;
