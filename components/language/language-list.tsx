import { useMutation } from '@apollo/client';
import ActionButtons from '@components/common/action-buttons';
import Link from '@components/ui/link';
import ProfileCart from '@components/ui/profile-card';
import {
  FORK_LANGUAGE,
  LANGUAGES,
  SET_DEFAULT_LANGUAGE
} from '@graphql/language';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import {
  CreatedUpdatedByAt,
  Language,
  LanguageType,
  Tag
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useCallback, useMemo, useState } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false }
);

export type IProps = {
  languages: Language[] | undefined | null;
  selectedColumns: string[];
};

const LanguageList = ({ languages, selectedColumns }: IProps) => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  const { alignLeft } = useIsRTL();

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

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
          notify(
            t('common:successfully-updated', {
              displayName: data.setDefaultLanguage?.displayName
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
        width: 50,
        ellipsis: true
      },
      {
        title: t('table:table-item-language'),
        dataIndex: 'displayName',
        key: 'displayName',
        align: alignLeft,
        width: 200,
        ellipsis: true,
        render: (displayName: string, record: LanguageType) => (
          <Link href={`${ROUTES.LANGUAGES}/edit/${record.id}`}>
            <span
              style={{ width: 'fit-content' }}
              className="font-medium text-base capitalize text-blue-500"
            >
              {displayName}
            </span>
          </Link>
        )
      },
      {
        title: t('table:table-item-status'),
        dataIndex: 'isDefault',
        key: 'isDefault',
        align: alignLeft,
        width: 120,
        ellipsis: true,
        render: (isDefault: boolean) => {
          if (isDefault) {
            return (
              <div>
                <span
                  style={{ width: 'fit-content' }}
                  className="font-medium bg-gray-100 text-gray-500 text-13px md:text-sm rounded shadow-sm block border border-sink-base px-2 py-1 capitalize"
                >
                  Default
                </span>
              </div>
            );
          }
          return null;
        }
      },
      {
        title: t('table:table-item-locale-identifier'),
        dataIndex: 'lcid',
        key: 'lcid',
        align: alignLeft,
        width: 100,
        ellipsis: true,
        render: (lcid: string) => (
          <div>
            <span className="font-medium text-base w-full">{lcid}</span>
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
            metadata={{ lcid: record.lcid }}
            copy={`${ROUTES.LANGUAGES}/fork/${id}`}
            loading={settingDefault && currentId === id}
            editUrl={`${ROUTES.LANGUAGES}/edit/${id}`}
            deleteModalView={record.isDefault ? null : 'DELETE_LANGUAGE'}
          />
        )
      }
    ];
  }, [t, alignLeft, settingDefault, currentId]);

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
