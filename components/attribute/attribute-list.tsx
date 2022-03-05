import ActionButtons from '@components/common/action-buttons';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { Nullable } from '@ts-types/custom.types';
import { Attribute, AttributeValue } from '@ts-types/generated';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

type IProps = {
  attributes: Attribute[];
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const AttributeList = ({
  attributes,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const alignLeft =
    router.locale === 'ar' || router.locale === 'he' ? 'right' : 'left';
  const alignRight =
    router.locale === 'ar' || router.locale === 'he' ? 'left' : 'right';

  let columns = [
    {
      title: t('table:table-item-title'),
      dataIndex: 'attribute_name',
      key: 'attribute_name',
      align: alignLeft,
      width: 100,
      ellipsis: true,
      render: (attribute_name: string) => {
        return (
          <span className="font-semibold text-gray-800 capitalize">
            {attribute_name}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-values'),
      dataIndex: 'attribute_values',
      key: 'attribute_values',
      align: alignLeft,
      ellipsis: true,
      width: 200,
      render: (values: any) => {
        const att_values = values?.map(
          ({ attribute_value }: AttributeValue, index: number) => {
            return index > 0 ? `, ${attribute_value}` : `${attribute_value}`;
          }
        );
        return (
          <span title={att_values} className="whitespace-nowrap">
            {att_values}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-created-at'),
      dataIndex: 'created_at',
      key: 'created_at',
      align: alignLeft,
      width: 200,
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
      align: alignRight,
      width: 80,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${router.asPath}/edit/${id}`}
          deleteModalView="DELETE_ATTRIBUTE"
        />
      )
    }
  ];

  if (router?.query?.shop) {
    columns = columns?.filter((column) => column?.key !== 'shop');
  }
  return (
    <React.Fragment>
      <div className="card overflow-hidden mb-6">
        <Table
          // @ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={attributes}
          rowKey="id"
          scroll={{ x: 380 }}
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

export default AttributeList;
