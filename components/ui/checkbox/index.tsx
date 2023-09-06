import React, { InputHTMLAttributes } from 'react';

import styles from './checkbox.module.css';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  error?: string;
  inputClassName?: string;
  labelClassName?: string;
  onMouseLeaveTopLevel?: () => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      style,
      label,
      id,
      name,
      error,
      labelClassName,
      onMouseLeaveTopLevel,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        style={style}
        onMouseLeave={onMouseLeaveTopLevel}
        className={className}
      >
        <div className="flex items-center">
          <input
            id={id ?? name}
            name={name}
            type="checkbox"
            ref={ref}
            className={`${styles.checkbox} ${inputClassName ?? ''}`}
            {...rest}
          />

          <label
            htmlFor={id ?? name}
            className={`${labelClassName ?? ''} text-sm text-body`}
          >
            {label}
          </label>
        </div>

        {error && <p className="my-2 text-end text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
