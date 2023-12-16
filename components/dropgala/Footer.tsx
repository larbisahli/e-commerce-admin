import { ROUTES } from '@utils/routes';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="fade-in container mx-auto mt-16 w-full border-t border-dotted border-gray-300 pt-8 pb-6 text-center text-sm md:text-left">
      <div className="flex flex-wrap items-center justify-center">
        <Link href="/about-us">
          <a className="mx-3 text-lg text-gray-600 hover:text-blue-500">
            About us
          </a>
        </Link>
        <Link href="/policy">
          <a className="mx-3 text-lg text-gray-600 hover:text-blue-500">
            Policy
          </a>
        </Link>
        <Link href="/support">
          <a className="mx-3 text-lg text-gray-600 hover:text-blue-500">
            Support
          </a>
        </Link>
        {/* <Link href="/blog">
          <a className="mx-3 text-lg text-gray-600 hover:text-blue-500">
            Blogs
          </a>
        </Link> */}
        <Link href="/#subscription">
          <a className="mx-3 text-lg text-gray-600 hover:text-blue-500">
            Sign up
          </a>
        </Link>
        <Link href={ROUTES.LOGIN}>
          <a className="mx-3 text-lg text-gray-600 hover:text-blue-500">
            Login
          </a>
        </Link>
      </div>
      <div className="mb-12 mt-4 flex items-center justify-center">
        <span className="text-xl font-bold text-gray-400">dropgala</span>
      </div>
      <p className="text-gray-500 no-underline hover:no-underline">
        &copy; Dropgala 2023 All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
