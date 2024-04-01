import ActionButtons from '@components/common/action-buttons';
import Loader from '@components/ui/loader/loader';
import { RoleType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  roles: RoleType[] | null | undefined;
};
const RoleList = ({ roles }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-id'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width: 80,
        ellipsis: true
      },
      {
        title: t('table:table-item-name'),
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        width: 120,
        ellipsis: true,
        render: (name: string) => (
          <div className="flex w-full items-center justify-center">
            <span className="text-13px border-sink-base block w-full max-w-[200px] rounded-sm border bg-gray-100 px-2 py-1 font-medium md:text-sm">
              {name}
            </span>
          </div>
        )
      },
      {
        title: t('table:table-item-actions'),
        dataIndex: 'id',
        key: 'actions',
        align: 'center',
        width: 150,
        render: (id: string) => {
          return (
            <>
              <ActionButtons
                id={id}
                editUrl={`${ROUTES.USER_ROLE}/edit/${id}`}
                deleteModalView={'DELETE_ROLE'}
              />
            </>
          );
        }
      }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alignLeft]);

  return (
    <Table
      // @ts-ignore
      columns={columns}
      emptyText={t('table:empty-table-data')}
      data={roles}
      rowKey="id"
      scroll={{ x: 800 }}
      className="mb-6 overflow-hidden border"
    />
  );
};

export default RoleList;
