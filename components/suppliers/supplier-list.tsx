import ActionButtons from '@components/common/action-buttons';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { CreatedUpdatedByAt, Suppliers } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { memo, useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  suppliers: Suppliers[];
  selectedColumns: string[];
  loading: boolean;
};

interface TableRowProps extends Suppliers {
  loading: boolean;
}

const SuppliersList = ({ loading, suppliers, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { alignLeft, alignRight } = useIsRTL();
  const { tablePlaceholderRow } = usePlaceholder();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-id'),
        dataIndex: 'id',
        key: 'id',
        align: alignLeft,
        width: 80,
        ellipsis: true
      },
      {
        title: t('table:table-item-name'),
        dataIndex: 'name',
        key: 'name',
        align: alignLeft,
        width: 180,
        ellipsis: true,
        render: (supplier_name: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span className="font-semibold capitalize text-gray-800">
              {supplier_name}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-company'),
        dataIndex: 'company',
        key: 'company',
        align: alignLeft,
        width: 200,
        ellipsis: true,
        render: (company: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span title={company} className="capitalize text-gray-800">
              {company}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-phone'),
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        align: alignLeft,
        width: 200,
        ellipsis: true,
        render: (phoneNumber: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span
              title={`+${phoneNumber}`}
              className="capitalize text-gray-800"
            >
              {`+${phoneNumber}`}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: alignLeft,
        width: 190,
        render: (
          createdAt: CreatedUpdatedByAt['updatedAt'],
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
        width: 140,
        render: (id: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <ActionButtons
              id={id}
              editUrl={`${router.asPath}/edit/${id}`}
              deleteModalView="DELETE_SUPPLIER"
            />
          );
        }
      }
    ];
  }, [alignLeft, router.asPath, t]);

  const tableColumns = useMemo(() => {
    return columns?.filter(({ key }) => {
      return (
        key === 'id' || selectedColumns?.some((columnKey) => columnKey === key)
      );
    });
  }, [columns, selectedColumns]);

  return (
    <Table
      // @ts-ignore
      columns={tableColumns}
      emptyText={t('table:empty-table-data')}
      data={loading ? tablePlaceholderRow : suppliers}
      rowKey="id"
      scroll={{ x: 380 }}
      className="mb-6 overflow-hidden border"
    />
  );
};

export default memo(SuppliersList);
