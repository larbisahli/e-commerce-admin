import ActionButtons from '@components/common/action-buttons';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { Category, CreatedUpdatedByAt } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
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
  categories: Category[];
  selectedColumns: string[];
  loading: boolean;
};

interface TableRowProps extends Category {
  loading: boolean;
}

const CategoryList = ({ loading, categories, selectedColumns }: IProps) => {
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
        width: 50,
        ellipsis: true
      },
      {
        title: t('table:table-item-title'),
        dataIndex: 'name',
        key: 'name',
        align: alignLeft,
        width: 200,
        ellipsis: true,
        render: (name: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span
              className={cn('font-semibold capitalize text-gray-800', {
                'pl-3': record?.level === 2,
                'pl-6': record?.level === 3,
                'font-medium text-gray-600': record?.level !== 1
              })}
            >
              {name ?? record?.translated?.name ?? 'N/A'}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-menu'),
        dataIndex: 'includeInMenu',
        key: 'includeInMenu',
        align: 'center',
        width: 120,
        ellipsis: true,
        render: (includeInMenu: boolean, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <span>{includeInMenu ? 'Yes' : 'No'}</span>;
        }
      },
      {
        title: t('table:table-item-level'),
        dataIndex: 'level',
        key: 'level',
        align: 'center',
        width: 80,
        render: (level: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return level;
        }
      },
      {
        title: t('table:table-item-position'),
        dataIndex: 'position',
        key: 'position',
        align: 'center',
        width: 80,
        render: (position: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return position;
        }
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: alignLeft,
        width: 200,
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
        width: 140,
        render: (id: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <ActionButtons id={id} editUrl={`${ROUTES.CATEGORY}/edit/${id}`} />
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
      data={loading ? tablePlaceholderRow : categories}
      rowKey={(record) => record.id}
      key="id"
      scroll={{ x: 800 }}
      expandable={{
        expandedRowRender: () => <></>,
        rowExpandable: (record: Category) => !isEmpty(record?.children)
      }}
      className="card mb-6 overflow-hidden"
    />
  );
};

export default CategoryList;
