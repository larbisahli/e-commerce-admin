import ActionButtons from '@components/common/action-buttons';
import ImageComponent from '@components/ImageComponent';
import Badge from '@components/ui/badge/badge';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { siteSettings } from '@settings/site.settings';
import { CreatedUpdatedByAt, HeroBannerType } from '@ts-types/generated';
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
  heroBannerList: HeroBannerType[];
  selectedColumns: string[];
  loading: boolean;
};

interface TableRowProps extends HeroBannerType {
  loading: boolean;
}

const HeroBannerList = ({
  loading,
  heroBannerList,
  selectedColumns
}: IProps) => {
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
        title: t('table:table-item-thumbnail'),
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        align: 'center',
        width: 130,
        render: (
          thumbnail: { image: string; placeholder: string },
          record: TableRowProps
        ) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <div className="h-[65px] w-[120px] min-w-0 overflow-hidden rounded-sm border shadow">
              <ImageComponent
                src={
                  !isEmpty(thumbnail)
                    ? thumbnail[0]?.image
                    : siteSettings.product.image
                }
                customPlaceholder={
                  !isEmpty(thumbnail)
                    ? thumbnail[0]?.placeholder
                    : siteSettings.product.placeholder
                }
                width={120}
                height={65}
                objectFit="cover"
              />
            </div>
          );
        }
      },
      {
        title: t('table:table-item-title-title'),
        dataIndex: 'title',
        key: 'title',
        align: alignLeft,
        width: 150,
        ellipsis: true,
        render: (category_name: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span className="font-semibold capitalize text-gray-800">
              {category_name}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-clicks'),
        dataIndex: 'clicks',
        key: 'clicks',
        align: 'center',
        width: 70,
        ellipsis: true,
        render: (clicks: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return clicks;
        }
      },
      {
        title: t('table:table-item-display-order'),
        dataIndex: 'position',
        key: 'position',
        align: 'center',
        width: 120,
        ellipsis: true,
        render: (position: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return position;
        }
      },
      {
        title: t('table:table-item-status'),
        dataIndex: 'published',
        key: 'published',
        align: 'center',
        width: 100,
        render: (published: boolean, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <Badge
              text={published ? 'Publish' : 'Draft'}
              color={published ? 'bg-green-600' : 'bg-yellow-500'}
            />
          );
        }
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: alignLeft,
        width: 180,
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
        width: 100,
        render: (id: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <ActionButtons
              id={id}
              editUrl={`${ROUTES.HERO_BANNER}/edit/${id}`}
              deleteModalView="DELETE_SLIDER"
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
      data={loading ? tablePlaceholderRow : heroBannerList}
      rowKey="id"
      scroll={{ x: 800 }}
      className="card mb-6 overflow-hidden"
    />
  );
};

export default HeroBannerList;
