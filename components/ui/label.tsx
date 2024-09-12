import { QuestionMark } from '@components/icons/questionMark';
import cn from 'classnames';
import React, { LabelHTMLAttributes, ReactElement } from 'react';
import { Tooltip } from 'react-tooltip';

export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  isRequiredLabel?: boolean;
  renderTooltip?: ReactElement;
  openTooltipOnClick?: boolean;
  tooltipId?: string;
  spaceBetween?: boolean;
}

const Label: React.FC<Props> = ({
  className,
  isRequiredLabel = false,
  children,
  renderTooltip,
  openTooltipOnClick = false,
  tooltipId = '',
  spaceBetween = true,
  ...rest
}) => {
  const renderLabel = () => {
    return (
      <label
        className={cn('block text-sm leading-none text-gray-700', className)}
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

  const renderInputTooltip = () => {
    if (!renderTooltip) {
      return null;
    }

    return (
      <div className="ml-3">
        <Tooltip
          id={`${tooltipId}-input-question`}
          className="form-tooltip"
          openOnClick={openTooltipOnClick}
          classNameArrow="form-tooltip-arrow"
        >
          {renderTooltip}
        </Tooltip>
        <div
          data-tooltip-id={`${tooltipId}-input-question`}
          className="mr-1 flex h-full cursor-pointer items-center pb-1"
        >
          <QuestionMark width="20" height="20" />
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn('mb-2 flex items-center', {
        'justify-between': spaceBetween
      })}
    >
      {renderLabel()}
      {renderInputTooltip()}
    </div>
  );
};

export default Label;
