import { ROUTES } from '@utils/routes';

export const siteSettings = {
  name: 'DropGala',
  description: 'Great place to buy items with a fair price.',
  logo: {
    url: '/logo.svg',
    alt: 'DropGala',
    href: '/',
    width: 40,
    height: 40
  },
  defaultLanguage: 'en',
  author: {
    name: 'DropGala',
    websiteUrl: 'https://business.dropgala.com',
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
        id: 'D2IcLt',
        href: ROUTES.CUSTOMERS,
        label: 'sidebar-nav-item-customers',
        icon: 'UsersIcon',
        line: true
      },
      {
        id: 'h4ifwC',
        href: ROUTES.PRODUCTS,
        label: 'sidebar-nav-item-products',
        icon: 'TagIcon',
        subLinks: [
          {
            id: '4855yLk',
            href: ROUTES.PRODUCTS,
            label: 'sidebar-nav-item-all-products',
            padding: '35px',
            isSubLink: true
          },
          {
            id: '48x5DLk',
            href: `${ROUTES.PRODUCTS}/create`,
            label: 'sidebar-nav-item-new-product',
            padding: '35px',
            isSubLink: true
          },
          {
            id: '4859yLk',
            href: ROUTES.CATEGORIES,
            label: 'sidebar-nav-item-categories',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'vGN65vK',
            href: ROUTES.ATTRIBUTES,
            label: 'sidebar-nav-item-attributes',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'yNqHtb',
            href: ROUTES.TAGS,
            label: 'sidebar-nav-item-tags',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'D2IcKt',
            href: ROUTES.SUPPLIERS,
            label: 'sidebar-nav-item-suppliers',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'D2IXKt',
            href: ROUTES.SUPPLIERS,
            label: 'sidebar-nav-item-reviews',
            padding: '35px',
            isSubLink: true
          }
        ]
      },
      {
        id: 'Qk3MiG',
        href: ROUTES.COUPONS,
        label: 'sidebar-nav-item-coupons',
        icon: 'CouponsIcon',
      },
      {
        id: 'JiCQsO',
        href: ROUTES.SHIPPING_ZONES,
        label: 'sidebar-nav-item-shipping-zones',
        icon: 'ShippingsIcon',
      },
      {
        id: 'tWw2Tg',
        href: ROUTES.ORDER_STATUS,
        label: 'sidebar-nav-item-order-status',
        icon: 'OrdersStatusIcon',
      },
      {
        id: 'WaIqCI',
        href: ROUTES.HERO_CAROUSEL,
        label: 'sidebar-nav-item-hero-carousel',
        icon: 'ImageMultipleIcon',
      },
      {
        id: 'JU3uYy',
        href: ROUTES.STAFFS,
        label: 'sidebar-nav-item-staffs',
        icon: 'StaffsIcon',
        line: true,
      },
      {
        id: 'JU3uxd',
        href: 'store',
        label: 'sidebar-nav-item-store',
        icon: 'ShopIcon',
        subLinks: [
          {
            id: '9YcWhG',
            href: ROUTES.ACCOUNT_INFORMATION,
            label: 'sidebar-nav-item-account-information',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'j6OQzo',
            href: ROUTES.RECENT_LOGIN_HISTORY,
            label: 'sidebar-nav-item-recent-login-history',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'RVRg5S',
            href: ROUTES.NOTIFICATIONS,
            label: 'sidebar-nav-item-notifications',
            padding: '35px',
            isSubLink: true
          }
        ]
      },
      {
        id: 'JrGuYy',
        href: '/whatsapp',
        label: 'sidebar-nav-item-whatsapp',
        icon: 'WhatsAppIcon',
        subLinks: [
          {
            id: '9YcWhG',
            href: ROUTES.ACCOUNT_INFORMATION,
            label: 'sidebar-nav-item-account-information',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'j6OQzo',
            href: ROUTES.RECENT_LOGIN_HISTORY,
            label: 'sidebar-nav-item-recent-login-history',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'RVRg5S',
            href: ROUTES.NOTIFICATIONS,
            label: 'sidebar-nav-item-notifications',
            padding: '35px',
            isSubLink: true
          }
        ]
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
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'j6OQzo',
            href: ROUTES.RECENT_LOGIN_HISTORY,
            label: 'sidebar-nav-item-recent-login-history',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'RVRg5S',
            href: ROUTES.NOTIFICATIONS,
            label: 'sidebar-nav-item-notifications',
            padding: '35px',
            isSubLink: true
          }
        ]
      },
      {
        id: 'WDIqEI',
        href: ROUTES.INVITE,
        label: 'sidebar-nav-item-invite-earn',
        icon: 'AffiliateIcon'
      }
    ]
  },
  product: {
    image: 'placeholders/image.jpg',
    placeholder: 'placeholders/image__placeholder.png'
  },
  avatar: {
    image: 'placeholders/avatar.jpg',
    placeholder: 'placeholders/avatar__placeholder.png'
  }
};
