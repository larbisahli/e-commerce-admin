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
    <header
      className={cn('fixed z-50 w-full bg-white px-6 py-3 transition-all', {
        'bg-white shadow': show
      })}
    >
      <div className="container mx-auto flex w-full items-center justify-between">
        <div className="flex w-full content-end justify-between">
          <div className="flex items-center">
            <Link href="/">
              <div className="pt-2 text-center leading-normal text-blue-600">
                <Image src={'/logo.svg'} alt="logo" width={120} height={30} />
              </div>
            </Link>
            <div className="flex h-full items-center justify-end px-8">
              <Link href="/#features">
                <div className="hidden px-4 text-gray-800 hover:text-blue-500 md:block">
                  Features
                </div>
              </Link>
              {/* <Link href="/#pricing">
              <a className="hidden text-gray-800 md:block">Pricing</a>
            </Link> */}
              <Link href="/blog">
                <div className="hidden px-4 text-gray-800 hover:text-blue-500 md:block">
                  Blogs
                </div>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center font-medium">
            {/* <Link href="https://dropgala.com/login">
            <a className="inline-block border text-gray-800 border-gray-300 mx-3 no-underline rounded-sm hover:text-underline text-center py-3 px-8">
              Login
            </a>
          </Link>
          <Link href="https://dropgala.com/signup">
            <a className="inline-block text-white bg-blue-600 no-underline rounded-sm hover:text-underline text-center py-3 px-8">
              Sign up
            </a>
          </Link> */}
            <Link href="#subscription">
              <div className="hover:text-underline inline-block rounded-sm border-blue-300 bg-blue-600 py-2 px-5 text-center font-medium text-white no-underline">
                Join Our Waitlist!
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
