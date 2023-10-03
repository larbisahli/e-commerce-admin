import { notify } from '@lib/index';
import { sentry } from '@lib/sentry';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';

export function useErrorLogger(error?: any, isVisible: boolean = true) {
  useEffect(() => {
    if (!isEmpty(error)) {
      // Sentry Logs
      sentry(error);
      // Error Notification
      if (isVisible) {
        error?.graphQLErrors?.forEach((err) => {
          notify(err.message ?? 'Something happened', 'error');
        });
      }
    }
  }, [error, isVisible]);
}
