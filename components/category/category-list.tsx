import ActionButtons from '@components/common/action-buttons';
import * as categoriesIcon from '@components/icons/category';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { Nullable } from '@ts-types/custom.types';
import { Category } from '@ts-types/generated';
import { getIcon } from '@utils/get-icon';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
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
      dataIndex: 'category_name',
      key: 'category_name',
      align: alignLeft,
      width: 150,
      ellipsis: true,
      render: (category_name: string) => {
        return (
          <span className="font-semibold text-gray-800 capitalize">
            {category_name}
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
        if (!icon) return null;
        return (
          <span className="flex items-center justify-center">
            {getIcon({
              iconList: categoriesIcon,
              iconName: icon,
              className: 'w-5 h-5 max-h-full max-w-full'
            })}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-details'),
      dataIndex: 'category_description',
      key: 'category_description',
      align: alignLeft,
      width: 150,
      ellipsis: true
    },
    {
      title: t('table:table-item-created-at'),
      dataIndex: 'created_at',
      key: 'created_at',
      align: alignLeft,
      width: 180,
      render: (created_at: string | number) => {
        return `${dayjs(created_at).format('MMM D, YYYY')} at ${dayjs(
          created_at
        ).format('h:mm A')}`;
      }
    },
    {
      title: t('table:table-item-created-by'),
      dataIndex: 'created_by',
      key: 'created_by',
      align: alignLeft,
      width: 100,
      ellipsis: true,
      render: (created_by: any) => {
        return (
          <div>{`${created_by?.first_name ?? ''} ${
            created_by?.last_name ?? ''
          }`}</div>
        );
      }
    },
    {
      title: t('table:table-item-updated-by'),
      dataIndex: 'updated_by',
      key: 'updated_by',
      align: alignLeft,
      width: 140,
      ellipsis: true,
      render: (updated_by: any) => {
        return (
          <div>{`${updated_by?.first_name ?? ''} ${
            updated_by?.last_name ?? ''
          }`}</div>
        );
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
