import { useTranslation } from 'next-i18next';

import Loader from '../loader/loader';

export const MediaItemPlaceholder = ({
  loader = false
}: {
  loader?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-fit flex-col items-center">
      <div
        className="animated-background flex h-40 w-48 items-center justify-center
       rounded-sm border"
      >
        {loader && <Loader special text={t('common:text-loading')} />}
      </div>
      <div className="animated-background mt-2 flex h-4 w-24 rounded-sm"></div>
    </div>
  );
};
