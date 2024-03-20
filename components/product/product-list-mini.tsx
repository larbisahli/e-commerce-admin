import ImageComponent from '@components/ImageComponent';
import Checkbox from '@components/ui/checkbox';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import { usePlaceholder } from '@hooks/usePlaceholder';
import useScreenSize from '@hooks/useScreenSize';
import { siteSettings } from '@settings/site.settings';
import type { Nullable } from '@ts-types/custom.types';
import type { ImageType, Product } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  products: Nullable<Product[]>;
  setSelectedProducts: React.Dispatch<{ id: string }[]>;
  selectedProducts: { id: string }[];
  loading: boolean;
};

interface TableRowProps extends Product {
  loading: boolean;
}

const ProductListMini = ({
  products,
  setSelectedProducts,
  selectedProducts,
  loading
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const { tablePlaceholderRow } = usePlaceholder(4);

  const screenSize = useScreenSize();

  let tableColumns = useMemo(() => {
    return [
      {
        title: t('table:table-item-id'),
        dataIndex: 'id',
        key: 'id',
        align: alignLeft,
        width: 50,
        ellipsis: true,
        render: (id: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder type="checkbox" />;
          }
          return (
            <Checkbox
              name="image"
              labelClassName="w-full"
              label={id}
              id={id}
              onChange={() => {
                setSelectedProducts((prev) => {
                  if (prev?.some((v) => v.id === id)) {
                    return prev?.filter((v) => v.id !== id);
                  }
                  return [...prev, record];
                });
              }}
              checked={selectedProducts?.some((selected) => selected.id === id)}
            />
          );
        }
      },
      {
        title: t('table:table-item-thumbnail'),
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        align: 'left',
        width: 45,
        render: (thumbnail: ImageType, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          const { image = null, placeholder = null } = isEmpty(thumbnail)
            ? {}
            : thumbnail[0];
          return (
            <div className="h-[45px] w-[45px] min-w-0 overflow-hidden rounded-sm border shadow">
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
        width: 80,
        ellipsis: true,
        render: (name: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <div className="font-semibold text-gray-600">{name}</div>;
        }
      },
      {
        title: t('table:table-item-quantity'),
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center',
        width: 30,
        render: (quantity: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return quantity;
        }
      },
      {
        title: t('table:table-item-sku'),
        dataIndex: 'sku',
        key: 'sku',
        align: 'center',
        width: 40,
        ellipsis: true,
        render: (sku: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return sku;
        }
      }
    ];
  }, [alignLeft, selectedProducts, setSelectedProducts, t]);

  return (
    <Table
      /* @ts-ignore */
      columns={tableColumns}
      emptyText={t('table:empty-table-data')}
      data={loading ? tablePlaceholderRow : products}
      rowKey="id"
      scroll={{ x: 400, y: screenSize.height - 260 }}
      className="mb-6 border"
    />
  );
};

export default ProductListMini;
