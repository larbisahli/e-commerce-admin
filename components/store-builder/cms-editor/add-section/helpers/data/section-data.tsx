import {
  Carousel,
  CategoryList,
  Divider,
  EditorialText,
  Html,
  Image,
  ImageBanner,
  ProductListWidget,
  PromoBanner,
  Spacer,
  Subscription,
  Text,
  VideoBanner
} from '@components/icons/builder/sections';

export const sectionsLayout = [
  {
    title: 'Text',
    moduleName: 'Text',
    description: 'Add headlines and descriptions.',
    icon: () => <Text />,
    data: {
      header: 'About',
      description:
        'This is a sample text about your amazing brand. Include as many details as you need! This is a sample text about your amazing brand. Include as many details as you need! This is a sample text about your amazing brand. Include as many details as you need!'
    },
    styles: {
      header: {
        color: '#050505',
        fontSize: 32,
        fontStyle: 'normal',
        textAlign: 'center',
        fontFamily: {
          label: 'Lato',
          value: '--font-lato'
        },
        fontWeight: {
          label: '400 - Normal',
          value: 400
        },
        lineHeight: 32,
        letterSpacing: 0.25,
        textTransform: 'uppercase',
        textDecoration: 'none'
      },
      description: {
        color: '#050505',
        fontSize: 18,
        fontStyle: 'normal',
        textAlign: 'center',
        fontFamily: {
          label: 'Lato',
          value: '--font-lato'
        },
        fontWeight: {
          label: '400 - Normal',
          value: 400
        },
        lineHeight: 18,
        letterSpacing: 0.25,
        textTransform: 'lowercase',
        textDecoration: 'none'
      },
      sectionSize: 'auto'
    }
  },
  {
    title: 'WYSIWYG Editor',
    moduleName: 'EditorialText',
    description: 'Create a rich textual content.',
    icon: () => <EditorialText />,
    data: {
      content:
        '<h2><b>This shop is your new portal for online shopping simply and easily.&nbsp;</b></h2><div><b><br></b></div><div>We offer you high-quality products at a competitive price that you will not find anywhere else on the market. Shopping with us is a fun and safe process. We provide you with all the facilities you need, so you can choose the product, the payment process or the shipping process for it.</div>'
    },
    styles: {
      fontFamily: {
        label: 'Lato',
        value: '--font-lato'
      },
      sectionSize: 'auto'
    }
  },
  {
    title: 'Image',
    moduleName: 'Image',
    description: 'Upload an image.',
    // eslint-disable-next-line jsx-a11y/alt-text
    icon: () => <Image />,
    data: {
      thumbnail: [
        {
          image: 'dropgala/defaults/images/placeholder_image.png',
          placeholder:
            'dropgala/defaults/images/placeholder_image_placeholder.png',
          height: 638,
          width: 1000
        }
      ],
      link: null,
      target: '_self'
    },
    styles: {
      objectFit: { value: 'fill' },
      border: {
        borderRadius: 0,
        borderStyle: {
          value: 'solid',
          label: 'Solid'
        },
        borderWidth: 0,
        borderColor: '#222',
        border: 'all'
      },
      overlay: {
        overlayOpacity: 0,
        overlayColor: '#000'
      },
      sectionSize: 'auto'
    }
  },
  {
    title: 'Image banner',
    moduleName: 'ImageBannerHeadingCenter',
    description: 'Combine image, text, and buttons.',
    icon: () => <ImageBanner />,
    data: {
      header: 'Title copy goes here',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium.',
      buttonLabel: 'Browse new merch',
      buttonLink: '/collections/all',
      contentAlignment: 'center',
      thumbnail: [
        {
          image: 'dropgala/defaults/images/placeholder_image.png',
          placeholder:
            'dropgala/defaults/images/placeholder_image_placeholder.png',
          height: 638,
          width: 1000
        }
      ]
    },
    styles: {
      header: {
        color: '#050505',
        fontSize: 38,
        fontStyle: 'normal',
        fontFamily: {
          label: 'Lato',
          value: '--font-lato'
        },
        fontWeight: {
          label: '900 - Extra Bold',
          value: 900
        },
        lineHeight: 38,
        letterSpacing: 0.55,
        textTransform: 'none',
        textDecoration: 'none'
      },
      description: {
        color: '#050505',
        fontSize: 18,
        fontStyle: 'normal',
        fontFamily: {
          label: 'Lato',
          value: '--font-lato'
        },
        fontWeight: {
          label: '400 - Normal',
          value: 400
        },
        lineHeight: 24,
        letterSpacing: 0,
        textTransform: 'none',
        textDecoration: 'none'
      },
      imageBorder: {
        borderRadius: 4,
        borderStyle: {
          value: 'solid',
          label: 'Solid'
        },
        borderWidth: 0,
        borderColor: '#222',
        border: 'all'
      },
      overlay: {
        overlayOpacity: 0,
        overlayColor: '#000'
      },
      sectionSize: 'auto',
      objectFit: { value: 'cover' }
    },
    children: [
      {
        moduleName: 'BannerWidgetBg',
        position: 0,
        data: {},
        styles: {},
        children: [
          {
            moduleName: 'ButtonPrimary',
            position: 0,
            data: {},
            styles: {}
          }
        ]
      },
      {
        moduleName: 'ButtonPrimary',
        position: 0,
        data: {},
        styles: {}
      }
    ]
  },
  {
    title: 'Video banner',
    moduleName: 'VideoBanner',
    description: 'Combine video, text, and buttons.',
    icon: () => <VideoBanner />,
    data: {
      header: 'Bold new looks',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel',
      buttonLabel: 'Browse new merch',
      buttonLink: '/collections/all',
      videoUrl: 'https://www.youtube.com/watch?v=luFGI13Mv8o',
      displayContent: false,
      autoplay: true,
      controls: false,
      mute: true,
      loop: false,
      contentAlignment: 'center'
    },
    styles: {
      header: {
        color: '#050505',
        fontSize: 32,
        fontStyle: 'normal',
        textAlign: 'center',
        fontFamily: {
          label: 'Lato',
          value: '--font-lato'
        },
        fontWeight: {
          label: '400 - Normal',
          value: 400
        },
        lineHeight: 32,
        letterSpacing: 0.25,
        textTransform: 'capitalize',
        textDecoration: 'none'
      },
      description: {
        color: '#050505',
        fontSize: 18,
        fontStyle: 'normal',
        textAlign: 'center',
        fontFamily: {
          label: 'Lato',
          value: '--font-lato'
        },
        fontWeight: {
          label: '400 - Normal',
          value: 400
        },
        lineHeight: 18,
        letterSpacing: 0,
        textTransform: 'lowercase',
        textDecoration: 'none'
      },
      overlay: {
        overlayOpacity: 0,
        overlayColor: '#000'
      },
      border: {
        borderRadius: 0,
        borderStyle: {
          value: 'solid',
          label: 'Solid'
        },
        borderWidth: 0,
        borderColor: '#222',
        border: 'all'
      },
      sectionSize: 'auto'
    },
    children: [
      {
        moduleName: 'BannerWidgetBg',
        position: 0,
        data: {},
        styles: {},
        children: [
          {
            moduleName: 'ButtonPrimary',
            position: 0,
            data: {},
            styles: {}
          }
        ]
      }
    ]
  },
  {
    title: 'Custom HTML',
    moduleName: 'Html',
    description: 'Embed your own code.',
    icon: () => <Html />,
    data: {
      html: '<div class="custom-class"><p>Your custom HTML code.</p></div>'
    },
    styles: {
      css: '.custom-class p { color: red; }',
      sectionSize: 'auto'
    }
  },
  {
    title: 'Divider',
    moduleName: 'Divider',
    description: 'Add an underlined division on a web page.',
    icon: () => <Divider />,
    data: {},
    styles: {
      alignment: 'center',
      lineColor: '#e0dcdc',
      lineStyle: { value: 'solid' },
      lineThickness: 1,
      lineWidth: 37
    }
  },
  {
    title: 'Spacer',
    moduleName: 'Spacer',
    description: 'Add space between components.',
    icon: () => <Spacer />,
    data: {},
    styles: {
      spaceHeight: 50
    }
  }
];

