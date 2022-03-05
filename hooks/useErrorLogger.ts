import { notify } from '@lib/index';
import { sentry } from '@lib/sentry';
import _ from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

export function useErrorLogger(error?: any) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!_.isEmpty(error)) {
      // Sentry Logs
      sentry(error);
      // Error Notification
      error?.graphQLErrors?.forEach((err) => {
        notify(t(`error:${err.t ?? 'SOMETHING-HAPPENED'}`), 'error');
      });
    }
  }, [error]);
}
