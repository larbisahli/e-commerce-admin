import { Product, Suppliers, Tag } from '@ts-types/generated';
import differenceWith from 'lodash/differenceWith';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

type TShippings = {
  id?: string;
  zones?: {
    name: string;
    code: string;
  }[];
  shipping_price?: number;
};

const creationVariable = (values: Product): Product => {
  return {
    product_name: values.product_name,
    short_description: values.short_description,
    product_description: values.product_description,
    sku: values.sku,
    published: values.status === 'publish',
    quantity: Number(values?.quantity),
    sale_price: Number(values.sale_price),
    compare_price: Number(values.compare_price),
    buying_price: Number(values.buying_price),
    note: values.note,
    disable_out_of_stock: values?.disable_out_of_stock,
    categories: values?.categories?.map(({ id }) => {
      return { id };
    }),
    tags: values?.tags?.map(({ id }: Tag) => {
      return { id };
    }),
    suppliers: values?.suppliers?.map(({ id }: Suppliers) => {
      return { id };
    }),
    thumbnail: {
      image: values?.thumbnail?.image,
      placeholder: values?.thumbnail?.placeholder
    },
    gallery: values.gallery?.map((img) => {
      return {
        image: img?.image,
        placeholder: img?.placeholder
      };
    }),
    product_shipping_info: {
      weight: Number(values?.product_shipping_info?.weight),
      weight_unit: values?.product_shipping_info?.weight_unit,
      volume: Number(values?.product_shipping_info?.volume),
      volume_unit: values?.product_shipping_info?.volume_unit,
      dimension_width: Number(values?.product_shipping_info?.dimension_width),
      dimension_height: Number(values?.product_shipping_info?.dimension_height),
      dimension_depth: Number(values?.product_shipping_info?.dimension_depth),
      dimension_unit: values?.product_shipping_info?.dimension_unit
    },
    shippings: [
      ...Array.from(
        new Set(values?.shippings.map((value) => value.shipping_provider.id))
      )
    ]?.map((id) => {
      return {
        shipping_provider: { id },
        shipping_zones: [].concat(
          ...values?.shippings
            ?.filter((value) => value.shipping_provider.id === id)
            ?.map((sz) => {
              return {
                shipping_price: Number(
                  (sz?.shipping_zones as TShippings)?.shipping_price
                ),
                zones: (sz?.shipping_zones as TShippings)?.zones
              };
            })
        )
      };
    }),
    variations: values?.variations?.map((v) => {
      return {
        attribute: { id: v.attribute.id },
        attribute_values: v.attribute_values?.map((av) => {
          return { id: av.id };
        })
      };
    }),
    variation_options: values?.variation_options?.map((vo) => {
      return {
        title: vo.title,
        options: vo.options,
        image: vo.image,
        sale_price: Number(vo.sale_price),
        compare_price: Number(vo.compare_price),
        buying_price: Number(vo.buying_price),
        quantity: Number(vo.quantity),
        sku: vo.sku,
        active: !vo.is_disable
      };
    })
  };
};

