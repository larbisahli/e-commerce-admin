import { Eye } from '@components/icons/eye-icon';
import { EyeOff } from '@components/icons/eye-off-icon';
import cn from 'classnames';
import React, { InputHTMLAttributes, useState } from 'react';

import Link from './link';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  forgotPassHelpText?: string;
  label?: string;
  name: string;
  forgotPageLink?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
  error: string | undefined;
}
const classes = {
  root: 'px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  shadow: 'focus:shadow'
};
const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      forgotPassHelpText,
      label,
      name,
      error,
      children,
      variant = 'normal',
      shadow = false,
      type = 'text',
      forgotPageLink = '',
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === 'normal',
        [classes.solid]: variant === 'solid',
        [classes.outline]: variant === 'outline'
      },
      shadow == true && classes.shadow,
      inputClassName
    );

    return (
      <div className={className}>
        <div className="mb-3 flex items-center justify-between">
          <label
            htmlFor={name}
            className="text-sm font-semibold leading-none text-body-dark"
          >
            {label}
          </label>
        </div>
        <div className="relative">
          <input
            id={name}
            name={name}
            type={show ? 'text' : 'password'}
            ref={ref}
            className={rootClassName}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...rest}
          />
          {error && (
            <p className="my-2 text-start text-xs text-red-500">{error}</p>
          )}
          {forgotPageLink && forgotPassHelpText && (
            <div className="mt-1 flex justify-end">
              <Link
                href={forgotPageLink}
                className="text-sm text-gray-700 transition-colors duration-200 hover:text-accent-hover focus:font-semibold focus:text-accent-700 focus:outline-none"
              >
                {forgotPassHelpText}
              </Link>
            </div>
          )}
          <label
            htmlFor={name}
            className="absolute top-5 -mt-2 text-body end-4"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </label>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
