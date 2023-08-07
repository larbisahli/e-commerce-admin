import ImageComponent from '@components/ImageComponent';
import Checkbox from '@components/ui/checkbox';
import { siteSettings } from '@settings/site.settings';
import type { Nullable } from '@ts-types/custom.types';
import type { ImageType, Product } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false }
);

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
        width: 50,
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
        title: t('table:table-item-thumbnail'),
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        align: 'left',
        width: 45,
        render: (thumbnail: ImageType) => {
          const { image, placeholder } = thumbnail[0] ?? {};
          return (
            <div className="shadow min-w-0 overflow-hidden rounded-sm w-[45px] h-[45px] border">
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

  return (
    <>
      <div className="card overflow-hidden mb-6">
        <Table
          /* @ts-ignore */
          columns={tableColumns}
          emptyText={t('table:empty-table-data')}
          data={products}
          rowKey="id"
          scroll={{ x: 400 }}
        />
      </div>
    </>
  );
};

export default ProductListMini;
