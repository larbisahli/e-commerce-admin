import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@styles/main.css';

import { ApolloProvider } from '@apollo/client';
import ErrorBoundary from '@components/ErrorBoundary';
import DefaultSeo from '@components/ui/default-seo';
import LoadingBar from '@components/ui/loading-bar';
import ManagedModal from '@components/ui/modal/managed-modal';
import { ModalProvider } from '@components/ui/modal/modal.context';
import apolloClient from '@lib/apollo-client';
import store from '@store/index';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { Slide, ToastContainer } from 'react-toastify';

const Noop: React.FC = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        className="text-sm"
        // hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <ErrorBoundary>
        <Provider store={store}>
          <ApolloProvider client={apolloClient}>
            <LoadingBar />
            <ModalProvider>
              <ManagedModal />
              <DefaultSeo />
              <Layout {...pageProps}>
                <Component {...pageProps} />
              </Layout>
            </ModalProvider>
          </ApolloProvider>
        </Provider>
      </ErrorBoundary>
    </Fragment>
  );
}

const FixNum = (num: number) => Number((num / 1000).toFixed(6));

export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'FCP':
      console.log('First Contentful Paint (s): ', FixNum(metric.startTime));
      break;
    case 'LCP':
      console.log('Largest Contentful Paint (s): ', FixNum(metric.startTime));
      break;
    case 'CLS':
      console.log('Cumulative Layout Shift (s): ', FixNum(metric.startTime));
      break;
    case 'FID':
      console.log('First Input Delay (s): ', FixNum(metric.startTime));
      break;
    case 'TTFB':
      console.log('Time to First Byte (s): ', FixNum(metric.startTime));
      break;
    case 'Next.js-hydration':
      console.log('Next.js hydration (s): ', FixNum(metric.startTime));
      break;
    default:
      console.log(`${metric.name} (S)`, FixNum(metric.startTime));
      break;
  }
}

export default appWithTranslation(App);
