import ActionButtons from '@components/common/action-buttons';
import Avatar from '@components/common/avatar';
import Badge from '@components/ui/badge/badge';
import ProfileCart from '@components/ui/profile-card';
import { Table } from '@components/ui/table';
import { useGetStaff } from '@hooks/useGetStaff';
import { siteSettings } from '@settings/site.settings';
import {
  CreatedUpdatedByAt,
  ImageType,
  RoleType,
  StaffType
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

type IProps = {
  staffs: StaffType[] | null | undefined;
  selectedColumns: string[];
};
const StaffList = ({ staffs, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const { staffInfo } = useGetStaff();

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
        title: t('table:table-item-avatar'),
        dataIndex: 'profile',
        key: 'profile',
        align: 'center',
        width: 74,
        render: (profile: ImageType, record: StaffType) => {
          const { image, placeholder } = profile[0] ?? {};
          return (
            <Avatar
              src={image ?? siteSettings.avatar.image}
              alt={`${record?.firstName} ${record?.lastName}`}
              customPlaceholder={placeholder ?? siteSettings.avatar.placeholder}
            />
          );
        }
      },
      {
        title: t('table:table-item-title'),
        dataIndex: 'firstName',
        key: 'firstName',
        align: alignLeft,
        width: 120,
        ellipsis: true,
        render: (firstName: string, record: StaffType) => (
          <span className="font-semibold text-gray-800 capitalize">
            {`${firstName} ${record?.lastName}`}
          </span>
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
                {role.roleName}
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
        title: t('table:table-item-phone'),
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        align: alignLeft,
        width: 200,
        ellipsis: true,
        render: (phoneNumber: number) => {
          return (
            <div>
              <span
                style={{ width: 'fit-content' }}
                className="font-medium text-13px md:text-sm rounded block border border-sink-base px-2 py-1 bg-gray-100"
              >
                {'+' + phoneNumber}
              </span>
            </div>
          );
        }
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
        width: 100,
        ellipsis: true,
        render: (
          createdBy: CreatedUpdatedByAt['createdBy'],
          record: StaffType
        ) => {
          return (
            <ProfileCart staff={createdBy} createdAt={record?.createdAt} />
          );
        }
      },
      {
        title: t('table:table-item-updated-by'),
        dataIndex: 'updatedBy',
        key: 'updatedBy',
        align: alignLeft,
        width: 140,
        ellipsis: true,
        render: (
          updatedBy: CreatedUpdatedByAt['updatedBy'],
          record: StaffType
        ) => {
          return (
            <ProfileCart staff={updatedBy} updatedAt={record?.updatedAt} />
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
              <ActionButtons
                id={id}
                editUrl={`${ROUTES.STAFFS}/edit/${id}`}
                deleteModalView={staffInfo?.id != id ? 'DELETE_STAFF' : null}
                userStatus={staffInfo?.id != id}
                isUserActive={active}
              />
            </>
          );
        }
      }
    ];
  }, [alignLeft, staffInfo?.id, t]);

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
          // @ts-ignore
          columns={tableColumns}
          emptyText={t('table:empty-table-data')}
          data={staffs}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default StaffList;
