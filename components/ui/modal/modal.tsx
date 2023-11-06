import { CloseIcon } from '@components/icons/close-icon';
import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';
import { Fragment, useEffect, useRef } from 'react';

export default function Modal({
  open,
  onClose,
  children,
  align = 'center'
}: any) {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (!open) {
      document.documentElement.style.paddingRight = '0px';
      document.documentElement.style.overflow = 'auto';
    }
  }, [open]);

  return (
    <Transition show={open} as={Fragment}>
      {/* @ts-ignore */}
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        unmount={false}
        open={open}
        onClose={onClose}
      >
        <div className="min-h-full text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 h-full w-full bg-gray-900 bg-opacity-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className={cn(
              align === 'right' &&
                'align-right absolute right-0 inline-block h-screen',
              align === 'center' && 'inline-block h-screen align-middle'
            )}
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter={
              align === 'center'
                ? 'ease-out duration-300'
                : 'duration-100 translate-x-full'
            }
            enterFrom={
              align === 'center'
                ? 'opacity-0 scale-95'
                : 'opacity-0 translate-x-0'
            }
            enterTo={
              align === 'center'
                ? 'opacity-100 scale-100'
                : 'opacity-100 translate-x-full'
            }
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={cn(
                'min-w-content inline-block max-w-full overflow-hidden bg-white text-start transition-all md:rounded-sm',
                align === 'center' && 'relative align-middle',
                align === 'right' && 'absolute top-0 bottom-0 right-0 '
              )}
            >
              <button
                onClick={onClose}
                aria-label="Close panel"
                ref={cancelButtonRef}
                className="absolute top-4 z-[60] inline-block rounded-sm
                border bg-white text-red-600 shadow outline-none
                end-4 hover:bg-red-400 hover:text-white focus:outline-none"
              >
                <CloseIcon className="h-7 w-7" />
              </button>
              <div
                className={cn(
                  'h-[100vh] overflow-y-auto',
                  align === 'center' && 'md:h-fit',
                  align === 'right' && ''
                )}
              >
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
