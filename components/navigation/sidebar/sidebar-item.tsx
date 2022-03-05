/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Add } from '@components/icons/add';
import { Minus } from '@components/icons/minus';
import * as sidebarIcons from '@components/icons/sidebar';
import ActiveLink from '@components/ui/activeLink';
import { useUI } from '@contexts/ui.context';
import { getIcon } from '@utils/get-icon';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';

interface Props {
  id: string;
  href: string;
  icon?: string;
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
    subLinks?: {
      id: string;
      href: string;
      icon?: string;
      label: string;
      padding: string;
    }[];
  }[];
  padding?: string;
  showLinkId: string;
  setShowLinkId: Dispatch<SetStateAction<string>>;
}

interface LabelProps {
  id: string;
  icon: string;
  label: string;
  hadSubLinks: boolean;
  padding: string;
  showLinkId: string;
}

const SidebarItem = ({
  id,
  href,
  icon,
  label,
  includes,
  line,
  showTriangle,
  subLinks,
  padding,
  showLinkId,
  setShowLinkId
}: Props) => {
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const [showLinksLevel2, setShowLinksLevel2] = useState<string>('');

  const hadSubLinks = useMemo(() => !isEmpty(subLinks), [subLinks]);

  const handleShowLinkId = () => {
    setShowLinkId((prev) => {
      if (prev === id) return '';
      return id;
    });
  };

  const currentLink = useMemo(() => asPath?.split('/'), [asPath]);
  const inLink = useMemo(() => href?.split('/'), [href]);

  const linkOpenHighlight = currentLink[0] === inLink[0] && showLinkId === id;

  return (
    <React.Fragment>
      {line && <div className="w-full h-px bg-sidenav-divider mt-2 mb-2"></div>}
      {hadSubLinks ? (
        <div
          className={cn(
            'overflow-hidden cursor-pointer justify-between flex w-full pl-6 hover:bg-gray-700 p-2 items-center text-base text-sidenav-color text-start focus:text-accent hover:border-solid hover:border-green-300 hover:border-l-2 border-l-2 border-transparent border-solid',
            { 'nav-sub-links-bg': !!padding, '!text-white': linkOpenHighlight }
          )}
          onClick={handleShowLinkId}
        >
          <SidebarLabel
            id={id}
            icon={icon}
            padding={padding}
            label={label}
            showLinkId={showLinkId}
            hadSubLinks={hadSubLinks}
          />
        </div>
      ) : (
        <ActiveLink
          href={href}
          activeClassName={
            hadSubLinks
              ? ''
              : cn('relative !bg-green-600 hover:!bg-green-500 !text-white', {
                  'sidebar-triangle': showTriangle
                })
          }
          className={cn(
            'overflow-hidden flex w-full pl-6 hover:bg-gray-700 p-2 items-center text-base text-sidenav-color text-start focus:text-accent hover:border-solid hover:border-green-300 hover:border-l-2 border-l-2 border-transparent border-solid',
            { 'nav-sub-links-bg': !!padding }
          )}
          includes={includes}
        >
          <SidebarLabel
            id={id}
            icon={icon}
            padding={padding}
            label={label}
            showLinkId={showLinkId}
            hadSubLinks={hadSubLinks}
          />
        </ActiveLink>
      )}

      <div
        className={cn('sub-nav-height-transition', {
          'sub-nav-height-transition-open': showLinkId === id
        })}
      >
        {subLinks?.map(({ id, href, label, icon, padding, subLinks }) => (
          <SidebarItem
            key={id}
            id={id}
            href={href}
            label={t(label)}
            icon={icon}
            includes={href}
            line={false}
            subLinks={subLinks}
            padding={padding}
            showTriangle
            showLinkId={showLinksLevel2}
            setShowLinkId={setShowLinksLevel2}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

const SidebarLabel = ({
  id,
  icon,
  padding,
  label,
  showLinkId,
  hadSubLinks
}: LabelProps) => {
  const { closeSidebar } = useUI();

  const handleCloseSidebar = () => {
    if (hadSubLinks) {
      return;
    }
    closeSidebar();
  };

  return (
    <React.Fragment>
      <div className="flex items-center">
        {icon &&
          getIcon({
            iconList: sidebarIcons,
            iconName: icon,
            className: 'w-5 h-5 me-4'
          })}
        <span style={{ paddingLeft: padding }} onClick={handleCloseSidebar}>
          {label}
        </span>
      </div>
      {hadSubLinks && (
        <div className="mr-2">
          {showLinkId === id ? (
            <span>
              <Minus width="15px" height="15px" />
            </span>
          ) : (
            <span>
              <Add width="15px" height="15px" />
            </span>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default SidebarItem;
