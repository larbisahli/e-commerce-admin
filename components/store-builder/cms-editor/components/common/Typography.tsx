import { AlignCenterIcon } from '@components/icons/builder/align-center';
import { AlignLeftIcon } from '@components/icons/builder/align-left';
import { AlignRightIcon } from '@components/icons/builder/align-right';
import { CloseDefaultIconIcon } from '@components/icons/builder/close-default';
import { FontItalicIcon } from '@components/icons/builder/font-italic';
import { FontNormalIcon } from '@components/icons/builder/font-normal';
import { TextDecorationOverlineIcon } from '@components/icons/builder/text-decoration-overline';
import { TextDecorationStrikeIcon } from '@components/icons/builder/text-decoration-strike';
import { TextDecorationUnderlineIcon } from '@components/icons/builder/text-decoration-underline';
import { TextTransformCapitalizeIcon } from '@components/icons/builder/TextTransformCapitalizeIcon';
import { TextTransformLowercaseIcon } from '@components/icons/builder/TextTransformLowercaseIcon';
import { TextTransformSentenceIcon } from '@components/icons/builder/TextTransformSentenceIcon';
import Accordion from '@components/ui/accordion';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { TextAlignEnum } from '@ts-types/custom.types';
import classNames from 'classnames';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import Color from './color';
import { fontFamilyOptions, fontWeightOptions } from './data';

