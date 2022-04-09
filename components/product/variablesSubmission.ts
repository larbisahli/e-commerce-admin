import { Product, Suppliers, Tag } from '@ts-types/generated';
import differenceWith from 'lodash/differenceWith';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

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
    shippings: values?.shippings?.map((value) => {
      return {
        shipping_provider: { id: value?.shipping_provider?.id },
        shipping_zones: value?.shipping_zones?.map((sz) => {
          return {
            shipping_price: Number(sz?.shipping_price),
            zones: sz?.zones
          };
        })
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
        active: vo.is_disable
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

  // 7) product shipping info block
  const productShippingInfoEqual = isEqual(
    initialValues?.product_shipping_info,
    values?.product_shipping_info
  );

  // 8) shippings block
  const shippingsAdditions = differenceWith(
    values?.shippings,
    initialValues?.shippings,
    isEqual
  );
  console.log('shippings', { shippingsAdditions });
  console.log('===>', {
    init: initialValues?.shippings,
    new: values?.shippings
  });
  // 9) variation options block
  // 10) variation block

  return {
    additions: {
      product_main: productMainEqual ? {} : newProductValues,
      product_shipping_info: productShippingInfoEqual
        ? {}
        : values?.product_shipping_info,
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
      })
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
      })
    }
  };
};

export { creationVariable, updateVariable };
