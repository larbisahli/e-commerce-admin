import ActionButtons from '@components/common/action-buttons';
import * as categoriesIcon from '@components/icons/category';
import Pagination from '@components/ui/pagination';
import ProfileCart from '@components/ui/profile-card';
import { Table } from '@components/ui/table';
import { Nullable } from '@ts-types/custom.types';
import { Category, CreatedUpdatedByAt } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import React from 'react';

export type IProps = {
  categories: Category[];
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const CategoryList = ({
  categories,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t('table:table-item-title'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 150,
      ellipsis: true,
      render: (name: string, record: Category) => {
        return (
          <span
            className={cn('font-semibold text-gray-800 capitalize', {
              'pl-3': !!record?.parentId,
              'text-gray-600': !!record?.parentId
            })}
          >
            {name}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-icon'),
      dataIndex: 'icon',
      key: 'icon',
      align: 'center',
      width: 50,
      render: (icon: string) => {
        const TagName = categoriesIcon[icon];
        if (!icon) return null;
        return (
          <span className="flex items-center justify-center">
            {TagName && <TagName className="w-5 h-5 max-h-full max-w-full" />}
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
        return <ProfileCart staff={createdBy} createdAt={record?.createdAt} />;
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
        return <ProfileCart staff={updatedBy} updatedAt={record?.updatedAt} />;
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

  return (
    <React.Fragment>
      <div className="card overflow-hidden mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={categories}
          rowKey="id"
          scroll={{ x: 1000 }}
          indentSize={10}
          expandable={{
            indentSize: 10,
            expandedRowRender: () => '',
            rowExpandable: (record: Category) => !isEmpty(record?.children)
          }}
        />
      </div>

      {!!total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={total}
            current={currentPage}
            pageSize={perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default CategoryList;
