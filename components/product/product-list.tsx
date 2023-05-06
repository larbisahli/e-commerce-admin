import ActionButtons from '@components/common/action-buttons';
import ImageComponent from '@components/ImageComponent';
import Badge from '@components/ui/badge/badge';
import { Table } from '@components/ui/table';
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
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

type IProps = {
  products: Nullable<Product[]>;
  selectedColumns: string[];
};

const ProductList = ({ products, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

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
        render: (thumbnail: ImageType) => {
          const { image, placeholder } = thumbnail[0] ?? {};
          return (
            <div className="shadow min-w-0 overflow-hidden rounded-sm w-[65px] h-[65px] border">
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
        ellipsis: true
      },
      {
        title: t('table:table-item-sku'),
        dataIndex: 'sku',
        key: 'sku',
        align: alignLeft,
        width: 80,
        ellipsis: true,
        render: (sku: string) => {
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
        render: (categories: Category[]) => {
          const categories_values = categories
            ?.map(({ name }: Category, index: number) => {
              return index > 0 ? `, ${name}` : `${name}`;
            })
            ?.join('');
          return (
            <span
              title={categories_values}
              className="whitespace-nowrap truncate"
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
        render: (salePrice: number, record: Product) => {
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
        width: 100
      },
      {
        title: t('table:table-item-status'),
        dataIndex: 'published',
        key: 'published',
        align: 'center',
        width: 100,
        render: (published: boolean) => (
          <Badge
            text={published ? 'Publish' : 'Draft'}
            color={published ? 'bg-accent' : 'bg-yellow-400'}
          />
        )
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: alignLeft,
        width: 180,
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
        render: (createdBy: CreatedUpdatedByAt['createdBy']) => {
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
        width: 140,
        ellipsis: true,
        render: (updatedBy: CreatedUpdatedByAt['updatedBy']) => {
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
        width: 80,
        render: (id: string) => (
          <ActionButtons
            id={id}
            editUrl={`${ROUTES.PRODUCTS}/edit/${id}`}
            deleteModalView="DELETE_PRODUCT"
          />
        )
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
    <>
      <div className="card overflow-hidden mb-6">
        <Table
          /* @ts-ignore */
          columns={tableColumns}
          emptyText={t('table:empty-table-data')}
          data={products}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default ProductList;
