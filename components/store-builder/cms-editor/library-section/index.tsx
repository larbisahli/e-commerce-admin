import { useModalState } from '@components/ui/modal/modal.context';
import { ModuleGroups } from '@ts-types/enums';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';

import ComponentsShowcase from './components';

const LibrarySectionModal = () => {
  const { t } = useTranslation();
  const { meta } = useModalState();
  console.log({ meta });
  const handleTitle = () => {
    if (meta.moduleGroup === ModuleGroups.BUTTON) return 'Buttons';
    if (meta.moduleGroup === ModuleGroups.CATEGORY_DETAILS)
      return 'Category details';
    if (meta.moduleGroup === ModuleGroups.BREADCRUMB) return 'Breadcrumbs';
    if (meta.moduleGroup === ModuleGroups.PRODUCT_CARD) return 'Product cards';
  };
  return (
    <div className="relative flex h-[70vh] w-[50vw] flex-col overflow-hidden">
      <div className="font border-b border-gray-200 bg-gray-50 p-4 text-base capitalize text-gray-800">
        {`UI Library > ${handleTitle()}`}
      </div>
      <div
        className={classNames(
          'flex h-full w-full justify-center overflow-auto p-8 pb-5'
        )}
      >
        <div className="h-full pr-4">
          <div className="h-full">
            <ComponentsShowcase {...meta} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LibrarySectionModal);
