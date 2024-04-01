import { ArrowPrev } from '@components/icons/arrow-prev';
import { UpgradeIcon } from '@components/icons/sidebar/upgrade';
import styles from '@components/navigation/scss/index.module.scss';
import Scrollbar from '@components/ui/scrollbar';
import { useGetUser } from '@hooks/useGetUser';
import { useUI } from '@hooks/useUI';
import { ROUTES } from '@utils/routes';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

let cx = classNames.bind(styles);

interface Props {
  absolute?: boolean;
}

const Sidebar: React.FC<Props> = ({ absolute = false }) => {
  const { t } = useTranslation();
  const {
    userInfo: { store: { alias = '' } = {} }
  } = useGetUser();
  return (
    <aside
      className={cx(
        'fixed bottom-0 z-50 h-full w-64 overflow-y-auto border-r bg-white start-0 xl:w-64',
        {
          hidden: !absolute,
          'lg:block': !absolute,
          block: absolute
        }
      )}
    >
      <Scrollbar className="flex h-full w-full flex-col">
        <Link href={ROUTES.DASHBOARD} className="flex items-center py-2 pl-6">
          <div className="flex items-center px-2  pt-1 text-lg font-medium capitalize text-black">
            <Image
              src={'/favicon/icons/icon_android_192x192.png'}
              alt="logo"
              width={25}
              height={25}
            />
            <span className="pl-4">{alias}</span>
          </div>
        </Link>
        <div className="mb-3 flex justify-center">
          <div className="h-[1px] w-[90%] bg-sidenav-divider"></div>
        </div>
        <div className="flex flex-col"></div>
        <div className="h-32 w-full"></div>
      </Scrollbar>
    </aside>
  );
};
export default Sidebar;
