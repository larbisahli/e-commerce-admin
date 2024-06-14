import { useQuery } from '@apollo/client';
import { ContentFormPlaceholder } from '@components/common/commonComponents';
import Loader from '@components/ui/loader/loader';
import { useModalState } from '@components/ui/modal/modal.context';
import { STORE_LAYOUT_COMPONENT_CONTENT } from '@graphql/content';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { ModuleGroups } from '@ts-types/enums';
import { LanguageType, StoreLayoutComponentType } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import { memo } from 'react';

import ModuleShowcase from './helpers/ModuleShowcase';

const HeroCarouselForm = dynamic(() => import('./components/hero-carousel'), {
  ssr: false,
  loading: () => <Loader special />
});
const ImageForm = dynamic(() => import('./components/image'), {
  ssr: false,
  loading: () => <Loader special />
});
const PromoBannerForm = dynamic(() => import('./components/promo-banner'), {
  ssr: false,
  loading: () => <Loader special />
});
const VideoBannerContent = dynamic(() => import('./components/video-banner'), {
  ssr: false,
  loading: () => <Loader special />
});
const ImageBannerContent = dynamic(() => import('./components/image-banner'), {
  ssr: false,
  loading: () => <Loader special />
});
const TextContent = dynamic(() => import('./components/text'), {
  ssr: false,
  loading: () => <Loader special />
});
const DividerContent = dynamic(() => import('./components/divider'), {
  ssr: false,
  loading: () => <Loader special />
});
const SpacerContent = dynamic(() => import('./components/spacer'), {
  ssr: false,
  loading: () => <Loader special />
});
const HtmlContent = dynamic(() => import('./components/html'), {
  ssr: false,
  loading: () => <Loader special />
});
const EditorialTextContent = dynamic(
  () => import('./components/editorial-text'),
  {
    ssr: false,
    loading: () => <Loader special />
  }
);
const HeaderContent = dynamic(() => import('./components/header'), {
  ssr: false,
  loading: () => <Loader special />
});
const FooterContent = dynamic(() => import('./components/footer'), {
  ssr: false,
  loading: () => <Loader special />
});
const CookiePopupContent = dynamic(() => import('./components/cookie-popup'), {
  ssr: false,
  loading: () => <Loader special />
});
const InstallPromptContent = dynamic(
  () => import('./components/install-prompt'),
  {
    ssr: false,
    loading: () => <Loader special />
  }
);
const CategoryListContent = dynamic(
  () => import('./components/category-list'),
  {
    ssr: false,
    loading: () => <Loader special />
  }
);
const ProductListContent = dynamic(() => import('./components/product-list'), {
  ssr: false,
  loading: () => <Loader special />
});

export interface OptionsVariable {
  componentId: string;
  language: LanguageType;
}
export interface TComponent {
  storeLayoutComponentContent: StoreLayoutComponentType;
  storeLayoutComponentStyles: StoreLayoutComponentType;
}

const CmsEditorModal = () => {
  const { meta } = useModalState();

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TComponent, OptionsVariable>(
    STORE_LAYOUT_COMPONENT_CONTENT,
    {
      variables: {
        componentId: meta?.componentId as string,
        language: selectedLanguage
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage) || !meta?.componentId
    }
  );

  const { storeLayoutComponentContent = {}, storeLayoutComponentStyles = {} } =
    data ?? {};

  useErrorLogger(error);

  console.log('=====Y>', { meta, storeLayoutComponentContent });

  const initialValues = {
    ...meta,
    ...storeLayoutComponentContent,
    ...storeLayoutComponentStyles
  };

  console.log('EDITOR >>', { initialValues });

  return (
    <div className="flex h-[90vh] w-[90vw] flex-col overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-100 p-4 text-lg font-semibold capitalize text-gray-800">
        CMS Editor
      </div>
      <div className="h-full w-full overflow-y-auto p-4">
        <div className="flex h-full text-sm text-gray-600">
          <div className="h-full w-full overflow-y-hidden px-0 pb-5 sm:w-4/12 md:w-1/3 md:pe-5">
            <ModuleShowcase
              moduleName={meta.moduleName}
              moduleGroup={meta.moduleGroup}
              componentId={meta?.componentId}
            />
          </div>
          <div className="relative h-full w-full overflow-y-auto border-l p-3 pt-0 sm:w-8/12 md:w-2/3">
            {loading && (
              <div className="h-full">
                <ContentFormPlaceholder></ContentFormPlaceholder>
              </div>
            )}
            {meta?.moduleGroup === ModuleGroups.PROMO_BANNER &&
              !isEmpty(storeLayoutComponentContent) &&
              !loading && <PromoBannerForm initialValues={initialValues} />}
            {meta?.moduleGroup === ModuleGroups.HERO_CAROUSEL &&
              !isEmpty(storeLayoutComponentContent) &&
              !loading && <HeroCarouselForm initialValues={initialValues} />}
            {meta?.moduleGroup === ModuleGroups.IMAGE && !loading && (
              <ImageForm initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.VIDEO_BANNER && !loading && (
              <VideoBannerContent initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.IMAGE_BANNER && !loading && (
              <ImageBannerContent initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.TEXT && !loading && (
              <TextContent initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.DIVIDER && !loading && (
              <DividerContent initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.SPACER && !loading && (
              <SpacerContent initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.HTML && !loading && (
              <HtmlContent initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.EDITORIAL_TEXT && !loading && (
              <EditorialTextContent initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.HEADER && !loading && (
              <HeaderContent initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.FOOTER && !loading && (
              <FooterContent initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.COOKIE_POPUP && !loading && (
              <CookiePopupContent initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.INSTALL_PROMPT && !loading && (
              <InstallPromptContent initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.CATEGORY_LIST && !loading && (
              <CategoryListContent initialValues={initialValues} />
            )}
            {meta?.moduleGroup === ModuleGroups.PRODUCT_LIST && !loading && (
              <ProductListContent initialValues={initialValues} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CmsEditorModal);
