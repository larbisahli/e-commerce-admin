import ActionButtons from '@components/common/action-buttons';
import { Table } from '@components/ui/table';
import { RoleType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

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
        align: alignLeft,
        width: 80,
        ellipsis: true
      },
      {
        title: t('table:table-item-name'),
        dataIndex: 'roleName',
        key: 'roleName',
        align: alignLeft,
        width: 120,
        ellipsis: true,
        render: (roleName: string) => (
          <div>
            <span
              style={{ width: 'fit-content' }}
              className="font-medium text-13px md:text-sm rounded block border border-sink-base px-2 py-1 bg-gray-100"
            >
              {roleName}
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
    <>
      <div className="card overflow-hidden mb-6">
        <Table
          // @ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={roles}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default RoleList;
