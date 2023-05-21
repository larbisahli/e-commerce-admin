import ActionButtons from '@components/common/action-buttons';
import ProfileCart from '@components/ui/profile-card';
import { Table } from '@components/ui/table';
import { CreatedUpdatedByAt, Suppliers } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

type IProps = {
  suppliers: Suppliers[];
  selectedColumns: string[];
};

const SuppliersList = ({ suppliers, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { alignLeft, alignRight } = useIsRTL();

  console.log({ suppliers });

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
        title: t('table:table-item-name'),
        dataIndex: 'name',
        key: 'name',
        align: alignLeft,
        width: 100,
        ellipsis: true,
        render: (supplier_name: string) => {
          return (
            <span className="font-semibold text-gray-800 capitalize">
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
        width: 160,
        ellipsis: true,
        render: (company: string) => {
          return (
            <span title={company} className="text-gray-800 capitalize">
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
        width: 150,
        ellipsis: true,
        render: (phoneNumber: string) => {
          return (
            <span
              title={`+${phoneNumber}`}
              className="text-gray-800 capitalize"
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
        render: (createdAt: CreatedUpdatedByAt['updatedAt']) => {
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
          record: Suppliers
        ) => {
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
          record: Suppliers
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
            deleteModalView="DELETE_SUPPLIER"
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
          data={suppliers}
          rowKey="id"
          scroll={{ x: 380 }}
        />
      </div>
    </React.Fragment>
  );
};

export default SuppliersList;
