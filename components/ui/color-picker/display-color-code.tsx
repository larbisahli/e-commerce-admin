import React from 'react';
import { useWatch } from 'react-hook-form';

const DisplayColorCode = ({ control, name }: any) => {
  const color = useWatch({
    control,
    name: name ?? 'color',
    defaultValue: '#9cd864' // default value before the render
  });
  return (
    <>
      {color !== null && (
        <span className="mr-2 text-sm text-heading">{color}</span>
      )}
    </>
  );
};

export default DisplayColorCode;
