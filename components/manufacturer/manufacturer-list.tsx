import ActionButtons from '@components/common/action-buttons';
import ImageComponent from '@components/ImageComponent';
import ProfileCart from '@components/ui/profile-card';
import { Table } from '@components/ui/table';
import { siteSettings } from '@settings/site.settings';
import { DELETE_MANUFACTURER } from '@ts-types/constants';
import {
  CreatedUpdatedByAt,
  ImageType,
  ManufacturerType,
  Suppliers
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

type IProps = {
  manufacturers: ManufacturerType[];
  selectedColumns: string[];
};

const ManufacturerList = ({ manufacturers, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { alignLeft, alignRight } = useIsRTL();

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
        title: t('table:table-item-logo'),
        dataIndex: 'logo',
        key: 'logo',
        align: alignLeft,
        width: 85,
        render: (logo: ImageType[]) => {
          const { image, placeholder } = logo[0] ?? {};
          return (
            <div className="shadow min-w-0 overflow-hidden rounded-sm w-[65px] h-[65px] border">
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
        width: 150,
        ellipsis: true,
        render: (name: string) => {
          return (
            <span
              title={name}
              className="font-semibold text-gray-800 capitalize"
            >
              {name}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-website'),
        dataIndex: 'website',
        key: 'website',
        align: alignLeft,
        width: 160,
        // ellipsis: true,
        render: (website: string) => {
          return (
            <Link href={website}>
              <a target="_blank" title={website} className="text-blue-400">
                {website}
              </a>
            </Link>
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
            deleteModalView={DELETE_MANUFACTURER}
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
          data={manufacturers}
          rowKey="id"
          scroll={{ x: 380 }}
        />
      </div>
    </React.Fragment>
  );
};

export default ManufacturerList;
