import { ROUTES } from '@utils/routes';

export const siteSettings = {
  name: 'DropGala',
  description:
    'Dropgala is an online platform that provides accessible and user-friendly services for creating and managing online stores.',
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
    websiteUrl: 'https://dropgala.com',
    address: ''
  },
  headerLinks: [],
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
        href: '#',
        label: 'sidebar-nav-item-sales',
        icon: 'DollarIcon',
        subLinks: [
          {
            id: '0tWw2Tg',
            href: ROUTES.ORDERS,
            label: 'sidebar-nav-item-all-orders',
            padding: '35px',
            isSubLink: true
          },
          {
            id: '0tSWwS2Tg',
            href: ROUTES.ORDER_STATUS,
            label: 'sidebar-nav-item-order-status',
            padding: '35px',
            isSubLink: true
          }
          // {
          //   id: '2tWw2Tg',
          //   href: ROUTES.COMING_SOON,
          //   label: 'sidebar-nav-item-invoices',
          //   padding: '35px',
          //   isSubLink: true,
          //   disabled: true
          // },
          // {
          //   id: '3tWw2Tg',
          //   href: ROUTES.COMING_SOON,
          //   label: 'sidebar-nav-item-shipments',
          //   padding: '35px',
          //   isSubLink: true,
          //   disabled: true
          // },
          // {
          //   id: '4tWw2Tg',
          //   href: ROUTES.COMING_SOON,
          //   label: 'sidebar-nav-item-transactions',
          //   padding: '35px',
          //   isSubLink: true,
          //   disabled: true
          // }
        ]
      },
      {
        id: 'D2IcLt',
        href: '#',
        label: 'sidebar-nav-item-customers',
        icon: 'UsersIcon',
        subLinks: [
          {
            id: 'W12ECaCI',
            href: ROUTES.CUSTOMER,
            label: 'sidebar-nav-item-all-customers',
            padding: '35px',
            isSubLink: true
          }
        ],
        line: true
      },
      {
        id: 'h4ifwC',
        href: '#',
        label: 'sidebar-nav-item-catalog',
        icon: 'ProductsIcon',
        subLinks: [
          {
            id: '48554yLk',
            href: ROUTES.PRODUCT,
            label: 'sidebar-nav-item-products',
            padding: '35px',
            isSubLink: true
          },
          {
            id: '4859yLk',
            href: ROUTES.CATEGORY,
            label: 'sidebar-nav-item-categories',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'vGN65vK',
            href: ROUTES.ATTRIBUTE,
            label: 'sidebar-nav-item-attributes',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'D2XIXKt',
            href: ROUTES.SUPPLIER,
            label: 'sidebar-nav-item-suppliers',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'D2IXXKt',
            href: ROUTES.BRAND,
            label: 'sidebar-nav-item-brands',
            padding: '35px',
            isSubLink: true
          }
          // {
          //   id: 'D2IXKt',
          //   href: ROUTES.COMING_SOON,
          //   label: 'sidebar-nav-item-reviews',
          //   padding: '35px',
          //   isSubLink: true,
          //   disabled: true
          // }
        ]
      },
      {
        id: 'Qk3MiG',
        href: ROUTES.COUPON,
        label: 'sidebar-nav-item-coupons',
        icon: 'CouponsIcon'
      },
      {
        id: 'Wa09XCI',
        href: ROUTES.MEDIA,
        label: 'sidebar-nav-item-media',
        icon: 'ImageFolder'
      },
      {
        id: 'JiCQsO',
        href: '#',
        label: 'sidebar-nav-item-shipping-and-delivery',
        icon: 'ShippingsIcon',
        subLinks: [
          {
            id: 'WaXZ1CI',
            href: ROUTES.SHIPPING_ZONE,
            label: 'sidebar-nav-item-shipping-zones',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'W0P93WCI',
            href: ROUTES.DELIVERY_TIME,
            label: 'sidebar-nav-item-delivery-times',
            padding: '35px',
            isSubLink: true
          }
        ]
      },
      {
        id: 'JU3uxd',
        href: 'store',
        label: 'sidebar-nav-item-storefront',
        icon: 'ShopIcon',
        subLinks: [
          {
            id: '9YcWhCOaCG2LKO',
            href: ROUTES.BUILDER_STYLES,
            label: 'sidebar-nav-item-site-design',
            padding: '35px',
            isSubLink: true
          },
          {
            id: '9YcWhCCG',
            href: ROUTES.LANGUAGES,
            label: 'sidebar-nav-item-languages',
            padding: '35px',
            isSubLink: true
          },
          // {
          //   id: '9YSDcWhG',
          //   href: ROUTES.STORE_EXTENSIONS,
          //   label: 'sidebar-nav-item-extensions',
          //   padding: '35px',
          //   isSubLink: true,
          //   disabled: true
          // },
          // {
          //   id: '9YcW2hG',
          //   href: ROUTES.TEMPLATE,
          //   label: 'sidebar-nav-item-templates',
          //   padding: '35px',
          //   isSubLink: true
          // },
          {
            id: 'XDsaWhG',
            href: ROUTES.STORE_SETTINGS,
            label: 'sidebar-nav-item-store-settings',
            padding: '35px',
            isSubLink: true
          }
        ]
      },
      // {
      //   id: 'WD0IqEI',
      //   href: '#',
      //   label: 'sidebar-nav-item-marketplace',
      //   icon: 'MarketPlaceSvg',
      //   subLinks: [
      //     {
      //       id: 'RVS2Rg5VS',
      //       href: ROUTES.MARKETPLACE_THEME,
      //       label: 'sidebar-nav-item-themes',
      //       padding: '35px',
      //       isSubLink: true
      //     },
      //     {
      //       id: 'j6OZZXzo',
      //       href: ROUTES.MARKETPLACE_APP,
      //       label: 'sidebar-nav-item-apps',
      //       padding: '35px',
      //       isSubLink: true,
      //       disabled: true
      //     }
      //   ]
      // },
      // {
      //   id: 'WD091WF2IqEI',
      //   href: ROUTES.ANALYTICS,
      //   label: 'sidebar-nav-item-analytics',
      //   icon: 'AnalyticsIcon'
      // },
      // {
      //   id: 'JU3uxd123Sd',
      //   href: 'store',
      //   label: 'sidebar-nav-item-marketing',
      //   icon: 'MarketingIcon',
      //   subLinks: [
      //     {
      //       id: '9YcWhG123SD',
      //       href: ROUTES.MARKETING_NEWSLETTER,
      //       label: 'sidebar-nav-item-newsletter-recipients',
      //       padding: '35px',
      //       isSubLink: true,
      //       disabled: true
      //     }
      //   ]
      // },
      // {
      //   id: 'j6OQzo123X',
      //   href: ROUTES.COMING_SOON,
      //   label: 'sidebar-nav-item-email',
      //   icon: 'EmailIcon',
      //   subLinks: [
      //     {
      //       id: 'RVRg1235VS',
      //       href: ROUTES.COMING_SOON,
      //       label: 'sidebar-nav-item-email-newsletters',
      //       padding: '35px',
      //       isSubLink: true,
      //       disabled: true
      //     },
      //     {
      //       id: 'j6OQXzo',
      //       href: ROUTES.COMING_SOON,
      //       label: 'sidebar-nav-item-email-templates',
      //       padding: '35px',
      //       isSubLink: true,
      //       disabled: true
      //     },
      //     {
      //       id: 'RSVRg5S',
      //       href: ROUTES.COMING_SOON,
      //       label: 'sidebar-nav-item-newsletter-subscribers',
      //       padding: '35px',
      //       isSubLink: true,
      //       disabled: true
      //     }
      //   ]
      // },
      // {
      //   id: 'W109XCO',
      //   href: ROUTES.COMING_SOON,
      //   label: 'sidebar-nav-item-rma',
      //   icon: 'PackageReturn',
      //   subLinks: [
      //     {
      //       id: 'WaIACaCI',
      //       href: ROUTES.COMING_SOON,
      //       label: 'sidebar-nav-item-manage-requests',
      //       padding: '35px',
      //       isSubLink: true
      //     },
      //     {
      //       id: 'WaIRCAaCI',
      //       href: ROUTES.COMING_SOON,
      //       label: 'sidebar-nav-item-customer-pending-requests',
      //       padding: '35px',
      //       isSubLink: true
      //     },
      //     {
      //       id: 'WaIECaCI',
      //       href: ROUTES.COMING_SOON,
      //       label: 'sidebar-nav-item-item-conditions',
      //       padding: '35px',
      //       isSubLink: true
      //     },
      //     {
      //       id: 'WaIOCaCI',
      //       href: ROUTES.COMING_SOON,
      //       label: 'sidebar-nav-item-return-reasons',
      //       padding: '35px',
      //       isSubLink: true
      //     },
      //     {
      //       id: 'WaIPCaCI',
      //       href: ROUTES.COMING_SOON,
      //       label: 'sidebar-nav-item-rma-statuses',
      //       padding: '35px',
      //       isSubLink: true
      //     }
      //   ]
      // },
      // {
      //   id: '1239XCO',
      //   href: ROUTES.COMING_SOON,
      //   label: 'sidebar-nav-item-blogs',
      //   icon: 'BlogIcon',
      //   subLinks: [
      //     {
      //       id: '12WaIACaCI',
      //       href: ROUTES.COMING_SOON,
      //       label: 'sidebar-nav-item-posts',
      //       padding: '35px',
      //       isSubLink: true,
      //       disabled: true
      //     },
      //     {
      //       id: 'WaIRCaXCI',
      //       href: ROUTES.COMING_SOON,
      //       label: 'sidebar-nav-item-categories',
      //       padding: '35px',
      //       isSubLink: true,
      //       disabled: true
      //     },
      //     {
      //       id: 'WaIECaCI',
      //       href: ROUTES.COMING_SOON,
      //       label: 'sidebar-nav-item-comments',
      //       padding: '35px',
      //       isSubLink: true,
      //       disabled: true
      //     }
      //   ]
      // },
      {
        id: 'JU99uXy',
        href: '#',
        label: 'sidebar-nav-item-users',
        icon: 'StaffIcon',
        subLinks: [
          {
            id: '00WaIACaCI',
            href: ROUTES.USER,
            label: 'sidebar-nav-item-all-users',
            padding: '35px',
            isSubLink: true
          },
          {
            id: '11WaIRCaCI',
            href: ROUTES.USER_ROLE,
            label: 'sidebar-nav-item-user-roles',
            padding: '35px',
            isSubLink: true
          }
        ],
        line: true
      },
      // {
      //   id: 'WDIqE0I',
      //   href: ROUTES.EARN,
      //   label: 'sidebar-nav-item-affiliate',
      //   icon: 'AffiliateIcon',
      //   disabled: true
      // },
      {
        id: 'WDIqE0NMI',
        href: ROUTES.SUPPORT,
        label: 'sidebar-nav-item-support',
        icon: 'SupportIcon'
      },
      {
        id: 'nMtvIg',
        href: ROUTES.SETTINGS,
        label: 'sidebar-nav-item-settings',
        icon: 'SettingsIcon'
      }
    ]
  },
  product: {
    image: 'dropgala/placeholders/image.jpg',
    placeholder: 'dropgala/placeholders/image__placeholder.png'
  },
  avatar: {
    image: 'dropgala/placeholders/avatar.jpg',
    placeholder: 'dropgala/placeholders/avatar__placeholder.png'
  }
};
