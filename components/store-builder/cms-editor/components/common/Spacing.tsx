import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import Label from '@components/ui/label';
import Accordion from '@components/ui/accordion';
import Slider from 'rc-slider';

const Spacing = ({ label, name }) => {
  const { watch, setValue } = useFormContext();

  const marginTop = watch(`${name}.marginTop`);
  const marginRight = watch(`${name}.marginRight`);
  const marginLeft = watch(`${name}.marginLeft`);
  const marginBottom = watch(`${name}.marginBottom`);
  const paddingTop = watch(`${name}.paddingTop`);
  const paddingRight = watch(`${name}.paddingRight`);
  const paddingLeft = watch(`${name}.paddingLeft`);
  const paddingBottom = watch(`${name}.paddingBottom`);

  const handleMargin = (field, value) => {
    setValue(`${name}.${field}`, value);
  };

  const handlePadding = (field, value) => {
    setValue(`${name}.${field}`, value);
  };

  return (
    <Accordion Title={() => <h3>{label}</h3>}>
      <div className="mt-3">
        {/* MARGIN */}
        <div className="border-b border-dashed pb-5">
          <h3 className="font-semibold">Margin</h3>
          <div className="ml-2 mb-2 flex w-full items-center justify-between">
            <Label>Top</Label>
            <div className="flex w-[50%] items-center justify-end">
              <Slider
                min={0}
                max={100}
                value={marginTop}
                trackStyle={{ background: '#3887ff' }}
                handleStyle={{
                  background: '#1064e3',
                  borderColor: '#70aafb',
                  opacity: 1
                }}
                onChange={(v) => handleMargin('marginTop', v)}
              />
              <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
                <input
                  type="number"
                  value={marginTop}
                  className="hide-arrow w-[30px] pr-1 text-right outline-none"
                  onChange={(evt) =>
                    handleMargin('marginTop', Number(evt.currentTarget.value))
                  }
                />
                <span>px</span>
              </div>
            </div>
          </div>
          <div className="ml-2 mb-2 flex w-full items-center justify-between">
            <Label>Left</Label>
            <div className="flex w-[50%] items-center justify-end">
              <Slider
                min={0}
                max={100}
                value={marginLeft}
                trackStyle={{ background: '#3887ff' }}
                handleStyle={{
                  background: '#1064e3',
                  borderColor: '#70aafb',
                  opacity: 1
                }}
                onChange={(v) => handleMargin('marginLeft', v)}
              />
              <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
                <input
                  type="number"
                  value={marginLeft}
                  className="hide-arrow w-[30px] pr-1 text-right outline-none"
                  onChange={(evt) =>
                    handleMargin('marginLeft', Number(evt.currentTarget.value))
                  }
                />
                <span>px</span>
              </div>
            </div>
          </div>
          <div className="ml-2 mb-2 flex w-full items-center justify-between">
            <Label>Right</Label>
            <div className="flex w-[50%] items-center justify-end">
              <Slider
                min={0}
                max={100}
                value={marginRight}
                trackStyle={{ background: '#3887ff' }}
                handleStyle={{
                  background: '#1064e3',
                  borderColor: '#70aafb',
                  opacity: 1
                }}
                onChange={(v) => handleMargin('marginRight', v)}
              />
              <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
                <input
                  type="number"
                  value={marginRight}
                  className="hide-arrow w-[30px] pr-1 text-right outline-none"
                  onChange={(evt) =>
                    handleMargin('marginRight', Number(evt.currentTarget.value))
                  }
                />
                <span>px</span>
              </div>
            </div>
          </div>
          <div className="ml-2 flex w-full items-center justify-between">
            <Label>Bottom</Label>
            <div className="flex w-[50%] items-center justify-end">
              <Slider
                min={0}
                max={100}
                value={marginBottom}
                trackStyle={{ background: '#3887ff' }}
                handleStyle={{
                  background: '#1064e3',
                  borderColor: '#70aafb',
                  opacity: 1
                }}
                onChange={(v) => handleMargin('marginBottom', v)}
              />
              <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
                <input
                  type="number"
                  value={marginBottom}
                  className="hide-arrow w-[30px] pr-1 text-right outline-none"
                  onChange={(evt) =>
                    handleMargin(
                      'marginBottom',
                      Number(evt.currentTarget.value)
                    )
                  }
                />
                <span>px</span>
              </div>
            </div>
          </div>
        </div>
        {/* PADDING */}
        <div className="border-b border-dashed pb-5">
          <h3 className="font-semibold">Padding</h3>
          <div className="ml-2 mb-2 flex w-full items-center justify-between">
            <Label>Top</Label>
            <div className="flex w-[50%] items-center justify-end">
              <Slider
                min={0}
                max={100}
                value={paddingTop}
                trackStyle={{ background: '#3887ff' }}
                handleStyle={{
                  background: '#1064e3',
                  borderColor: '#70aafb',
                  opacity: 1
                }}
                onChange={(v) => handlePadding('paddingTop', v)}
              />
              <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
                <input
                  type="number"
                  value={paddingTop}
                  className="hide-arrow w-[30px] pr-1 text-right outline-none"
                  onChange={(evt) =>
                    handlePadding('paddingTop', Number(evt.currentTarget.value))
                  }
                />
                <span>px</span>
              </div>
            </div>
          </div>
          <div className="ml-2 mb-2 flex w-full items-center justify-between">
            <Label>Left</Label>
            <div className="flex w-[50%] items-center justify-end">
              <Slider
                min={0}
                max={100}
                value={paddingLeft}
                trackStyle={{ background: '#3887ff' }}
                handleStyle={{
                  background: '#1064e3',
                  borderColor: '#70aafb',
                  opacity: 1
                }}
                onChange={(v) => handlePadding('paddingLeft', v)}
              />
              <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
                <input
                  type="number"
                  value={paddingLeft}
                  className="hide-arrow w-[30px] pr-1 text-right outline-none"
                  onChange={(evt) =>
                    handlePadding(
                      'paddingLeft',
                      Number(evt.currentTarget.value)
                    )
                  }
                />
                <span>px</span>
              </div>
            </div>
          </div>
          <div className="ml-2 mb-2 flex w-full items-center justify-between">
            <Label>Right</Label>
            <div className="flex w-[50%] items-center justify-end">
              <Slider
                min={0}
                max={100}
                value={paddingRight}
                trackStyle={{ background: '#3887ff' }}
                handleStyle={{
                  background: '#1064e3',
                  borderColor: '#70aafb',
                  opacity: 1
                }}
                onChange={(v) => handlePadding('paddingRight', v)}
              />
              <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
                <input
                  type="number"
                  value={paddingRight}
                  className="hide-arrow w-[30px] pr-1 text-right outline-none"
                  onChange={(evt) =>
                    handlePadding(
                      'paddingRight',
                      Number(evt.currentTarget.value)
                    )
                  }
                />
                <span>px</span>
              </div>
            </div>
          </div>
          <div className="ml-2 flex w-full items-center justify-between">
            <Label>Bottom</Label>
            <div className="flex w-[50%] items-center justify-end">
              <Slider
                min={0}
                max={100}
                value={paddingBottom}
                trackStyle={{ background: '#3887ff' }}
                handleStyle={{
                  background: '#1064e3',
                  borderColor: '#70aafb',
                  opacity: 1
                }}
                onChange={(v) => handlePadding('paddingBottom', v)}
              />
              <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
                <input
                  type="number"
                  value={paddingBottom}
                  className="hide-arrow w-[30px] pr-1 text-right outline-none"
                  onChange={(evt) =>
                    handlePadding(
                      'paddingBottom',
                      Number(evt.currentTarget.value)
                    )
                  }
                />
                <span>px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default memo(Spacing);
