import { useQuery } from '@apollo/client';
import Loader from '@components/ui/loader/loader';
import { useModalState } from '@components/ui/modal/modal.context';
import { GET_STORE_LAYOUT } from '@graphql/content';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { LanguageProps } from '@ts-types/custom.types';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { memo } from 'react';

import NewPageForm from './form';

interface TLayoutPage {
  getLayoutPage: any;
}
interface OptionsVariable extends LanguageProps {
  id: string;
}

const NewPageModal = () => {
  const { meta } = useModalState();

  const layout = meta?.layout;

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TLayoutPage, OptionsVariable>(
    GET_STORE_LAYOUT,
    {
      variables: {
        id: layout?.id,
        language: selectedLanguage
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage) || !layout?.id
    }
  );

  const { getLayoutPage = {} } = data ?? {};

  useErrorLogger(error);

  return (
    <div className="relative flex h-[70vh] w-[70vw] flex-col">
      <div className="border-b border-gray-200 bg-gray-50 p-8 text-base font-light capitalize text-gray-800"></div>
      <div className={classNames('h-full w-full overflow-auto p-8 pb-5')}>
        {loading && (
          <div className="absolute top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center">
            <Loader special />
          </div>
        )}
        {!loading && <NewPageForm initialValue={getLayoutPage} />}
      </div>
    </div>
  );
};

export default memo(NewPageModal);
