import cn from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const { default: Link } = require('next/link');

const Navigation = () => {
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
    <header className="fixed z-50 w-full px-6 py-4 transition-all">
      <div
        className={cn(
          'container flex w-full bg-white bg-opacity-50 backdrop-blur-xl',
          '!container mx-auto items-center justify-between rounded-full border py-3 px-5 shadow-sm',
          show && 'shadow'
        )}
      >
        <div className="flex w-full content-end justify-between">
          <div className="flex items-center">
            <Link href="/">
              <div className="pt-2 text-center leading-normal text-blue-600">
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
            <Link href="https://dropgala.com/login">
              <div className="hover:text-underline mx-3 inline-block rounded-full border border-gray-300 bg-white py-[6px] px-6 text-center text-gray-800 no-underline shadow hover:bg-gray-50">
                Login
              </div>
            </Link>
            <Link href="https://dropgala.com/signup">
              <div className="hover:text-underline inline-block rounded-full bg-blue-600 py-[6px] px-6 text-center text-white no-underline shadow hover:bg-blue-500">
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
