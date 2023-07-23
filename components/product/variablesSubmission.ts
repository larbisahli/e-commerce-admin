import { Product, ProductType } from '@ts-types/generated';

const creationVariable = (values: Product): Product => {
  const isVariable = values.type.id === ProductType.Variable;
  return {
    ...values,
    type: { id: values.type.id },
    published: values.status === 'publish',
    quantity: isVariable ? 0 : values?.quantity,
    salePrice: isVariable ? 0 : values.salePrice,
    comparePrice: isVariable ? 0 : values.comparePrice,
    buyingPrice: isVariable ? 0 : values.buyingPrice,
    sku: isVariable ? null : values.sku,
    productSeo: {
      ...values.productSeo,
      metaImage: values.productSeo.metaImage?.map(({ id }) => ({ id }))
    },
    categories: values?.categories?.map(({ id }) => ({ id })),
    manufacturer: values?.manufacturer,
    tags: values?.tags?.map(({ id }) => ({ id })),
    suppliers: values?.suppliers?.map(({ id }) => ({ id })),
    thumbnail: values.thumbnail?.map(({ id }) => ({ id })),
    gallery: values.gallery?.map(({ id }) => ({ id })),
    variations: values?.variations?.map((v) => {
      return {
        attribute: { id: v.attribute.id },
        selectedValues: v.selectedValues?.map(({ id }) => ({ id }))
      };
    }),
    variationOptions: values?.variationOptions?.map((vo) => {
      return {
        title: vo.title,
        options: vo.options,
        thumbnail: vo.thumbnail?.map(({ id }) => ({ id })),
        salePrice: vo.salePrice,
        comparePrice: vo.comparePrice,
        buyingPrice: vo.buyingPrice,
        quantity: vo.quantity,
        sku: vo.sku,
        active: !vo.isDisable
      };
    }),
    relatedProducts: values?.relatedProducts?.map(({ id }) => ({ id })) ?? [],
    upsellProducts: values?.upsellProducts?.map(({ id }) => ({ id })) ?? [],
    crossSellProducts:
      values?.crossSellProducts?.map(({ id }) => ({ id })) ?? []
  };
};

export { creationVariable };
