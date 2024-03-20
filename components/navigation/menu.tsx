import Avatar from '@components/common/avatar';
import Link from '@components/ui/link';
import { Menu, Transition } from '@headlessui/react';
import { useGetUser } from '@hooks/index';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import classNames from 'classnames/bind';
import { useTranslation } from 'next-i18next';
import { Fragment, memo } from 'react';

import styles from './scss/index.module.scss';

let cx = classNames.bind(styles);

const authorizedLinks = [
  {
    href: ROUTES.COMING_SOON,
    labelTransKey: 'authorized-nav-item-account-settings',
    target: '_self'
  },
  {
    href: ROUTES.SUPPORT,
    labelTransKey: 'authorized-nav-item-help-center',
    target: '_self'
  },
  {
    href: ROUTES.LOGOUT,
    labelTransKey: 'authorized-nav-item-logout',
    target: '_self'
  }
];

function NavMenu() {
  const { t } = useTranslation('common');

  const {
    userInfo: {
      profile = [],
      firstName = '',
      lastName = '',
      email,
      store: { alias = '' } = {}
    }
  } = useGetUser();
  const { image = null, placeholder = null } = profile[0] ?? {};

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={cx(
          'z-[1000] flex items-center rounded-sm bg-white text-gray-700 focus:outline-none',
          'border-hover'
        )}
      >
        <Avatar
          className="!rounded-sm"
          src={image}
          firstName={firstName}
          customPlaceholder={placeholder}
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="div"
          style={{ zIndex: 60 }}
          className="shadow-700 absolute right-0 mt-1 w-48 origin-top-right overflow-hidden rounded-sm border bg-white py-4 shadow focus:outline-none"
        >
          <div className="flex flex-col items-center justify-center border-b pb-3">
            <Avatar
              className="mb-2 !rounded-full"
              src={image}
              firstName={firstName}
              customPlaceholder={placeholder}
              width="w-14"
              height="h-14"
            />
            {firstName && (
              <div className="px-4 text-sm font-medium capitalize text-gray-800">{`${firstName} ${lastName}`}</div>
            )}
            {email && (
              <div className="cut-line-1 px-4 text-xs text-gray-500">
                {email}
              </div>
            )}
          </div>
          <div className="flex items-center p-2  text-xs text-gray-600">
            <span>Your store:</span>
            <Link
              target="_blank"
              href={`https://${alias}.dropgala.com`}
              className={cn(
                'block px-1 text-sm font-semibold capitalize text-accent transition duration-200 hover:text-accent'
              )}
            >
              {alias}
            </Link>
          </div>
          <div className="mb-2 h-[1px] w-full bg-gray-300"></div>
          {authorizedLinks.map(({ href, labelTransKey, target }, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <li className="flex cursor-pointer last:border-0">
                  <Link
                    target={target}
                    href={href}
                    className={cn(
                      'block w-full px-4 py-2 text-sm capitalize transition duration-200 hover:bg-gray-200 hover:text-accent',
                      active ? 'text-accent' : 'text-heading'
                    )}
                  >
                    {t(labelTransKey)}
                  </Link>
                </li>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default memo(NavMenu);
