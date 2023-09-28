import { useQuery } from '@apollo/client';
import {
  Actions,
  useFormReducer
} from '@components/product/context/form.context';
import { ManufacturerTooltipContent } from '@components/product/ToolTips';
// import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { MANUFACTURERS_FOR_SELECT } from '@graphql/manufacturer';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import {
  Category,
  LanguageType,
  ManufacturerType,
  OrderBy
} from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import React, { memo, useMemo } from 'react';

interface TManufacturerSelect {
  manufacturersForSelect: ManufacturerType[];
}

interface Props {
  manufacturers: ManufacturerType[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  language: LanguageType;
}

const ProductManufacturer = ({ manufacturers }: Props) => {
  const { t } = useTranslation('common');

  const dispatch = useFormReducer();

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<
    TManufacturerSelect,
    OptionsVariable
  >(MANUFACTURERS_FOR_SELECT, {
    variables: {
      page: 1,
      limit: 999,
      orderBy: OrderBy.CREATED_AT,
      language: selectedLanguage
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage)
  });

  const { manufacturersForSelect = [] } = data ?? {};

  useErrorLogger(error);

  const onChange = (values: Category[]) => {
    dispatch({
      type: Actions.MANUFACTURERS,
      payload: {
        values
      }
    });
  };

  const options = useMemo(() => {
    return manufacturersForSelect?.map(({ id, name, translated }) => {
      return {
        id,
        name: name ?? translated?.name
      };
    });
  }, [manufacturersForSelect]);

  const manufacturerValues = useMemo(() => {
    return manufacturers?.map(({ id, name, translated }) => {
      return {
        id,
        name: name ?? translated?.name
      };
    });
  }, [manufacturers]);

  return (
    <div className="mb-5">
      <Label
        openTooltipOnClick
        tooltipId="manufacturer"
        renderTooltip={<ManufacturerTooltipContent />}
      >
        {t('form:input-label-manufacturers')}
      </Label>
      <Select
        options={options}
        value={manufacturerValues}
        name="manufacturers"
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

export default memo(ProductManufacturer);
