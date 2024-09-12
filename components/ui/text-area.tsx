import { QuestionMark } from '@components/icons/questionMark';
import cn from 'classnames';
import React, { ReactElement, TextareaHTMLAttributes } from 'react';
import { Tooltip } from 'react-tooltip';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  isRequiredLabel?: boolean;
  error?: string;
  note?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
  renderTooltip?: ReactElement;
}

const classes = {
  root: 'py-3 px-4 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  shadow: 'focus:shadow'
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const {
    className,
    label,
    name,
    error,
    variant = 'normal',
    isRequiredLabel = false,
    shadow = false,
    note,
    inputClassName,
    renderTooltip,
    ...rest
  } = props;

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

  const renderLabel = () => {
    if (!label) {
      return null;
    }

    return (
      <label className="block text-sm leading-none text-body-dark">
        {label}
        {isRequiredLabel && (
          <span title="Requited filed" className="m-[1px] text-red-500">
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
          id={`${name}-textarea-question`}
          className="form-tooltip"
          classNameArrow="form-tooltip-arrow"
        >
          {renderTooltip}
        </Tooltip>
        <div
          data-tooltip-id={`${name}-textarea-question`}
          className="mr-1 flex h-full cursor-pointer items-center pb-1"
        >
          <QuestionMark width="20" height="20" />
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        {renderLabel()}
        {renderInputTooltip()}
      </div>
      <textarea
        id={name}
        name={name}
        className={rootClassName}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        rows={4}
        ref={ref}
        {...rest}
      />
      {note && <p className="text-xs text-body">{note}</p>}
      {error && <p className="my-2 text-xs text-red-500">{error}</p>}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
