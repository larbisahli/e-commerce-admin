import Link from 'next/link';
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

const RegisterCheckbox = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      style,
      id,
      error,
      name,
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
        <div className="flex items-center font-medium">
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
            <span>I agree to Dropgala</span>
            <Link href={'/conditions'}>
              <a className="px-1 text-accent" target="_blank">
                terms and conditions
              </a>
            </Link>
            <span>of use</span>
          </label>
        </div>
        {error && (
          <p className="my-2 text-start text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

RegisterCheckbox.displayName = 'RegisterCheckbox';

export default RegisterCheckbox;
