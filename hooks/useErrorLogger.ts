import { notify } from '@lib/index';
import { sentry } from '@lib/sentry';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

export function useErrorLogger(error?: any, show:boolean = true) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isEmpty(error)) {
      // Sentry Logs
      sentry(error);
      // Error Notification
      if(show){
        error?.graphQLErrors?.forEach((err) => {
          notify(t(`error:${err.t ?? 'SOMETHING-HAPPENED'}`), 'error');
        });
      }
    }
  }, [error]);
}
