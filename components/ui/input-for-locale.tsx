import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  note?: string;
  name: string;
  error?: string;
  disabled?: boolean;
  type?: string;
}

const InputForLocal = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      note,
      name,
      error,
      disabled = false,
      type = 'text',
      id,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={cn('relative rounded border pb-3', className)}>
        {label && (
          <label
            htmlFor={name}
            className={cn(
              'absolute right-0 left-0 top-[-8px] block w-full text-base leading-none text-gray-700',
              {
                'text-gray-300': disabled
              }
            )}
          >
            <span className="z-10 mx-3 bg-white px-1">{label}</span>
          </label>
        )}
        <input
          id={id ?? name}
          name={name}
          type={type}
          ref={ref}
          className="w-full px-3 pb-1 pt-5 text-lg font-medium text-gray-600 outline-none"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-invalid={error ? 'true' : 'false'}
          disabled={disabled}
          {...rest}
        />
        {note && <p className="mt-2 text-xs text-body">{note}</p>}
        {error && (
          <p className="my-2 text-start text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

InputForLocal.displayName = 'InputForLocal';

export default InputForLocal;
