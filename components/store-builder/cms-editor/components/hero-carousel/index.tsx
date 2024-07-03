import { ContentIcon } from '@components/icons/builder/content';
import { CssStyleIcon } from '@components/icons/builder/css-style';
import { Tab } from '@headlessui/react';
import type { StoreLayoutComponentType } from '@ts-types/generated';
import classNames from 'classnames';
import { Fragment, memo } from 'react';
import React from 'react';

import CarouselForm from './form';
import CarouselStyles from './styles';

type IProps = {
  initialValues?: StoreLayoutComponentType;
};

const CarouselContent = ({ initialValues }: IProps) => {
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
                <ContentIcon height={24} width={24} />
              </div>
              <div className="uppercase">Content</div>
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
                <CssStyleIcon height={24} width={24} />
              </div>
              <div className="uppercase">Styles</div>
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel unmount={false}>
          <div className="pt-3">
            <CarouselForm initialValues={initialValues} />
          </div>
        </Tab.Panel>
        <Tab.Panel unmount={false}>
          <div className="pt-3">
            <CarouselStyles initialValues={initialValues} />
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default memo(CarouselContent);
