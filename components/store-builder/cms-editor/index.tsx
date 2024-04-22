import Loader from '@components/ui/loader/loader';
import { useModalState } from '@components/ui/modal/modal.context';
import { ModuleNames } from '@ts-types/enums';
import dynamic from 'next/dynamic';
import { memo } from 'react';

import ComponentsShowcase from './helpers/ComponentsShowcase';

const CreateOrUpdatePromoSlideForm = dynamic(
  () => import('./components/promo-banner/promo-slide-form'),
  { ssr: true, loading: () => <Loader special /> }
);

const CreateOrUpdateHeroSlideForm = dynamic(
  () => import('./components/hero-banner'),
  { ssr: true, loading: () => <Loader special /> }
);

const CmsEditorModal = () => {
  const { id, meta } = useModalState();

  console.log({ id, meta });

  return (
    <div className="flex h-[90vh] w-[90vw] flex-col overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-100 p-4 text-lg font-semibold capitalize text-gray-800">
        CMS Editor
      </div>
      <div className="w-full overflow-y-auto p-4">
        <div className="flex h-full text-sm text-gray-600">
          <div className="h-full w-full overflow-y-auto px-0 pb-5 sm:w-4/12 md:w-1/3 md:pe-5">
            <ComponentsShowcase moduleId={id} />
          </div>
          <div className="relative h-full w-full overflow-y-auto border-l p-3 sm:w-8/12 md:w-2/3">
            {id === ModuleNames.PROMO_BANNER && (
              <CreateOrUpdatePromoSlideForm data={meta} />
            )}
            {id === ModuleNames.HERO_BANNER && (
              <CreateOrUpdateHeroSlideForm data={meta} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CmsEditorModal);
