if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + '.js', c).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const n =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[n]) return;
    let t = {};
    const r = (e) => a(e, n),
      d = { module: { uri: n }, exports: t, require: r };
    s[n] = Promise.all(c.map((e) => d[e] || r(e))).then((e) => (i(...e), t));
  };
}
define(['./workbox-588899ac'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/chunks/1033.d537b9fbd0c9457f.js',
          revision: 'd537b9fbd0c9457f'
        },
        {
          url: '/_next/static/chunks/115.8e695e79a7f7b096.js',
          revision: '8e695e79a7f7b096'
        },
        {
          url: '/_next/static/chunks/1152.f8e29f7181f41d01.js',
          revision: 'f8e29f7181f41d01'
        },
        {
          url: '/_next/static/chunks/1240.cb92513d0a31b088.js',
          revision: 'cb92513d0a31b088'
        },
        {
          url: '/_next/static/chunks/1352.7659715677b0a545.js',
          revision: '7659715677b0a545'
        },
        {
          url: '/_next/static/chunks/1438.755848ca8768c6c5.js',
          revision: '755848ca8768c6c5'
        },
        {
          url: '/_next/static/chunks/1549.161851b5972c3bf0.js',
          revision: '161851b5972c3bf0'
        },
        {
          url: '/_next/static/chunks/1564-321fbecae744b344.js',
          revision: '321fbecae744b344'
        },
        {
          url: '/_next/static/chunks/1580.ebde0f95f61e23db.js',
          revision: 'ebde0f95f61e23db'
        },
        {
          url: '/_next/static/chunks/172.1a3a25a6b850cf74.js',
          revision: '1a3a25a6b850cf74'
        },
        {
          url: '/_next/static/chunks/1781.8fdd74208c867948.js',
          revision: '8fdd74208c867948'
        },
        {
          url: '/_next/static/chunks/1794.6c1425c1f7ed940e.js',
          revision: '6c1425c1f7ed940e'
        },
        {
          url: '/_next/static/chunks/195-d0ff3455247b7e6e.js',
          revision: 'd0ff3455247b7e6e'
        },
        {
          url: '/_next/static/chunks/1986.506a934552b213a5.js',
          revision: '506a934552b213a5'
        },
        {
          url: '/_next/static/chunks/19b7e487-44772ee9a0ef439e.js',
          revision: '44772ee9a0ef439e'
        },
        {
          url: '/_next/static/chunks/241.f99cd4f6e5ef6df3.js',
          revision: 'f99cd4f6e5ef6df3'
        },
        {
          url: '/_next/static/chunks/2453.e47a0fabdec8ac49.js',
          revision: 'e47a0fabdec8ac49'
        },
        {
          url: '/_next/static/chunks/256-3ea039e756ef49b5.js',
          revision: '3ea039e756ef49b5'
        },
        {
          url: '/_next/static/chunks/263.ab4a31cd1950d6d2.js',
          revision: 'ab4a31cd1950d6d2'
        },
        {
          url: '/_next/static/chunks/2786.67f34414c7ac768b.js',
          revision: '67f34414c7ac768b'
        },
        {
          url: '/_next/static/chunks/2837.2764b96bccfc64f9.js',
          revision: '2764b96bccfc64f9'
        },
        {
          url: '/_next/static/chunks/2890.a19b32690071371c.js',
          revision: 'a19b32690071371c'
        },
        {
          url: '/_next/static/chunks/2c386607.6827ac0e27e65c3a.js',
          revision: '6827ac0e27e65c3a'
        },
        {
          url: '/_next/static/chunks/3085.c5332b2b587b016c.js',
          revision: 'c5332b2b587b016c'
        },
        {
          url: '/_next/static/chunks/3174-5e04838c6da2bfc6.js',
          revision: '5e04838c6da2bfc6'
        },
        {
          url: '/_next/static/chunks/3342.50eaa6fb319b239d.js',
          revision: '50eaa6fb319b239d'
        },
        {
          url: '/_next/static/chunks/3428.0c4de2fe37969565.js',
          revision: '0c4de2fe37969565'
        },
        {
          url: '/_next/static/chunks/3627.56e5559609d67776.js',
          revision: '56e5559609d67776'
        },
        {
          url: '/_next/static/chunks/3642.abb5af8ad8129dec.js',
          revision: 'abb5af8ad8129dec'
        },
        {
          url: '/_next/static/chunks/3699-1fb34e274b179b55.js',
          revision: '1fb34e274b179b55'
        },
        {
          url: '/_next/static/chunks/3741.f907638242eea923.js',
          revision: 'f907638242eea923'
        },
        {
          url: '/_next/static/chunks/3826.dc7275f96a6aac14.js',
          revision: 'dc7275f96a6aac14'
        },
        {
          url: '/_next/static/chunks/385-0e7f3214ccdbac4b.js',
          revision: '0e7f3214ccdbac4b'
        },
        {
          url: '/_next/static/chunks/3850.90a183086be9c8f2.js',
          revision: '90a183086be9c8f2'
        },
        {
          url: '/_next/static/chunks/3913.e933a5698b4c375f.js',
          revision: 'e933a5698b4c375f'
        },
        {
          url: '/_next/static/chunks/40.51fb61d38b92f225.js',
          revision: '51fb61d38b92f225'
        },
        {
          url: '/_next/static/chunks/4149-8c5d791a3d1b3310.js',
          revision: '8c5d791a3d1b3310'
        },
        {
          url: '/_next/static/chunks/4320.a77c26d70a1788eb.js',
          revision: 'a77c26d70a1788eb'
        },
        {
          url: '/_next/static/chunks/4332.65dbba7cbbcc1605.js',
          revision: '65dbba7cbbcc1605'
        },
        {
          url: '/_next/static/chunks/4444-6f57c9ce3578a0f2.js',
          revision: '6f57c9ce3578a0f2'
        },
        {
          url: '/_next/static/chunks/46.581fd2412261f6da.js',
          revision: '581fd2412261f6da'
        },
        {
          url: '/_next/static/chunks/5158.4e1c1ae07604e288.js',
          revision: '4e1c1ae07604e288'
        },
        {
          url: '/_next/static/chunks/5248.b0e7fb9f078e6913.js',
          revision: 'b0e7fb9f078e6913'
        },
        {
          url: '/_next/static/chunks/5364.09d160e68754bc56.js',
          revision: '09d160e68754bc56'
        },
        {
          url: '/_next/static/chunks/5401-6d79157d8a1d8a96.js',
          revision: '6d79157d8a1d8a96'
        },
        {
          url: '/_next/static/chunks/5562.51fd8b8fc55c295a.js',
          revision: '51fd8b8fc55c295a'
        },
        {
          url: '/_next/static/chunks/558.aea6bd363d390db4.js',
          revision: 'aea6bd363d390db4'
        },
        {
          url: '/_next/static/chunks/5592.661b9ec7768e3894.js',
          revision: '661b9ec7768e3894'
        },
        {
          url: '/_next/static/chunks/5600.de823cd9307fc13d.js',
          revision: 'de823cd9307fc13d'
        },
        {
          url: '/_next/static/chunks/5754.b3db8c70b4b6edd8.js',
          revision: 'b3db8c70b4b6edd8'
        },
        {
          url: '/_next/static/chunks/5877.04ea25110b6543ea.js',
          revision: '04ea25110b6543ea'
        },
        {
          url: '/_next/static/chunks/6039-b1c13d0d2b3c72ca.js',
          revision: 'b1c13d0d2b3c72ca'
        },
        {
          url: '/_next/static/chunks/6066.b5f4a0d15bf70c55.js',
          revision: 'b5f4a0d15bf70c55'
        },
        {
          url: '/_next/static/chunks/6095-8d59aca919bf7e7c.js',
          revision: '8d59aca919bf7e7c'
        },
        {
          url: '/_next/static/chunks/6124.226dc453f12cc2d8.js',
          revision: '226dc453f12cc2d8'
        },
        {
          url: '/_next/static/chunks/614.d04ea90457935dee.js',
          revision: 'd04ea90457935dee'
        },
        {
          url: '/_next/static/chunks/6273.66a942d7a8ed77b5.js',
          revision: '66a942d7a8ed77b5'
        },
        {
          url: '/_next/static/chunks/6283.1853f2db0ed59caf.js',
          revision: '1853f2db0ed59caf'
        },
        {
          url: '/_next/static/chunks/6305-b480aecd4d597308.js',
          revision: 'b480aecd4d597308'
        },
        {
          url: '/_next/static/chunks/632cba62-0cd1031e9cdc7906.js',
          revision: '0cd1031e9cdc7906'
        },
        {
          url: '/_next/static/chunks/6417.6865b350d1456cf4.js',
          revision: '6865b350d1456cf4'
        },
        {
          url: '/_next/static/chunks/6550.399423935cbf3ba5.js',
          revision: '399423935cbf3ba5'
        },
        {
          url: '/_next/static/chunks/6731.3f6aa399d1b375cc.js',
          revision: '3f6aa399d1b375cc'
        },
        {
          url: '/_next/static/chunks/6c44d60f.3cdafcc61366fe38.js',
          revision: '3cdafcc61366fe38'
        },
        {
          url: '/_next/static/chunks/713.4188d2c58507d818.js',
          revision: '4188d2c58507d818'
        },
        {
          url: '/_next/static/chunks/7151.4923d6fb7da9668c.js',
          revision: '4923d6fb7da9668c'
        },
        {
          url: '/_next/static/chunks/7229.aa1cbdb73303ec08.js',
          revision: 'aa1cbdb73303ec08'
        },
        {
          url: '/_next/static/chunks/7423-d291fd351ac05c0e.js',
          revision: 'd291fd351ac05c0e'
        },
        {
          url: '/_next/static/chunks/74fdba35.cb257728a2fbdd42.js',
          revision: 'cb257728a2fbdd42'
        },
        {
          url: '/_next/static/chunks/7536-acd81e1534c03a71.js',
          revision: 'acd81e1534c03a71'
        },
        {
          url: '/_next/static/chunks/7771.8033f6f5e6334ccc.js',
          revision: '8033f6f5e6334ccc'
        },
        {
          url: '/_next/static/chunks/7794-41fd4edf0c67bbcc.js',
          revision: '41fd4edf0c67bbcc'
        },
        {
          url: '/_next/static/chunks/7856.89256b8571ee4029.js',
          revision: '89256b8571ee4029'
        },
        {
          url: '/_next/static/chunks/7863.f0294471d0328d72.js',
          revision: 'f0294471d0328d72'
        },
        {
          url: '/_next/static/chunks/7922.50fc382c42b14f99.js',
          revision: '50fc382c42b14f99'
        },
        {
          url: '/_next/static/chunks/7939.c92549db45b83660.js',
          revision: 'c92549db45b83660'
        },
        {
          url: '/_next/static/chunks/7949.5adc54293f13319a.js',
          revision: '5adc54293f13319a'
        },
        {
          url: '/_next/static/chunks/8119.102dbc8ecc940a23.js',
          revision: '102dbc8ecc940a23'
        },
        {
          url: '/_next/static/chunks/8239.7ad75b5d72890c06.js',
          revision: '7ad75b5d72890c06'
        },
        {
          url: '/_next/static/chunks/8273-27e04f5b26d55832.js',
          revision: '27e04f5b26d55832'
        },
        {
          url: '/_next/static/chunks/8314.7651075f60cbffb1.js',
          revision: '7651075f60cbffb1'
        },
        {
          url: '/_next/static/chunks/8353-5e436eb7a1a02f57.js',
          revision: '5e436eb7a1a02f57'
        },
        {
          url: '/_next/static/chunks/8462-50524f32f6de6fa4.js',
          revision: '50524f32f6de6fa4'
        },
        {
          url: '/_next/static/chunks/8525.0591f42c7a8f24c3.js',
          revision: '0591f42c7a8f24c3'
        },
        {
          url: '/_next/static/chunks/8538.7c7206df88ff4927.js',
          revision: '7c7206df88ff4927'
        },
        {
          url: '/_next/static/chunks/8653.330c71c05006c4f5.js',
          revision: '330c71c05006c4f5'
        },
        {
          url: '/_next/static/chunks/8794.bb5308db88fa02d6.js',
          revision: 'bb5308db88fa02d6'
        },
        {
          url: '/_next/static/chunks/8844.11145eb0ce42d79a.js',
          revision: '11145eb0ce42d79a'
        },
        {
          url: '/_next/static/chunks/908-37dcd59279c78de4.js',
          revision: '37dcd59279c78de4'
        },
        {
          url: '/_next/static/chunks/9156.ba3004c6eff1bd58.js',
          revision: 'ba3004c6eff1bd58'
        },
        {
          url: '/_next/static/chunks/9233.829f56cf550c0713.js',
          revision: '829f56cf550c0713'
        },
        {
          url: '/_next/static/chunks/9288-9e063be22ffe7e14.js',
          revision: '9e063be22ffe7e14'
        },
        {
          url: '/_next/static/chunks/9468.00f5fb81441a6952.js',
          revision: '00f5fb81441a6952'
        },
        {
          url: '/_next/static/chunks/9491-f91f19d6a6d75bb8.js',
          revision: 'f91f19d6a6d75bb8'
        },
        {
          url: '/_next/static/chunks/9516.a7ec3581663fb4a7.js',
          revision: 'a7ec3581663fb4a7'
        },
        {
          url: '/_next/static/chunks/9609.52c14ed3817654d8.js',
          revision: '52c14ed3817654d8'
        },
        {
          url: '/_next/static/chunks/9671.a1119015c2c21915.js',
          revision: 'a1119015c2c21915'
        },
        {
          url: '/_next/static/chunks/974.8f17279ceebc66cf.js',
          revision: '8f17279ceebc66cf'
        },
        {
          url: '/_next/static/chunks/9742.381e412218422fa1.js',
          revision: '381e412218422fa1'
        },
        {
          url: '/_next/static/chunks/9775.18f92d10ba2d2a2c.js',
          revision: '18f92d10ba2d2a2c'
        },
        {
          url: '/_next/static/chunks/9962.da035bb345bd5137.js',
          revision: 'da035bb345bd5137'
        },
        {
          url: '/_next/static/chunks/a908dc70.720813364b185e08.js',
          revision: '720813364b185e08'
        },
        {
          url: '/_next/static/chunks/c9184924.0b637cb2559c0e3b.js',
          revision: '0b637cb2559c0e3b'
        },
        {
          url: '/_next/static/chunks/framework-98a03250f478bc31.js',
          revision: '98a03250f478bc31'
        },
        {
          url: '/_next/static/chunks/main-c117c8dab0b8a0db.js',
          revision: 'c117c8dab0b8a0db'
        },
        {
          url: '/_next/static/chunks/pages/_app-180a80a30fa82d8c.js',
          revision: '180a80a30fa82d8c'
        },
        {
          url: '/_next/static/chunks/pages/_error-1d98a1a730956cd5.js',
          revision: '1d98a1a730956cd5'
        },
        {
          url: '/_next/static/chunks/pages/about-us-f873948b96f72fb8.js',
          revision: 'f873948b96f72fb8'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/attribute-4de592ee2193980f.js',
          revision: '4de592ee2193980f'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/attribute/create-cc2c0fc941d27923.js',
          revision: 'cc2c0fc941d27923'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/attribute/edit/%5BattributeId%5D-d8c7e53d6c386fb7.js',
          revision: 'd8c7e53d6c386fb7'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/category-fd21b8003ef73370.js',
          revision: 'fd21b8003ef73370'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/category/create-d53f325563c007e2.js',
          revision: 'd53f325563c007e2'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/category/edit/%5BcategoryId%5D-5abc2bc2b977c5f2.js',
          revision: '5abc2bc2b977c5f2'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/category/fork/%5BcategoryId%5D-23cab1f671e6426b.js',
          revision: '23cab1f671e6426b'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/manufacturer-1149c0d5b73368ba.js',
          revision: '1149c0d5b73368ba'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/manufacturer/create-8f3a0818c902e401.js',
          revision: '8f3a0818c902e401'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/manufacturer/edit/%5BmanufacturerId%5D-cd0e2477ca02b1bf.js',
          revision: 'cd0e2477ca02b1bf'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/product-92e01e47a972a907.js',
          revision: '92e01e47a972a907'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/product/create-711a3c050c81bbb1.js',
          revision: '711a3c050c81bbb1'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/product/edit/%5BproductId%5D-398a509170a8e286.js',
          revision: '398a509170a8e286'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/product/fork/%5BproductId%5D-75f9b5476963aa93.js',
          revision: '75f9b5476963aa93'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/supplier-55a371db60a92780.js',
          revision: '55a371db60a92780'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/supplier/create-c93e1efacb0b6b5e.js',
          revision: 'c93e1efacb0b6b5e'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/supplier/edit/%5BsupplierId%5D-866ac61cdbafea87.js',
          revision: '866ac61cdbafea87'
        },
        {
          url: '/_next/static/chunks/pages/admin/coming-soon-d24d785903395ff6.js',
          revision: 'd24d785903395ff6'
        },
        {
          url: '/_next/static/chunks/pages/admin/coupon-f5bfcf6773acbff4.js',
          revision: 'f5bfcf6773acbff4'
        },
        {
          url: '/_next/static/chunks/pages/admin/coupon/create-a2ce7f48dfe2c165.js',
          revision: 'a2ce7f48dfe2c165'
        },
        {
          url: '/_next/static/chunks/pages/admin/coupon/edit/%5BcouponId%5D-87bfda0ae63cee7e.js',
          revision: '87bfda0ae63cee7e'
        },
        {
          url: '/_next/static/chunks/pages/admin/customer-5dc1927514238f0a.js',
          revision: '5dc1927514238f0a'
        },
        {
          url: '/_next/static/chunks/pages/admin/customer/customer/%5BcustomerId%5D-d6f30fc946de5b90.js',
          revision: 'd6f30fc946de5b90'
        },
        {
          url: '/_next/static/chunks/pages/admin/dashboard-ae6d7be1af5832e5.js',
          revision: 'ae6d7be1af5832e5'
        },
        {
          url: '/_next/static/chunks/pages/admin/dropgala-123-login-50af56e296abd780.js',
          revision: '50af56e296abd780'
        },
        {
          url: '/_next/static/chunks/pages/admin/forget-password-4d1bc7092258059e.js',
          revision: '4d1bc7092258059e'
        },
        {
          url: '/_next/static/chunks/pages/admin/invoice-8aff83d5da23e62b.js',
          revision: '8aff83d5da23e62b'
        },
        {
          url: '/_next/static/chunks/pages/admin/logout-9335dc8e6126bb84.js',
          revision: '9335dc8e6126bb84'
        },
        {
          url: '/_next/static/chunks/pages/admin/marketplace/app/listing-4b0d15f16da46b9e.js',
          revision: '4b0d15f16da46b9e'
        },
        {
          url: '/_next/static/chunks/pages/admin/marketplace/theme/%5BthemeId%5D-80321969085e89f1.js',
          revision: '80321969085e89f1'
        },
        {
          url: '/_next/static/chunks/pages/admin/marketplace/theme/listing-33e8c390c046809e.js',
          revision: '33e8c390c046809e'
        },
        {
          url: '/_next/static/chunks/pages/admin/media-620b4bf37cb1d39a.js',
          revision: '620b4bf37cb1d39a'
        },
        {
          url: '/_next/static/chunks/pages/admin/media/%5Bid%5D-08d5bc1e6b6058ff.js',
          revision: '08d5bc1e6b6058ff'
        },
        {
          url: '/_next/static/chunks/pages/admin/reset-password-c82fd324f6cf7ca2.js',
          revision: 'c82fd324f6cf7ca2'
        },
        {
          url: '/_next/static/chunks/pages/admin/sales/order-ade472c323f28c3e.js',
          revision: 'ade472c323f28c3e'
        },
        {
          url: '/_next/static/chunks/pages/admin/sales/order-status-4716535d7784f341.js',
          revision: '4716535d7784f341'
        },
        {
          url: '/_next/static/chunks/pages/admin/sales/order-status/create-5e418c788e92abf7.js',
          revision: '5e418c788e92abf7'
        },
        {
          url: '/_next/static/chunks/pages/admin/sales/order-status/edit/%5BstatusId%5D-576b77558ad805cc.js',
          revision: '576b77558ad805cc'
        },
        {
          url: '/_next/static/chunks/pages/admin/sales/order/%5BorderId%5D-1028da0707ebe9a9.js',
          revision: '1028da0707ebe9a9'
        },
        {
          url: '/_next/static/chunks/pages/admin/settings-66a4d4e45a6d5489.js',
          revision: '66a4d4e45a6d5489'
        },
        {
          url: '/_next/static/chunks/pages/admin/settings/account-settings-1d159bb9aa49cd66.js',
          revision: '1d159bb9aa49cd66'
        },
        {
          url: '/_next/static/chunks/pages/admin/settings/notification-658c5d212d633bac.js',
          revision: '658c5d212d633bac'
        },
        {
          url: '/_next/static/chunks/pages/admin/settings/tag-0463d22827189b87.js',
          revision: '0463d22827189b87'
        },
        {
          url: '/_next/static/chunks/pages/admin/settings/tag/create-b1a9bb8c7996c330.js',
          revision: 'b1a9bb8c7996c330'
        },
        {
          url: '/_next/static/chunks/pages/admin/settings/tag/edit/%5BtagId%5D-eb090715a78d5657.js',
          revision: 'eb090715a78d5657'
        },
        {
          url: '/_next/static/chunks/pages/admin/settings/tax-0726c7e3709ba019.js',
          revision: '0726c7e3709ba019'
        },
        {
          url: '/_next/static/chunks/pages/admin/settings/tax/create-42bdadd73c760af8.js',
          revision: '42bdadd73c760af8'
        },
        {
          url: '/_next/static/chunks/pages/admin/settings/tax/edit/%5BtaxId%5D-81f3a5fbb116ddce.js',
          revision: '81f3a5fbb116ddce'
        },
        {
          url: '/_next/static/chunks/pages/admin/shipping-delivery/delivery-time-e87f98d54e0913c8.js',
          revision: 'e87f98d54e0913c8'
        },
        {
          url: '/_next/static/chunks/pages/admin/shipping-delivery/delivery-time/create-8e27d4300167d61f.js',
          revision: '8e27d4300167d61f'
        },
        {
          url: '/_next/static/chunks/pages/admin/shipping-delivery/delivery-time/edit/%5BdeliveryId%5D-c15d8a0e571e9307.js',
          revision: 'c15d8a0e571e9307'
        },
        {
          url: '/_next/static/chunks/pages/admin/shipping-delivery/shipping-zone-7cbc81e0db1b4e85.js',
          revision: '7cbc81e0db1b4e85'
        },
        {
          url: '/_next/static/chunks/pages/admin/shipping-delivery/shipping-zone/create-e76460fc9e168fb5.js',
          revision: 'e76460fc9e168fb5'
        },
        {
          url: '/_next/static/chunks/pages/admin/shipping-delivery/shipping-zone/edit/%5BshippingId%5D-7c4e1d4aecea6174.js',
          revision: '7c4e1d4aecea6174'
        },
        {
          url: '/_next/static/chunks/pages/admin/signup-262a9f7f4afb2277.js',
          revision: '262a9f7f4afb2277'
        },
        {
          url: '/_next/static/chunks/pages/admin/slider/hero-banner-29110b61b0223865.js',
          revision: '29110b61b0223865'
        },
        {
          url: '/_next/static/chunks/pages/admin/slider/hero-banner/create-63c64c799f9d7cdd.js',
          revision: '63c64c799f9d7cdd'
        },
        {
          url: '/_next/static/chunks/pages/admin/slider/hero-banner/edit/%5BsliderId%5D-f33e4d439e61e458.js',
          revision: 'f33e4d439e61e458'
        },
        {
          url: '/_next/static/chunks/pages/admin/slider/hero-banner/fork/%5BsliderId%5D-e14c007d334e174a.js',
          revision: 'e14c007d334e174a'
        },
        {
          url: '/_next/static/chunks/pages/admin/slider/promo-banner-325fc94245e8b487.js',
          revision: '325fc94245e8b487'
        },
        {
          url: '/_next/static/chunks/pages/admin/store/languages-bd3b7e17d794d3c5.js',
          revision: 'bd3b7e17d794d3c5'
        },
        {
          url: '/_next/static/chunks/pages/admin/store/languages/create-5c0e790148507261.js',
          revision: '5c0e790148507261'
        },
        {
          url: '/_next/static/chunks/pages/admin/store/languages/edit/%5Bid%5D-dd9c6f8dd058dcde.js',
          revision: 'dd9c6f8dd058dcde'
        },
        {
          url: '/_next/static/chunks/pages/admin/store/languages/fork/%5Bid%5D-ca664ce8f364ba57.js',
          revision: 'ca664ce8f364ba57'
        },
        {
          url: '/_next/static/chunks/pages/admin/store/page/%5Bslug%5D-236cb9be5cc63638.js',
          revision: '236cb9be5cc63638'
        },
        {
          url: '/_next/static/chunks/pages/admin/store/store-settings-efea30fcfdafc7b5.js',
          revision: 'efea30fcfdafc7b5'
        },
        {
          url: '/_next/static/chunks/pages/admin/store/theme-c059efb2196fc58c.js',
          revision: 'c059efb2196fc58c'
        },
        {
          url: '/_next/static/chunks/pages/admin/store/theme/%5BthemeId%5D-37754e97a1c50499.js',
          revision: '37754e97a1c50499'
        },
        {
          url: '/_next/static/chunks/pages/admin/user-e9af29e984f894a8.js',
          revision: 'e9af29e984f894a8'
        },
        {
          url: '/_next/static/chunks/pages/admin/user/create-1229d7f2d8431af2.js',
          revision: '1229d7f2d8431af2'
        },
        {
          url: '/_next/static/chunks/pages/admin/user/edit/%5BuserId%5D-f892c3003f850041.js',
          revision: 'f892c3003f850041'
        },
        {
          url: '/_next/static/chunks/pages/admin/user/user_role-d46f8682c4b1a4e5.js',
          revision: 'd46f8682c4b1a4e5'
        },
        {
          url: '/_next/static/chunks/pages/admin/user/user_role/create-ba988788730eaa9e.js',
          revision: 'ba988788730eaa9e'
        },
        {
          url: '/_next/static/chunks/pages/admin/user/user_role/edit/%5BroleId%5D-3714dc64ad6697a9.js',
          revision: '3714dc64ad6697a9'
        },
        {
          url: '/_next/static/chunks/pages/blog-3f4c426b947be415.js',
          revision: '3f4c426b947be415'
        },
        {
          url: '/_next/static/chunks/pages/blog/%5B...slug%5D-a79faa966f712070.js',
          revision: 'a79faa966f712070'
        },
        {
          url: '/_next/static/chunks/pages/blog/page/%5Bpage%5D-e87aa6da50c1c3f4.js',
          revision: 'e87aa6da50c1c3f4'
        },
        {
          url: '/_next/static/chunks/pages/blog/tags/%5Btag%5D-1e19377cd96311e3.js',
          revision: '1e19377cd96311e3'
        },
        {
          url: '/_next/static/chunks/pages/index-ec2e5fe36f37cfc1.js',
          revision: 'ec2e5fe36f37cfc1'
        },
        {
          url: '/_next/static/chunks/pages/policy-c9115dc9ea4264fe.js',
          revision: 'c9115dc9ea4264fe'
        },
        {
          url: '/_next/static/chunks/pages/profile-update-52112299d530267f.js',
          revision: '52112299d530267f'
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0'
        },
        {
          url: '/_next/static/chunks/webpack-7ca295ca3843b35b.js',
          revision: '7ca295ca3843b35b'
        },
        {
          url: '/_next/static/cmnljPkYxMpv6MzIRXk9j/_buildManifest.js',
          revision: 'c0a5624450af5f3741fbbe7d22ac54d2'
        },
        {
          url: '/_next/static/cmnljPkYxMpv6MzIRXk9j/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933'
        },
        {
          url: '/_next/static/css/0262c29bf75a4545.css',
          revision: '0262c29bf75a4545'
        },
        {
          url: '/_next/static/css/039b38ba50e378d6.css',
          revision: '039b38ba50e378d6'
        },
        {
          url: '/_next/static/css/0b80813c9ca86998.css',
          revision: '0b80813c9ca86998'
        },
        {
          url: '/_next/static/css/2dfc07ca1ce36ba7.css',
          revision: '2dfc07ca1ce36ba7'
        },
        {
          url: '/_next/static/css/2e2751e26baf52dd.css',
          revision: '2e2751e26baf52dd'
        },
        {
          url: '/_next/static/css/2fcf970bdbe73a22.css',
          revision: '2fcf970bdbe73a22'
        },
        {
          url: '/_next/static/css/3ce268ac554bf688.css',
          revision: '3ce268ac554bf688'
        },
        {
          url: '/_next/static/css/3fb386fdb5034d8c.css',
          revision: '3fb386fdb5034d8c'
        },
        {
          url: '/_next/static/css/44f560adea4961d9.css',
          revision: '44f560adea4961d9'
        },
        {
          url: '/_next/static/css/5cfa41dd2e3aba8c.css',
          revision: '5cfa41dd2e3aba8c'
        },
        {
          url: '/_next/static/css/6176c6e6b3e34bb5.css',
          revision: '6176c6e6b3e34bb5'
        },
        {
          url: '/_next/static/css/624a6136f1ff7cc7.css',
          revision: '624a6136f1ff7cc7'
        },
        {
          url: '/_next/static/css/6774347c41a08daa.css',
          revision: '6774347c41a08daa'
        },
        {
          url: '/_next/static/css/7838f3d033c67f00.css',
          revision: '7838f3d033c67f00'
        },
        {
          url: '/_next/static/css/92acfa332e95f67c.css',
          revision: '92acfa332e95f67c'
        },
        {
          url: '/_next/static/css/99e14aece3d2c7ca.css',
          revision: '99e14aece3d2c7ca'
        },
        {
          url: '/_next/static/css/de93c7d2c7763741.css',
          revision: 'de93c7d2c7763741'
        },
        {
          url: '/_next/static/css/e277480e060a7d83.css',
          revision: 'e277480e060a7d83'
        },
        {
          url: '/_next/static/css/e30fce8ae58e086d.css',
          revision: 'e30fce8ae58e086d'
        },
        {
          url: '/_next/static/css/eee0321833b0915f.css',
          revision: 'eee0321833b0915f'
        },
        {
          url: '/_next/static/css/f1afc928a4b1ca8a.css',
          revision: 'f1afc928a4b1ca8a'
        },
        {
          url: '/_next/static/css/f22fc5fb9ad8c69c.css',
          revision: 'f22fc5fb9ad8c69c'
        },
        {
          url: '/_next/static/css/f3d75ae505219890.css',
          revision: 'f3d75ae505219890'
        },
        {
          url: '/_next/static/css/f6d0472e98e753ed.css',
          revision: 'f6d0472e98e753ed'
        },
        {
          url: '/_next/static/css/f8aee2f66a30e49b.css',
          revision: 'f8aee2f66a30e49b'
        },
        {
          url: '/_next/static/css/fe60b20bed1cfb6d.css',
          revision: 'fe60b20bed1cfb6d'
        },
        {
          url: '/_next/static/media/ajax-loader.0b80f665.gif',
          revision: '0b80f665'
        },
        {
          url: '/_next/static/media/open-sans-all-400-normal.52ada23a.woff',
          revision: '52ada23a'
        },
        {
          url: '/_next/static/media/open-sans-all-600-normal.19cec596.woff',
          revision: '19cec596'
        },
        {
          url: '/_next/static/media/open-sans-all-700-normal.38a86af2.woff',
          revision: '38a86af2'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-400-normal.b24677da.woff2',
          revision: 'b24677da'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-600-normal.23382ebb.woff2',
          revision: '23382ebb'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-700-normal.76a7ac51.woff2',
          revision: '76a7ac51'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-ext-400-normal.813d185d.woff2',
          revision: '813d185d'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-ext-600-normal.f60b0a4a.woff2',
          revision: 'f60b0a4a'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-ext-700-normal.fab1472d.woff2',
          revision: 'fab1472d'
        },
        {
          url: '/_next/static/media/open-sans-greek-400-normal.ad3b150d.woff2',
          revision: 'ad3b150d'
        },
        {
          url: '/_next/static/media/open-sans-greek-600-normal.507f7d98.woff2',
          revision: '507f7d98'
        },
        {
          url: '/_next/static/media/open-sans-greek-700-normal.bbac2a23.woff2',
          revision: 'bbac2a23'
        },
        {
          url: '/_next/static/media/open-sans-greek-ext-400-normal.5fb1acd1.woff2',
          revision: '5fb1acd1'
        },
        {
          url: '/_next/static/media/open-sans-greek-ext-600-normal.60859920.woff2',
          revision: '60859920'
        },
        {
          url: '/_next/static/media/open-sans-greek-ext-700-normal.9f059652.woff2',
          revision: '9f059652'
        },
        {
          url: '/_next/static/media/open-sans-hebrew-400-normal.94d66927.woff2',
          revision: '94d66927'
        },
        {
          url: '/_next/static/media/open-sans-hebrew-600-normal.a7114a78.woff2',
          revision: 'a7114a78'
        },
        {
          url: '/_next/static/media/open-sans-hebrew-700-normal.5adde7cf.woff2',
          revision: '5adde7cf'
        },
        {
          url: '/_next/static/media/open-sans-latin-400-normal.abd3eb12.woff2',
          revision: 'abd3eb12'
        },
        {
          url: '/_next/static/media/open-sans-latin-600-normal.0270e39b.woff2',
          revision: '0270e39b'
        },
        {
          url: '/_next/static/media/open-sans-latin-700-normal.58fa2153.woff2',
          revision: '58fa2153'
        },
        {
          url: '/_next/static/media/open-sans-latin-ext-400-normal.47afa2bd.woff2',
          revision: '47afa2bd'
        },
        {
          url: '/_next/static/media/open-sans-latin-ext-600-normal.ee5243bd.woff2',
          revision: 'ee5243bd'
        },
        {
          url: '/_next/static/media/open-sans-latin-ext-700-normal.16530ee2.woff2',
          revision: '16530ee2'
        },
        {
          url: '/_next/static/media/open-sans-vietnamese-400-normal.beeddf8e.woff2',
          revision: 'beeddf8e'
        },
        {
          url: '/_next/static/media/open-sans-vietnamese-600-normal.c0d3712a.woff2',
          revision: 'c0d3712a'
        },
        {
          url: '/_next/static/media/open-sans-vietnamese-700-normal.1599c451.woff2',
          revision: '1599c451'
        },
        { url: '/_next/static/media/slick.25572f22.eot', revision: '25572f22' },
        {
          url: '/_next/static/media/slick.653a4cbb.woff',
          revision: '653a4cbb'
        },
        { url: '/_next/static/media/slick.6aa1ee46.ttf', revision: '6aa1ee46' },
        { url: '/_next/static/media/slick.f895cfdf.svg', revision: 'f895cfdf' },
        {
          url: '/arrow-next.svg',
          revision: '172baae96fdb01f26d62672e0d4afae3'
        },
        {
          url: '/arrow-previous.svg',
          revision: '6b5b9894d18bc548d347d0110c3b12cd'
        },
        { url: '/bg.svg', revision: '5d40dcfc2c55866f7532dbb1cf4d56d0' },
        { url: '/charles.jpg', revision: '9e0b94dd17e71f2f645ef29a198c46e3' },
        {
          url: '/favicon/browserconfig.xml',
          revision: 'b0df1d8364886483f481bc261ea8db4b'
        },
        {
          url: '/favicon/icons/icon_android_144x144.png',
          revision: 'c211adf444fd088f241753710bd61b76'
        },
        {
          url: '/favicon/icons/icon_android_192x192.png',
          revision: '8db27358203d68b1796429956e4c0ed8'
        },
        {
          url: '/favicon/icons/icon_android_36x36.png',
          revision: 'ee662dbead280f16a262d31489a35656'
        },
        {
          url: '/favicon/icons/icon_android_48x48.png',
          revision: 'ba294013dec34a5e97c9093c6ae20cec'
        },
        {
          url: '/favicon/icons/icon_android_512x512.png',
          revision: '112b08a96b47702fbb90f73664f0004e'
        },
        {
          url: '/favicon/icons/icon_android_72x72.png',
          revision: '5234929428fe3a89b57bcbb0e54ec602'
        },
        {
          url: '/favicon/icons/icon_android_96x96.png',
          revision: '0d7e697093393bc09734c3f0284b8c4e'
        },
        {
          url: '/favicon/icons/icon_ios_120x120.png',
          revision: 'ef92bef26a31506cd69a99c54ad3758d'
        },
        {
          url: '/favicon/icons/icon_ios_152x152.png',
          revision: 'd9be13a119b129fe698aadd77cfab092'
        },
        {
          url: '/favicon/icons/icon_ios_167x167.png',
          revision: 'c9dfdf49a97f5d46489cc69929ac0d8c'
        },
        {
          url: '/favicon/icons/icon_ios_180x180.png',
          revision: '1ad194c777230153cb20ab69ce87575f'
        },
        {
          url: '/favicon/icons/icon_ios_625x625.png',
          revision: '97139567d172d0d0472a6c3c3ea9f880'
        },
        {
          url: '/favicon/logo-black.png',
          revision: 'afbb16d12e489cd414a897bd9f94989e'
        },
        {
          url: '/favicon/logo-color.png',
          revision: 'a9acb9af33e9db8c52413cdc1c84f019'
        },
        {
          url: '/favicon/logo-no-background.png',
          revision: 'b79aab714836c9707f8c8fb192572e47'
        },
        {
          url: '/favicon/logo-white.png',
          revision: 'fbea1cf91b4fc599605d5fcdb79f412a'
        },
        {
          url: '/favicon/svg/logo-black.svg',
          revision: '6e916b8a5de1b608c039248f063e0300'
        },
        {
          url: '/favicon/svg/logo-color.svg',
          revision: '702390afda12069d2bfa1bd400169fb0'
        },
        {
          url: '/favicon/svg/logo-no-background.svg',
          revision: 'ecbcdce65878fb3669c08aa9dfd4542b'
        },
        {
          url: '/favicon/svg/logo-white.svg',
          revision: 'a78881a62c431216de822cfe2a8d908b'
        },
        { url: '/feed.xml', revision: '13a288422bdb13b9812efa623fb99221' },
        {
          url: '/hero-background.svg',
          revision: '1e67b8029190b5ed7886371d9596650d'
        },
        {
          url: '/image/error-plug.png',
          revision: '09ac461516dda937afcbc9a3b623c54d'
        },
        {
          url: '/image/logo-black.png',
          revision: '58c0725ab7dec4f1c2da4891ec15c0cc'
        },
        {
          url: '/image/logo-black.svg',
          revision: '42f2f356835369fb253e05fbb86c78ff'
        },
        {
          url: '/image/logo-color.png',
          revision: '9199d7900557955720f28caa188d40c7'
        },
        {
          url: '/image/logo-color.svg',
          revision: '68220980d255d4fffe2ccb1c4c71b60a'
        },
        {
          url: '/image/logo-white.png',
          revision: '941ecab463bb223df58fc839715221b7'
        },
        {
          url: '/image/logo-white.svg',
          revision: 'ac439b93583432ba183f3d06c665e300'
        },
        {
          url: '/images/emoji/1F600.png',
          revision: '3663cff6c636cc179a0c25f4a051715f'
        },
        {
          url: '/images/emoji/1F641.png',
          revision: '9294ecd9cf6916d24b1902e1bf40fc33'
        },
        {
          url: '/images/emoji/1F642.png',
          revision: 'c53f6e5b8525cd50e55eeee99310f9b7'
        },
        {
          url: '/images/emoji/2764.png',
          revision: '584f579dda860bf8a8dae2649654360d'
        },
        {
          url: '/images/emoji/LICENSE.md',
          revision: 'df3026e1a060846b90ddc95093a81d37'
        },
        {
          url: '/images/icons/LICENSE.md',
          revision: 'cca42d84ae1c962be5709226ebf5ddb0'
        },
        {
          url: '/images/icons/arrow-clockwise.svg',
          revision: 'cd2db90a4cf1283a100c52b8e8e0984f'
        },
        {
          url: '/images/icons/arrow-counterclockwise.svg',
          revision: '435e5819e4d075aef7789c7713fc751c'
        },
        {
          url: '/images/icons/chat-square-quote.svg',
          revision: '279afaa32124fc83b64d1d2346e8e7f8'
        },
        {
          url: '/images/icons/chevron-down.svg',
          revision: 'c7ea2d9ab537490a80323d6570998ab2'
        },
        {
          url: '/images/icons/code.svg',
          revision: '0d680d1699a4b83deb3bc0d60d0f1950'
        },
        {
          url: '/images/icons/journal-code.svg',
          revision: '6db1bfa0c162680a0e4174b38e2ed14f'
        },
        {
          url: '/images/icons/journal-text.svg',
          revision: 'd5d4777a47570455882d3025620ed516'
        },
        {
          url: '/images/icons/justify.svg',
          revision: '02aae7fd85ae042d1c901e138b9424a5'
        },
        {
          url: '/images/icons/link.svg',
          revision: '3684dd7f500527d8201365e1a1eccf0b'
        },
        {
          url: '/images/icons/list-ol.svg',
          revision: 'f33e719113d5f9a9d754d983228395fc'
        },
        {
          url: '/images/icons/list-ul.svg',
          revision: '811bf0599f32b628c56218b8b51f884f'
        },
        {
          url: '/images/icons/pencil-fill.svg',
          revision: '309d66da24026734b5637726fb8a94f6'
        },
        {
          url: '/images/icons/text-center.svg',
          revision: '54f6c21cfad4a8fe874b795cf59366e1'
        },
        {
          url: '/images/icons/text-left.svg',
          revision: '2154264536cdceff7d9ac02e4c652196'
        },
        {
          url: '/images/icons/text-paragraph.svg',
          revision: '9f1672e11469500349c702919697e39b'
        },
        {
          url: '/images/icons/text-right.svg',
          revision: 'd0b856f268e67d9bfd311e74a5b3f482'
        },
        {
          url: '/images/icons/type-bold.svg',
          revision: 'edb3ab7ad7aad23f41b6476ede35c7e1'
        },
        {
          url: '/images/icons/type-h1.svg',
          revision: '374fe161bca738bc3e43dc5ae53b58e7'
        },
        {
          url: '/images/icons/type-h2.svg',
          revision: '6e88007df73e982511423aa8b3c45c49'
        },
        {
          url: '/images/icons/type-h3.svg',
          revision: 'a1f3b4d61c86d058e5af2cbdfae61314'
        },
        {
          url: '/images/icons/type-italic.svg',
          revision: '3066bb6eba0d3199c10bdd3aaba1327e'
        },
        {
          url: '/images/icons/type-strikethrough.svg',
          revision: 'fba86a16781332b4474982ca56512161'
        },
        {
          url: '/images/icons/type-underline.svg',
          revision: 'dce42049072f22c4ba91fd5159d2ca40'
        },
        { url: '/landing.webp', revision: '8b23e1aa56b0bb05efb97f3c98d657e3' },
        {
          url: '/locales/ar/banner.json',
          revision: '5e685b1ef80295e6c826e324caaa9a68'
        },
        {
          url: '/locales/ar/common.json',
          revision: 'fc3373c0744820897561536ec33ec39c'
        },
        {
          url: '/locales/ar/form.json',
          revision: '862f1c7e1161693998551dcc68c0467d'
        },
        {
          url: '/locales/ar/table.json',
          revision: 'fabb51da67d395aebef878c027d0ad45'
        },
        {
          url: '/locales/ar/widgets.json',
          revision: '953a384792cc5207c53399334a98c42c'
        },
        {
          url: '/locales/en/banner.json',
          revision: 'c0064c757fc9489d809c0e3e7ff532d2'
        },
        {
          url: '/locales/en/common.json',
          revision: '96c973c3160b677e3f7f8ea2ba723879'
        },
        {
          url: '/locales/en/error.json',
          revision: '1f74fc12a629d78a35037e2b3a6b67aa'
        },
        {
          url: '/locales/en/form.json',
          revision: '27c29cf0759e1f1161bd2bd116192ce2'
        },
        {
          url: '/locales/en/table.json',
          revision: '14790ed176822060b2d5ac82e313ed59'
        },
        {
          url: '/locales/en/widgets.json',
          revision: '05f065c9159e5594ff216de1a186027c'
        },
        {
          url: '/locales/fr/banner.json',
          revision: 'eadceea361eb79e4ac7a28a4cd4bd600'
        },
        {
          url: '/locales/fr/common.json',
          revision: '254f91496e4620e0faf48c2658978092'
        },
        {
          url: '/locales/fr/form.json',
          revision: 'a15659fab11ee86eb7f6f85cf05d9461'
        },
        {
          url: '/locales/fr/table.json',
          revision: '6ff8c23abd3b68f0d7cb75a672dfcd7a'
        },
        {
          url: '/locales/fr/widgets.json',
          revision: 'd630533b0f9f279498676871bfbb761e'
        },
        { url: '/logo.svg', revision: 'f56a21a727f8d4e6220cb9ed478df488' },
        { url: '/manifest.json', revision: 'efbd99f9fe4965e11b582f4c6d1510ec' },
        { url: '/marks.svg', revision: '127d94a821c3f2b005241765ff453a21' },
        {
          url: '/no-revisions.jpg',
          revision: 'f1c7878b9e1dc38d57b7f4e7f014eb0f'
        },
        {
          url: '/nubelson-fernandes.jpg',
          revision: '79f85be6bd28eeb9eab7331da6417270'
        },
        {
          url: '/placeholders/avatar.jpg',
          revision: 'd2539261ffa9d45677d10dcdab6483e2'
        },
        {
          url: '/placeholders/avatar.svg',
          revision: '4f5628d48244291a5613c63171ba4168'
        },
        {
          url: '/placeholders/avatar__placeholder.png',
          revision: 'c31b1ddea8ce92d28670559cc792c3ee'
        },
        {
          url: '/placeholders/image.jpg',
          revision: 'c0154dc4bebd3da05d2576c96e9dd4e6'
        },
        {
          url: '/placeholders/image__placeholder.png',
          revision: '4d42aae9ae81346b54a3773429bbfdd4'
        },
        {
          url: '/placeholders/no-image.svg',
          revision: '9938af013ae75f73c6e02823e15d6496'
        },
        { url: '/robots.txt', revision: '90f134f0ba355c86d4c15d361cc77b54' },
        { url: '/scandi.webp', revision: '8b23e1aa56b0bb05efb97f3c98d657e3' },
        { url: '/shop.jpg', revision: 'cc0e694e0e0e495c0ae09c890b4d9ac0' },
        {
          url: '/static/images/canada/lake.jpg',
          revision: '8ce00326acca80f918789361ec3013b0'
        },
        {
          url: '/static/images/canada/maple.jpg',
          revision: '46a2bd389752dfe79f6eb70489495f41'
        },
        {
          url: '/static/images/canada/mountains.jpg',
          revision: 'fc09ff8213c06b8f9c7fcb56fa65daf7'
        },
        {
          url: '/static/images/canada/toronto.jpg',
          revision: '22bdea152b6403730d742154b7dd46b3'
        },
        {
          url: '/static/images/carlos-muza-unsplash.jpg',
          revision: '42d15697c964cfabf3b2d51d5f4ddbd8'
        },
        {
          url: '/static/images/google.png',
          revision: '33989dfa8d6707b0617664ea2a7ae3b5'
        },
        {
          url: '/static/images/logo.png',
          revision: '957ee9f2cc08d3b1e81313f47dbcac49'
        },
        {
          url: '/static/images/me.jpeg',
          revision: '21546573575001a8adf3847402c07547'
        },
        {
          url: '/static/images/ocean.jpeg',
          revision: '8bc0f5f0c9dd22ce6c4673e750349987'
        },
        {
          url: '/static/images/sparrowhawk-avatar.jpg',
          revision: '54311e449f8237936b7ce492fd2a2d03'
        },
        {
          url: '/static/images/time-machine.jpg',
          revision: '6924faacbc3b982fb9b0b5686fa86ff7'
        },
        {
          url: '/static/images/twitter-card.png',
          revision: 'f7b83bef373381938f774ddcd8e1a53d'
        },
        {
          url: '/store-setup.png',
          revision: 'd7af20397bb463e18756f2f392ff2ca1'
        },
        {
          url: '/svg/attribute.svg',
          revision: '5d6a3691135d30125c2955f8c7f1f7f6'
        },
        {
          url: '/svg/category.svg',
          revision: 'd3245ac74d6946faaf4a05d883eb7bc6'
        },
        {
          url: '/svg/coupon.svg',
          revision: 'f820ae9d4287f132aa441d26a74bb292'
        },
        {
          url: '/svg/dashboard.svg',
          revision: 'fe4df89a0157c237b5e5d54655bb45f9'
        },
        {
          url: '/svg/deliveryTime.svg',
          revision: '936c1b3e6c55c43810390a54e1eb0ec1'
        },
        {
          url: '/svg/language.svg',
          revision: '65214d7a5fd8d0f84cca37c00ed33ae8'
        },
        {
          url: '/svg/manufacturer.svg',
          revision: '80703162494e1ef3309dc1b19440a67a'
        },
        {
          url: '/svg/market.svg',
          revision: 'e5a0962b8852209f7cf719674b2a2b2a'
        },
        { url: '/svg/media.svg', revision: '511924a737a0028b44db4c3137a84c12' },
        { url: '/svg/order.svg', revision: '794fa530c649984ce2c4384207e2a7d4' },
        {
          url: '/svg/product-list.svg',
          revision: '80c690e0859b5dc15c8aa1256b091d51'
        },
        {
          url: '/svg/product.svg',
          revision: '222054230e47cc49de25d64f78fbb256'
        },
        {
          url: '/svg/settings.svg',
          revision: '3a4c198b2f38e2bfe2751408d36a1b43'
        },
        {
          url: '/svg/shippingZone.svg',
          revision: '4f99d18e9d7ee5ae5a856d0c17aae5b7'
        },
        {
          url: '/svg/slider.svg',
          revision: '62b622a2e1e5cef840cb056ffae5a5ad'
        },
        { url: '/svg/store.svg', revision: '17c1ce4047e104698b31dd34ee568ab7' },
        {
          url: '/svg/supplier.svg',
          revision: 'ec8508ef1e8efc72dc01974c18b0c35f'
        },
        {
          url: '/svg/system-store.svg',
          revision: '8f8f36435cd7e36ec98d24b8c85c8575'
        },
        { url: '/svg/tag.svg', revision: 'd73c1b48c1d2aafbcda465e9294fb65b' },
        { url: '/svg/tax.svg', revision: '9f8210498a6c41e76a6a5e1349f2f47d' },
        { url: '/svg/user.svg', revision: '0a98406e1c8cced6341a225e962d2c7d' },
        {
          url: '/tags/book/feed.xml',
          revision: 'a5f8759786423b08a3d59d4ca9dba20b'
        },
        {
          url: '/tags/business/feed.xml',
          revision: '85a9ae87c884bdb062c27ac8ec63e4f8'
        },
        {
          url: '/tags/canada/feed.xml',
          revision: '0a6cdcef5523e073a534eefc770aed73'
        },
        {
          url: '/tags/code/feed.xml',
          revision: '33896dc7e3fbfbc87ec8c2a572d63d65'
        },
        {
          url: '/tags/early-moder/feed.xml',
          revision: 'ceaa6959244403d74e956db42975b56f'
        },
        {
          url: '/tags/ecommerce/feed.xml',
          revision: '39e2ab0513206f2d3e844aa20dfab1f5'
        },
        {
          url: '/tags/feature/feed.xml',
          revision: '860f3893b50e27313ef074a7c440e0ef'
        },
        {
          url: '/tags/features/feed.xml',
          revision: '091442b13b82dd984eb26882cebdc937'
        },
        {
          url: '/tags/github/feed.xml',
          revision: '2eb4be14a992243803d7f03de51d9c68'
        },
        {
          url: '/tags/guide/feed.xml',
          revision: '0000c19f7e598beeaeb5897698178aa4'
        },
        {
          url: '/tags/holiday/feed.xml',
          revision: '0d6c7579854e09e218ef363a7534924f'
        },
        {
          url: '/tags/images/feed.xml',
          revision: '49e894116b68852c7c3a845db9698e27'
        },
        {
          url: '/tags/interview-series/feed.xml',
          revision: '711eb636e9123ff3eb8eab1eeaa19c8a'
        },
        {
          url: '/tags/markdown/feed.xml',
          revision: '22101902950a3a1f9cf3b85904a32c7b'
        },
        {
          url: '/tags/multi-author/feed.xml',
          revision: '4f34106c9fa8a590d001ee06a87bcf45'
        },
        {
          url: '/tags/next-js/feed.xml',
          revision: '571f442a9695276f42cea67ec245bf33'
        },
        {
          url: '/tags/philosophy/feed.xml',
          revision: '9b2205d0e3ffcbaa7ee2733745c8d2a1'
        },
        {
          url: '/tags/reflection/feed.xml',
          revision: '88bf9347c232d6e00d21aeb0685fa350'
        },
        {
          url: '/tags/tailwind/feed.xml',
          revision: 'c3d2da2db86d0e6ebe1145cb37f2481b'
        },
        {
          url: '/tags/writings/feed.xml',
          revision: '7d3dcbc644ab236e2c0d7892841e5699'
        }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: c
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers
                  })
                : s
          }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })
        ]
      }),
      'GET'
    );
});
