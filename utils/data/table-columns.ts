// TODO: Add translation
export const COLUMNS = {
  'order-status': [
    { label: 'Name', key: 'name' },
    { label: 'Status', key: 'privacy' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Last Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  tag: [
    { label: 'Icon', key: 'icon' },
    { label: 'Name', key: 'name' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  supplier: [
    { label: 'Name', key: 'name' },
    { label: 'Company', key: 'company' },
    { label: 'Phone', key: 'phoneNumber' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  user: [
    { label: 'Profile', key: 'profile' },
    { label: 'Name', key: 'firstName' },
    { label: 'Role', key: 'role' },
    { label: 'Status', key: 'isAdmin' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phoneNumber' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  'shipping-zone': [
    { label: 'Logo', key: 'logo' },
    { label: 'Name', key: 'name' },
    { label: 'Company', key: 'company' },
    { label: 'Rate Type', key: 'rateType' },
    { label: 'Delivery Time', key: 'deliveryTime' },
    { label: 'Status', key: 'active' },
    { label: 'Free', key: 'freeShipping' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  product: [
    { label: 'sku', key: 'sku' },
    { label: 'type', key: 'type' },
    { label: 'Image', key: 'thumbnail' },
    { label: 'Name', key: 'name' },
    { label: 'Price/Unit', key: 'salePrice' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Status', key: 'published' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  'hero-banner': [
    { label: 'Thumbnail', key: 'thumbnail' },
    { label: 'Title', key: 'title' },
    { label: 'Clicks', key: 'clicks' },
    { label: 'Position', key: 'position' },
    { label: 'Status', key: 'published' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  coupon: [
    { label: 'Code', key: 'code' },
    { label: 'Order Amount Limit', key: 'orderAmountLimit' },
    { label: 'Value', key: 'discountValue' },
    { label: 'Status', key: 'active' },
    { label: 'Time Used', key: 'timesUsed' },
    { label: 'Usage limit', key: 'maxUsage' },
    { label: 'Start Date', key: 'couponStartDate' },
    { label: 'End Date', key: 'couponEndDate' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Last Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  category: [
    { label: 'Name', key: 'name' },
    { label: 'Menu', key: 'includeInMenu' },
    { label: 'Level', key: 'level' },
    { label: 'Position', key: 'position' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Last Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  attribute: [
    { label: 'Name', key: 'name' },
    { label: 'Values', key: 'values' },
    { label: 'Type', key: 'type' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Last Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  file: [
    { label: 'Image', key: 'image' },
    { label: 'Size', key: 'size' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Last Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  tax: [
    { label: 'Name', key: 'name' },
    { label: 'Tax rate', key: 'rate' },
    { label: 'Default', key: 'isDefault' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  manufacturer: [
    { label: 'Logo', key: 'logo' },
    { label: 'Name', key: 'name' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  'delivery-time': [
    { label: 'Name', key: 'name' },
    { label: 'Unit', key: 'unit' },
    { label: 'Minimum', key: 'min' },
    { label: 'Maximum', key: 'max' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  notification: [
    { label: 'Title', key: 'title' },
    { label: 'Date', key: 'date' },
    { label: 'Message', key: 'content' },
    { label: 'Actions', key: 'actions' }
  ],
  language: [
    { label: 'Language', key: 'name' },
    { label: 'local ID', key: 'localeId' },
    { label: 'Status', key: 'isDefault' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ],
  'system-store': [
    { label: 'Store View', key: 'name' },
    { label: 'Status', key: 'isDefault' },
    { label: 'Creation Date', key: 'createdAt' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ]
};
