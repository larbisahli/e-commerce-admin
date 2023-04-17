/**
 * @type {import('next').NextConfig}
 */

// const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');
const { i18n } = require('./next-i18next.config');
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  // compiler: {
  //   removeConsole: {
  //     exclude: ['error', 'warn']
  //   }
  // },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true
      }
    ];
  },
  i18n,
  // pwa: {
  //   disable: process.env.NODE_ENV === 'development',
  //   dest: 'public',
  //   runtimeCaching
  // },
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    // iconSizes: [],
    domains: [
      '127.0.0.1',
      'media.dropgala.shop',
      'api.dropgala.shop',
      'dropgala.s3.eu-west-3.amazonaws.com'
    ],
    path: '/_next/image',
    loader: 'default'
  },
  env: {
    API_URL: 'https://api.dropgala.shop',
    MEDIA_URL: 'https://api.dropgala.shop/media',
    NEXT_PUBLIC_GTAG_MEASUREMENT_ID: 'G-TQMWTHM2FF',
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

// const SentryWebpackPluginOptions = { silent: true };

module.exports = withSentryConfig(moduleExports);

// module.exports = withSentryConfig(
//   withPWA(moduleExports),
//   SentryWebpackPluginOptions
// );
