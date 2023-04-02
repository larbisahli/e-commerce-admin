import ActionButtons from '@components/common/action-buttons';
import ProfileCart from '@components/ui/profile-card';
import { Table } from '@components/ui/table';
import {
  Attribute,
  AttributeValue,
  CreatedUpdatedByAt
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

type IProps = {
  attributes: Attribute[];
  selectedColumns: string[];
};

const AttributeList = ({ attributes, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { alignLeft, alignRight } = useIsRTL();

  let columns = useMemo(() => {
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
        title: t('table:table-item-name'),
        dataIndex: 'name',
        key: 'name',
        align: alignLeft,
        width: 100,
        ellipsis: true,
        render: (name: string) => {
          return (
            <span className="font-semibold text-gray-800 capitalize">
              {name}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-values'),
        dataIndex: 'values',
        key: 'values',
        align: alignLeft,
        ellipsis: true,
        width: 200,
        render: (values: AttributeValue[]) => {
          const att_values = values
            ?.map(({ value }: AttributeValue, index: number) => {
              return index > 0 ? `, ${value}` : `${value}`;
            })
            ?.join('');
          return (
            <span title={att_values} className="whitespace-nowrap">
              {att_values}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: alignLeft,
        width: 200,
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
          record: Attribute
        ) => {
          return <ProfileCart user={createdBy} createdAt={record?.updatedAt} />;
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
          record: Attribute
        ) => {
          return <ProfileCart user={updatedBy} updatedAt={record?.updatedAt} />;
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
  }, [alignLeft, alignRight, router.asPath, t]);

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
          // @ts-ignore
          columns={tableColumns}
          emptyText={t('table:empty-table-data')}
          data={attributes}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>
    </React.Fragment>
  );
};

export default AttributeList;
