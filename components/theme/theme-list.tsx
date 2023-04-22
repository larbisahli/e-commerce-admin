import { Table } from '@components/ui/table';
import { ThemeType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

type IProps = {
  themes: ThemeType[] | null | undefined;
};
const ThemeList = ({ themes }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-theme-title'),
        dataIndex: 'themeTitle',
        key: 'themeTitle',
        align: alignLeft,
        ellipsis: true,
        render: (name: string) => (
          <div>
            <span className="font-semibold text-gray-800">{name}</span>
          </div>
        )
      },
      {
        title: t('table:table-item-theme-path'),
        dataIndex: 'themePath',
        key: 'themePath',
        align: alignLeft,
        ellipsis: true,
        render: (name: string) => (
          <div>
            <span className="font-semibold text-gray-800">{name}</span>
          </div>
        )
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
          data={themes}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default ThemeList;
