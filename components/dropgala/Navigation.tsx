import cn from 'classnames';
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
      className={cn('w-full px-6 py-3 fixed z-50 transition-all', {
        'bg-white shadow': show
      })}
    >
      <div className="w-full mx-auto container flex items-center justify-between">
        <div className="flex justify-between content-end w-full">
          <div className="flex items-center">
            <Link href="/">
              <a className="leading-normal text-center text-blue-600 text-2xl font-bold">
                Dropgala
              </a>
            </Link>
            <Link href="/#features">
              <a className="px-8 text-gray-800 md:block hidden">Features</a>
            </Link>
            <Link href="/#pricing">
              <a className="text-gray-800 md:block hidden">Pricing</a>
            </Link>
            {/* <Link href="/blog">
              <a className="px-8 text-gray-800 md:block hidden">Blogs</a>
            </Link> */}
          </div>
          <div className="flex font-medium justify-center items-center">
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
              <a className="inline-block text-white bg-blue-600 no-underline rounded-full border-blue-300 font-medium hover:text-underline text-center py-2 px-5">
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
