import { QuestionMark } from '@components/icons/questionMark';
import cn from 'classnames';
import React, { InputHTMLAttributes, ReactElement } from 'react';
import { Tooltip } from 'react-tooltip';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  note?: string;
  name: string;
  error?: string;
  isRequiredLabel?: boolean;
  disabled?: boolean;
  type?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline' | 'custom';
  renderLabel?: ReactElement;
  renderTooltip?: ReactElement;
}
const classes = {
  root: 'px-4 h-12 flex items-center w-full rounded appearance-none transition  duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  shadow: 'focus:shadow'
};
const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      note,
      name,
      error,
      children,
      isRequiredLabel = false,
      variant = 'normal',
      shadow = false,
      disabled = false,
      type = 'text',
      inputClassName,
      id,
      renderLabel = null,
      renderTooltip,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === 'normal',
        [classes.solid]: variant === 'solid',
        [classes.outline]: variant === 'outline'
      },
      {
        [classes.shadow]: shadow
      },
      inputClassName
    );

    const renderTitle = () => {
      if (!label) {
        return null;
      }

      return (
        <label
          htmlFor={name}
          className={cn(
            'mb-2 block text-sm font-semibold leading-none text-body-dark',
            { 'text-gray-300': disabled }
          )}
        >
          {label}
          {isRequiredLabel && (
            <span title="Required filed" className="m-[1px] text-blue-500">
              *
            </span>
          )}
        </label>
      );
    };

    const renderInputTooltip = () => {
      if (!renderTooltip) {
        return null;
      }

      return (
        <div>
          <Tooltip
            id={`${name}-input-question`}
            className="form-tooltip"
            classNameArrow="form-tooltip-arrow"
          >
            {renderTooltip}
          </Tooltip>
          <div
            data-tooltip-id={`${name}-input-question`}
            className="mr-1 flex h-full cursor-pointer items-center pb-1"
          >
            <QuestionMark width="20" height="20" />
          </div>
        </div>
      );
    };

    return (
      <div className={cn('relative', className)}>
        <div className="flex items-center justify-between">
          {renderTitle()}
          {renderInputTooltip()}
        </div>
        <input
          id={id ?? name}
          name={name}
          type={type}
          ref={ref}
          className={cn(rootClassName, renderLabel && 'pr-11', {
            'text-gray-300': disabled
          })}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-invalid={error ? 'true' : 'false'}
          disabled={disabled}
          {...rest}
        />
        {renderLabel && (
          <div className="absolute right-0 bottom-0 flex h-12 w-12 items-center justify-center rounded-r border border-border-base bg-gray-100">
            <span className="text-gray-600">{renderLabel}</span>
          </div>
        )}
        {note && <p className="mt-2 text-xs text-body">{note}</p>}
        {error && (
          <p className="my-2 text-start text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
