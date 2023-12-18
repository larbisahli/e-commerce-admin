import EditIcon from '@components/icons/edit';
import Trash from '@components/icons/trash';
import Loader from '@components/ui/loader/loader';
import { useModalAction } from '@components/ui/modal/modal.context';
import { TAX_MODAL } from '@ts-types/constants';
import { TaxCountryType, TaxType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

export type IProps = {
  taxedCountries: TaxType[];
  setState: any;
};

const TaxCountryList = ({ taxedCountries, setState }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const { openModal } = useModalAction();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-country'),
        dataIndex: 'name',
        key: 'name',
        align: alignLeft,
        width: 80,
        ellipsis: true
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
        title: t('table:table-item-applies-to'),
        dataIndex: 'appliesTo',
        key: 'appliesTo',
        align: alignLeft,
        width: 80,
        ellipsis: true,
        render: (appliesTo: TaxCountryType['appliesTo']) => {
          return appliesTo?.entireCountry
            ? 'Entire Country'
            : appliesTo?.zipCode;
        }
      },
      {
        title: t('table:table-item-actions'),
        dataIndex: 'iso2',
        key: 'actions',
        width: 80,
        render: (iso2: string) => {
          const handleClick = (e) => {
            e.preventDefault();
            openModal(TAX_MODAL, TAX_MODAL, { iso2, action: 'add' });
          };
          const handleDelete = (e) => {
            e.preventDefault();
            setState((prev) => {
              return {
                ...prev,
                countries: prev.countries?.filter((v) => v.iso2 !== iso2)
              };
            });
          };
          return (
            <div className="flex w-full items-center justify-center">
              <button
                onClick={handleClick}
                className="flex h-9 w-9 items-center justify-center rounded-sm border text-base text-gray-500 transition duration-200 hover:text-blue-600 hover:shadow-xl"
              >
                <EditIcon width={16} />
              </button>
              <button
                onClick={handleDelete}
                data-tooltip-id="actions-tooltip"
                data-tooltip-content={t('text-delete')}
                className="ml-2 flex h-9 w-9 items-center justify-center rounded-sm border text-gray-500 transition duration-200 hover:text-red-600 hover:shadow-xl focus:outline-none"
              >
                <Trash width={16} />
              </button>
            </div>
          );
        }
      }
    ];
  }, [alignLeft, openModal, setState, t]);

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
