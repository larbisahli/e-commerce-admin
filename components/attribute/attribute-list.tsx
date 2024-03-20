import ActionButtons from '@components/common/action-buttons';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { AttributeTypes } from '@ts-types/enums';
import {
  Attribute,
  AttributeValue,
  CreatedUpdatedByAt
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  attributes: Attribute[];
  selectedColumns: string[];
  loading: boolean;
};

interface TableRowProps extends Attribute {
  loading: boolean;
}

const AttributeList = ({ loading, attributes, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { alignLeft } = useIsRTL();

  const { tablePlaceholderRow } = usePlaceholder();

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
        width: 180,
        ellipsis: true,
        render: (name: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span className="font-semibold capitalize text-gray-800">
              {name ?? record?.translated?.name}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-values'),
        dataIndex: 'values',
        key: 'values',
        align: alignLeft,
        // ellipsis: true,
        width: 240,
        render: (values: AttributeValue[], record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }

          if (record.type === AttributeTypes.TEXT) {
            const att_values = values
              ?.map(({ value, translated }: AttributeValue, index: number) => {
                const t = translated?.value;
                return index > 0 ? `, ${value ?? t}` : `${value ?? t}`;
              })
              ?.join('');
            return (
              <>
                <Tooltip
                  id={`att-v-value-tooltip-${att_values}`}
                  className="custom-tooltip z-50"
                >
                  <div className="flex flex-col items-center">
                    <span className="max-w-[200px]">{att_values}</span>
                  </div>
                </Tooltip>
                <div
                  data-tooltip-id={`att-v-value-tooltip-${att_values}`}
                  className="whitespace-wrap"
                >
                  {att_values}
                </div>
              </>
            );
          }

          return (
            <div className="flex flex-wrap items-center">
              {values?.map((value, idx) => {
                const color = value?.value || value?.translated?.value;
                if (color !== 'N/A') {
                  return (
                    <>
                      <div
                        key={idx}
                        data-tooltip-id={`att-v-color-tooltip-${idx}-${color}-${value?.name}`}
                        data-tooltip-content={value?.name}
                        className="m-1 h-6 w-6 rounded-sm border border-gray-300 shadow"
                        style={{ background: color }}
                      />
                      <Tooltip
                        place="right"
                        className="z-50"
                        id={`att-v-color-tooltip-${idx}-${color}-${value?.name}`}
                      />
                    </>
                  );
                }
                return (
                  <div key={idx} className="m-1 rounded-sm border p-1 shadow">
                    {color}
                  </div>
                );
              })}
            </div>
          );
        }
      },
      {
        title: t('table:table-item-type'),
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        width: 80,
        ellipsis: true,
        render: (name: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <span className="capitalize text-gray-600">{name}</span>;
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
          return <ProfileCart user={createdBy} createdAt={record?.updatedAt} />;
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
              editUrl={`${router.asPath}/edit/${id}`}
              deleteModalView="DELETE_ATTRIBUTE"
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
      data={loading ? tablePlaceholderRow : attributes}
      rowKey="id"
      scroll={{ x: 800 }}
      className="mb-6 overflow-hidden border"
    />
  );
};

export default AttributeList;
