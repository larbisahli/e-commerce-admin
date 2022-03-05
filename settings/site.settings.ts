import { ROUTES } from '@utils/routes';

export const siteSettings = {
  name: 'Ecomhost',
  description: '',
  logo: {
    url: 'logo.svg',
    alt: 'ecomhost',
    href: '/',
    width: 128,
    height: 40
  },
  defaultLanguage: 'en',
  author: {
    name: 'ecomhost',
    websiteUrl: 'https://ecomhost.ma',
    address: ''
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: ROUTES.PROFILE_UPDATE,
      labelTransKey: 'authorized-nav-item-profile'
    },
    {
      href: ROUTES.LOGOUT,
      labelTransKey: 'authorized-nav-item-logout'
    }
  ],
  currencyCode: 'USD',
  sidebarLinks: {
    admin: [
      {
        id: '0aoqNP',
        href: ROUTES.DASHBOARD,
        label: 'sidebar-nav-item-dashboard',
        icon: 'DashboardIcon'
      },
      {
        id: 'vwAaJY',
        href: ROUTES.ORDERS,
        label: 'sidebar-nav-item-orders',
        icon: 'OrdersIcon'
      },
      {
        id: 'h4ifwC',
        href: ROUTES.PRODUCTS,
        label: 'sidebar-nav-item-products',
        icon: 'ProductsIcon'
      },
      {
        id: '489yLk',
        href: ROUTES.CATEGORIES,
        label: 'sidebar-nav-item-categories',
        icon: 'CategoriesIcon'
      },
      {
        id: 'vGN6vK',
        href: ROUTES.ATTRIBUTES,
        label: 'sidebar-nav-item-attributes',
        icon: 'AttributeIcon'
      },
      {
        id: 'yNqHtb',
        href: ROUTES.TAGS,
        label: 'sidebar-nav-item-tags',
        icon: 'TagIcon'
      },
      {
        id: 'tWw2Tg',
        href: ROUTES.ORDER_STATUS,
        label: 'sidebar-nav-item-order-status',
        icon: 'OrdersStatusIcon'
      },
      {
        id: 'Qk3MiG',
        href: ROUTES.COUPONS,
        label: 'sidebar-nav-item-coupons',
        icon: 'CouponsIcon'
      },
      {
        id: 'JiCQsO',
        href: ROUTES.SHIPPINGS,
        label: 'sidebar-nav-item-shippings',
        icon: 'ShippingsIcon'
      },
      {
        id: 'D2IcKt',
        href: ROUTES.CUSTOMERS,
        label: 'sidebar-nav-item-customers',
        icon: 'UsersIcon'
      },
      {
        id: 'JU3uYy',
        href: ROUTES.STAFFS,
        label: 'sidebar-nav-item-staffs',
        icon: 'StaffsIcon'
      },
      {
        id: 'X9LjJr',
        href: '/store',
        label: 'sidebar-nav-item-store',
        icon: 'ShopIcon',
        subLinks: [
          {
            id: 'fEhiVv',
            href: ROUTES.STORE_SETTINGS,
            label: 'sidebar-nav-item-store-settings',
            padding: '35px'
          },
          {
            id: '1AFhvZ',
            href: '/#',
            label: 'sidebar-nav-item-theme-settings',
            padding: '35px',
            subLinks: [
              {
                id: 'rcC2Kv',
                href: ROUTES.COLORS,
                label: 'sidebar-nav-item-colors',
                padding: '45px'
              },
              {
                id: 'DuCwGd',
                href: ROUTES.STORE_NAVIGATION,
                label: 'sidebar-nav-item-store-navigation',
                padding: '45px'
              },
              {
                id: 'rwpxKv',
                href: ROUTES.CUSTOM_COUNTDOWN,
                label: 'sidebar-nav-item-custom-countdown',
                padding: '45px'
              },
              {
                id: 'cksAN3',
                href: ROUTES.PRODUCT_CARD,
                label: 'sidebar-nav-item-product-card',
                padding: '45px'
              }
            ]
          },
          {
            id: 'ajo2jA',
            href: '/#',
            label: 'sidebar-nav-item-product-settings',
            padding: '35px',
            subLinks: [
              {
                id: 'DeCdGd',
                href: ROUTES.CUSTOMERS_REVIEW,
                label: 'sidebar-nav-item-customers-review',
                padding: '45px'
              }
            ]
          },
          {
            id: 'LtFy5c',
            href: '/#',
            label: 'sidebar-nav-item-pages-settings',
            padding: '35px',
            subLinks: [
              {
                id: 'Kkr1Ej',
                href: ROUTES.CONTACT_PAGE,
                label: 'sidebar-nav-item-contact-page',
                padding: '45px'
              },
              {
                id: 'KbtNNr',
                href: ROUTES.ABOUT_PAGE,
                label: 'sidebar-nav-item-about-page',
                padding: '45px'
              }
            ]
          },
          {
            id: 'fEziVv',
            href: ROUTES.INTEGRATIONS,
            label: 'sidebar-nav-item-integrations',
            padding: '35px'
          },
          {
            id: 'fEhnVv',
            href: ROUTES.PAYMENTS,
            label: 'sidebar-nav-item-payments',
            padding: '35px'
          },
          {
            id: 'fRhiVv',
            href: ROUTES.EMAIL_TEMPLATES,
            label: 'sidebar-nav-item-email-templates',
            padding: '35px'
          }
        ]
      },
      {
        id: 'rD4wfP',
        href: ROUTES.APPS,
        label: 'sidebar-nav-item-apps',
        icon: 'AppsIcon'
      },
      {
        id: 'fJcEP1',
        href: ROUTES.AFFILIATE,
        label: 'sidebar-nav-item-affiliate',
        icon: 'AffiliateIcon',
        line: true
      },
      {
        id: 'P060cP',
        href: ROUTES.SUPPORT,
        label: 'sidebar-nav-item-support',
        icon: 'SupportIcon'
      },
      {
        id: 'nMtvIg',
        href: '/settings',
        label: 'sidebar-nav-item-settings',
        icon: 'SettingsIcon',
        subLinks: [
          {
            id: '9YcWhG',
            href: ROUTES.ACCOUNT_INFORMATION,
            label: 'sidebar-nav-item-account-information',
            padding: '35px'
          },
          {
            id: 'j6OQzo',
            href: ROUTES.RECENT_LOGIN_HISTORY,
            label: 'sidebar-nav-item-recent-login-history',
            padding: '35px'
          },
          {
            id: 'RVRg5S',
            href: ROUTES.NOTIFICATIONS,
            label: 'sidebar-nav-item-notifications',
            padding: '35px'
          }
        ]
      }
    ]
  },
  product: {
    placeholder: '/placeholders/no-image.svg'
  },
  avatar: {
    placeholder: '/placeholders/avatar.svg'
  }
};
