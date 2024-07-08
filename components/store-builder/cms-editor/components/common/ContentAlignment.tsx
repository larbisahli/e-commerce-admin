import { AlignCenterIcon } from '@components/icons/builder/align-center';
import { AlignLeftIcon } from '@components/icons/builder/align-left';
import { AlignRightIcon } from '@components/icons/builder/align-right';
import Label from '@components/ui/label';
import { TextAlignEnum } from '@ts-types/custom.types';
import classNames from 'classnames';
import { memo } from 'react';

const ContentAlignment = ({ contentAlignment, setValue }) => {
  const handleContentAlignment = (e, value) => {
    e.preventDefault();
    setValue('contentAlignment', value);
  };

  return (
    <div className="mt-3 flex items-center justify-between">
      <Label>Content alignment</Label>
      <div className="flex items-center justify-center">
        <button
          onClick={(e) => handleContentAlignment(e, TextAlignEnum.LEFT)}
          title="Left"
          className={classNames(
            'flex h-7 w-10 items-center justify-center rounded-l-sm border-t border-b border-l border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
            {
              'border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                contentAlignment === TextAlignEnum.LEFT
            }
          )}
        >
          <AlignLeftIcon width={18} height={18} />
        </button>
        <button
          onClick={(e) => handleContentAlignment(e, TextAlignEnum.CENTER)}
          title="Center"
          className={classNames(
            'flex h-7 w-10 items-center justify-center border-t border-b border-r border-l border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 hover:text-blue-700',
            {
              'border-accent bg-blue-100 text-accent hover:bg-blue-200':
                contentAlignment === TextAlignEnum.CENTER,
              'border-l-accent': contentAlignment === TextAlignEnum.LEFT,
              '!border-r-0': contentAlignment === TextAlignEnum.RIGHT
            }
          )}
        >
          <AlignCenterIcon width={18} height={18} />
        </button>
        <button
          onClick={(e) => handleContentAlignment(e, TextAlignEnum.RIGHT)}
          title="Right"
          className={classNames(
            'flex h-7 w-10 items-center justify-center rounded-r-sm border-t border-b border-r border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
            {
              'border-l border-accent border-l-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                contentAlignment === TextAlignEnum.RIGHT
            }
          )}
        >
          <AlignRightIcon width={18} height={18} />
        </button>
      </div>
    </div>
  );
};

export default memo(ContentAlignment);
