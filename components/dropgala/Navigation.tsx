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
    <nav
      className={cn('fixed z-50 w-full px-6 py-3 transition-all', {
        'bg-white shadow': show
      })}
    >
      <div className="container mx-auto flex w-full items-center justify-between">
        <div className="flex w-full content-end justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a className="pt-2 text-center leading-normal text-blue-600">
                <Image src={'/logo.svg'} alt="logo" width={120} height={30} />
              </a>
            </Link>
            <Link href="/#features">
              <a className="hidden px-8 text-gray-800 md:block">Features</a>
            </Link>
            <Link href="/#pricing">
              <a className="hidden text-gray-800 md:block">Pricing</a>
            </Link>
            {/* <Link href="/blog">
              <a className="px-8 text-gray-800 md:block hidden">Blogs</a>
            </Link> */}
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
              <a className="hover:text-underline inline-block rounded-full border-blue-300 bg-blue-600 py-2 px-5 text-center font-medium text-white no-underline">
                Join Our Waitlist!
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
