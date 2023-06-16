/**
 * @type {import('next').NextConfig}
 */

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching
});
const { i18n } = require('./next-i18next.config');
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/dashboard',
  //       permanent: true
  //     }
  //   ];
  // },
  i18n,
  // compiler: {
  //   removeConsole: {
  //     exclude: ['error', 'warn', 'log']
  //   }
  // },
  // pwa: {},
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    // iconSizes: [],
    domains: [
      '127.0.0.1',
      'media.dropgala.com',
      'api.dropgala.com',
      'dropgala.com',
      'dropgala.s3.eu-west-3.amazonaws.com'
    ],
    path: '/_next/image',
    loader: 'default'
  },
  env: {
    API_URL: 'https://api.dropgala.com',
    MEDIA_URL: 'https://api.dropgala.com/media',
    NEXT_PUBLIC_GTAG_MEASUREMENT_ID: 'G-SL6J94NXZP',
    NEXT_PUBLIC_MAILCHIMP_URL:
      'https://devrev.us7.list-manage.com/subscribe/post?u=85b3c3a2231cd7d42156c2b25&amp;id=f17d885310&amp;f_id=00d7cfe4f0',
    TOKEN_ISSUER: 'dropgala.com',
    // NEXT_PUBLIC_GOOGLE_MAP_API_KEY: 'AIzaSyDB2j-G5LJM0yPNG0AqziJjgh1UOW10W7I',
    FB_APPID: '',
    SENTRY_DSN:
      'https://bb6c9168b250492493d8695e9851c780@o1189599.ingest.sentry.io/6310398',
    NEXT_PUBLIC_SENTRY_DSN:
      'https://bb6c9168b250492493d8695e9851c780@o1189599.ingest.sentry.io/6310398',
    SENTRY_AUTH_TOKEN: '896bfeeab4b511ec839996dc720e1b31'
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
    hideSourceMaps: true
  }
};

const SentryWebpackPluginOptions = { silent: true };

// module.exports = withSentryConfig(moduleExports);

module.exports = withSentryConfig(
  withPWA(moduleExports),
  SentryWebpackPluginOptions
);
