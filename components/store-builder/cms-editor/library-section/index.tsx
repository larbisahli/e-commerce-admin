import { useModalState } from '@components/ui/modal/modal.context';
import { ModuleGroups } from '@ts-types/enums';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';

import ComponentsShowcase from './components';

const LibrarySectionModal = () => {
  const { t } = useTranslation();
  const { meta } = useModalState();
  const handleTitle = () => {
    if (meta.moduleGroup === ModuleGroups.BUTTON) return 'Buttons';
  };
  return (
    <div className="relative flex h-[70vh] w-[50vw] flex-col overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 p-4 text-base font-light capitalize text-gray-800">
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
