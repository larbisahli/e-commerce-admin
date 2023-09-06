// import InfoSvg from '@components/icons/info';
// import InfoSlug from '@components/icons/slug-info';
// import { Popover, Transition } from '@headlessui/react';
import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  note?: string;
  name: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
}
const classes = {
  root: 'h-12 flex items-center justify-between w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  shadow: 'focus:shadow'
};
const InputSlug = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      name,
      error,
      variant = 'normal',
      shadow = false,
      type = 'text',
      inputClassName,
      id,
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

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className="mb-3 block text-sm font-semibold leading-none text-body-dark"
          >
            {label}
          </label>
        )}
        <div className={rootClassName}>
          <input
            id={id ?? name}
            name={name}
            type={type}
            ref={ref}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            className="h-full w-full px-4 outline-none"
            aria-invalid={error ? 'true' : 'false'}
            {...rest}
          />
          <div className="relative flex items-center justify-center">
            <span className="pr-3 text-accent">.dropgala.com</span>
            {/* <div className="pr-3 text-gray-500">
              <PopoverInfo />
            </div> */}
          </div>
        </div>
        {error && (
          <p className="my-2 text-start text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

InputSlug.displayName = 'InputSlug';

// function PopoverInfo() {
//   return (
//     <Popover className="relative">
//       <Popover.Button className="outline-none">
//         <InfoSvg width="1.3rem" height="1.3rem" />
//       </Popover.Button>
//       <Transition
//         as={React.Fragment}
//         enter="transition ease-out duration-200"
//         enterFrom="opacity-0 translate-y-1"
//         enterTo="opacity-100 translate-y-0"
//         leave="transition ease-in duration-150"
//         leaveFrom="opacity-100 translate-y-0"
//         leaveTo="opacity-0 translate-y-1"
//       >
//         <Popover.Panel className="absolute top-full z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl left-[-160px]">
//           <div className="overflow-hidden rounded shadow-lg border ring-1 ring-black ring-opacity-5">
//             <InfoSlug />
//           </div>
//         </Popover.Panel>
//       </Transition>
//     </Popover>
//   );
// }

export default InputSlug;
