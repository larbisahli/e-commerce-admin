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
        'border border-t-gray-300 bg-gray-200 mt-16 pb-4 w-full h-full',
        'md:ps-20 nlg:ps-20 nxl:ps-20 lg:ps-72 xl:ps-76',
        { 'md:!ps-20': displayMiniSidebar }
      )}
    >
      <div className="flex items-center justify-between p-5 flex-wrap">
        <p className="text-gray-500">
          Copyright © {new Date().getFullYear()} dropgala. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center">
          <Link href={'/#'}>
            <a className="text-green-800">Privacy Policy</a>
          </Link>
          <div className="w-[1px] h-[20px] bg-gray-400 mx-2"></div>
          <Link href={'/#'}>
            <a className="text-green-800">Contact us</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminFooter;
