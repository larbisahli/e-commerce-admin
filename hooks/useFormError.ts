import { notify } from '@lib/index';
import { isObject } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

export function useFormError(errors?: any, show: boolean = true) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isEmpty(errors)) {
      // Error Notification
      if (show) {
        const key = Object.keys(errors)[0];
        if (!key) return;
        if (key === 'productSeo') {
          Object.keys(errors['productSeo'])?.forEach((key_2) => {
            notify(t(errors['productSeo'][key_2]?.message), 'error');
          });
        }
        notify(t(errors[key]?.message), 'error');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, show]);
}
