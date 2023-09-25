import { useQuery } from '@apollo/client';
import {
  Actions,
  useFormReducer
} from '@components/product/context/form.context';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { TAGS_FOR_SELECT } from '@graphql/tag';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { LanguageType, OrderBy, Tag } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';

interface Props {
  tags: Tag[];
}

interface TagSelect {
  tagSelect: Tag[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  language: LanguageType;
}

const ProductTag = ({ tags }: Props) => {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TagSelect, OptionsVariable>(
    TAGS_FOR_SELECT,
    {
      variables: {
        page: 1,
        limit: 999,
        orderBy: OrderBy.CREATED_AT,
        language: selectedLanguage
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage)
    }
  );

  const { tagSelect: options = [] } = data ?? {};

  useErrorLogger(error);

  const onChange = (values: Tag[]) => {
    dispatch({
      type: Actions.TAGS,
      payload: {
        values
      }
    });
  };

  return (
    <div>
      <Label>{t('sidebar-nav-item-tags')}</Label>
      <Select
        options={options}
        value={tags}
        name="tags"
        isMulti
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        onChange={onChange}
        isLoading={loading}
      />
    </div>
  );
};

export default memo(ProductTag);
