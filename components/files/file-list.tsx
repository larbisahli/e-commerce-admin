/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ActionButtons from '@components/common/action-buttons';
import ImageComponent from '@components/ImageComponent';
import { Table } from '@components/ui/table';
import { siteSettings } from '@settings/site.settings';
import {
  CreatedUpdatedByAt,
  ImageType
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

type IProps = {
  files: ImageType[] | null | undefined;
  selectedColumns: string[];
};

const FileList = ({ files, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-id'),
        dataIndex: 'id',
        key: 'id',
        align: alignLeft,
        ellipsis: true
      },
      {
        title: t('table:table-item-image'),
        dataIndex: 'image',
        key: 'image',
        align: alignLeft,
        render: (image: string, record: ImageType) => {
          const { placeholder } = record ?? {};
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
        title: t('table:table-item-size'),
        dataIndex: 'size',
        key: 'size',
        align: 'center',
        ellipsis: true,
        render: (size: number) => {
          return <span>{size?.formatBytes()}</span>;
        }
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: alignLeft,
        render: (createdAt: CreatedUpdatedByAt['createdAt']) => {
          return `${dayjs(createdAt).format('MMM D, YYYY')} at ${dayjs(
            createdAt
          ).format('h:mm A')}`;
        }
      },
      {
        title: t('table:table-item-actions'),
        dataIndex: 'id',
        key: 'actions',
        align: 'center',
        width: 'auto',
        render: (id: string) => (
          <ActionButtons id={id} deleteModalView="DELETE_COUPON" />
        )
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
    <>
      <div className="card overflow-hidden mb-6">
        <Table
          //@ts-ignore
          columns={tableColumns}
          emptyText={t('table:empty-table-data')}
          data={files}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default FileList;
