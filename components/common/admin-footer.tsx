import { useUI } from '@hooks/useUI';
import cx from 'classnames';
import Link from 'next/link';

const AdminFooter = () => {
  const {
    ui: { displayMiniSidebar }
  } = useUI();

  return (
    <div
      className={cx(
        'mt-16 h-full w-full border border-t-gray-300 bg-gray-200 pb-4',
        'nlg:ps-20 nxl:ps-20 xl:ps-76 md:ps-20 lg:ps-72',
        { 'md:!ps-20': displayMiniSidebar }
      )}
    >
      <div className="flex flex-wrap items-center justify-between p-5">
        <p className="text-gray-500">
          Copyright © {new Date().getFullYear()} dropgala. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center">
          <Link href={'/#'}>
            <a className="text-gray-700">Privacy Policy</a>
          </Link>
          <div className="mx-2 h-[20px] w-[1px] bg-gray-400"></div>
          <Link href={'/#'}>
            <a className="text-gray-700">Contact us</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminFooter;
