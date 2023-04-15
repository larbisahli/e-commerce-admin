import { notify } from '@lib/index';
import { sentry } from '@lib/sentry';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

export function useErrorLogger(error?: any, isVisible: boolean = true) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isEmpty(error)) {
      console.log({error})
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
