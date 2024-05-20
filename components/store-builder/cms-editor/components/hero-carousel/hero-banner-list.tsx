import ActionButtons from '@components/common/action-buttons';
import EditIcon from '@components/icons/edit';
import Trash from '@components/icons/trash';
import ImageComponent from '@components/ImageComponent';
import Badge from '@components/ui/badge/badge';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { siteSettings } from '@settings/site.settings';
import { HeroBannerType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

export type IProps = {
  heroBannerList: HeroBannerType[];
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  handleEdit: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleDelete: (id: string) => void;
};

interface TableRowProps extends HeroBannerType {
  loading: boolean;
}

const HeroBannerList = ({
  loading,
  heroBannerList,
  handleEdit,
  handleDelete
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const { tablePlaceholderRow } = usePlaceholder();

  const columns = [
    {
      title: t('table:table-item-id'),
      dataIndex: 'id',
      key: 'id',
      align: alignLeft,
      width: 80,
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
              alt="image"
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
      width: 250,
      ellipsis: true,
      render: (title: string, record: TableRowProps) => {
        if (record?.loading) {
          return <TableRowPlaceholder />;
        }
        return (
          <span className="font-semibold capitalize text-gray-700">
            {title ?? record?.translated?.title}
          </span>
        );
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
            className="!text-sm !text-gray-600"
            text={published ? 'Publish' : 'Draft'}
            color={published ? 'bg-green-200' : 'bg-yellow-200'}
          />
        );
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
          <div className="flex w-auto items-center justify-center space-s-2">
            <button
              onClick={() => handleDelete(id)}
              className="flex h-9 w-9 items-center justify-center rounded-sm border text-gray-500 transition duration-200 hover:text-red-600 hover:shadow-xl focus:outline-none"
            >
              <Trash width={16} />
            </button>
            <button
              onClick={() => handleEdit(id)}
              className="flex h-9 w-9 items-center justify-center rounded-sm border text-base text-gray-500 transition duration-200 hover:text-blue-600 hover:shadow-xl"
            >
              <EditIcon width={16} />
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <Table
      //@ts-ignore
      columns={columns}
      emptyText={t('table:empty-table-data')}
      data={loading ? tablePlaceholderRow : heroBannerList}
      rowKey="id"
      scroll={{ x: 800 }}
      className="my-6 overflow-hidden border"
    />
  );
};

export default HeroBannerList;
