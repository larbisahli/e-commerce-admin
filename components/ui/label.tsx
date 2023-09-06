import cn from 'classnames';
import React, { LabelHTMLAttributes } from 'react';

export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  isRequiredLabel?: boolean;
}

const Label: React.FC<Props> = ({
  className,
  isRequiredLabel = false,
  children,
  ...rest
}) => {
  return (
    <label
      className={cn(
        'mb-2 block text-sm font-semibold leading-none text-gray-600',
        className
      )}
      {...rest}
    >
      {children}
      {isRequiredLabel && (
        <span title="Required filed" className="m-[1px] text-red-500">
          *
        </span>
      )}
    </label>
  );
};

export default Label;
