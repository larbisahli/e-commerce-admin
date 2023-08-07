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
      className="px-4 py-3 border-t"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
          <span className="text-gray-700 text-sm font-semibold">
            {content?.title}
          </span>
        </div>
        {isHover ? (
          <button className="text-gray-500 text-sm font-semibold">
            <CloseIcon width={20} height={20} />
          </button>
        ) : (
          <span className="text-gray-500 text-xs">
            {dayjs(content?.date).fromNow()}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-600 cut-line-3 px-1 pt-2">
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
      {hasNotification && (
        <div className={cx('notification-bubble')}>
          <span className="text-sm">7</span>
        </div>
      )}
      <Menu.Button
        className={cx(
          'flex items-center border rounded-sm focus:outline-none',
          'border-hover'
        )}
      >
        <div
          className={cn(
            'flex items-center bg-white text-gray-500 justify-center cursor-pointer w-10 h-10 overflow-hidden rounded-full'
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
          className="absolute shadow notificationContainer right-0 w-96 py-4 mt-1 origin-top-right bg-white focus:outline-none"
        >
          <div className="notificationWrapper">
            <div className="notificationWrapper">
              {hasNotification && (
                <div className="p-3 pt-0 w-full font-semibold text-lg text-gray-600">
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
