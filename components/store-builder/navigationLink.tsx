import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function NavigationLink() {
  const { pathname } = useRouter();
  return (
    <div className="flex items-center border-b pt-2 pb-3">
      <Link href={ROUTES.BUILDER_GENERAL}>
        <div
          className={cn(
            'mr-2 text-xl font-semibold text-gray-700 hover:text-black',
            pathname === ROUTES.BUILDER_GENERAL && 'text-black underline'
          )}
        >
          General
        </div>
      </Link>
      <Link
        href={{
          pathname: `${ROUTES.BUILDER_LAYOUT}/[layoutName]`,
          query: { layoutName: 'home-page' }
        }}
      >
        <div
          className={cn(
            'mx-2 text-xl font-semibold text-gray-700 hover:text-black',
            pathname.split('/').includes('layout') && 'text-black underline'
          )}
        >
          Layout
        </div>
      </Link>
    </div>
  );
}