export const sectionsShop = [
  {
    title: 'Featured category collection',
    moduleName: 'CategoryList',
    description: 'Showcase your categories.',
    icon: () => <CategoryList />,
    data: {
      header: 'Featured categories',
      category: null,
      buttonLabel: 'View all',
      categoriesPerView: 6,
      collection: [],
      sliderConfiguration: {
        delaySpeed: { value: 3000, name: '3 seconds' },
        animationSpeed: { value: 500, name: '500 milliseconds' },
        langDirection: { value: 'RTL' },
        loop: true,
        draggable: true
      }
    },
    styles: {
      header: {
        color: '#050505',
        fontSize: 32,
        fontStyle: 'normal',
        fontFamily: {
          label: 'Lato',
          value: '--font-lato'
        },
        fontWeight: {
          label: '400 - Normal',
          value: 400
        },
        lineHeight: 32,
        letterSpacing: 0.25,
        textTransform: 'capitalize',
        textDecoration: 'none'
      },
      sectionSize: 'full',
      objectFit: { value: 'fill' }
    },
    children: [
      {
        moduleName: 'ContentNotFound',
        position: 0,
        data: {
          title: 'We Are Sorry!',
          description: 'There Were No Categories Found.'
        },
        styles: {}
      },
      {
        moduleName: 'ButtonPrimary',
        position: 0,
        data: {},
        styles: {}
      },
      {
        moduleName: 'CategoryListItem1',
        position: 0,
        data: {},
        styles: {}
      }
    ]
  },
  {
    title: 'Featured product collection',
    moduleName: 'ProductListGridWidget',
    description: 'Showcase your products.',
    icon: () => <ProductListWidget />,
    data: {
      header: 'Featured products',
      category: null,
      buttonLabel: 'View all',
      productsPerView: 6,
      collection: [],
      sliderConfiguration: {
        delaySpeed: { value: 3000, name: '3 seconds' },
        animationSpeed: { value: 500, name: '500 milliseconds' },
        langDirection: { value: 'RTL' },
        loop: true,
        draggable: true
      }
    },
    styles: {
      header: {
        color: '#050505',
        fontSize: 32,
        fontStyle: 'normal',
        textAlign: 'center',
        fontFamily: {
          label: 'Lato',
          value: '--font-lato'
        },
        fontWeight: {
          label: '400 - Normal',
          value: 400
        },
        lineHeight: 32,
        letterSpacing: 0.25,
        textTransform: 'capitalize',
        textDecoration: 'none'
      },
      sectionSize: 'auto'
    },
    children: [
      {
        moduleName: 'ProductCard',
        position: 0,
        data: {},
        styles: {}
      },
      {
        moduleName: 'ContentNotFound',
        position: 0,
        data: {
          title: 'We Are Sorry!',
          description: 'There Were No Products Found Matching Your Request.'
        },
        styles: {}
      },
      {
        moduleName: 'ButtonOutline',
        position: 0,
        data: {},
        styles: {}
      }
    ]
  },
  {
    title: 'Promo banner',
    moduleName: 'PromoBanner',
    description: ' Showcase your promotions.',
    icon: () => <PromoBanner />,
    data: {
      delaySpeed: { value: 3000, name: '3 seconds' },
      animationSpeed: { value: 500, name: '500 milliseconds' },
      slidesPerView: 1,
      direction: 'horizontal',
      langDirection: { value: 'RTL' },
      loop: true,
      draggable: true,
      items: [
        {
          position: 0,
          content: '<h3>Demo store managed by dropgala</h3>'
        },
        {
          position: 1,
          content:
            '<p><strong>Special offer: </strong><span style="font-size: 14px;font-family: sans-serif;">free delivery, pay on delivery, faster and order now </span><span style="color: rgb(31,41,55);font-size: 14px;font-family: Inter, Mulish, sans-serif, "Open Sans", system-ui;">🔥🔥🔥</span></p>'
        }
      ]
    },
    styles: {
      border: {
        borderRadius: 0,
        borderStyle: {
          value: 'solid',
          label: 'Solid'
        },
        borderWidth: 0,
        borderColor: '#000',
        border: 'all'
      },
      backgroundColor: '#000',
      sectionSize: 'full'
    }
  },
  {
    title: 'Carousel',
    moduleName: 'HeroCarousel',
    description: 'Slideshows a combination of image, text, and buttons.',
    icon: () => <Carousel />,
    data: {
      contentAlignment: 'left',
      slides: [
        {
          thumbnail: [
            {
              image: 'dropgala/defaults/images/placeholder_image.png',
              placeholder:
                'dropgala/defaults/images/placeholder_image_placeholder.png',
              height: 638,
              width: 1000
            }
          ],
          displayContent: true,
          buttonLink: '/',
          header: 'Xbox Series X & S',
          description: 'Pre-order Now',
          buttonLabel: 'Explore more',
          position: 0
        }
      ],
      sliderConfiguration: {
        delaySpeed: { value: 3000, name: '3 seconds' },
        animationSpeed: { value: 500, name: '500 milliseconds' },
        langDirection: { value: 'RTL' },
        loop: true,
        draggable: true
      }
    },
    styles: {
      header: {
        color: '#ffffff',
        fontSize: 45,
        fontStyle: 'normal',
        fontFamily: {
          label: 'Lato',
          value: '--font-lato'
        },
        fontWeight: {
          label: '900 - Extra Bold',
          value: 900
        },
        lineHeight: 45,
        letterSpacing: 0.55,
        textTransform: 'none',
        textDecoration: 'none'
      },
      description: {
        color: '#ffffff',
        fontSize: 30,
        fontStyle: 'normal',
        fontFamily: {
          label: 'Lato',
          value: '--font-lato'
        },
        fontWeight: {
          label: '400 - Normal',
          value: 400
        },
        lineHeight: 30,
        letterSpacing: 0,
        textTransform: 'none',
        textDecoration: 'none'
      },
      imageBorder: {
        borderRadius: 0,
        borderStyle: {
          value: 'solid',
          label: 'Solid'
        },
        borderWidth: 0,
        borderColor: '#222',
        border: 'all'
      },
      overlay: {
        overlayOpacity: 0,
        overlayColor: '#000'
      },
      sectionSize: 'auto',
      objectFit: { value: 'cover' }
    },
    children: [
      {
        moduleName: 'BannerWidgetNoBg',
        position: 0,
        data: {},
        styles: {},
        children: [
          {
            moduleName: 'ButtonPrimary',
            position: 0,
            data: {},
            styles: {}
          }
        ]
      }
    ]
  }
];

export const sectionsOthers = [
  {
    title: 'Newsletter',
    moduleName: 'Subscription',
    description: 'Add email signup form.',
    icon: () => <Subscription />,
    data: {
      header: 'Join the newsletter',
      text: 'Get sneak peeks of upcoming videos and much more!'
    },
    styles: {
      sectionSize: 'full'
    }
  }
];

export const moduleNameMap = {
  EditorialText: 'WYSIWYG Editor',
  Carousel: 'Carousel',
  PromoBanner: 'Promo banner',
  ProductListWidget: 'Featured product collection',
  CategoryList: 'Featured category collection',
  Html: 'Custom HTML',
  VideoBanner: 'Video banner',
  ImageBanner: 'Image banner',
  Image: 'Image',
  Text: 'Text',
  Spacer: 'Spacer',
  Divider: 'Divider',
  CookiePopup: 'Cookie Consent',
  InstallPrompt: 'Install Prompt',
  Layout: 'Layout',
  Subscription: 'Subscription'
};

// TODO: 2- (carousel), (newsletter), (header), (footer), (be able to delete media file when empty)
