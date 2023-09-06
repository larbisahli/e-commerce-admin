import ActionButtons from '@components/common/action-buttons';
import Loader from '@components/ui/loader/loader';
import Pagination from '@components/ui/pagination';
import { siteSettings } from '@settings/site.settings';
import { useIsRTL } from '@utils/locals';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import { useMeQuery } from '@data/user/use-me.query';
import { useTranslation } from 'next-i18next';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  customers: UserPaginator | null | undefined;
  onPagination: (current: number) => void;
};
const CustomerList = ({ customers, onPagination }: IProps) => {
  // const { data, paginatorInfo } = customers!;

  const data = [];
  const paginatorInfo = {};

  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t('table:table-item-avatar'),
      dataIndex: 'profile',
      key: 'profile',
      align: 'center',
      width: 74,
      render: (profile: any, record: any) => (
        <Image
          src={profile?.avatar?.thumbnail ?? siteSettings.avatar.placeholder}
          alt={record?.name}
          layout="fixed"
          width={42}
          height={42}
          className="overflow-hidden rounded"
        />
      )
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft
    },
    {
      title: t('table:table-item-email'),
      dataIndex: 'email',
      key: 'email',
      align: alignLeft
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'is_active',
      key: 'is_active',
      align: 'center',
      render: (is_active: boolean) => (is_active ? 'Active' : 'Inactive')
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      render: (id: string, { is_active }: any) => {
        // const { data } = useMeQuery();
        const data = [];
        return (
          <>
            {data?.id != id && (
              <ActionButtons
                id={id}
                userStatus={true}
                isUserActive={is_active}
              />
            )}
          </>
        );
      }
    }
  ];

  return (
    <>
      <div className="card mb-6 overflow-hidden">
        {/* @ts-ignore */}
        <Table
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={data}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default CustomerList;
