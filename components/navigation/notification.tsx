import { Bell } from '@components/icons/bell';
import Link from '@components/ui/link';
import { Menu, Transition } from '@headlessui/react';
import { siteSettings } from '@settings/site.settings';
import cn from 'classnames';
import classNames from 'classnames/bind';
import { useTranslation } from 'next-i18next';
import { Fragment } from 'react';

import styles from './scss/index.module.scss';

let cx = classNames.bind(styles);

export default function NavNotification() {
  const { t } = useTranslation('common');

  const hasNotification = true;

  return (
    <Menu as="div" className="relative inline-block text-left">
      {hasNotification && (
        <div className={cx('notification-bubble')}>
          <span>4</span>
        </div>
      )}
      <Menu.Button
        className={cx(
          'flex items-center border rounded-full focus:outline-none',
          'border-hover'
        )}
      >
        <div
          className={cn(
            'flex items-center text-gray-500 justify-center cursor-pointer w-10 h-10 overflow-hidden rounded-full'
          )}
        >
          <Bell width={25} height={25} />
        </div>
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
          as="ul"
          className="absolute shadow notificationContainer right-0 w-64 py-4 mt-1 origin-top-right bg-white focus:outline-none"
        >
          <div className="notificationWrapper">
            <div className="notificationWrapper">
              <NotificationEmpty />
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function NotificationEmpty() {
  return (
    <div className="overflow-hidden text-sm h-40 px-5 flex flex-col items-center justify-center">
      <div className="uppercase text-green-700 font-semibold">
        There is no notifications
      </div>
      <div className="h-[1px] w-[50%] bg-gray-200 my-2"></div>
      <div className="text-gray-500 text-center">
        We will make sure to notify you when something happens
      </div>
    </div>
  );
}
