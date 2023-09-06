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
      <div className={cn('rounded border p-3', className)}>
        {label && (
          <label
            htmlFor={name}
            className={cn('block text-base leading-none text-gray-700', {
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
          className="w-full py-1 text-lg font-medium text-gray-600 outline-none"
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
