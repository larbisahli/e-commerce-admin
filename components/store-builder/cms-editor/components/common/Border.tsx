import 'rc-slider/assets/index.css';

import { BorderAllIcon } from '@components/icons/builder/BorderAllIcon';
import { BorderBottomIcon } from '@components/icons/builder/BorderBottomIcon';
import { BorderLeftIcon } from '@components/icons/builder/BorderLeftIcon';
import { BorderRightIcon } from '@components/icons/builder/BorderRightIcon';
import { BorderTopIcon } from '@components/icons/builder/BorderTopIcon';
import Accordion from '@components/ui/accordion';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { BorderEnum } from '@ts-types/custom.types';
import classNames from 'classnames';
import Slider from 'rc-slider';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import Color from './color';

const fontStyleOptions = [
  {
    value: 'solid'
  },
  {
    value: 'dashed'
  },
  {
    value: 'dotted'
  },
  {
    value: 'hidden'
  }
];

const Border = ({ label, name }) => {
  const { register, watch, setValue } = useFormContext();

  const borderRadius = watch(`${name}.borderRadius`);
  const borderStyle = watch(`${name}.borderStyle`);
  const borderColor = watch(`${name}.borderColor`);
  const border = watch(`${name}.border`);

  const handleBorderRadius = (value) => {
    setValue(`${name}.borderRadius`, value);
  };

  const handleBorder = (e, value) => {
    e.preventDefault();
    setValue(`${name}.border`, value);
  };

  return (
    <Accordion Title={() => <h3>{label}</h3>}>
      <div className="mt-5">
        <div className="flex w-full items-center justify-between">
          <Label>Border radius</Label>
          <div className="flex w-[50%] items-center justify-end">
            <Slider
              min={0}
              max={100}
              value={borderRadius}
              trackStyle={{ background: '#3887ff' }}
              handleStyle={{
                background: '#1064e3',
                borderColor: '#70aafb',
                opacity: 1
              }}
              onChange={(v) => handleBorderRadius(v)}
            />
            <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
              <input
                type="number"
                value={borderRadius}
                className="hide-arrow w-[30px] pr-1 text-right outline-none"
                onChange={(evt) =>
                  handleBorderRadius(Number(evt.currentTarget.value))
                }
              />
              <span>px</span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Label>Border width</Label>
          <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
            <input
              type="number"
              min={0}
              className="hide-arrow w-[30px] pr-1 text-right outline-none"
              {...register(`${name}.borderWidth`)}
            />
            <span>px</span>
          </div>
        </div>
        <div className="mt-3">
          <Color
            label={'Border color'}
            color={borderColor}
            register={register(`${name}.borderColor`)}
          />
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <Label>Border style</Label>
            <div className="w-[25%]">
              <Select
                name="borderStyle"
                value={borderStyle}
                onChange={(value) => setValue(`${name}.borderStyle`, value)}
                getOptionLabel={(option: any) => option.value}
                getOptionValue={(option: any) => option.value}
                options={fontStyleOptions}
              />
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Label>Borders</Label>
          <div className="relative h-[110px] w-[110px]">
            <button
              onClick={(e) => handleBorder(e, BorderEnum.TOP)}
              title="Top"
              className={classNames(
                'flex h-7 w-8 items-center justify-center rounded-sm border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                'absolute top-0 left-1/2 -translate-x-1/2 transform',
                {
                  'border-l border-accent border-l-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                    border === BorderEnum.TOP
                }
              )}
            >
              <BorderTopIcon width={18} height={18} />
            </button>
            <button
              onClick={(e) => handleBorder(e, BorderEnum.ALL)}
              title="All"
              className={classNames(
                'flex h-7 w-8 items-center justify-center rounded-sm border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform',
                {
                  'border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                    border === BorderEnum.ALL
                }
              )}
            >
              <BorderAllIcon width={18} height={18} />
            </button>
            <button
              onClick={(e) => handleBorder(e, BorderEnum.RIGHT)}
              title="Right"
              className={classNames(
                'flex h-7 w-8 items-center justify-center rounded-sm border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                'absolute top-1/2 right-0 -translate-y-1/2 transform',
                {
                  'border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                    border === BorderEnum.RIGHT
                }
              )}
            >
              <BorderRightIcon width={18} height={18} />
            </button>
            <button
              onClick={(e) => handleBorder(e, BorderEnum.BOTTOM)}
              title="Bottom"
              className={classNames(
                'flex h-7 w-8 items-center justify-center rounded-sm border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                'absolute bottom-0 left-1/2 -translate-x-1/2 transform',
                {
                  'border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                    border === BorderEnum.BOTTOM
                }
              )}
            >
              <BorderBottomIcon width={18} height={18} />
            </button>
            <button
              onClick={(e) => handleBorder(e, BorderEnum.LEFT)}
              title="Left"
              className={classNames(
                'flex h-7 w-8 items-center justify-center rounded-sm border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                'absolute top-1/2 left-0 -translate-y-1/2 transform',
                {
                  'border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                    border === BorderEnum.LEFT
                }
              )}
            >
              <BorderLeftIcon width={18} height={18} />
            </button>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default memo(Border);
