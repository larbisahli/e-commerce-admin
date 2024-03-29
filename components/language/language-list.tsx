import { useMutation } from '@apollo/client';
import ActionButtons from '@components/common/action-buttons';
import Badge from '@components/ui/badge/badge';
import Link from '@components/ui/link';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { LANGUAGES, SET_DEFAULT_LANGUAGE } from '@graphql/language';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch, useGetUser } from '@hooks/useGetUser';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { notify } from '@lib/notify';
import { fetchStoreSettings } from '@store/settings';
import { CreatedUpdatedByAt, LanguageType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useCallback, useMemo, useState } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

export type IProps = {
  languages: LanguageType[] | undefined | null;
  selectedColumns: string[];
  loading: boolean;
};

interface TableRowProps extends LanguageType {
  loading: boolean;
}

const LanguageList = ({ loading, languages, selectedColumns }: IProps) => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  const { alignLeft } = useIsRTL();

  const { tablePlaceholderRow } = usePlaceholder();

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const dispatch = useAppDispatch();

  const [setDefaultLanguage, { loading: settingDefault }] = useMutation(
    SET_DEFAULT_LANGUAGE,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      refetchQueries: [LANGUAGES, 'Languages'],
      onCompleted: (data: { setDefaultLanguage: LanguageType }) => {
        if (!isEmpty(data.setDefaultLanguage)) {
          dispatch(fetchStoreSettings());
          notify(
            t('common:successfully-updated', {
              displayName: data.setDefaultLanguage?.name
            }),
            'success'
          );
          setCurrentId(null);
        }
      }
    }
  );

  useErrorLogger(error);

  const setDefault = useCallback(
    async (id: number) => {
      setCurrentId(id);
      setDefaultLanguage({ variables: { id } }).catch((err) => {
        setError(err);
      });
    },
    [setDefaultLanguage]
  );

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
          return (
            <Link href={`${ROUTES.LANGUAGES}/edit/${record.id}`}>
              <span
                style={{ width: 'fit-content' }}
                className="text-base font-medium capitalize text-blue-500"
              >
                {name}
              </span>
            </Link>
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
        render: (localeId: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <div>
              <span className="w-full font-medium text-gray-600">
                {localeId}
              </span>
            </div>
          );
        }
      },
      {
        title: t('table:table-item-status'),
        dataIndex: 'isDefault',
        key: 'isDefault',
        align: 'center',
        width: 330,
        ellipsis: true,
        render: (isDefault: boolean, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <div className="flex flex-wrap items-center justify-center gap-1">
              {record?.isSystem && (
                <Badge
                  text={'System'}
                  textColor={'text-gray-600'}
                  color={'bg-blue-100'}
                />
              )}
              {isDefault && (
                <Badge
                  text={'Default'}
                  textColor={'text-gray-600'}
                  color={'bg-gray-100'}
                />
              )}
              <Badge
                text={record?.active ? 'Publish' : 'Draft'}
                textColor={'text-gray-600'}
                color={record?.active ? 'bg-green-200' : 'bg-yellow-200'}
              />
            </div>
          );
        }
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
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
        width: 200,
        align: 'center',
        render: (id: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <ActionButtons
              id={id}
              activated={record.isDefault}
              loading={settingDefault && currentId === id}
              setDefault={!record.isDefault && setDefault}
              metadata={{ localeId: record.localeId }}
              copy={`${ROUTES.LANGUAGES}/fork/${id}`}
              editUrl={`${ROUTES.LANGUAGES}/edit/${id}`}
              deleteModalView={
                record.isDefault || record?.isSystem ? null : 'DELETE_LANGUAGE'
              }
            />
          );
        }
      }
    ];
  }, [t, alignLeft, settingDefault, currentId, setDefault]);

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
      data={loading ? tablePlaceholderRow : languages}
      rowKey="id"
      scroll={{ x: 800 }}
      className="mb-6 overflow-hidden border"
    />
  );
};

export default LanguageList;
