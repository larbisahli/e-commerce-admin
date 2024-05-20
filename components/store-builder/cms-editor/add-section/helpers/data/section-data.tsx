import {
  Text,
  Html,
  Image,
  ImageBanner,
  CategoryList,
  Carousel,
  Subscription,
  PromoBanner,
  ProductList,
  VideoBanner,
  Divider,
  Spacer,
  Layout
} from '@components/icons/builder/sections';

export const sectionsLayout = [
  {
    title: 'Text',
    moduleName: 'Text',
    description: 'Add headlines and descriptions.',
    icon: () => <Text />,
    data: {
      header: 'About',
      text: 'This is a sample text about your amazing brand. Include as many details as you need! This is a sample text about your amazing brand. Include as many details as you need! This is a sample text about your amazing brand. Include as many details as you need!'
    }
  },
  {
    title: 'Image',
    moduleName: 'Image',
    description: 'Upload an image.',
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
      sectionSize: 'auto',
      borderRadius: { value: 'lg' },
      objectFit: { value: 'fill' }
    }
  },
  {
    title: 'Image banner',
    moduleName: 'ImageBanner',
    description: 'Combine image, text, and buttons.',
    icon: () => <ImageBanner />,
    data: {
      header: 'Bold new looks',
      text: 'Volutpat non odio pellentesque phasellus. In quis elit facilisis lectus eget vestibulum nisl fames. Nibh nibh viverra et facilisi pretium. Placerat egestas maecenas nunc urna elit elementum adipiscing. Eget et enim, id faucibus ut mollis. Tristique iaculis faucibus duis pulvinar nulla tellus. In diam cursus nunc eget lorem nullam quisque. Nisl, erat viverra turpis morbi eget. Eget amet pulvinar dignissim viverra at amet ac.',
      btnLabel: 'Browse new merch',
      btnLink: '/collections/all',
      showOverlay: false,
      overlayOpacity: 10,
      sectionSize: 'full',
      headerSize: 'large',
      contentAlignment: 'center',
      headerColor: '#000',
      textColor: '#333',
      btnBgColor: '#000',
      btnTextColor: '#fff',
      objectFit: 'cover',
      borderRadius: 'lg',
      image: 'dropgala/defaults/images/hero-banner/slider-xbox.png',
      placeholder:
        'dropgala/defaults/images/hero-banner/slider-xbox_placeholder.png'
    }
  },
  {
    title: 'Video banner',
    moduleName: 'VideoBanner',
    description: 'Combine video, text, and buttons.',
    icon: () => <VideoBanner />,
    data: {
      header: 'Bold new looks',
      text: '',
      buttonText: 'Browse new merch',
      buttonLink: '/collections/all',
      showOverlay: false,
      overlayOpacity: 10,
      sectionSize: 'full', // auto
      headerSize: 'large',
      contentAlignment: 'center',
      headerColor: '#000',
      textColor: '#333',
      btnBgColor: '#fff',
      btnTextColor: '#fff',
      video_url: '' // vimeo or youtube
    }
  },
  {
    title: 'Custom HTML',
    moduleName: 'Html',
    description: 'Embed your own code.',
    icon: () => <Html />,
    data: {
      customHtml: '',
      customCss: '',
      sectionSize: 'full' // auto
    }
  },
  {
    title: 'Divider',
    moduleName: 'Divider',
    description: 'Add an underlined division on a web page.',
    icon: () => <Divider />,
    data: {}
  },
  {
    title: 'Spacer',
    moduleName: 'Spacer',
    description: 'Add space between components.',
    icon: () => <Spacer />,
    data: {}
  },
  {
    title: 'Layout',
    moduleName: 'Layout',
    description: 'Customize your layout with multiple columns.',
    icon: () => <Layout />,
    data: {}
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
      categories: [],
      sectionSize: 'full' // auto
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
      sectionSize: 'full', // auto
      numberOfProducts: 10,
      ShowAllBtn: {
        text: 'View all',
        link: '/collections/name'
      }
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
      backgroundColor: '#ea580c',
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
    }
  },
  {
    title: 'Carousel',
    moduleName: 'Carousel',
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
    }
  }
];

export const moduleNameMap = {
  HeroCarousel: 'Hero carousel',
  PromoBanner: 'Promo banner',
  ProductList: 'Featured product collection',
  CategoryList: 'Featured category collection',
  Html: 'Custom HTML',
  VideoBanner: 'Video banner',
  ImageBanner: 'Image banner',
  Image: 'Image',
  Text: 'Text'
};
