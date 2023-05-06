import { ROUTES } from '@utils/routes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if ((this.state as { hasError: boolean }).hasError) {
      // You can render any custom fallback UI
      return (
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
          <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <div className="relative">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Looks like you've found the doorway to the great nothing
              </h1>
              <div className="py-2">
                <Link href={ROUTES.DASHBOARD}>
                  <a className="sm:w-full lg:w-auto border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                    Take me there!
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="/image/error-plug.png"
              width={300}
              height={200}
              alt=""
            />
          </div>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}
