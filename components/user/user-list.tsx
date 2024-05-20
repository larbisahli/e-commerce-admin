import ActionButtons from '@components/common/action-buttons';
import Avatar from '@components/common/avatar';
import Badge from '@components/ui/badge/badge';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { useGetUser } from '@hooks/index';
import { usePlaceholder } from '@hooks/usePlaceholder';
import {
  CreatedUpdatedByAt,
  ImageType,
  RoleType,
  UserType
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  users: UserType[] | null | undefined;
  selectedColumns: string[];
  loading: boolean;
};

interface TableRowProps extends UserType {
  loading: boolean;
}

const UserList = ({ loading, users, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();
  const { userInfo } = useGetUser();
  const { tablePlaceholderRow } = usePlaceholder();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-avatar'),
        dataIndex: 'profile',
        key: 'profile',
        align: 'center',
        width: 85,
        render: (profile: ImageType, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          const { googleProfileImage } = record;
          const { image, placeholder } = profile[0] ?? {};

          if (googleProfileImage && !image) {
            return (
              <div className="relative h-10 w-10 cursor-pointer overflow-hidden rounded-sm">
                <Image
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                  alt=""
                  src={googleProfileImage}
                />
              </div>
            );
          }
          return (
            <Avatar
              src={image}
              firstName={record?.firstName}
              alt={`${record?.firstName} ${record?.lastName}`}
              customPlaceholder={placeholder}
              width="w-12"
              height="h-12"
            />
          );
        }
      },
      {
        title: t('table:table-item-title'),
        dataIndex: 'firstName',
        key: 'firstName',
        align: alignLeft,
        width: 180,
        ellipsis: true,
        render: (firstName: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span className="font-semibold capitalize text-gray-800">
              {`${firstName} ${record?.lastName}`}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-roles'),
        dataIndex: 'role',
        key: 'role',
        align: 'center',
        ellipsis: true,
        width: 150,
        render: (role: RoleType, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <div className="flex w-full items-center justify-center">
              <span className="text-13px border-sink-base block w-full max-w-[200px] rounded-sm border bg-gray-100 px-2 py-1 text-center font-medium md:text-sm">
                {role?.name}
              </span>
            </div>
          );
        }
      },
      {
        title: t('table:table-item-status'),
        dataIndex: 'isAdmin',
        key: 'isAdmin',
        align: 'center',
        width: 250,
        render: (isAdmin: boolean, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <div>
              <Badge
                className="mr-2 border !text-sm font-medium !text-gray-600 shadow"
                text={
                  isAdmin
                    ? t('table:table-item-admin')
                    : t('table:table-item-staff')
                }
                color={'bg-gray-200'}
              />
              <Badge
                className={cn('border !text-sm !text-gray-600')}
                text={record.active ? 'Active' : 'Inactive'}
                color={record.active ? 'bg-green-200' : 'bg-red-200'}
              />
            </div>
          );
        }
      },
      {
        title: t('table:table-item-email'),
        dataIndex: 'email',
        key: 'email',
        align: 'center',
        width: 200,
        ellipsis: true,
        render: (email: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return email;
        }
      },
      {
        title: t('table:table-item-phone'),
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        align: 'center',
        width: 200,
        ellipsis: true,
        render: (phoneNumber: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <div className="flex items-center justify-center">
              <span
                style={{ width: 'fit-content' }}
                className="block text-center font-medium"
              >
                {phoneNumber ? '+' + phoneNumber : 'N/A'}
              </span>
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
        align: 'center',
        width: 150,
        render: (
          id: string,
          { active, isAdmin }: UserType,
          record: TableRowProps
        ) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <ActionButtons
              id={id}
              isAdmin={isAdmin}
              editUrl={`${ROUTES.USER}/edit/${id}`}
              deleteModalView={userInfo?.id != id ? 'DELETE_USER' : null}
              userStatus={userInfo?.id != id}
              isUserActive={active}
            />
          );
        }
      }
    ];
  }, [alignLeft, userInfo?.id, t]);

  const tableColumns = useMemo(() => {
    return columns?.filter(({ key }) => {
      return (
        key === 'id' || selectedColumns?.some((columnKey) => columnKey === key)
      );
    });
  }, [columns, selectedColumns]);

  return (
    <Table
      // @ts-ignore
      columns={tableColumns}
      emptyText={t('table:empty-table-data')}
      data={loading ? tablePlaceholderRow : users}
      rowKey="id"
      scroll={{ x: 800 }}
      className="mb-6 overflow-hidden border"
    />
  );
};

export default UserList;
