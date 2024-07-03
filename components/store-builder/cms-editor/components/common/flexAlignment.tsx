import Accordion from '@components/ui/accordion';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import { flexAlignmentOptions } from './data';

const FlexAlignment = ({ label, name }) => {
  const { watch, setValue } = useFormContext();

  const alignItems = watch(`${name}.alignItems`);
  const justifyContent = watch(`${name}.justifyContent`);

  return (
    <Accordion Title={() => <h3>{label}</h3>}>
      <div className="pt-5">
        <div className="">
          <div className="flex items-center justify-between">
            <Label>Horizontal Alignment</Label>
            <div className="w-[40%]">
              <Select
                name="alignItems"
                value={alignItems}
                onChange={(value) => setValue(`${name}.alignItems`, value)}
                getOptionLabel={(option: any) => option.label}
                getOptionValue={(option: any) => option.value}
                options={flexAlignmentOptions}
              />
              <p className="text-xs text-gray-400">
                CSS equivalent: align-items
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <Label>Vertical Alignment</Label>
            <div className="w-[40%]">
              <Select
                name="justifyContent"
                value={justifyContent}
                onChange={(value) => setValue(`${name}.justifyContent`, value)}
                getOptionLabel={(option: any) => option.label}
                getOptionValue={(option: any) => option.value}
                options={flexAlignmentOptions}
              />
              <p className="text-xs text-gray-400">
                CSS equivalent: justify-content
              </p>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default memo(FlexAlignment);
