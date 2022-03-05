import ActionButtons from '@components/common/action-buttons';
import Badge from '@components/ui/badge/badge';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { useGetStaff } from '@hooks/useGetStaff';
import { siteSettings } from '@settings/site.settings';
import { Nullable } from '@ts-types/custom.types';
import { RoleType, StaffType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import { mediaURL } from '@utils/utils';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

type IProps = {
  staffs: StaffType[] | null | undefined;
  // eslint-disable-next-line no-unused-vars
  onPagination: (current: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};
const StaffList = ({
  staffs,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const { staffInfo } = useGetStaff();

  const columns = [
    {
      title: t('table:table-item-avatar'),
      dataIndex: 'profile_img',
      key: 'profile_img',
      align: 'center',
      width: 74,
      render: (profile_img: string, record: StaffType) => (
        <Image
          src={
            profile_img
              ? `${mediaURL}/${profile_img}`
              : siteSettings.avatar.placeholder
          }
          alt={`${record?.first_name} ${record?.last_name}`}
          layout="fixed"
          width={42}
          height={42}
          className="rounded-full overflow-hidden"
        />
      )
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'first_name',
      key: 'first_name',
      align: alignLeft,
      width: 120,
      ellipsis: true,
      render: (first_name: string, record: StaffType) => (
        <span className="font-semibold text-gray-800 capitalize">{`${first_name} ${record?.last_name}`}</span>
      )
    },
    {
      title: t('table:table-item-roles'),
      dataIndex: 'role',
      key: 'role',
      align: alignLeft,
      ellipsis: true,
      width: 200,
      render: (role: RoleType) => {
        return (
          <div>
            <span
              style={{ width: 'fit-content' }}
              className="font-medium text-13px md:text-sm rounded block border border-sink-base px-2 py-1 bg-gray-100"
            >
              {role.role_name}
            </span>
          </div>
        );
      }
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      width: 90,
      render: (active: boolean) => {
        return (
          <Badge
            className="!text-sm"
            text={active ? 'Active' : 'Inactive'}
            color={active ? 'bg-green-500' : 'bg-red-500'}
          />
        );
      }
    },
    {
      title: t('table:table-item-email'),
      dataIndex: 'email',
      key: 'email',
      align: alignLeft,
      width: 200,
      ellipsis: true
    },
    {
      title: t('table:table-item-created-at'),
      dataIndex: 'created_at',
      key: 'created_at',
      align: alignLeft,
      width: 200,
      render: (created_at: string | number) => {
        return `${dayjs(created_at).format('MMM D, YYYY')} at ${dayjs(
          created_at
        ).format('h:mm A')}`;
      }
    },
    {
      title: t('table:table-item-created-by'),
      dataIndex: 'created_by',
      key: 'created_by',
      align: alignLeft,
      width: 100,
      ellipsis: true,
      render: (created_by: any) => {
        return (
          <div className="ml-1">{`${created_by?.first_name ?? ''} ${
            created_by?.last_name ?? ''
          }`}</div>
        );
      }
    },
    {
      title: t('table:table-item-updated-by'),
      dataIndex: 'updated_by',
      key: 'updated_by',
      align: alignLeft,
      width: 140,
      ellipsis: true,
      render: (updated_by: any) => {
        return (
          <div>{`${updated_by?.first_name ?? ''} ${
            updated_by?.last_name ?? ''
          }`}</div>
        );
      }
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      width: 150,
      render: (id: string, { active }: StaffType) => {
        return (
          <>
            {staffInfo?.id != id && (
              <ActionButtons
                id={id}
                editUrl={`${ROUTES.STAFFS}/edit/${id}`}
                deleteModalView="DELETE_STAFF"
                userStatus={true}
                isUserActive={active}
              />
            )}
          </>
        );
      }
    }
  ];

  return (
    <>
      <div className="card overflow-hidden mb-6">
        {/* @ts-ignore */}
        <Table
          // @ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={staffs}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={total}
            current={currentPage}
            pageSize={perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default StaffList;
