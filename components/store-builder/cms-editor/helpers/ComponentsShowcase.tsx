import { DragDropSvg } from '@components/icons/drag-drop';
import cn from 'classnames';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { memo, useMemo, useState } from 'react';

interface Props {
  moduleId: string;
}

const componentsThumbnail = [
  {
    id: 1,
    thumbnail: '/static/components/hero-banner.png',
    title: 'Simple'
  },
  {
    id: 2,
    thumbnail: '/static/components/banner.png',
    title: 'Simple 2'
  },
  {
    id: 3,
    thumbnail: '/static/components/banner.png',
    title: 'Simple 3'
  },
  {
    id: 4,
    thumbnail: '/static/components/banner.png',
    title: 'Simple 4'
  },
  {
    id: 5,
    thumbnail: '/static/components/banner.png',
    title: 'Simple 5'
  }
];

const ComponentsShowcase = (props: Props) => {
  const { t } = useTranslation();
  const [selectedComponent, setSelectedComponent] = useState(
    componentsThumbnail[0]
  );
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragStarted, setIsDragStarted] = useState(false);

  const components = useMemo(() => {
    return componentsThumbnail?.filter((c) => c.id !== selectedComponent?.id);
  }, [selectedComponent]);

  const handleDragStart = (_, id: number) => {
    setDraggedItemId(id);
    setIsDragStarted(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    setIsDragOver(false);
    setIsDragStarted(false);
  };

  const handleDrop = () => {
    if (isDragOver) {
      const component = components?.find((item) => item.id === draggedItemId);
      if (component) {
        setSelectedComponent(component);
      }
    }
    handleDragEnd();
  };

  return (
    <div className="">
      <h3 className="border-b py-[18px] text-center text-lg font-medium">
        Available Components
      </h3>
      <div className="relative">
        <div
          className="top-0 right-0 left-0 my-4 max-h-[200px] border-b"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <span className="mb-1 font-medium">{`Selected component: ${selectedComponent.title}`}</span>
          <div
            className={cn(
              'relative mt-2 mb-5 border-dashed border-transparent hover:shadow',
              {
                'border-dash border bg-blue-300': isDragOver,
                'border-2 border-black': isDragStarted
              }
            )}
          >
            {isDragStarted && (
              <div className="absolute top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center text-lg font-medium text-black">
                <div>
                  <DragDropSvg width={16} height={16} />
                </div>
              </div>
            )}
            <Image
              alt="placeholder"
              src={selectedComponent.thumbnail}
              width={500}
              height={300}
              className={cn(isDragStarted && 'opacity-50')}
            />
          </div>
        </div>
        <div className="h-full">
          <div className="flex w-full flex-col">
            <div className="relative h-full w-full pt-3">
              {components?.map(({ id, thumbnail, title }) => {
                return (
                  <div key={id}>
                    <span className="mb-1 font-medium">{title}</span>
                    <button
                      onDragStart={(e) => handleDragStart(e, id)}
                      onDragEnd={handleDragEnd}
                      className="relative mb-5 cursor-grab rounded-sm border border-white transition-transform duration-500 ease-in-out me-2 hover:border-black hover:opacity-70 hover:shadow"
                    >
                      <Image alt="" src={thumbnail} width={500} height={300} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ComponentsShowcase);
