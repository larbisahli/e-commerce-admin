import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon
} from '@components/icons/social';
import { ROUTES } from '@utils/routes';
import Link from 'next/link';

const FormFooter = ({ links = true, isSignUp = false }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16">
      {links && (
        <div className="mt-5 flex h-12 items-center justify-center text-gray-500">
          {isSignUp ? (
            <Link href={ROUTES.LOGIN}>
              <p>Login</p>
            </Link>
          ) : (
            <Link href={ROUTES.SIGNUP}>
              <p>Sign up</p>
            </Link>
          )}
          <span
            style={{ width: '1px', height: '20px' }}
            className="mx-2 bg-gray-300"
          ></span>
          <Link href={ROUTES.CONTACT_PAGE}>
            <p>Contact Us</p>
          </Link>
          <span
            style={{ width: '1px', height: '20px' }}
            className="mx-2 bg-gray-300"
          ></span>
          <Link href={'/policy'}>
            <p>Policy</p>
          </Link>
          <span
            style={{ width: '1px', height: '20px' }}
            className="mx-2 bg-gray-300"
          ></span>
          <Link href={'/about-us'} passHref>
            <p>About us</p>
          </Link>
        </div>
      )}
      <div className="flex flex-col items-center justify-center text-gray-500">
        {links && (
          <div className="my-3 flex items-center justify-center text-gray-400">
            <Link href="/">
              <div className="mx-3">
                <FacebookIcon width="1.1rem" height="1.1rem" />
              </div>
            </Link>
            <Link href="/">
              <div className="mx-3">
                <InstagramIcon width="1.1rem" height="1.1rem" />
              </div>
            </Link>
            <Link href="/">
              <div className="mx-3">
                <YouTubeIcon width="1.1rem" height="1.1rem" />
              </div>
            </Link>
          </div>
        )}
        <p className="m-3 text-center italic text-gray-600">
          Create Your Dream Online Store Effortlessly with Dropgala!
        </p>
        <p>&copy; {`Dropgala ${year} All rights reserved.`}</p>
      </div>
    </footer>
  );
};

export default FormFooter;
