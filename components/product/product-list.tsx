import ActionButtons from '@components/common/action-buttons';
import ImageComponent from '@components/ImageComponent';
import Badge from '@components/ui/badge/badge';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { siteSettings } from '@settings/site.settings';
import type { Nullable } from '@ts-types/custom.types';
import type { Category, IMGType, Product } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

type IProps = {
  products: Nullable<Product[]>;
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const ProductList = ({
  products,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  let columns = [
    {
      title: t('table:table-item-image'),
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      align: alignLeft,
      width: 85,
      render: (thumbnail: IMGType) => (
        <div className="shadow min-w-0 overflow-hidden">
          <ImageComponent
            src={thumbnail?.image ?? siteSettings.product.image}
            customPlaceholder={
              thumbnail?.placeholder ?? siteSettings.product.placeholder
            }
            layout="fill"
            objectFit="contain"
            className="overflow-hidden"
          />
        </div>
      )
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'product_name',
      key: 'product_name',
      align: alignLeft,
      width: 200,
      ellipsis: true
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
          ?.map(({ category_name }: Category, index: number) => {
            return index > 0 ? `, ${category_name}` : `${category_name}`;
          })
          ?.join('');
        return (
          <span
            title={categories_values}
            className="whitespace-nowrap truncate"
          >
            {categories_values}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-unit'),
      dataIndex: 'sale_price',
      key: 'sale_price',
      align: alignRight,
      width: 100,
      render: (sale_price: number, record: Product) => {
        if (record?.max_price > 0 && record?.min_price > 0) {
          return (
            <span
              className="whitespace-nowrap"
              title={`$${record?.min_price} - $${record?.max_price}`}
            >{`$${record?.min_price} - $${record?.max_price}`}</span>
          );
        } else {
          return (
            <span className="whitespace-nowrap" title={`$${sale_price}`}>
              {`$${sale_price}`}
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
      dataIndex: 'created_at',
      key: 'created_at',
      align: alignLeft,
      width: 180,
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
          <div>{`${created_by?.first_name ?? ''} ${
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

  return (
    <>
      <div className="card overflow-hidden mb-6">
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={products}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>

      {!!total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={total}
            current={currentPage}
            pageSize={perPage}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
