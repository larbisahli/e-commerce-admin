import { NoPluginIcon } from '@components/icons/builder/no-plugin';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';

interface Props {
  moduleName: string;
  componentId: string;
  moduleGroup: string;
}

const componentsThumbnail = [
  {
    id: 'A',
    thumbnail: '/static/components/banner.png',
    title: 'Simple 2'
  },
  {
    id: 'B',
    thumbnail: '/static/components/banner.png',
    title: 'Simple 3'
  },
  {
    id: 'C',
    thumbnail: '/static/components/banner.png',
    title: 'Simple 4'
  },
  {
    id: 'D',
    thumbnail: '/static/components/banner.png',
    title: 'Simple 5'
  }
];

const PluginsShowcase = (props: Props) => {
  const { t } = useTranslation();
  let [selectPlugins, setSelectPlugins] = useState<string[]>([]);

  const components = componentsThumbnail;

  const handleCheckboxChange = (id: string) => {
    console.log('value of checkbox : ', id);
    setSelectPlugins((v) => {
      if (v?.includes(id)) {
        return v.filter((a) => a !== id);
      } else {
        return [...v, id];
      }
    });
  };

  const isEmptyPlugin = true;

  const renderEmpty = () => {
    if (isEmptyPlugin) {
      return (
        <div className="flex h-full w-full items-center justify-center py-11">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-500">
              <NoPluginIcon height={45} width={45} />
            </div>
            <div className="text-lg font-medium">No plugins available</div>
            <p className="text-center text-sm text-gray-500">
              Try to look for available plugins in the app marketplace
            </p>
            <div>
              <Link href={'#'}>
                <div className="pt-1 underline">Marketplace</div>
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  const renderPlugins = () => {
    if (isEmptyPlugin) return null;
    return (
      <div>
        <h3 className="py-[18px] text-lg font-medium">Available Plugins</h3>
        <div className="relative">
          <div className="h-full">
            <div className="flex w-full flex-col">
              <div className="relative h-full w-full pt-3">
                {components?.map(({ id, thumbnail, title }) => {
                  return (
                    <button
                      key={id}
                      className="mb-5 flex items-center justify-center me-2"
                      onClick={() => handleCheckboxChange(id)}
                    >
                      <input
                        className="h-7 w-7"
                        id={id}
                        name={id}
                        type="checkbox"
                        checked={selectPlugins?.includes(id)}
                      />
                      <div
                        className={classNames(
                          'relative cursor-pointer rounded-sm border-2 border-white transition-transform duration-500 ease-in-out',
                          { 'border-2 border-black opacity-80 shadow': false }
                        )}
                      >
                        <Image
                          alt=""
                          src={thumbnail}
                          width={500}
                          height={300}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full">
      {renderEmpty()}
      {renderPlugins()}
    </div>
  );
};

export default memo(PluginsShowcase);
