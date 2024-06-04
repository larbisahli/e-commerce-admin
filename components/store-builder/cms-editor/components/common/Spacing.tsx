import Accordion from '@components/ui/accordion';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

const Spacing = ({ label, name }) => {
  const { register } = useFormContext();

  return (
    <Accordion Title={() => <h3>{label}</h3>}>
      <div className="mt-3">
        {/* MARGIN */}
        <div className="flex items-center justify-between py-5">
          <h3 className="font-semibold">Margin</h3>
          <div className="flex items-center">
            <div className="relative flex w-fit items-center justify-center rounded-l-sm border border-gray-300 p-1 px-2">
              <input
                type="number"
                className="hide-arrow w-[30px] pr-1 text-right outline-none"
                {...register(`${name}.marginTop`)}
              />
              <span>px</span>
              <p className="absolute bottom-[-25px]">Top</p>
            </div>
            <div className="relative flex w-fit items-center justify-center border border-l-0 border-gray-300 p-1 px-2">
              <input
                type="number"
                className="hide-arrow w-[30px] pr-1 text-right outline-none"
                {...register(`${name}.marginRight`)}
              />
              <span>px</span>
              <p className="absolute bottom-[-25px]">Right</p>
            </div>
            <div className="relative  flex w-fit items-center justify-center border border-l-0 border-gray-300 p-1 px-2">
              <input
                type="number"
                className="hide-arrow w-[30px] pr-1 text-right outline-none"
                {...register(`${name}.marginBottom`)}
              />
              <span>px</span>
              <p className="absolute bottom-[-25px]">Bottom</p>
            </div>
            <div className="relative  flex w-fit items-center justify-center rounded-r-sm border border-l-0 border-gray-300 p-1 px-2">
              <input
                type="number"
                className="hide-arrow w-[30px] pr-1 text-right outline-none"
                {...register(`${name}.marginLeft`)}
              />
              <span>px</span>
              <p className="absolute bottom-[-25px]">Left</p>
            </div>
          </div>
        </div>
        {/* PADDING */}
        <div className="flex items-center justify-between py-5">
          <h3 className="font-semibold">Padding</h3>
          <div className="flex items-center">
            <div className="relative flex w-fit items-center justify-center rounded-l-sm border border-gray-300 p-1 px-2">
              <input
                type="number"
                className="hide-arrow w-[30px] pr-1 text-right outline-none"
                {...register(`${name}.paddingTop`)}
              />
              <span>px</span>
              <p className="absolute bottom-[-25px]">Top</p>
            </div>
            <div className="relative flex w-fit items-center justify-center border border-l-0 border-gray-300 p-1 px-2">
              <input
                type="number"
                className="hide-arrow w-[30px] pr-1 text-right outline-none"
                {...register(`${name}.paddingRight`)}
              />
              <span>px</span>
              <p className="absolute bottom-[-25px]">Right</p>
            </div>
            <div className="relative  flex w-fit items-center justify-center border border-l-0 border-gray-300 p-1 px-2">
              <input
                type="number"
                className="hide-arrow w-[30px] pr-1 text-right outline-none"
                {...register(`${name}.paddingBottom`)}
              />
              <span>px</span>
              <p className="absolute bottom-[-25px]">Bottom</p>
            </div>
            <div className="relative  flex w-fit items-center justify-center rounded-r-sm border border-l-0 border-gray-300 p-1 px-2">
              <input
                type="number"
                className="hide-arrow w-[30px] pr-1 text-right outline-none"
                {...register(`${name}.paddingLeft`)}
              />
              <span>px</span>
              <p className="absolute bottom-[-25px]">Left</p>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default memo(Spacing);
