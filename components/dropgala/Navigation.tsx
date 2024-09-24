import MenuSvg from '@components/icons/menu';
import { ROUTES } from '@utils/routes';
import useOnClickOutside from '@utils/use-click-outside';
import cn from 'classnames';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const { default: Link } = require('next/link');

const Navigation = () => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

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

  const handleClickOutside = () => {
    setOpenMenu(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <header className="fixed z-50 w-full px-3 py-4 transition-all sm:px-6">
      <div
        className={cn(
          'container relative flex w-full bg-white bg-opacity-50 backdrop-blur-xl',
          'ms:py-3 ms:px-5 !container mx-auto items-center justify-between rounded-full border py-2 px-3 shadow-sm',
          show && 'shadow'
        )}
      >
        <div
          ref={ref}
          className={cn(
            'absolute left-0 right-0 top-[70px] max-w-[60%] rounded-xl border bg-white shadow',
            'hidden sm:!hidden',
            !openMenu && 'hidden',
            openMenu && '!block'
          )}
        >
          <div className="px-3 py-2">
            <Link href="/#features">
              <div className="w-full rounded-full px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-blue-500">
                Features
              </div>
            </Link>
            <Link href="/#pricing">
              <div className="rounded-full px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-blue-500">
                Pricing
              </div>
            </Link>
            <Link href="/blog">
              <div className="rounded-full px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-blue-500">
                Blogs
              </div>
            </Link>
          </div>
        </div>
        <div className="flex w-full content-end justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="block cursor-pointer rounded-full p-1 hover:bg-gray-50 sm:hidden"
            >
              <MenuSvg />
            </button>
            <Link href="/">
              <div className="px-2 text-center leading-normal text-blue-600">
                <Image src={'/logo.svg'} alt="logo" width={80} height={30} />
              </div>
            </Link>
            <div className="flex h-full items-center justify-end px-8">
              <Link href="/#features">
                <div className="hidden rounded-full p-1 px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-blue-500 md:block">
                  Features
                </div>
              </Link>
              <Link href="/#pricing">
                <div className="hidden rounded-full p-1 px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-blue-500 md:block">
                  Pricing
                </div>
              </Link>
              <Link href="/blog">
                <div className="hidden rounded-full p-1 px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-blue-500 md:block">
                  Blogs
                </div>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center font-medium">
            <Link href={ROUTES.LOGIN}>
              <div className="hover:text-underline mx-3 inline-block rounded-full border border-gray-300 bg-white py-[6px] px-6 text-center text-gray-800 no-underline shadow hover:bg-gray-50">
                Login
              </div>
            </Link>
            <Link href={ROUTES.SIGNUP}>
              <div className="hover:text-underline hidden rounded-full bg-blue-600 py-[6px] px-6 text-center text-white no-underline shadow hover:bg-blue-500 sm:inline-block">
                Sign up
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
