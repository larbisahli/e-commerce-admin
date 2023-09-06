import ActionButtons from '@components/common/action-buttons';
import StarIcon from '@components/icons/star';
import ImageComponent from '@components/ImageComponent';
import Loader from '@components/ui/loader/loader';
import { siteSettings } from '@settings/site.settings';
import { ImageType, ThemeType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  themes: ThemeType[] | null | undefined;
};
const MyThemeList = ({ themes }: IProps) => {
  const { t } = useTranslation();

  const thumbnail = [
    {
      image: 'store/images/2023/5/1684555033_klcgqdchug.png',
      placeholder: 'store/images/2023/5/1684555033_klcgqdchug_placeholder.png'
    }
  ];

  const tableColumns = useMemo(() => {
    return [
      {
        title: t('table:table-item-logo'),
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        align: 'center',
        width: 85,
        render: (thumbnail_: ImageType[]) => {
          const { image, placeholder } = thumbnail[0] ?? {};
          return (
            <div className="h-[100px] w-[100px] min-w-0 overflow-hidden rounded-sm border shadow">
              <ImageComponent
                src={image ?? siteSettings.product.image}
                customPlaceholder={
                  placeholder ?? siteSettings.product.placeholder
                }
                width={100}
                height={100}
                objectFit="cover"
              />
            </div>
          );
        }
      },
      {
        title: t('table:table-item-title'),
        dataIndex: 'title',
        key: 'title',
        align: 'center',
        width: 120,
        ellipsis: true,
        render: (title: string) => (
          <div>
            <span
              style={{ width: 'fit-content' }}
              className="text-13px font-medium capitalize md:text-sm"
            >
              {title}
            </span>
          </div>
        )
      },
      {
        title: t('table:table-item-description'),
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        width: 120,
        ellipsis: true,
        render: (description: string) => (
          <div>
            <span
              style={{ width: 'fit-content' }}
              className="text-13px font-medium capitalize md:text-sm"
            >
              {description}
            </span>
          </div>
        )
      },
      {
        title: t('table:table-item-theme-path'),
        dataIndex: 'themePath',
        key: 'themePath',
        align: 'center',
        width: 120,
        render: (themePath: string) => (
          <div>
            <span
              style={{ width: 'fit-content' }}
              className="text-13px font-semibold md:text-sm"
            >
              {themePath}
            </span>
          </div>
        )
      },
      {
        title: t('table:table-item-version'),
        dataIndex: 'version',
        key: 'version',
        align: 'center',
        width: 90,
        render: (version: string) => (
          <div>
            <span
              style={{ width: 'fit-content' }}
              className="text-13px font-semibold text-gray-400 md:text-sm"
            >
              {`v: ${version}`}
            </span>
          </div>
        )
      },
      {
        title: t('table:table-item-rating'),
        dataIndex: 'ratingStarCount',
        key: 'ratingStarCount',
        align: 'center',
        width: 100,
        ellipsis: true,
        render: (ratingStarCount: number) => (
          <div className="flex items-center justify-center">
            {Array.from({ length: ratingStarCount })?.map((_, idx) => (
              <StarIcon key={idx} />
            ))}
            <span className="mx-[3px] pt-[5px] text-xs text-gray-500">
              {`(${ratingStarCount})`}
            </span>
          </div>
        )
      },
      {
        title: t('table:table-item-actions'),
        dataIndex: 'id',
        key: 'actions',
        width: 80,
        align: 'center',
        render: (id: string, record: ThemeType) => (
          <ActionButtons
            id={id}
            editUrl={record.isDefault ? `${ROUTES.THEME}/${id}` : null}
            activate={!record.isDefault}
            deleteModalView={!record.isDefault ? 'DELETE_STORE_THEME' : null}
          />
        )
      }
    ];
  }, [t]);

  return (
    <Table
      //@ts-ignore
      columns={tableColumns}
      emptyText={t('table:empty-table-data')}
      data={themes}
      rowKey="id"
      scroll={{ x: 800 }}
      className="card mb-6 overflow-hidden"
    />
  );
};

export default MyThemeList;