const updateVariable = (values: Product, initialValues: Product) => {
  // 1) gallery block
  const galleryAdditions = differenceWith(
    values?.gallery,
    initialValues?.gallery,
    isEqual
  );
  const galleryDeletions = differenceWith(
    initialValues?.gallery,
    values?.gallery,
    isEqual
  );

  // 2) thumbnail block
  const thumbnailAddition = differenceWith(
    [values?.thumbnail],
    [initialValues?.thumbnail],
    isEqual
  );
  const thumbnailDeletion = differenceWith(
    [initialValues?.thumbnail],
    [values?.thumbnail],
    isEqual
  );

  // 3) categories block
  const categoriesAdditions = differenceWith(
    values?.categories,
    initialValues?.categories,
    isEqual
  );
  const categoriesDeletions = differenceWith(
    initialValues?.categories,
    values?.categories,
    isEqual
  );

  // 4) tags block
  const tagsAdditions = differenceWith(
    values?.tags,
    initialValues?.tags,
    isEqual
  );
  const tagsDeletions = differenceWith(
    initialValues?.tags,
    values?.tags,
    isEqual
  );

  // 5) suppliers block
  const suppliersAdditions = differenceWith(
    values?.suppliers,
    initialValues?.suppliers,
    isEqual
  );
  const suppliersDeletions = differenceWith(
    initialValues?.suppliers,
    values?.suppliers,
    isEqual
  );

  // 6) product main info block
  const newProductValues = {
    product_name: values.product_name,
    short_description: values.short_description,
    product_description: values.product_description,
    sku: values.sku,
    published: values.status === 'publish',
    quantity: Number(values?.quantity),
    sale_price: Number(values.sale_price),
    compare_price: Number(values.compare_price),
    buying_price: Number(values.buying_price),
    note: values.note,
    disable_out_of_stock: values?.disable_out_of_stock
  };

  const initProductValues = {
    product_name: initialValues.product_name,
    short_description: initialValues.short_description,
    product_description: initialValues.product_description,
    sku: initialValues.sku,
    published: initialValues.published,
    quantity: Number(initialValues?.quantity),
    sale_price: Number(initialValues.sale_price),
    compare_price: Number(initialValues.compare_price),
    buying_price: Number(initialValues.buying_price),
    note: initialValues.note,
    disable_out_of_stock: initialValues?.disable_out_of_stock
  };
  const productMainEqual = isEqual(initProductValues, newProductValues);
  const productMain = productMainEqual ? {} : newProductValues;

  // 7) product shipping info block
  const productShippingInfoEqual = isEqual(
    initialValues?.product_shipping_info,
    values?.product_shipping_info
  );

  const productShippingInfo = productShippingInfoEqual
    ? {}
    : values?.product_shipping_info;

  // 8) shippings block
  const newShippingValue = values?.shippings;

  const shippingsAdditions = differenceWith(
    newShippingValue,
    initialValues?.shippings,
    isEqual
  );

  // 9) variation options block

  const variation_options = values?.variation_options?.filter(
    (e) => e !== undefined
  );

  console.log('====>', {
    variation_options,
    init: initialValues?.variation_options
  });

  const variationOptionsAdditions = differenceWith(
    variation_options,
    initialValues?.variation_options,
    isEqual
  );

  const variationOptionsDeletions = initialValues?.variation_options?.filter(
    (vo) => {
      return isEmpty(variation_options?.find((v) => v?.id === vo?.id));
    }
  );

  // 10) variation block

  const variationAdditions = values?.variations
    ?.map((v) => {
      const initVariation = initialValues?.variations?.find(
        (vv) => vv?.attribute?.id === v?.attribute?.id
      );
      if (!isEmpty(initVariation)) {
        const addedValues = differenceWith(
          v?.attribute_values,
          initVariation?.attribute_values,
          isEqual
        );
        return isEmpty(addedValues)
          ? undefined
          : {
              attribute: { id: v.attribute.id },
              attribute_values: addedValues?.map((av) => {
                return { id: av.id };
              })
            };
      } else {
        return {
          attribute: { id: v.attribute.id },
          attribute_values: v.attribute_values?.map((av) => {
            return { id: av.id };
          })
        };
      }
    })
    ?.filter((e) => e !== undefined);

  const variationDeletions = initialValues?.variations
    ?.map((v) => {
      const valueVariation = values?.variations?.find(
        (vv) => vv?.attribute?.id === v?.attribute?.id
      );
      if (!isEmpty(valueVariation)) {
        const deletedValues = differenceWith(
          v?.attribute_values,
          valueVariation?.attribute_values,
          isEqual
        );
        return isEmpty(deletedValues)
          ? undefined
          : {
              attribute: { id: v.attribute.id },
              attribute_values: deletedValues?.map((av) => {
                return { id: av.id };
              })
            };
      } else {
        return {
          attribute: { id: v.attribute.id }
        };
      }
    })
    ?.filter((e) => e !== undefined);

  return {
    id: initialValues?.id,
    additions: {
      product_main: productMain,
      product_shipping_info: productShippingInfo,
      gallery: galleryAdditions?.map((img) => {
        return {
          image: img?.image,
          placeholder: img?.placeholder
        };
      }),
      thumbnail: isEmpty(thumbnailDeletion)
        ? null
        : {
            image: thumbnailAddition[0]?.image,
            placeholder: thumbnailAddition[0]?.placeholder
          },
      categories: categoriesAdditions?.map(({ id }) => {
        return { id };
      }),
      tags: tagsAdditions?.map(({ id }) => {
        return { id };
      }),
      suppliers: suppliersAdditions?.map(({ id }) => {
        return { id };
      }),
      shippings: shippingsAdditions,
      variation_options: variationOptionsAdditions?.map((vo) => {
        return {
          ...vo,
          buying_price: Number(vo?.buying_price),
          compare_price: Number(vo?.compare_price),
          quantity: Number(vo?.quantity),
          sale_price: Number(vo?.sale_price),
          active: !vo.is_disable
        };
      }),
      variations: variationAdditions
    },
    deletions: {
      gallery: galleryDeletions?.map((img) => {
        return {
          id: img?.id
        };
      }),
      thumbnail: isEmpty(thumbnailDeletion)
        ? null
        : { id: thumbnailDeletion[0]?.id },
      categories: categoriesDeletions?.map(({ id }) => {
        return { id };
      }),
      tags: tagsDeletions?.map(({ id }) => {
        return { id };
      }),
      suppliers: suppliersDeletions?.map(({ id }) => {
        return { id };
      }),
      variation_options: variationOptionsDeletions?.map((v) => {
        return { id: v?.id };
      }),
      variations: variationDeletions
    }
  };
};

export { creationVariable, updateVariable };
