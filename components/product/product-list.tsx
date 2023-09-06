import ActionButtons from '@components/common/action-buttons';
import ImageComponent from '@components/ImageComponent';
import Badge from '@components/ui/badge/badge';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { siteSettings } from '@settings/site.settings';
import type { Nullable } from '@ts-types/custom.types';
import {
  Category,
  CreatedUpdatedByAt,
  ImageType,
  Product,
  ProductType
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { memo, useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  products: Nullable<Product[]>;
  selectedColumns: string[];
  loading: boolean;
};

interface TableRowProps extends Product {
  loading: boolean;
}

const ProductList = ({ loading, products, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  const { tablePlaceholderRow } = usePlaceholder();

  let columns = useMemo(() => {
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
        title: t('table:table-item-image'),
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        align: alignLeft,
        width: 85,
        render: (thumbnail: ImageType, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          const { image, placeholder } = thumbnail[0] ?? {};
          return (
            <div className="h-[65px] w-[65px] min-w-0 overflow-hidden rounded-sm border shadow">
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
        dataIndex: 'name',
        key: 'name',
        align: alignLeft,
        width: 200,
        ellipsis: true,
        render: (name: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return name;
        }
      },
      {
        title: t('table:table-item-sku'),
        dataIndex: 'sku',
        key: 'sku',
        align: alignLeft,
        width: 80,
        ellipsis: true,
        render: (sku: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return !isEmpty(sku) ? sku : 'N/A';
        }
      },
      {
        title: t('table:table-item-categories'),
        dataIndex: 'categories',
        key: 'categories',
        width: 180,
        align: 'center',
        ellipsis: true,
        render: (categories: Category[], record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          const categories_values = categories
            ?.map(({ name }: Category, index: number) => {
              return index > 0 ? `, ${name}` : `${name}`;
            })
            ?.join('');
          return (
            <span
              title={categories_values}
              className="truncate whitespace-nowrap"
            >
              {!isEmpty(categories) ? categories_values : 'N/A'}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-unit'),
        dataIndex: 'salePrice',
        key: 'salePrice',
        align: alignRight,
        width: 100,
        render: (salePrice: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          if (record.type.id === ProductType.Variable) {
            return (
              <span
                className="whitespace-nowrap"
                title={`$${record?.minPrice} - $${record?.maxPrice}`}
              >{`$${record?.minPrice} - $${record?.maxPrice}`}</span>
            );
          } else {
            return (
              <span className="whitespace-nowrap" title={`$${salePrice}`}>
                {`$${salePrice}`}
              </span>
            );
          }
        }
      },
      {
        title: t('table:table-item-quantity'),
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center',
        width: 100,
        render: (quantity: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return quantity;
        }
      },
      {
        title: t('table:table-item-status'),
        dataIndex: 'published',
        key: 'published',
        align: 'center',
        width: 100,
        render: (published: boolean, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <Badge
              text={published ? 'Publish' : 'Draft'}
              color={published ? 'bg-green-600' : 'bg-yellow-500'}
            />
          );
        }
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: alignLeft,
        width: 180,
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
          return (
            <div>{`${createdBy?.firstName ?? ''} ${
              createdBy?.lastName ?? ''
            }`}</div>
          );
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
          return (
            <div>{`${updatedBy?.firstName ?? ''} ${
              updatedBy?.lastName ?? ''
            }`}</div>
          );
        }
      },
      {
        title: t('table:table-item-actions'),
        dataIndex: 'id',
        key: 'actions',
        align: 'center',
        width: 120,
        render: (id: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <ActionButtons
              id={id}
              editUrl={`${ROUTES.PRODUCT}/edit/${id}`}
              deleteModalView="DELETE_PRODUCT"
            />
          );
        }
      }
    ];
  }, [alignLeft, alignRight, t]);

  const tableColumns = useMemo(() => {
    return columns?.filter(({ key }) => {
      return (
        key === 'id' || selectedColumns?.some((columnKey) => columnKey === key)
      );
    });
  }, [columns, selectedColumns]);

  return (
    <Table
      /* @ts-ignore */
      columns={tableColumns}
      emptyText={t('table:empty-table-data')}
      data={loading ? tablePlaceholderRow : products}
      rowKey="id"
      scroll={{ x: 800 }}
      className="card mb-6 overflow-hidden"
    />
  );
};

export default memo(ProductList);
