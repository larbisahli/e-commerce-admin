import { ModuleGroups } from '@ts-types/enums';

export const componentsLibrary = {
  [ModuleGroups.BUTTON]: [
    {
      moduleName: 'ButtonPrimary',
      title: 'Button Primary',
      thumbnail: {
        image: '/static/library/buttons/primary.png',
        placeholder: '/static/library/buttons/primary.png'
      }
    },
    {
      moduleName: 'ButtonOutline',
      title: 'Button Outline',
      thumbnail: {
        image: '/static/library/buttons/outline.png',
        placeholder: '/static/library/buttons/outline.png'
      }
    },
    {
      moduleName: 'ButtonPrimaryRounded',
      title: 'Button Rounded Primary',
      thumbnail: {
        image: '/static/library/buttons/primary-rounded.png',
        placeholder: '/static/library/buttons/primary-rounded.png'
      }
    },
    {
      moduleName: 'ButtonOutlineRounded',
      title: 'Button Rounded Outline',
      thumbnail: {
        image: '/static/library/buttons/outline-rounded.png',
        placeholder: '/static/library/buttons/outline-rounded.png'
      }
    }
  ],
  [ModuleGroups.CATEGORY_DETAILS]: [
    {
      moduleName: 'CategoryDetails',
      title: 'Category details',
      thumbnail: {
        image: '/static/library/category-details/category-details.png',
        placeholder: '/static/library/category-details/category-details.png'
      }
    }
  ],
  [ModuleGroups.BREADCRUMB]: [
    {
      moduleName: 'Breadcrumb',
      title: 'Breadcrumb',
      thumbnail: {
        image: '/static/library/breadcrumb/breadcrumb.png',
        placeholder: '/static/library/breadcrumb/breadcrumb.png'
      }
    }
  ],
  [ModuleGroups.PRODUCT_CARD]: [
    {
      moduleName: 'ProductCard',
      title: 'Product Card Default',
      thumbnail: {
        image: '/static/library/product-card/product-card.png',
        placeholder: '/static/library/product-card/product-card.png'
      }
    }
  ],
  [ModuleGroups.BANNER_WIDGET]: [
    {
      moduleName: 'BannerWidgetBg',
      title: 'Banner Widget with background',
      thumbnail: {
        image: '/static/library/banner-widget/banner-widget-bg.png',
        placeholder: '/static/library/banner-widget/banner-widget-bg.png'
      }
    },
    {
      moduleName: 'BannerWidgetNoBg',
      title: 'Banner Widget with no background',
      thumbnail: {
        image: '/static/library/banner-widget/banner-widget-no-bg.png',
        placeholder: '/static/library/banner-widget/banner-widget-no-bg.png'
      }
    }
  ]
};
