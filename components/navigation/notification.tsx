import { useQuery } from '@apollo/client';
import { Bell } from '@components/icons/bell';
import { CloseIcon } from '@components/icons/close-icon';
import { RECENT_ORDERS } from '@graphql/order';
import { Menu, Transition } from '@headlessui/react';
import { useGetClient } from '@hooks/useGetClient';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { OrderType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Fragment, useMemo, useState } from 'react';

import styles from './scss/index.module.scss';

let cx = classNames.bind(styles);

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const RenderNotificationItem = ({ content }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      // onMouseEnter={() => setIsHover(true)}
      // onMouseLeave={() => setIsHover(false)}
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
          <span className="text-xs text-gray-500">{content?.date}</span>
        )}
      </div>
      {content?.content && (
        <p className="cut-line-3 px-1 pt-2 text-xs text-gray-600">
          {content?.content}
        </p>
      )}
    </div>
  );
};

interface TDashOrders {
  recentOrders: OrderType[];
}

export default function NavNotification() {
  const router = useRouter();
  const { t } = useTranslation('common');

  const hasNotification = true;

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient();

  const { data: recentOrderData } = useQuery<TDashOrders, { etag: string }>(
    RECENT_ORDERS,
    {
      variables: {
        etag: etag?.orderEtag
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(etag)
    }
  );

  const { recentOrders } = recentOrderData ?? {};

  const isDesktopView = useMediaQuery('min-width', 640);

  console.log({ recentOrders });

  const handleNotificationRoute = () => {
    !isDesktopView && router.push(ROUTES.NOTIFICATION);
  };

  const notifications = useMemo(() => {
    return recentOrders?.map((order) => ({
      id: order.orderNumber,
      title: `New order (#${order.orderNumber})`,
      date: dayjs.utc(order.createdAt).tz(dayjs.tz.guess()).fromNow(),
      content: null
    }));
  }, [recentOrders]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={cx(
          'border-hover flex items-center rounded-sm border hover:border-blue-300 hover:bg-white focus:outline-none',
          { 'border-red-500': hasNotification }
        )}
        onClick={handleNotificationRoute}
      >
        <div
          className={cn(
            'flex h-10 w-10 cursor-pointer items-center  justify-center overflow-hidden bg-white text-gray-500',
            { 'border-red-400': hasNotification }
          )}
        >
          {hasNotification && (
            <span
              className={cn('text-md font-medium ', {
                'text-red-600': hasNotification
              })}
            >
              {notifications?.length}
            </span>
          )}
          {!hasNotification && <Bell width={20} height={20} />}
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
          className="notificationContainer absolute mt-1 hidden w-96 origin-top-right bg-white py-4 shadow focus:outline-none sm:right-0 sm:flex"
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
