import ActionButtons from '@components/common/action-buttons';
import Badge from '@components/ui/badge/badge';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { usePlaceholder } from '@hooks/usePlaceholder';
import {
  Category,
  CreatedUpdatedByAt,
  CustomerType
} from '@ts-types/generated';
import { formatAddress } from '@utils/format-address';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

export type IProps = {
  customers: CustomerType[];
  selectedColumns: string[];
  loading: boolean;
};

interface TableRowProps extends Category {
  loading: boolean;
}

const CustomerList = ({ loading, customers, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

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
        title: t('table:table-item-fullname'),
        dataIndex: 'fullName',
        key: 'fullName',
        align: 'center',
        width: 140,
        ellipsis: true,
        render: (fullName: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <span>{fullName}</span>;
        }
      },
      {
        title: t('table:table-item-address'),
        dataIndex: 'address',
        key: 'address',
        align: 'center',
        width: 250,
        render: (address: CustomerType['address'], record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return formatAddress(address);
        }
      },
      {
        title: t('table:table-item-phone'),
        dataIndex: 'address',
        key: 'phoneNumber',
        align: 'center',
        width: 130,
        render: (address: CustomerType['address'], record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return address?.phoneNumber;
        }
      },
      {
        title: t('table:table-item-email'),
        dataIndex: 'address',
        key: 'email',
        align: 'center',
        width: 200,
        render: (address: CustomerType['address'], record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return address?.email;
        }
      },
      {
        title: t('table:table-item-marketing_opt_in'),
        dataIndex: 'marketingOptIn',
        key: 'marketingOptIn',
        align: 'center',
        width: 150,
        render: (marketingOptIn: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <Badge
              className="!text-sm !text-gray-600"
              text={marketingOptIn ? 'Yes' : 'No'}
              color="bg-gray-100"
            />
          );
        }
      },
      {
        title: t('table:table-item-register-at'),
        dataIndex: 'registeredAt',
        key: 'registeredAt',
        align: alignLeft,
        width: 200,
        render: (
          registeredAt: CreatedUpdatedByAt['createdAt'],
          record: TableRowProps
        ) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return `${dayjs(registeredAt).format('MMM D, YYYY')} at ${dayjs(
            registeredAt
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
              deleteModalView="DELETE_ATTRIBUTE"
              editUrl={`${ROUTES.CATEGORY}/edit/${id}`}
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
      data={loading ? tablePlaceholderRow : customers}
      rowKey={(record) => record.id}
      key="id"
      scroll={{ x: 800 }}
      expandable={{
        expandedRowRender: () => <></>,
        rowExpandable: (record: Category) => !isEmpty(record?.children)
      }}
      className="mb-6 overflow-hidden border"
    />
  );
};

export default CustomerList;
