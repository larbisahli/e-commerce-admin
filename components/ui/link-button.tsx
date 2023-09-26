/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ArrowDown } from '@components/icons/arrow-down';
import useOnClickOutside from '@utils/use-click-outside';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

const classes = {
  root: 'inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded-sm outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow',
  normal:
    'bg-accent text-light border border-transparent hover:bg-accent-hover',
  outline:
    'border border-border-400 bg-transparent hover:text-light hover:bg-accent hover:border-accent',
  disabled:
    'border border-border-base bg-gray-300 border-border-400 text-body cursor-not-allowed',
  disabledOutline: 'border border-border-base text-muted cursor-not-allowed',
  small: 'px-3 py-0 h-9 text-sm h-10',
  medium: 'px-5 py-0 h-12',
  big: 'px-10 py-0 h-14'
};

export interface ButtonProps {
  className?: string;
  variant?: 'normal' | 'outline';
  size?: 'big' | 'medium' | 'small';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  children: React.ReactNode;
  params?: {
    name: string;
    param: string;
  }[];
}

const LinkButton: React.FC<NextLinkProps & ButtonProps> = ({
  href,
  children,
  className,
  variant = 'normal',
  size = 'medium',
  active,
  disabled = false,
  params = [],
  ...props
}) => {
  const [openParamDropdown, setOpenParamDropdown] = useState(false);

  const rootClassName = cn(classes.root, {
    [classes.normal]: !disabled && variant === 'normal',
    [classes.disabled]: disabled && variant === 'normal',
    [classes.outline]: !disabled && variant === 'outline',
    [classes.disabledOutline]: disabled && variant === 'outline',
    [classes.small]: size === 'small',
    [classes.medium]: size === 'medium',
    [classes.big]: size === 'big'
  });

  return (
    <div className={cn('relative flex justify-end ms-4 md:ms-6')}>
      <NextLink href={href}>
        <a {...props} className={cn(rootClassName, className)}>
          {children}
        </a>
      </NextLink>
      {!isEmpty(params) && (
        <RenderParamDropDown
          href={href}
          params={params}
          openParamDropdown={openParamDropdown}
          setOpenParamDropdown={setOpenParamDropdown}
        />
      )}
    </div>
  );
};

const RenderParamDropDown = ({
  href,
  params,
  openParamDropdown,
  setOpenParamDropdown
}) => {
  const ref = useRef(null);

  const handleClickOutside = () => {
    setOpenParamDropdown(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleButtonClick = () => {
    setOpenParamDropdown((prev) => !prev);
  };

  const handleLinkClick = () => {
    setOpenParamDropdown(false);
  };

  return (
    <div
      className={cn(
        'cursor-pointer bg-accent',
        'border border-transparent text-light hover:bg-accent-hover',
        'border !border-l border-r-0 border-b-0 border-t-0 border-white'
      )}
      ref={ref}
    >
      <button
        onClick={handleButtonClick}
        className="flex h-full items-center justify-center px-2"
      >
        <div
          className={cn('transition-all', {
            '!rotate-180 ': openParamDropdown
          })}
        >
          <ArrowDown width="22px" height="22px" />
        </div>
      </button>
      <div
        className={cn(
          'absolute right-0 left-0 top-full border bg-white transition-all',
          { hidden: !openParamDropdown }
        )}
      >
        <div className="flex flex-col">
          {params?.map(({ name, param }) => {
            return (
              <NextLink
                href={{
                  pathname: href as string,
                  query: { type: param }
                }}
                onClick={handleLinkClick}
                key={param}
              >
                <a
                  onClick={handleLinkClick}
                  className="w-full cursor-pointer border-b p-3 text-left
            text-sm text-gray-600 hover:bg-gray-200"
                >
                  {name}
                </a>
              </NextLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LinkButton;
