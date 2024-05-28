import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import Label from '@components/ui/label';
import Color from './color';
import Accordion from '@components/ui/accordion';

const Overlay = ({ label, name }) => {
  const { register, watch, setValue } = useFormContext();

  const overlayOpacity = watch(`${name}.overlayOpacity`);
  const overlayColor = watch(`${name}.overlayColor`);

  const handleOverlayOpacity = (value) => {
    setValue(`${name}.overlayOpacity`, value);
  };

  return (
    <Accordion Title={() => <h3>{label}</h3>}>
      <div className="mt-5">
        <div className="flex w-full items-center justify-between">
          <Label>Overlay opacity</Label>
          <div className="flex w-[50%] items-center justify-end">
            <Slider
              min={0}
              max={100}
              value={overlayOpacity}
              trackStyle={{ background: '#3887ff' }}
              handleStyle={{
                background: '#1064e3',
                borderColor: '#70aafb',
                opacity: 1
              }}
              onChange={(v) => handleOverlayOpacity(v)}
            />
            <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
              <input
                type="number"
                value={overlayOpacity}
                className="hide-arrow w-[30px] pr-1 text-right outline-none"
                onChange={(evt) =>
                  handleOverlayOpacity(Number(evt.currentTarget.value))
                }
              />
              <span>%</span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Color
            label={'Overlay color'}
            color={overlayColor}
            register={register(`${name}.overlayColor`)}
          />
        </div>
      </div>
    </Accordion>
  );
};

export default memo(Overlay);
