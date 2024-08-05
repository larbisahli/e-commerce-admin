import Avatar from '@components/common/avatar';
import Link from '@components/ui/link';
import { Menu, Transition } from '@headlessui/react';
import { useGetClient } from '@hooks/index';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Fragment, memo, useMemo } from 'react';

import styles from './scss/index.module.scss';
import { useRouter } from 'next/router';
import { ArrowDown } from '@components/icons/arrow-down';

let cx = classNames.bind(styles);

const locales = [
  {
    iso: 'en',
    label: 'English'
  },
  {
    iso: 'ar',
    label: 'العربية'
  },
  {
    iso: 'fr',
    label: 'Français'
  },
  {
    iso: 'pl',
    label: 'polski'
  }
];

function LanguageSwitcher() {
  const { t } = useTranslation('common');
  const { asPath, locale, push, events, reload } = useRouter();

  const currentLocale = useMemo(
    () => locales?.find(({ iso }) => iso === locale),
    [locale]
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={cx(
          'z-[1000]px-3 flex items-center rounded-sm bg-white py-2 text-gray-700'
        )}
      >
        <div>{currentLocale?.label}</div>
        <div className="mx-1">
          <ArrowDown />
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
          as="div"
          style={{ zIndex: 60 }}
          className="shadow-700 absolute right-0 mt-1 w-44 origin-top-right overflow-hidden rounded-sm border bg-white py-4 shadow focus:outline-none"
        >
          {locales.map(({ iso, label }, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <li className="flex cursor-pointer last:border-0">
                  <div
                    key={iso}
                    onClick={() => {
                      push(asPath, asPath, {
                        locale: iso ?? false,
                        shallow: true
                      });
                      events.on('routeChangeComplete', () => {
                        reload();
                      });
                    }}
                    className={cn(
                      'block w-full px-4 py-2 text-sm capitalize transition duration-200 hover:bg-gray-200 hover:text-accent',
                      active ? 'text-accent' : 'text-heading'
                    )}
                  >
                    {label}
                  </div>
                </li>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default memo(LanguageSwitcher);
