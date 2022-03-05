import Uploader from '@components/common/uploader';
import { Dispatch, SetStateAction } from 'react';
import { Controller } from 'react-hook-form';

interface FileInputProps {
  control: any;
  name: string;
  multiple?: boolean;
  setUnsavedChanges?: Dispatch<SetStateAction<string[]>>;
}

const FileInput = ({
  control,
  name,
  multiple = true,
  setUnsavedChanges
}: FileInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      // eslint-disable-next-line no-unused-vars
      render={({ field: { ref, ...rest } }) => (
        <Uploader
          {...rest}
          multiple={multiple}
          setUnsavedChanges={setUnsavedChanges}
        />
      )}
    />
  );
};

export default FileInput;
