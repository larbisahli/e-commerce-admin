import { ComponentIcon } from '@components/icons/builder/component';
import { PluginIcon } from '@components/icons/builder/plugin';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { Fragment, memo } from 'react';

import ComponentsShowcase from './ComponentsShowcase';
import PluginsShowcase from './PluginsShowcase';

const ModuleShowcase = ({ moduleName, moduleGroup, componentId }) => {
  const { t } = useTranslation();

  return (
    <Tab.Group>
      <Tab.List className="-mb-px flex flex-wrap border-b border-gray-200 text-center text-sm font-medium  text-gray-500 dark:text-gray-400">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={classNames(
                'group mb-[-1px] inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent px-3 py-2 text-gray-800 outline-none hover:border-gray-300 hover:text-gray-600',
                selected &&
                  'border-b-accent text-accent hover:border-blue-700 hover:text-blue-700'
              )}
            >
              <div className="mr-1">
                <ComponentIcon height={16} width={16} />
              </div>
              <div>Components</div>
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={classNames(
                'group mb-[-1px] inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent px-3 py-2 text-gray-800 outline-none hover:border-gray-300 hover:text-gray-600',
                selected &&
                  'border-b-accent text-accent hover:border-blue-700 hover:text-blue-700'
              )}
            >
              <div className="mr-1">
                <PluginIcon height={16} width={16} />
              </div>
              <div>Plugins</div>
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className="h-full overflow-y-auto">
        <Tab.Panel className="h-full overflow-y-auto">
          <ComponentsShowcase
            moduleName={moduleName}
            moduleGroup={moduleGroup}
            componentId={componentId}
          />
        </Tab.Panel>
        <Tab.Panel className="h-full overflow-y-auto">
          <PluginsShowcase
            moduleName={moduleName}
            moduleGroup={moduleGroup}
            componentId={componentId}
          />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default memo(ModuleShowcase);
