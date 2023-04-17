import ActionButtons from '@components/common/action-buttons';
import ProfileCart from '@components/ui/profile-card';
import { Table } from '@components/ui/table';
import { Category, CreatedUpdatedByAt } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

export type IProps = {
  categories: Category[];
  selectedColumns: string[];
};

const CategoryList = ({ categories, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

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
        render: (name: string, record: Category) => {
          return (
            <span
              className={cn('font-semibold text-gray-800 capitalize', {
                'pl-3': record?.level === 2,
                'pl-6': record?.level === 3,
                'text-gray-600 font-medium': record?.level !== 1
              })}
            >
              {name}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-details'),
        dataIndex: 'description',
        key: 'description',
        align: alignLeft,
        width: 150,
        ellipsis: true
      },
      {
        title: t('table:table-item-include-in-menu'),
        dataIndex: 'includeInMenu',
        key: 'includeInMenu',
        align: alignLeft,
        width: 150,
        ellipsis: true,
        render: (includeInMenu: boolean) => {
          return <span>{includeInMenu ? 'Yes' : 'No'}</span>;
        }
      },
      {
        title: t('table:table-item-level'),
        dataIndex: 'level',
        key: 'level',
        align: 'center',
        width: 80
      },
      {
        title: t('table:table-item-position'),
        dataIndex: 'position',
        key: 'position',
        align: 'center',
        width: 80
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: alignLeft,
        width: 180,
        render: (createdAt: CreatedUpdatedByAt['createdAt']) => {
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
        width: 140,
        ellipsis: true,
        render: (
          createdBy: CreatedUpdatedByAt['createdBy'],
          record: Category
        ) => {
          return <ProfileCart user={createdBy} createdAt={record?.createdAt} />;
        }
      },
      {
        title: t('table:table-item-updated-by'),
        dataIndex: 'updatedBy',
        key: 'updatedBy',
        align: alignLeft,
        width: 140,
        ellipsis: true,
        render: (
          updatedBy: CreatedUpdatedByAt['updatedBy'],
          record: Category
        ) => {
          return <ProfileCart user={updatedBy} updatedAt={record?.updatedAt} />;
        }
      },
      {
        title: t('table:table-item-actions'),
        dataIndex: 'id',
        key: 'actions',
        align: 'center',
        width: 80,
        render: (id: string) => (
          <ActionButtons id={id} editUrl={`${ROUTES.CATEGORIES}/edit/${id}`} />
        )
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
    <React.Fragment>
      <div className="card overflow-hidden mb-6">
        <Table
          //@ts-ignore
          columns={tableColumns}
          emptyText={t('table:empty-table-data')}
          data={categories}
          rowKey={(record) => record.id}
          key="id"
          scroll={{ x: 800 }}
          expandable={{
            expandedRowRender: () => <></>,
            rowExpandable: (record: Category) => !isEmpty(record?.children)
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default CategoryList;
