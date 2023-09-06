import React, { InputHTMLAttributes } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './radio-card.module.css';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  labelKey?: string;
  name: string;
  id: string;
  error?: string;
  errorKey?: string;
}

const RadioCard = React.forwardRef<HTMLInputElement, Props>(
  (
    { className, label, labelKey, name, id, src, error, errorKey, ...rest },
    ref
  ) => {
    const { t } = useTranslation();
    return (
      <div className={className}>
        <div className="flex h-full w-full">
          <input
            id={id}
            name={name}
            type="radio"
            ref={ref}
            className={styles.radio_input}
            {...rest}
          />

          <label
            htmlFor={id}
            className="flex w-full cursor-pointer flex-col rounded border border-gray-200"
          >
            <div className="flex max-h-72 w-full items-center justify-center overflow-hidden p-3 pb-0">
              <img
                src={src ?? '/product-placeholder-borderless.svg'}
                alt={t(labelKey ? labelKey : label!)}
                className="h-full w-auto object-contain"
              />
            </div>

            <h3 className="mt-auto p-5 text-center text-sm font-semibold text-body">
              <span>{t(labelKey ? labelKey : label!)}</span>
            </h3>
          </label>
        </div>

        {errorKey && (
          <p className="my-2 text-start text-xs text-red-500">{t(errorKey)}</p>
        )}
      </div>
    );
  }
);

export default RadioCard;