const Typography = ({ label, name, isTextAlign = true }) => {
  const { register, watch, setValue } = useFormContext();

  const color = watch(`${name}.color`);
  const textAlign = watch(`${name}.textAlign`);
  const fontStyle = watch(`${name}.fontStyle`);
  const textDecoration = watch(`${name}.textDecoration`);
  const textTransform = watch(`${name}.textTransform`);
  const fontWeight = watch(`${name}.fontWeight`);
  const fontFamily = watch(`${name}.fontFamily`);

  const handleTextAlign = (e, value) => {
    e.preventDefault();
    setValue(`${name}.textAlign`, value);
  };

  const handleFontStyle = (e, value) => {
    e.preventDefault();
    setValue(`${name}.fontStyle`, value);
  };

  const handleTextDecoration = (e, value) => {
    e.preventDefault();
    setValue(`${name}.textDecoration`, value);
  };

  const handleTextTransform = (e, value) => {
    e.preventDefault();
    setValue(`${name}.textTransform`, value);
  };

  return (
    <Accordion Title={() => <h3>{label}</h3>}>
      <div className="pt-5">
        <div className="">
          <div className="flex items-center justify-between">
            <Label>Font family</Label>
            <div className="w-[40%]">
              <Select
                name="fontFamily"
                value={fontFamily}
                onChange={(value) => setValue(`${name}.fontFamily`, value)}
                getOptionLabel={(option: any) => option.label}
                getOptionValue={(option: any) => option.value}
                options={fontFamilyOptions}
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <Label>Font weight</Label>
            <div className="w-[40%]">
              <Select
                name="fontWeight"
                value={fontWeight}
                onChange={(value) => setValue(`${name}.fontWeight`, value)}
                getOptionLabel={(option: any) => option.label}
                getOptionValue={(option: any) => option.value}
                options={fontWeightOptions[fontFamily?.value]}
              />
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Label>Font size</Label>
          <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
            <input
              type="number"
              min={0}
              className="hide-arrow w-[35px] pr-1 text-right outline-none"
              {...register(`${name}.fontSize`)}
            />
            <span>px</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Label>Letter spacing</Label>
          <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
            <input
              type="number"
              min={-1}
              step="any"
              className="hide-arrow w-[35px] pr-1 text-right outline-none"
              {...register(`${name}.letterSpacing`)}
            />
            <span>px</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Label>Line height</Label>
          <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
            <input
              type="number"
              min={0}
              className="hide-arrow w-[35px] pr-1 text-right outline-none"
              {...register(`${name}.lineHeight`)}
            />
            <span>px</span>
          </div>
        </div>
        <div className="mx-auto mt-3 h-[1px] w-full bg-gray-200"></div>
        <div className="mt-3">
          <Color
            label={'Color'}
            color={color}
            register={register(`${name}.color`)}
          />
        </div>
        {isTextAlign && (
          <div className="mt-3 flex items-center justify-between">
            <Label>Text align</Label>
            <div className="flex items-center justify-center">
              <button
                onClick={(e) => handleTextAlign(e, TextAlignEnum.LEFT)}
                title="Left"
                className={classNames(
                  'flex h-7 w-10 items-center justify-center rounded-l-sm border-t border-b border-l border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                  {
                    'border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                      textAlign === TextAlignEnum.LEFT
                  }
                )}
              >
                <AlignLeftIcon width={18} height={18} />
              </button>
              <button
                onClick={(e) => handleTextAlign(e, TextAlignEnum.CENTER)}
                title="Center"
                className={classNames(
                  'flex h-7 w-10 items-center justify-center border-t border-b border-r border-l border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 hover:text-blue-700',
                  {
                    'border-accent bg-blue-100 text-accent hover:bg-blue-200':
                      textAlign === TextAlignEnum.CENTER,
                    'border-l-accent': textAlign === TextAlignEnum.LEFT,
                    '!border-r-0': textAlign === TextAlignEnum.RIGHT
                  }
                )}
              >
                <AlignCenterIcon width={18} height={18} />
              </button>
              <button
                onClick={(e) => handleTextAlign(e, TextAlignEnum.RIGHT)}
                title="Right"
                className={classNames(
                  'flex h-7 w-10 items-center justify-center rounded-r-sm border-t border-b border-r border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                  {
                    'border-l border-accent border-l-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                      textAlign === TextAlignEnum.RIGHT
                  }
                )}
              >
                <AlignRightIcon width={18} height={18} />
              </button>
            </div>
          </div>
        )}
        <div className="mt-3 flex items-center justify-between">
          <Label>Font style</Label>
          <div className="flex items-center justify-center">
            <button
              onClick={(e) => handleFontStyle(e, 'normal')}
              title="Regular"
              className={classNames(
                'flex h-8 w-11 cursor-pointer items-center justify-center rounded-l-sm border-t border-b border-l border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                {
                  'border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                    fontStyle === 'normal'
                }
              )}
            >
              <FontNormalIcon />
            </button>
            <button
              onClick={(e) => handleFontStyle(e, 'italic')}
              title="Italic"
              className={classNames(
                'flex h-8 w-11 cursor-pointer items-center justify-center rounded-r-sm border-t border-b border-r border-l border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 hover:text-blue-700',
                {
                  'border-accent bg-blue-100 text-accent hover:bg-blue-200':
                    fontStyle === 'italic',
                  'border-l-accent': fontStyle === 'normal'
                }
              )}
            >
              <FontItalicIcon />
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Label>Text Decoration</Label>
          <div className="flex items-center justify-center">
            <button
              onClick={(e) => handleTextDecoration(e, 'none')}
              title="None"
              className={classNames(
                'flex h-7 w-10 items-center justify-center rounded-l-sm border-t border-b border-l border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                {
                  'border-r border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                    textDecoration === 'none'
                }
              )}
            >
              <CloseDefaultIconIcon width={18} height={18} />
            </button>
            <button
              onClick={(e) => handleTextDecoration(e, 'line-through')}
              title="line-through"
              className={classNames(
                'flex h-7 w-10 items-center justify-center border-t border-b border-r border-l border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 hover:text-blue-700',
                {
                  'border-accent bg-blue-100 text-accent hover:bg-blue-200':
                    textDecoration === 'line-through',
                  '!border-r-0': textDecoration === 'underline',
                  '!border-l-0': textDecoration === 'none'
                }
              )}
            >
              <TextDecorationStrikeIcon width={18} height={18} />
            </button>
            <button
              onClick={(e) => handleTextDecoration(e, 'underline')}
              title="Underline"
              className={classNames(
                'flex h-7 w-10 items-center justify-center border-t border-b border-r border-l-0 border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 hover:text-blue-700',
                {
                  '!border-l border-accent bg-blue-100 text-accent hover:bg-blue-200':
                    textDecoration === 'underline',
                  '!border-r-0': textDecoration === 'overline'
                }
              )}
            >
              <TextDecorationUnderlineIcon width={18} height={18} />
            </button>
            <button
              onClick={(e) => handleTextDecoration(e, 'overline')}
              title="Overline"
              className={classNames(
                'flex h-7 w-10 items-center justify-center rounded-r-sm border-t border-b border-r border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                {
                  'border-l border-accent border-l-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                    textDecoration === 'overline'
                }
              )}
            >
              <TextDecorationOverlineIcon width={18} height={18} />
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Label>Text Transform</Label>
          <div className="flex items-center justify-center">
            <button
              onClick={(e) => handleTextTransform(e, 'none')}
              title="None"
              className={classNames(
                'flex h-7 w-10 items-center justify-center rounded-l-sm border-t border-b border-l border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                {
                  'border-r border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                    textTransform === 'none'
                }
              )}
            >
              <CloseDefaultIconIcon width={18} height={18} />
            </button>
            <button
              onClick={(e) => handleTextTransform(e, 'uppercase')}
              title="ALL CAPS"
              className={classNames(
                'flex h-7 w-10 items-center justify-center border-t border-b border-r border-l border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 hover:text-blue-700',
                {
                  'border-accent bg-blue-100 text-accent hover:bg-blue-200':
                    textTransform === 'uppercase',
                  '!border-r-0': textTransform === 'capitalize',
                  '!border-l-0': textTransform === 'none'
                }
              )}
            >
              <TextTransformCapitalizeIcon width={18} height={18} />
            </button>
            <button
              onClick={(e) => handleTextTransform(e, 'capitalize')}
              title="Capitalize"
              className={classNames(
                'flex h-7 w-10 items-center justify-center border-t border-b border-r border-l-0 border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 hover:text-blue-700',
                {
                  '!border-l border-accent bg-blue-100 text-accent hover:bg-blue-200':
                    textTransform === 'capitalize',
                  '!border-r-0': textTransform === 'lowercase'
                }
              )}
            >
              <TextTransformSentenceIcon width={18} height={18} />
            </button>
            <button
              onClick={(e) => handleTextTransform(e, 'lowercase')}
              title="Lowercase"
              className={classNames(
                'flex h-7 w-10 items-center justify-center rounded-r-sm border-t border-b border-r border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                {
                  'border-l border-accent border-l-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                    textTransform === 'lowercase'
                }
              )}
            >
              <TextTransformLowercaseIcon width={18} height={18} />
            </button>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default memo(Typography);
