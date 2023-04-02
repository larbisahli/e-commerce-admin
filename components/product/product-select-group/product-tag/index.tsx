import { useQuery } from '@apollo/client';
import {
  Actions,
  useFormReducer
} from '@components/product/context/form.context';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { TAGS_FOR_SELECT } from '@graphql/tag';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { OrderBy, Tag } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';

interface Props {
  tags: Tag[];
  setInitProductTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

interface TagSelect {
  tagSelect: Tag[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
}

const ProductTag = ({ tags, setInitProductTags }: Props) => {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const { data, loading, error } = useQuery<TagSelect, OptionsVariable>(
    TAGS_FOR_SELECT,
    {
      variables: {
        page: 1,
        limit: 999,
        orderBy: OrderBy.CREATED_AT
      },
      fetchPolicy: 'cache-and-network'
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
