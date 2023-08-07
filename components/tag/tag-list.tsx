import ActionButtons from '@components/common/action-buttons';
import ProfileCart from '@components/ui/profile-card';
import { CreatedUpdatedByAt, Tag } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false }
);

export type IProps = {
  tags: Tag[] | undefined | null;
  selectedColumns: string[];
};

const TagList = ({ tags, selectedColumns }: IProps) => {
  const { t } = useTranslation();

  const { alignLeft } = useIsRTL();

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
        title: t('table:table-item-title'),
        dataIndex: 'name',
        key: 'name',
        align: alignLeft,
        width: 120,
        ellipsis: true,
        render: (name: string) => (
          <div>
            <span
              style={{ width: 'fit-content' }}
              className="font-medium bg-gray-100 text-13px md:text-sm rounded shadow-sm block border border-sink-base px-2 py-1 capitalize"
            >
              {name}
            </span>
          </div>
        )
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: alignLeft,
        width: 180,
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
        width: 150,
        ellipsis: true,
        render: (createdBy: CreatedUpdatedByAt['createdBy'], record: Tag) => {
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
        render: (updatedBy: CreatedUpdatedByAt['updatedBy'], record: Tag) => {
          return <ProfileCart user={updatedBy} updatedAt={record?.updatedAt} />;
        }
      },
      {
        title: t('table:table-item-actions'),
        dataIndex: 'id',
        key: 'actions',
        width: 80,
        align: 'center',
        render: (id: string) => (
          <ActionButtons
            id={id}
            editUrl={`${ROUTES.TAG}/edit/${id}`}
            deleteModalView="DELETE_TAG"
          />
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
          data={tags}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default TagList;
