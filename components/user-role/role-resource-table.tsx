import Checkbox from '@components/ui/checkbox';
import Loader from '@components/ui/loader/loader';
import { ACTION_PRIVILEGES } from '@ts-types/enums';
import { ResourcePermissionType } from '@ts-types/index';
import { useIsRTL } from '@utils/locals';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  roles: ResourcePermissionType[];
  setRoles: any;
};

const RoleResourceTable = ({ setRoles, roles }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-resource'),
        dataIndex: 'resource',
        key: 'resource',
        align: alignLeft,
        width: 130,
        ellipsis: true,
        render: (resource: string) => (
          <div>
            <span className="font-semibold">{resource}</span>
          </div>
        )
      },
      {
        title: t('table:table-item-write'),
        dataIndex: [ACTION_PRIVILEGES.WRITE],
        key: [ACTION_PRIVILEGES.WRITE],
        align: 'center',
        width: 70,
        render: (value, resource) => (
          <RenderResourceComponent
            field={ACTION_PRIVILEGES.WRITE}
            value={value}
            resource={resource}
            setRoles={setRoles}
          />
        )
      },
      {
        title: t('table:table-item-read'),
        dataIndex: [ACTION_PRIVILEGES.READ],
        key: [ACTION_PRIVILEGES.READ],
        align: 'center',
        width: 70,
        render: (value, resource) => (
          <RenderResourceComponent
            field={ACTION_PRIVILEGES.READ}
            value={value}
            resource={resource}
            setRoles={setRoles}
          />
        )
      },
      {
        title: t('table:table-item-update'),
        dataIndex: [ACTION_PRIVILEGES.UPDATE],
        key: [ACTION_PRIVILEGES.UPDATE],
        align: 'center',
        width: 70,
        render: (value, resource) => (
          <RenderResourceComponent
            field={ACTION_PRIVILEGES.UPDATE}
            value={value}
            resource={resource}
            setRoles={setRoles}
          />
        )
      },
      {
        title: t('table:table-item-delete'),
        dataIndex: [ACTION_PRIVILEGES.DELETE],
        key: [ACTION_PRIVILEGES.DELETE],
        align: 'center',
        width: 70,
        render: (value, resource) => (
          <RenderResourceComponent
            field={ACTION_PRIVILEGES.DELETE}
            value={value}
            resource={resource}
            setRoles={setRoles}
          />
        )
      },
      {
        title: t('table:table-item-all'),
        align: 'center',
        width: 70,
        render: (_, resource) => (
          <RenderResourceComponent
            field={'select'}
            value={'all'}
            resource={resource}
            setRoles={setRoles}
            selectAll={resource}
          />
        )
      }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alignLeft]);

  return (
    <>
      <div className="mb-6 overflow-hidden border">
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

const RenderResourceComponent = ({
  field,
  value,
  resource: { resource, write, update, delete: del, read },
  setRoles,
  selectAll = false
}) => {
  const selectAllValue = useMemo(
    () => write && update && del && read,
    [write, update, del, read]
  );
  return (
    <Checkbox
      name={`${resource}-${field}`}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const checked = target['checked'];
        setRoles((state) => {
          return state?.map((role) => {
            if (role.resource === resource) {
              if (selectAll) {
                return {
                  ...role,
                  [ACTION_PRIVILEGES.DELETE]: checked,
                  [ACTION_PRIVILEGES.READ]: checked,
                  [ACTION_PRIVILEGES.WRITE]: checked,
                  [ACTION_PRIVILEGES.UPDATE]: checked
                };
              }
              return {
                ...role,
                [field]: checked
              };
            }
            return role;
          });
        });
      }}
      checked={selectAll ? selectAllValue : value}
      className="flex w-full justify-center"
    />
  );
};

export default RoleResourceTable;
