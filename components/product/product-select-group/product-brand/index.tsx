import { useQuery } from '@apollo/client';
import {
  Actions,
  useFormReducer
} from '@components/product/context/form.context';
import { BrandTooltipContent } from '@components/product/ToolTips';
// import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { BRANDS_FOR_SELECT } from '@graphql/brand';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import {
  BrandType,
  Category,
  LanguageType,
  OrderBy
} from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import React, { memo, useMemo } from 'react';

interface TBrandSelect {
  brandsForSelect: BrandType[];
}

interface Props {
  brands: BrandType[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  language: LanguageType;
  etag: string;
}

const ProductBrand = ({ brands }: Props) => {
  const { t } = useTranslation('common');

  const dispatch = useFormReducer();

  const { selectedLanguage } = useSettings();

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient();

  const { data, loading, error } = useQuery<TBrandSelect, OptionsVariable>(
    BRANDS_FOR_SELECT,
    {
      variables: {
        page: 1,
        limit: 999,
        orderBy: OrderBy.CREATED_AT,
        language: selectedLanguage,
        etag: etag?.brandEtag
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage) || isEmpty(etag)
    }
  );

  const { brandsForSelect = [] } = data ?? {};

  useErrorLogger(error);

  const onChange = (values: Category[]) => {
    dispatch({
      type: Actions.BRANDS,
      payload: {
        values
      }
    });
  };

  const options = useMemo(() => {
    return brandsForSelect?.map(({ id, name, translated }) => {
      return {
        id,
        name: name ?? translated?.name
      };
    });
  }, [brandsForSelect]);

  const brandValues = useMemo(() => {
    return brands?.map(({ id, name, translated }) => {
      return {
        id,
        name: name ?? translated?.name
      };
    });
  }, [brands]);

  return (
    <div className="mb-5">
      <Label
        openTooltipOnClick
        tooltipId="brand"
        renderTooltip={<BrandTooltipContent />}
      >
        {t('form:input-label-brands')}
      </Label>
      <Select
        options={options}
        value={brandValues}
        name="brands"
        isMulti
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        onChange={onChange}
        isLoading={loading}
      />
      {/* <ValidationError message={t(errors.categories?.message)} /> */}
    </div>
  );
};

export default memo(ProductBrand);
