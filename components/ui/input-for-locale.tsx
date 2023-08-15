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
      <div className={cn('border rounded p-3', className)}>
        {label && (
          <label
            htmlFor={name}
            className={cn('block text-gray-800 text-sm leading-none', {
              'text-gray-300': disabled
            })}
          >
            {label}
          </label>
        )}
        <input
          id={id ?? name}
          name={name}
          type={type}
          ref={ref}
          className="w-full outline-none py-1 font-medium text-lg"
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
          <p className="my-2 text-xs text-start text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

InputForLocal.displayName = 'InputForLocal';

export default InputForLocal;
