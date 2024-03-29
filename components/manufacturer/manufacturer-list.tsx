import ActionButtons from '@components/common/action-buttons';
import ImageComponent from '@components/ImageComponent';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { siteSettings } from '@settings/site.settings';
import { DELETE_MANUFACTURER } from '@ts-types/constants';
import {
  CreatedUpdatedByAt,
  ImageType,
  ManufacturerType
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  manufacturers: ManufacturerType[];
  selectedColumns: string[];
  loading: boolean;
};

interface TableRowProps extends ManufacturerType {
  loading: boolean;
}

const ManufacturerList = ({
  loading,
  manufacturers,
  selectedColumns
}: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

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
        title: t('table:table-item-logo'),
        dataIndex: 'logo',
        key: 'logo',
        align: alignLeft,
        width: 85,
        render: (logo: ImageType[], record: TableRowProps) => {
          const { image = '', placeholder = '' } = isEmpty(logo) ? {} : logo[0];

          if (record?.loading) {
            return <TableRowPlaceholder />;
          }

          return (
            <div className="h-[65px] w-[65px] min-w-0 overflow-hidden rounded-sm border shadow">
              <ImageComponent
                src={image ?? siteSettings.product.image}
                customPlaceholder={
                  placeholder ?? siteSettings.product.placeholder
                }
                width={100}
                height={100}
                objectFit="cover"
              />
            </div>
          );
        }
      },
      {
        title: t('table:table-item-name'),
        dataIndex: 'name',
        key: 'name',
        align: alignLeft,
        width: 200,
        ellipsis: true,
        render: (name: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }

          if (record?.link) {
            return (
              <Link href={record?.link} target="_blank">
                <div
                  title={record?.link}
                  className="font-semibold capitalize text-blue-400"
                >
                  {name ?? record?.translated?.name}
                </div>
              </Link>
            );
          }
          return (
            <span
              title={name ?? record?.translated?.name}
              className="font-semibold capitalize text-gray-800"
            >
              {name ?? record?.translated?.name}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
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
        width: 150,
        render: (id: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <ActionButtons
              id={id}
              editUrl={`${router.asPath}/edit/${id}`}
              deleteModalView={DELETE_MANUFACTURER}
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
      data={loading ? tablePlaceholderRow : manufacturers}
      rowKey="id"
      scroll={{ x: 380 }}
      className="mb-6 overflow-hidden border"
    />
  );
};

export default ManufacturerList;
