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
            label: 'sidebar-nav-item-orders',
            padding: '35px',
            isSubLink: true
          },
          {
            id: '2tWw2Tg',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-invoices',
            padding: '35px',
            isSubLink: true,
            disabled: true
          },
          {
            id: '3tWw2Tg',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-shipments',
            padding: '35px',
            isSubLink: true,
            disabled: true
          },
          {
            id: '4tWw2Tg',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-transactions',
            padding: '35px',
            isSubLink: true,
            disabled: true
          }
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
            href: ROUTES.CUSTOMERS,
            label: 'sidebar-nav-item-all-customers',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'W13ECaCI',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-customer-groups',
            padding: '35px',
            isSubLink: true,
            disabled: true
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
            id: '4855yLk',
            href: ROUTES.PRODUCTS,
            label: 'sidebar-nav-item-products',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'D2IXKt',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-reviews',
            padding: '35px',
            isSubLink: true,
            disabled: true
          }
        ]
      },
      {
        id: '4859yLk',
        href: ROUTES.CATEGORIES,
        label: 'sidebar-nav-item-categories',
        icon: 'CategoriesIcon'
      },
      {
        id: 'vGN65vK',
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
        id: 'D2IcKt',
        href: ROUTES.SUPPLIERS,
        label: 'sidebar-nav-item-suppliers',
        icon: 'SuppliersIcon'
      },
      {
        id: 'Qk3MiG',
        href: ROUTES.COUPONS,
        label: 'sidebar-nav-item-coupons',
        icon: 'CouponsIcon'
      },
      {
        id: 'JiCQsO',
        href: ROUTES.SHIPPING_ZONES,
        label: 'sidebar-nav-item-shipping-zones',
        icon: 'ShippingsIcon'
      },
      {
        id: '1tWw2Tg',
        href: ROUTES.ORDER_STATUS,
        label: 'sidebar-nav-item-order-status',
        icon: 'OrdersStatusIcon'
      },
      {
        id: 'Wa09XCI',
        href: ROUTES.MEDIA,
        label: 'sidebar-nav-item-media',
        icon: 'ImageFolder'
      },
      {
        id: 'WaIqCI',
        href: '#',
        label: 'sidebar-nav-item-sliders',
        icon: 'SliderIcon',
        subLinks: [
          {
            id: 'WaIE1CI',
            href: ROUTES.HERO_CAROUSEL,
            label: 'sidebar-nav-item-hero-carousel',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'WaIE3WCI',
            href: ROUTES.PROMO_SLIDERS,
            label: 'sidebar-nav-item-promo-sliders',
            padding: '35px',
            isSubLink: true
          }
        ]
      },
      {
        id: 'JU3uxd',
        href: 'store',
        label: 'sidebar-nav-item-store',
        icon: 'ShopIcon',
        subLinks: [
          {
            id: '9YcWhG',
            href: ROUTES.THEMES,
            label: 'sidebar-nav-item-themes',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'XU3uxdPo',
            label: 'sidebar-nav-item-pages',
            padding: '35px',
            isSubLink: true,
            subLinks: [
              {
                id: '9Yc234G',
                href: ROUTES.STORE_ABOUT_US,
                label: 'sidebar-nav-item-about-us',
                padding: '45px',
                isSubLink: true
              },
              {
                id: '9342HWhG',
                href: ROUTES.STORE_CONTACT_US,
                label: 'sidebar-nav-item-contact-us',
                padding: '45px',
                isSubLink: true
              },
              {
                id: '923442HWhG',
                href: ROUTES.STORE_FAQ,
                label: 'sidebar-nav-item-faq',
                padding: '45px',
                isSubLink: true
              },
              {
                id: '9349832HWhG',
                href: ROUTES.STORE_TERMS,
                label: 'sidebar-nav-item-terms',
                padding: '45px',
                isSubLink: true
              },
              {
                id: '9349RTHWhG',
                href: ROUTES.STORE_POLICY,
                label: 'sidebar-nav-item-privacy-policy',
                padding: '45px',
                isSubLink: true
              },
              {
                id: '9349RTHWhG',
                href: ROUTES.STORE_RETURN_POLICY,
                label: 'sidebar-nav-item-return-policy',
                padding: '45px',
                isSubLink: true
              }
            ]
          }
        ]
      },
      {
        id: 'j6OQzo',
        href: ROUTES.COMING_SOON,
        label: 'sidebar-nav-item-email',
        icon: 'EmailIcon',
        disabled: true,
        subLinks: [
          {
            id: 'RVRg5VS',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-email-newsletters',
            padding: '35px',
            isSubLink: true,
            disabled: true
          },
          {
            id: 'j6OQXzo',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-email-templates',
            padding: '35px',
            isSubLink: true,
            disabled: true
          },
          {
            id: 'RSVRg5S',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-newsletter-subscribers',
            padding: '35px',
            isSubLink: true,
            disabled: true
          }
        ]
      },
      {
        id: 'W109XCO',
        href: ROUTES.COMING_SOON,
        label: 'sidebar-nav-item-rma',
        icon: 'PackageReturn',
        disabled: true,
        subLinks: [
          {
            id: 'WaIACaCI',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-manage-requests',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'WaIRCAaCI',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-customer-pending-requests',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'WaIECaCI',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-item-conditions',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'WaIOCaCI',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-return-reasons',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'WaIPCaCI',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-rma-statuses',
            padding: '35px',
            isSubLink: true
          }
        ]
      },
      {
        id: '1239XCO',
        href: ROUTES.COMING_SOON,
        label: 'sidebar-nav-item-blogs',
        icon: 'BlogIcon',
        disabled: true,
        subLinks: [
          {
            id: '12WaIACaCI',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-posts',
            padding: '35px',
            isSubLink: true,
            disabled: true
          },
          {
            id: 'WaIRCaXCI',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-categories',
            padding: '35px',
            isSubLink: true,
            disabled: true
          },
          {
            id: 'WaIRCaCI',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-tags',
            padding: '35px',
            isSubLink: true,
            disabled: true
          },
          {
            id: 'WaIECaCI',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-comments',
            padding: '35px',
            isSubLink: true,
            disabled: true
          }
        ]
      },
      {
        id: 'JU99uXy',
        href: '#',
        label: 'sidebar-nav-item-users',
        icon: 'UsersIcon',
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
      {
        id: 'nMtvIg',
        href: '/settings',
        label: 'sidebar-nav-item-settings',
        icon: 'SettingsIcon',
        subLinks: [
          {
            id: '9YcWhG',
            href: ROUTES.ACCOUNT_SETTINGS,
            label: 'sidebar-nav-item-account-settings',
            padding: '35px',
            isSubLink: true
          },
          {
            id: 'j6OQzo',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-recent-login-history',
            padding: '35px',
            isSubLink: true,
            disabled: true
          },
          {
            id: 'ERVRg5S',
            href: ROUTES.COMING_SOON,
            label: 'sidebar-nav-item-notifications',
            padding: '35px',
            isSubLink: true,
            disabled: true
          }
        ]
      },
      {
        id: 'WDIqEI',
        href: ROUTES.COMING_SOON,
        label: 'sidebar-nav-item-marketplace',
        icon: 'MarketPlaceSvg',
        disabled: true
      },
      {
        id: 'WDIqEI',
        href: ROUTES.COMING_SOON,
        label: 'sidebar-nav-item-invite-earn',
        icon: 'AffiliateIcon',
        disabled: true
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
