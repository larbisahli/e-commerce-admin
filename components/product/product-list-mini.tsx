import ImageComponent from '@components/ImageComponent';
import Badge from '@components/ui/badge/badge';
import Checkbox from '@components/ui/checkbox';
import { Table } from '@components/ui/table';
import { siteSettings } from '@settings/site.settings';
import type { Nullable } from '@ts-types/custom.types';
import type { ImageType, Product } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

type IProps = {
  products: Nullable<Product[]>;
  setSelectedProducts: React.Dispatch<{ id: string }[]>;
  selectedProducts: { id: string }[];
};

const ProductListMini = ({
  products,
  setSelectedProducts,
  selectedProducts
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  let tableColumns = useMemo(() => {
    return [
      {
        title: t('table:table-item-id'),
        dataIndex: 'id',
        key: 'id',
        align: alignLeft,
        width: 30,
        ellipsis: true,
        render: (id: string, record: Product) => (
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
        )
      },
      {
        title: t('table:table-item-image'),
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        align: 'center',
        width: 50,
        render: (thumbnail: ImageType) => (
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
        dataIndex: 'name',
        key: 'name',
        align: alignLeft,
        width: 80,
        ellipsis: true,
        render: (name: string) => (
          <div className="text-gray-600 font-semibold">{name}</div>
        )
      },
      {
        title: t('table:table-item-quantity'),
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center',
        width: 30
      },
      {
        title: t('table:table-item-sku'),
        dataIndex: 'sku',
        key: 'sku',
        align: 'center',
        width: 40,
        ellipsis: true
      }
    ];
  }, [selectedProducts]);

  const productsss = [
    {
      id: 1,
      name: 'flex overflow-y-auto flex-col bg-white-1',
      sku: 'A',
      published: true,
      quantity: 23
    },
    {
      id: 2,
      name: 'flex overflow-y-auto flex-col bg-white-2',
      sku: 'B',
      published: false,
      quantity: 23
    },
    {
      id: 3,
      name: 'flex overflow-y-auto flex-col bg-white-1',
      sku: 'A',
      published: true,
      quantity: 23
    },
    {
      id: 4,
      name: 'product-2',
      sku: 'B',
      published: false,
      quantity: 23
    },
    {
      id: 5,
      name: 'flex overflow-y-auto flex-col bg-white-1',
      sku: 'A',
      quantity: 23,
      published: true
    },
    {
      id: 6,
      name: 'product-2',
      sku: 'B',
      published: false,
      quantity: 23
    },
    {
      id: 7,
      name: 'flex overflow-y-auto flex-col bg-white-1',
      sku: 'A',
      published: true
    },
    {
      id: 8,
      name: 'product-2',
      sku: 'B',
      published: false
    },
    {
      id: 9,
      name: 'product-2',
      sku: 'BVY-DNY-MW',
      published: false
    },
    {
      id: 10,
      name: 'flex overflow-y-auto flex-col bg-white flex overflow-y-auto flex-col bg-white-1',
      sku: 'A',
      published: true
    },
    {
      id: 11,
      name: 'product-2',
      sku: 'B',
      published: false
    }
  ];

  return (
    <>
      <div className="card overflow-hidden mb-6">
        <Table
          /* @ts-ignore */
          columns={tableColumns}
          emptyText={t('table:empty-table-data')}
          data={productsss}
          rowKey="id"
          scroll={{ x: 400 }}
        />
      </div>
    </>
  );
};

export default ProductListMini;
