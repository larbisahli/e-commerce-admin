import { toast, ToastPosition } from 'react-toastify';

interface OptionsType {
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: any;
}

type Type = 'success' | 'error' | 'info' | 'warning';

/** types: success | error | info | warning */
export function notify(
  Message: string,
  type: Type,
  options?: OptionsType
): void {
  const Options: OptionsType = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options
  };

  switch (type) {
    case 'success':
      toast.success(Message, Options);
      break;
    case 'error':
      toast.error(Message, Options);
      break;
    case 'info':
      toast.info(Message, Options);
      break;
    case 'warning':
      toast.warning(Message, Options);
      break;
    default:
      break;
  }
}
