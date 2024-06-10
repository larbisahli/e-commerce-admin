import ColorPicker from '@components/ui/color-picker/color-picker';

const Color = ({ register, label, color }) => {
  return (
    <ColorPicker
      label={label}
      {...register}
      className="flex items-center justify-between"
    >
      <DisplayColorCode color={color} />
    </ColorPicker>
  );
};

const DisplayColorCode = ({ color }: { color: string }) => {
  return (
    <>
      {color !== null && (
        <span className="mr-2 text-xs text-heading">{color}</span>
      )}
    </>
  );
};

export default Color;
