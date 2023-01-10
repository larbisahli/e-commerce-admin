export const initialState = {
  tag: {
    columns: ['icon', 'name', 'createdAt', 'createdBy', 'updatedBy', 'actions']
  },
  supplier: {
    columns: [
      'name',
      'company',
      'phoneNumber',
      'createdAt',
      'createdBy',
      'updatedBy',
      'actions'
    ]
  },
  staff: {
    columns: [
      'profile',
      'name',
      'role',
      'active',
      'phoneNumber',
      'createdAt',
      'createdBy',
      'updatedBy',
      'actions'
    ]
  },
  'shipping-zone': {
    columns: [
      'name',
      'company',
      'rateType',
      'active',
      'freeShipping',
      'createdAt',
      'createdBy',
      'updatedBy',
      'actions'
    ]
  },
  product: {
    columns: [
      'sku',
      'thumbnail',
      'name',
      'categories',
      'salePrice',
      'quantity',
      'published',
      'createdAt',
      'createdBy',
      'updatedBy',
      'actions'
    ]
  },
  'order-status': {
    columns: [
      'name',
      'privacy',
      'createdAt',
      'createdBy',
      'updatedBy',
      'actions'
    ]
  },
  'hero-carousel': {
    columns: [
      'thumbnail',
      'title',
      'clicks',
      'displayOrder',
      'published',
      'createdAt',
      'createdBy',
      'updatedBy',
      'actions'
    ]
  },
  coupon: {
    columns: [
      'code',
      'orderAmountLimit',
      'discountValue',
      'active',
      'timesUsed',
      'maxUsage',
      'couponStartDate',
      'couponEndDate',
      'createdBy',
      'updatedBy',
      'actions'
    ]
  },
  category: {
    columns: [
      'name',
      'icon',
      'description',
      'createdAt',
      'createdBy',
      'updatedBy',
      'actions'
    ]
  },
  attribute: {
    columns: ['name', 'value', 'createdAt', 'createdBy', 'updatedBy', 'actions']
  }
};
