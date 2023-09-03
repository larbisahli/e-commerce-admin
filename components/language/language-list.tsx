import ActionButtons from '@components/common/action-buttons';
import Badge from '@components/ui/badge/badge';
import Link from '@components/ui/link';
import ProfileCart from '@components/ui/profile-card';
import { CreatedUpdatedByAt, LanguageType, Tag } from '@ts-types/generated';
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
  languages: LanguageType[] | undefined | null;
  selectedColumns: string[];
};

const LanguageList = ({ languages, selectedColumns }: IProps) => {
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
        title: t('table:table-item-name'),
        dataIndex: 'name',
        key: 'name',
        align: alignLeft,
        width: 200,
        ellipsis: true,
        render: (name: string, record: LanguageType) => (
          <Link href={`${ROUTES.LANGUAGES}/edit/${record.id}`}>
            <span
              style={{ width: 'fit-content' }}
              className="font-medium text-base capitalize text-blue-500"
            >
              {name}
            </span>
          </Link>
        )
      },
      {
        title: t('table:table-item-status'),
        dataIndex: 'isDefault',
        key: 'isDefault',
        align: 'center',
        width: 140,
        ellipsis: true,
        render: (isDefault: boolean, record: LanguageType) => {
          return (
            <div className="flex items-center gap-1">
              {isDefault && (
                <Badge
                  text={'Default'}
                  textColor={'text-gray-600'}
                  color={'bg-gray-100'}
                />
              )}
              <Badge
                text={record?.active ? 'Publish' : 'Draft'}
                color={record?.active ? 'bg-green-600' : 'bg-yellow-500'}
              />
            </div>
          );
        }
      },
      {
        title: t('table:table-item-locale-identifier'),
        dataIndex: 'localeId',
        key: 'localeId',
        align: alignLeft,
        width: 100,
        ellipsis: true,
        render: (localeId: string) => (
          <div>
            <span className="font-medium text-base w-full">{localeId}</span>
          </div>
        )
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
        width: 200,
        align: 'center',
        render: (id: string, record: LanguageType) => (
          <ActionButtons
            id={id}
            activated={record.isDefault}
            setDefault={!record.isDefault && (() => {})}
            metadata={{ localeId: record.localeId }}
            copy={`${ROUTES.LANGUAGES}/fork/${id}`}
            editUrl={`${ROUTES.LANGUAGES}/edit/${id}`}
            deleteModalView={record.isDefault ? null : 'DELETE_LANGUAGE'}
          />
        )
      }
    ];
  }, [t, alignLeft]);

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
          data={languages}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default LanguageList;
