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
  ssr: true,
  loading: () => <Loader special />
});

const ImageForm = dynamic(() => import('./components/image'), {
  ssr: true,
  loading: () => <Loader special />
});

const PromoBannerForm = dynamic(() => import('./components/promo-banner'), {
  ssr: true,
  loading: () => <Loader special />
});

export interface OptionsVariable {
  componentId: string;
  language: LanguageType;
}
export interface TComponent {
  storeLayoutComponentContent: StoreLayoutComponentType;
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

  const { storeLayoutComponentContent = {} } = data ?? {};

  useErrorLogger(error);

  console.log('=====Y>', { meta, storeLayoutComponentContent });

  return (
    <div className="flex h-[90vh] w-[90vw] flex-col overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-100 p-4 text-lg font-semibold capitalize text-gray-800">
        CMS Editor
      </div>
      <div className="w-full overflow-y-auto p-4">
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
              !loading && (
                <PromoBannerForm
                  initialValues={{ ...meta, ...storeLayoutComponentContent }}
                />
              )}
            {meta?.moduleGroup === ModuleGroups.HERO_CAROUSEL &&
              !isEmpty(storeLayoutComponentContent) &&
              !loading && (
                <HeroCarouselForm
                  initialValues={{ ...meta, ...storeLayoutComponentContent }}
                />
              )}
            {meta?.moduleGroup === ModuleGroups.IMAGE && !loading && (
              <ImageForm
                initialValues={{ ...meta, ...storeLayoutComponentContent }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CmsEditorModal);
