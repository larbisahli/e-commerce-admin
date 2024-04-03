import { Bell } from '@components/icons/bell';
import { CloseIcon } from '@components/icons/close-icon';
import Link from '@components/ui/link';
import { Menu, Transition } from '@headlessui/react';
import { siteSettings } from '@settings/site.settings';
import cn from 'classnames';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTranslation } from 'next-i18next';
import { Fragment, useState } from 'react';

import styles from './scss/index.module.scss';

let cx = classNames.bind(styles);

dayjs.extend(relativeTime);

const notifications = [
  {
    id: 1,
    title: 'Mageplaza Notice',
    date: Date.now(),
    content: `Following Mageplaza extensions: Product Labels, Social Login, Instagram Feed. Please check your account dashboard to download the latest versions for your modules. To read the release notes, please check it here https://www.mageplaza.com/releases/`
  },
  {
    id: 2,
    title: 'New Order',
    date: Date.now(),
    content: `Following Mageplaza extensions: Product Labels, Social Login, Instagram Feed. Please check your account dashboard to download the latest versions for your modules. To read the release notes, please check it here https://www.mageplaza.com/releases/`
  },
  {
    id: 3,
    title: 'Mageplaza Notice',
    date: Date.now(),
    content: `Following Mageplaza extensions: Product Labels, Social Login, Instagram Feed. Please check your account dashboard to download the latest versions for your modules. To read the release notes, please check it here https://www.mageplaza.com/releases/`
  },
  {
    id: 4,
    title: 'Mageplaza Notice',
    date: Date.now(),
    content: `Following Mageplaza extensions: Product Labels, Social Login, Instagram Feed. Please check your account dashboard to download the latest versions for your modules. To read the release notes, please check it here https://www.mageplaza.com/releases/`
  },
  {
    id: 5,
    title: 'New Order',
    date: Date.now(),
    content: `Following Mageplaza extensions: Product Labels, Social Login, Instagram Feed. Please check your account dashboard to download the latest versions for your modules. To read the release notes, please check it here https://www.mageplaza.com/releases/`
  },
  {
    id: 6,
    title: 'Mageplaza Notice',
    date: Date.now(),
    content: `Following Mageplaza extensions: Product Labels, Social Login, Instagram Feed. Please check your account dashboard to download the latest versions for your modules. To read the release notes, please check it here https://www.mageplaza.com/releases/`
  },
  {
    id: 7,
    title: 'Mageplaza Notice',
    date: Date.now(),
    content: `Following Mageplaza extensions: Product Labels, Social Login, Instagram Feed. Please check your account dashboard to download the latest versions for your modules. To read the release notes, please check it here https://www.mageplaza.com/releases/`
  }
];

const RenderNotificationItem = ({ content }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="border-t px-4 py-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 h-2 w-2 rounded-full bg-blue-400"></span>
          <span className="text-sm font-semibold text-gray-700">
            {content?.title}
          </span>
        </div>
        {isHover ? (
          <button className="text-sm font-semibold text-gray-500">
            <CloseIcon width={20} height={20} />
          </button>
        ) : (
          <span className="text-xs text-gray-500">
            {dayjs(content?.date).fromNow()}
          </span>
        )}
      </div>
      <p className="cut-line-3 px-1 pt-2 text-xs text-gray-600">
        {content?.content}
      </p>
    </div>
  );
};

export default function NavNotification() {
  const { t } = useTranslation('common');

  const hasNotification = true;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={cx(
          'border-hover flex items-center rounded-sm border focus:outline-none',
          { 'border-red-500': hasNotification }
        )}
      >
        <div
          className={cn(
            'flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden bg-white text-gray-500',
            { 'border-red-400': hasNotification }
          )}
        >
          {hasNotification && (
            <span
              className={cn('text-md font-medium', {
                'text-red-600': hasNotification
              })}
            >
              7
            </span>
          )}
          {!hasNotification && <Bell width={25} height={25} />}
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
          className="notificationContainer absolute right-0 mt-1 w-96 origin-top-right bg-white py-4 shadow focus:outline-none"
        >
          <div className="notificationWrapper">
            <div className="notificationWrapper">
              {hasNotification && (
                <div className="w-full p-3 pt-0 text-lg font-semibold text-gray-600">
                  Notifications
                </div>
              )}
              {hasNotification ? (
                notifications?.map((content) => (
                  <RenderNotificationItem key={content.id} content={content} />
                ))
              ) : (
                <NotificationEmpty />
              )}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function NotificationEmpty() {
  return (
    <div className="flex h-40 flex-col items-center justify-center overflow-hidden px-5 text-sm">
      <div className="font-semibold uppercase text-green-700">
        There is no notifications
      </div>
      <div className="my-2 h-[1px] w-[50%] bg-gray-200"></div>
      <div className="text-center text-gray-500">
        We will make sure to notify you when something happens
      </div>
    </div>
  );
}
