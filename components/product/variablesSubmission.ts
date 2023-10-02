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
    manufacturers: values?.manufacturers?.map(({ id }) => ({ id })),
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
    variationOptions: values?.variationOptions?.map(
      ({ thumbnail, isDisable, ...rest }) => {
        return {
          ...rest,
          thumbnail: thumbnail?.map(({ id }) => ({ id })),
          active: !isDisable
        };
      }
    ),
    relatedProducts: values?.relatedProducts?.map(({ id }) => ({ id })) ?? [],
    upsellProducts: values?.upsellProducts?.map(({ id }) => ({ id })) ?? [],
    crossSellProducts:
      values?.crossSellProducts?.map(({ id }) => ({ id })) ?? []
  };
};

export { creationVariable };
