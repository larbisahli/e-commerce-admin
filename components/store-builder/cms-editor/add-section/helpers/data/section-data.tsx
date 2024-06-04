import {
  Carousel,
  CategoryList,
  Divider,
  EditorialText,
  Html,
  Image,
  ImageBanner,
  ProductList,
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
        textTransform: 'capitalized',
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
        '<p style="text-align:left;"><span style="color: rgb(65,65,65);background-color: rgb(255,255,255);font-size: 14px;font-family: sans-serif;">This shop is your new portal for online shopping in a simple and easy way.</span></p><p style="text-align:left;"><span style="color: rgb(65,65,65);background-color: rgb(255,255,255);font-size: 14px;font-family: sans-serif;">We offer you high quality products at a competitive price that you will not find anywhere else on the market. Shopping with us is a fun and safe process. We provide you with all the facilities you need, so you can choose the product, the payment process or the shipping process for it.</span></p>'
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
          image: 'dropgala/defaults/images/hero-banner/slider-xbox.png',
          placeholder:
            'dropgala/defaults/images/hero-banner/slider-xbox_placeholder.png',
          height: 500,
          width: 1000
        }
      ],
      link: null,
      target: '_self'
    },
    styles: {
      objectFit: { value: 'fill' },
      border: {
        borderRadius: 10,
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
        'Volutpat non odio pellentesque phasellus. In quis elit facilisis lectus eget vestibulum nisl fames. Nibh nibh viverra et facilisi pretium. Placerat egestas maecenas nunc urna elit elementum adipiscing. Eget et enim, id faucibus ut mollis. Tristique iaculis faucibus duis pulvinar nulla tellus. In diam cursus nunc eget lorem nullam quisque. Nisl, erat viverra turpis morbi eget. Eget amet pulvinar dignissim viverra at amet ac.',
      buttonLabel: 'Browse new merch',
      buttonLink: '/collections/all',
      contentAlignment: 'center',
      thumbnail: [
        {
          image: 'dropgala/defaults/images/hero-banner/slider-xbox.png',
          placeholder:
            'dropgala/defaults/images/hero-banner/slider-xbox_placeholder.png',
          height: 500,
          width: 1000
        }
      ]
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
        textTransform: 'capitalized',
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
      sectionSize: 'auto',
      overlay: {
        overlayOpacity: 0,
        overlayColor: '#000'
      }
    },
    children: [
      {
        moduleName: 'ButtonPrimary'
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
      buttonText: 'Browse new merch',
      buttonLink: '/collections/all',
      videoUrl: '',
      displayContent: false,
      autoplay: true,
      controls: false,
      mute: true,
      loop: false
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
        textTransform: 'capitalized',
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
        borderRadius: 10,
        borderStyle: {
          value: 'solid',
          label: 'Solid'
        },
        borderWidth: 0,
        borderColor: '#222',
        border: 'all'
      },
      sectionSize: 'auto'
    }
  },
  {
    title: 'Custom HTML',
    moduleName: 'Html',
    description: 'Embed your own code.',
    icon: () => <Html />,
    data: {
      html: '<div><p>Your custom HTML code.</p></div>'
    },
    styles: {
      css: '',
      sectionSize: 'full'
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
      categories: []
    },
    styles: {
      sectionSize: 'full'
    }
  },
  {
    title: 'Featured product collection',
    moduleName: 'ProductList',
    description: 'Showcase your products.',
    icon: () => <ProductList />,
    data: {
      header: 'Featured products',
      collectionId: '',
      numberOfProducts: 10,
      ShowAllBtn: {
        text: 'View all',
        link: '/collections/name'
      }
    },
    styles: {
      sectionSize: 'full'
    }
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
      langDirection: { label: 'RTL' },
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
      backgroundColor: '#ea580c',
      sectionSize: 'full'
    }
  },
  {
    title: 'Carousel',
    moduleName: 'HeroCarousel',
    description: 'Slideshows a combination of image, text, and buttons.',
    icon: () => <Carousel />,
    data: {
      items: [
        {
          thumbnail: [
            {
              id: 1,
              image: 'mystore/images/2024/3/slider-xbox.png',
              placeholder: 'mystore/images/2024/3/slider-xbox_placeholder.png',
              width: 0,
              height: 0
            }
          ],
          id: 1,
          destinationUrl: '',
          title: 'Xbox Series X & S',
          description: 'Xbox Series X & S',
          published: false,
          btnLabel: 'Explore more',
          styles: {
            align: '',
            textColor: '#000',
            btnBgc: '#dcdbdb',
            btnTextColor: '#222121'
          },
          position: 0
        }
      ],
      carousel: {
        dots: true,
        arrows: true,
        autoplay: true,
        rtl: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        infiniteScroll: false,
        fade: false,
        pauseOnHover: false,
        autoplaySpeed: 5000
      }
    },
    styles: {
      sectionSize: 'full'
    }
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
  ProductList: 'Featured product collection',
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
  Layout: 'Layout'
};
