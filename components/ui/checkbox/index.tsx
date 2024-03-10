import { QuestionMark } from '@components/icons/questionMark';
import React, { InputHTMLAttributes, ReactElement } from 'react';
import { Tooltip } from 'react-tooltip';

import styles from './checkbox.module.css';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  error?: string;
  inputClassName?: string;
  labelClassName?: string;
  onMouseLeaveTopLevel?: () => void;
  renderTooltip?: ReactElement;
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
      renderTooltip,
      onMouseLeaveTopLevel,
      ...rest
    },
    ref
  ) => {
    const renderInputTooltip = () => {
      if (!renderTooltip) {
        return null;
      }

      return (
        <div>
          <Tooltip
            id={`${name}-textarea-question`}
            className="form-tooltip"
            classNameArrow="form-tooltip-arrow"
          >
            {renderTooltip}
          </Tooltip>
          <div
            data-tooltip-id={`${name}-textarea-question`}
            className="flex h-full cursor-pointer items-center"
          >
            <QuestionMark width="20" height="20" />
          </div>
        </div>
      );
    };

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
          <div className="px-2">{renderInputTooltip()}</div>
        </div>

        {error && <p className="my-2 text-end text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
