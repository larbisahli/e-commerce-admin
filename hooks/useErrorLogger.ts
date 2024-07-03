import { notify } from '@lib/index';
import { sentry } from '@lib/sentry';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useErrorLogger(error?: any, isVisible: boolean = true) {
  const router = useRouter();
  useEffect(() => {
    if (!isEmpty(error)) {
      // Sentry Logs
      sentry(error);
      // Error Notification
      if (isVisible) {
        if (error?.networkError?.statusCode === 403) {
          router.reload();
        }
        error?.graphQLErrors?.forEach((err) => {
          notify(err.message ?? 'Something happened', 'error');
        });
      }
    }
  }, [error, isVisible, router]);
}
