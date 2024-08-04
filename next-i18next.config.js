/** @type {import('next-i18next').UserConfig} */

const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'ar', 'fr'],
    defaultLocale: 'en'
    // localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
  localeStructure: '/',
};
