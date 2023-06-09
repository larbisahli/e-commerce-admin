import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon
} from '@components/icons/social';
import { ROUTES } from '@utils/routes';
import Link from 'next/link';

const FormFooter = ({ isSignUp = false }) => {
  return (
    <footer className="mt-16">
      <div className="mt-5 flex justify-center items-center text-gray-500 h-12">
        {isSignUp ? (
          <Link href={ROUTES.LOGIN}>
            <a>
              <p>Login</p>
            </a>
          </Link>
        ) : (
          <Link href={ROUTES.SIGNUP}>
            <a>
              <p>Sign up</p>
            </a>
          </Link>
        )}
        <span
          style={{ width: '1px', height: '20px' }}
          className="mx-2 bg-gray-300"
        ></span>
        <Link href={ROUTES.CONTACT_PAGE}>
          <a>
            <p>Contact Us</p>
          </a>
        </Link>
        <span
          style={{ width: '1px', height: '20px' }}
          className="mx-2 bg-gray-300"
        ></span>
        <Link href={'/'}>
          <a>
            <p>Policy</p>
          </a>
        </Link>
        <span
          style={{ width: '1px', height: '20px' }}
          className="mx-2 bg-gray-300"
        ></span>
        <Link href={'/'} passHref>
          <a>
            <p>Privacy</p>
          </a>
        </Link>
      </div>
      <div className="text-gray-500 flex justify-center flex-col items-center">
        <div className="flex justify-center items-center text-gray-400 my-3">
          <Link href="/">
            <a className="mx-3">
              <FacebookIcon width="1.1rem" height="1.1rem" />
            </a>
          </Link>
          <Link href="/">
            <a className="mx-3">
              <InstagramIcon width="1.1rem" height="1.1rem" />
            </a>
          </Link>
          <Link href="/">
            <a className="mx-3">
              <YouTubeIcon width="1.1rem" height="1.1rem" />
            </a>
          </Link>
        </div>
        <p className="italic m-3 text-gray-700 text-center">
          Create Your Dream Online Store Effortlessly with Dropgala!
        </p>
        <p>© dropgala 2023 All rights reserved</p>
      </div>
    </footer>
  );
};

export default FormFooter;
