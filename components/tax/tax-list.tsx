import ActionButtons from '@components/common/action-buttons';
import Badge from '@components/ui/badge/badge';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { CreatedUpdatedByAt, TaxType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

export type IProps = {
  taxes: TaxType[];
  selectedColumns: string[];
  loading: boolean;
};

interface TableRowProps extends TaxType {
  loading: boolean;
}

const TaxList = ({ loading, taxes, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const { tablePlaceholderRow } = usePlaceholder();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-name'),
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        width: 150,
        render: (name: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return name;
        }
      },
      {
        title: t('table:table-item-tax-rate'),
        dataIndex: 'rate',
        key: 'rate',
        align: alignLeft,
        width: 250,
        ellipsis: true,
        render: (taxRate: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return taxRate;
        }
      },
      {
        title: t('table:table-item-status'),
        dataIndex: 'isDefault',
        key: 'isDefault',
        align: 'center',
        width: 120,
        ellipsis: true,
        render: (isDefault: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          if (isDefault) {
            return (
              <Badge
                className="!text-sm !text-gray-600"
                text={'Default'}
                color={'bg-green-200'}
              />
            );
          }
          return null;
        }
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: alignLeft,
        width: 180,
        render: (
          createdAt: CreatedUpdatedByAt['createdAt'],
          record: TableRowProps
        ) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return `${dayjs(createdAt).format('MMM D, YYYY')} at ${dayjs(
            createdAt
          ).format('h:mm A')}`;
        }
      },
      {
        title: t('table:table-item-created-by'),
        dataIndex: 'createdBy',
        key: 'createdBy',
        align: alignLeft,
        width: 150,
        ellipsis: true,
        render: (
          createdBy: CreatedUpdatedByAt['createdBy'],
          record: TableRowProps
        ) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <ProfileCart user={createdBy} createdAt={record?.createdAt} />;
        }
      },
      {
        title: t('table:table-item-updated-by'),
        dataIndex: 'updatedBy',
        key: 'updatedBy',
        align: alignLeft,
        width: 150,
        ellipsis: true,
        render: (
          updatedBy: CreatedUpdatedByAt['updatedBy'],
          record: TableRowProps
        ) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <ProfileCart user={updatedBy} updatedAt={record?.updatedAt} />;
        }
      },
      {
        title: t('table:table-item-actions'),
        dataIndex: 'id',
        key: 'actions',
        align: 'center',
        width: 150,
        render: (id: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <ActionButtons
              id={id}
              editUrl={`${ROUTES.TAX}/edit/${id}`}
              deleteModalView="DELETE_TAX"
            />
          );
        }
      }
    ];
  }, [alignLeft, t]);

  const tableColumns = useMemo(() => {
    return columns?.filter(({ key }) => {
      return (
        key === 'id' || selectedColumns?.some((columnKey) => columnKey === key)
      );
    });
  }, [columns, selectedColumns]);

  return (
    <Table
      //@ts-ignore
      columns={tableColumns}
      emptyText={t('table:empty-table-data')}
      data={loading ? tablePlaceholderRow : taxes}
      rowKey="id"
      scroll={{ x: 800 }}
      className="card mb-6 overflow-hidden"
    />
  );
};

export default TaxList;
