import DesktopIcon from '@components/icons/desktop-icon';
import MobileIcon from '@components/icons/mobile-icon';
import styles from '@components/navigation/scss/index.module.scss';
import Button from '@components/ui/button';
import classNames from 'classnames/bind';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

let cx = classNames.bind(styles);

const Navbar = () => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, []);

  return (
    <header
      className={cx(
        'border-b-400 fixed top-0 right-0 left-0 z-40 h-[58px] w-full border-b bg-gray-50',
        { 'sshadow-md': show }
      )}
    >
      <nav
        className={cx(
          'nlg:ps-20 nxl:ps-20 md:ps-20 lg:ps-64 xl:ps-64',
          'flex items-center justify-between px-5 py-2 md:px-8'
        )}
      >
        <div className="flex flex-1 items-center justify-end space-s-5">
          <button className="flex h-10 w-10 items-center justify-center rounded-sm border bg-white text-gray-600 hover:border-blue-300 hover:text-accent">
            <DesktopIcon width={20} height={20} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-sm border bg-white text-gray-600 hover:border-blue-300 hover:text-accent">
            <MobileIcon width={20} height={20} />
          </button>
          <Button className="bg-green-600 hover:bg-green-700">Publish</Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
