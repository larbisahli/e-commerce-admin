import { ROUTES } from '@utils/routes';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="fade-in container mx-auto w-full border-t border-dotted border-gray-300 pt-8 pb-6 text-center text-sm md:text-left">
      <div className="flex flex-wrap items-center justify-center">
        <Link href="/#faq">
          <div className="mx-3 text-base text-gray-500 hover:text-blue-500">
            FAQ
          </div>
        </Link>
        <Link href="/about-us">
          <div className="mx-3 text-base text-gray-500 hover:text-blue-500">
            About us
          </div>
        </Link>
        <Link href="/policy">
          <div className="mx-3 text-base text-gray-500 hover:text-blue-500">
            Policy
          </div>
        </Link>
        <Link href="/support">
          <div className="mx-3 text-base text-gray-500 hover:text-blue-500">
            Support
          </div>
        </Link>
        <Link href="/blog">
          <div className="mx-3 text-base text-gray-500 hover:text-blue-500">
            Blogs
          </div>
        </Link>
        <Link href="/#subscription">
          <div className="mx-3 text-base text-gray-500 hover:text-blue-500">
            Sign up
          </div>
        </Link>
        <Link href={ROUTES.LOGIN}>
          <div className="mx-3 text-base text-gray-500 hover:text-blue-500">
            Login
          </div>
        </Link>
      </div>
      <div className="mb-12 mt-4 flex items-center justify-center">
        <span className="text-xl font-bold text-gray-500">dropgala</span>
      </div>
      <p className="text-gray-500 no-underline hover:no-underline">
        &copy; Dropgala 2023 All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
