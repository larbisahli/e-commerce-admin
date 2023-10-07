import ActionButtons from '@components/common/action-buttons';
import EditIcon from '@components/icons/edit';
import Loader from '@components/ui/loader/loader';
import { TaxType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

export type IProps = {
  taxedCountries: TaxType[];
};

const TaxCountryList = ({ taxedCountries }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-country'),
        dataIndex: 'countryName',
        key: 'countryName',
        align: alignLeft,
        width: 80,
        ellipsis: true,
        render: (countryName: string) => {
          return countryName;
        }
      },
      {
        title: t('table:table-item-applies-to'),
        dataIndex: 'appliesTo',
        key: 'appliesTo',
        align: alignLeft,
        width: 80,
        ellipsis: true,
        render: () => {
          return 'Entire Country';
        }
      },
      {
        title: t('table:table-item-tax-rate'),
        dataIndex: 'rate',
        key: 'rate',
        align: alignLeft,
        width: 50,
        ellipsis: true,
        render: (taxRate: string) => {
          return `${taxRate}%`;
        }
      },
      {
        title: t('table:table-item-actions'),
        dataIndex: 'id',
        key: 'actions',
        align: 'center',
        width: 80,
        render: (id: string) => {
          return (
            <button className="flex h-9 w-9 items-center justify-center rounded-sm border text-base text-gray-500 transition duration-200 hover:text-blue-600 hover:shadow-xl">
              <EditIcon width={16} />
            </button>
          );
        }
      }
    ];
  }, [alignLeft, t]);

  return (
    <Table
      //@ts-ignore
      columns={columns}
      emptyText={t('table:empty-table-data')}
      data={taxedCountries}
      rowKey="id"
      className="card mb-6 overflow-hidden"
    />
  );
};

export default TaxCountryList;
