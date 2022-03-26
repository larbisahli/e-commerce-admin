/**
 * @type {import('next').NextConfig}
 */

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const { i18n } = require('./next-i18next.config');
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  i18n,
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching
  },
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    // iconSizes: [],
    domains: [
      '127.0.0.1',
      'media.dropgala.com',
      'dropgala.s3.eu-west-3.amazonaws.com'
    ],
    path: '/_next/image',
    loader: 'default'
  },
  env: {
    API_URL: 'https://api.dropgala.com',
    MEDIA_URL: 'https://media.dropgala.com',
    GTAG_MEASUREMENT_ID: 'G-TQMWTHM2FF',
    // NEXT_PUBLIC_GOOGLE_MAP_API_KEY: 'AIzaSyDB2j-G5LJM0yPNG0AqziJjgh1UOW10W7I',
    FB_APPID: '',
    SENTRY_DSN:
      'https://37ded038a57b4b9fb298ff89015192ef@o912422.ingest.sentry.io/5849453',
    NEXT_PUBLIC_SENTRY_DSN:
      'https://37ded038a57b4b9fb298ff89015192ef@o912422.ingest.sentry.io/5849453'
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

const SentryWebpackPluginOptions = {};

module.exports = withSentryConfig(
  withPWA(moduleExports),
  SentryWebpackPluginOptions
);
