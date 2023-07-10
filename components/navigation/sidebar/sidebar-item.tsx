/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Add } from '@components/icons/add';
import { Minus } from '@components/icons/minus';
import * as sidebarIcons from '@components/icons/sidebar';
import ActiveLink from '@components/ui/activeLink';
import { useUI } from '@hooks/useUI';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
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
  isSublevel?: boolean;
  isSubLink?: boolean;
  disabled?: boolean;
  subLinks?: {
    id: string;
    href: string;
    icon?: string;
    label: string;
    line?: boolean;
    padding: string;
    isSubLink?: boolean;
    disabled?: boolean;
    subLinks?: {
      id: string;
      href: string;
      icon?: string;
      label: string;
      line?: boolean;
      padding: string;
      isSubLink?: boolean;
      disabled?: boolean;
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
  line?: boolean;
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
  isSublevel,
  showLinkId,
  setShowLinkId,
  disabled,
  isSubLink
}: Props) => {
  const { t } = useTranslation();

  const { closeSublevelSidebar } = useUI();
  const [showLinksLevel2, setShowLinksLevel2] = useState<string>('');

  const hadSubLinks = useMemo(() => !isEmpty(subLinks), [subLinks]);

  const handleShowLinkId = () => {
    setShowLinkId((prev) => {
      if (prev === id) return '';
      return id;
    });
  };

  const sublevelOpen = showLinkId === id;

  return (
    <React.Fragment>
      {hadSubLinks ? (
        <div
          className={cn(
            'overflow-hidden cursor-pointer justify-between flex w-full pl-6 hover:!bg-sidenav-active-hover-color p-2 items-center text-base text-sidenav-color text-start focus:text-accent hover:border-solid hover:border-white hover:text-white border-l-2 border-transparent border-solid',
            {
              'nav-sub-links-bg': !!padding,
              '!text-white !bg-sidenav-active-hover-color border-blue-300 border-solid':
                sublevelOpen
            },
            {
              'pointer-events-none opacity-70': disabled
            }
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
          onClick={closeSublevelSidebar}
          activeClassName={
            hadSubLinks
              ? ''
              : cn('relative !bg-blue-600 hover:!bg-blue-500 !text-white', {
                  'sidebar-triangle': showTriangle
                })
          }
          className={cn(
            'overflow-hidden flex w-full pl-6 hover:bg-sidenav-active-hover-color p-2 items-center text-base text-sidenav-color hover:text-white text-start focus:text-white hover:border-solid hover:border-white hover:border-l-2 border-l-2 border-transparent border-solid',
            { 'nav-sub-links-bg': !!padding && !isSublevel },
            {
              'pointer-events-none opacity-70': disabled
            }
          )}
          includes={includes}
          isSubLink={isSubLink}
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

      {!isEmpty(subLinks) && (
        <div
          className={cn('sub-nav-height-transition', {
            'sub-nav-height-transition-open': showLinkId === id
          })}
        >
          {subLinks?.map(
            ({
              id,
              href,
              label,
              icon,
              padding,
              subLinks,
              isSubLink,
              disabled
            }) => (
              <SidebarItem
                key={id}
                id={id}
                href={href}
                label={t(label)}
                icon={icon}
                includes={href}
                subLinks={subLinks}
                padding={padding}
                showLinkId={showLinksLevel2}
                setShowLinkId={setShowLinksLevel2}
                isSublevel={isSublevel}
                disabled={disabled}
                isSubLink={isSubLink}
              />
            )
          )}
        </div>
      )}
      {line && (
        <div className="flex justify-center my-3">
          <div className="h-[1px] w-[90%] bg-sidenav-divider"></div>
        </div>
      )}
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
  const { handleSidebar } = useUI();

  const handleCloseSidebar = () => {
    if (hadSubLinks) {
      return;
    }
    handleSidebar({ field: 'displayMobileSidebar', display: false });
  };

  const TagName = sidebarIcons[icon];

  return (
    <React.Fragment>
      <div className="flex items-center" style={{ paddingLeft: padding }}>
        {icon && TagName && <TagName className="w-5 h-5 me-4" />}
        <span onClick={handleCloseSidebar}>{label}</span>
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
