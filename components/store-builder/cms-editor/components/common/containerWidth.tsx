import { WidthAutoIcon } from '@components/icons/builder/width-auto';
import { WidthFullIcon } from '@components/icons/builder/width-full';
import classNames from 'classnames';

const ContainerWidth = ({ value, setValue }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={(e) => {
          e.preventDefault();
          setValue('full');
        }}
        title="full"
        className={classNames(
          'flex h-8 w-11 cursor-pointer items-center justify-center rounded-l-sm border-t border-b border-l border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
          {
            'border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
              value === 'full'
          }
        )}
      >
        <WidthFullIcon width={24} height={24} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setValue('auto');
        }}
        title="auto"
        className={classNames(
          'flex h-8 w-11 cursor-pointer items-center justify-center rounded-r-sm border-t border-b border-r border-l border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 hover:text-blue-700',
          {
            'border-accent bg-blue-100 text-accent hover:bg-blue-200':
              value === 'auto',
            'border-l-accent': value === 'full'
          }
        )}
      >
        <WidthAutoIcon />
      </button>
    </div>
  );
};

export default ContainerWidth;
