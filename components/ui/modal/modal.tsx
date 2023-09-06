import { CloseIcon } from '@components/icons/close-icon';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef } from 'react';

export default function Modal({ open, onClose, children }: any) {
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
            enter="ease-out duration-300"
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
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="min-w-content relative inline-block max-w-full overflow-hidden text-start align-middle transition-all md:rounded-md">
              <button
                onClick={onClose}
                aria-label="Close panel"
                ref={cancelButtonRef}
                className="absolute top-4 z-[60] inline-block rounded-sm bg-red-600 text-white shadow outline-none end-4 focus:outline-none"
              >
                <CloseIcon className="h-7 w-7" />
              </button>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
