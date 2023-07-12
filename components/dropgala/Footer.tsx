import Link from 'next/link';

const Footer = () => {
  return (
    <div className="container mx-auto w-full mt-16 pt-8 pb-6 text-sm text-center md:text-left fade-in border-t border-dotted border-gray-300">
      <div className="flex justify-center items-center">
        <Link href="/about-us">
          <a className="text-gray-600 text-lg mx-3 hover:text-blue-500">
            About us
          </a>
        </Link>
        <Link href="/policy">
          <a className="text-gray-600 text-lg mx-3 hover:text-blue-500">
            Policy
          </a>
        </Link>
        <Link href="/support">
          <a className="text-gray-600 text-lg mx-3 hover:text-blue-500">
            Support
          </a>
        </Link>
        <Link href="/blog">
          <a className="text-gray-600 text-lg mx-3 hover:text-blue-500">
            Blogs
          </a>
        </Link>
        <Link href="/#subscription">
          <a className="text-gray-600 text-lg mx-3 hover:text-blue-500">
            Sign up
          </a>
        </Link>
        <Link href="/login">
          <a className="text-gray-600 text-lg mx-3 hover:text-blue-500">
            Login
          </a>
        </Link>
      </div>
      <div className="flex justify-center items-center mb-12 mt-4">
        <span className="text-xl font-bold text-gray-400">dropgala</span>
      </div>
      <p className="text-gray-500 no-underline hover:no-underline">
        &copy; Dropgala 2023 All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
