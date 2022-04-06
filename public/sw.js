if (!self.define) {
  const e = (e) => {
      'require' !== e && (e += '.js');
      let s = Promise.resolve();
      return (
        i[e] ||
          (s = new Promise(async (s) => {
            if ('document' in self) {
              const i = document.createElement('script');
              (i.src = e), document.head.appendChild(i), (i.onload = s);
            } else importScripts(e), s();
          })),
        s.then(() => {
          if (!i[e]) throw new Error(`Module ${e} didn’t register its module`);
          return i[e];
        })
      );
    },
    s = (s, i) => {
      Promise.all(s.map(e)).then((e) => i(1 === e.length ? e[0] : e));
    },
    i = { require: Promise.resolve(s) };
  self.define = (s, n, a) => {
    i[s] ||
      (i[s] = Promise.resolve().then(() => {
        let i = {};
        const c = { uri: location.origin + s.slice(1) };
        return Promise.all(
          n.map((s) => {
            switch (s) {
              case 'exports':
                return i;
              case 'module':
                return c;
              default:
                return e(s);
            }
          })
        ).then((e) => {
          const s = a(...e);
          return i.default || (i.default = s), i;
        });
      }));
  };
}
define('./sw.js', ['./workbox-4a677df8'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/server/middleware-manifest.json',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/server/pages/_middleware.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/U7iwLDQq2uEGEEBqNIbvq/_buildManifest.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/U7iwLDQq2uEGEEBqNIbvq/_middlewareManifest.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/U7iwLDQq2uEGEEBqNIbvq/_ssgManifest.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/1839-0ce239d682dad43a.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/2283-992ef96a6f729179.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/2512-a49ab22cbc3d4838.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/256-4dadbb86c2d0c9b8.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/263.d9ee16ddc9a66e92.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/2857-1c3549fff4c40652.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/29107295-6897908d5a7c7dbe.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/2c386607.266851fdb4036405.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/3010-1058cbab2cfb72f5.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/3398-5f8430e87ac10b8f.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/350-57a57e979efca5dd.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/3518-1c259c459728d081.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/3620.9f8febf633437e43.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/3826.01b6f8d43bb8f6bd.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/3978-e0ded3718fbd1066.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/4528-431a84d69ce3c169.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/4746-6feaa488c911a60e.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/4825-6256619292436b9b.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/4959.78b7e2a86138e110.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/5107-28427a4a60ed88b9.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/5158.f672e507eaf53d1b.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/5416-0e343bd32a309795.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/5592-68856a1522d22ead.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/5765-8550231fd3c712b3.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/5990-1ede5ffd11c88dbf.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/629-13fec334347b0f03.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/632cba62-d1653a4fe1eb3278.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/6535-2fe32531a1af7451.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/6574.800c42c64ddfbeab.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/6731.1af0afea8c49ce59.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/6917.412ad75eb85a239f.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/6c44d60f.ddb25f0f1dc9645a.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/7024-ff51e5649ebf07c6.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/7151-4568db0861a4311b.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/7229.4f4896f4a1950f5b.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/74fdba35-f7ee606eaa5a0114.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/7784-328a384106aa0165.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/7856.17da2a98892cf361.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/7939.6fd760ed86fcb124.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/7974.0d4dbaf697b11d90.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/8314.ae9a55ca1b377b12.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/8794-e14ddc140f33ae65.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/8933-7589ec6966979497.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/983.0aad972ec9c0fc9d.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/9989.12cb6905bca4b498.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/a908dc70-9fbfa84c7cb4e85d.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/c9184924-93901be28f7501c0.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/commons-eff49a986717b287.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/framework-b2e9ab609e7e9764.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/main-4bf0e8d0d1125456.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/_app-b2aedec3ed3cddef.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/_error-28614d30cb5b8403.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/attributes-0f70fd098ffc8e9c.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/attributes/create-2b4219bbb4d33169.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/attributes/edit/%5BattributeId%5D-c348c644e133d9e3.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/categories-7c131b738529fb1e.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/categories/create-2ee314acf65392bc.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/categories/edit/%5BcategoryId%5D-7559ef6c5fc36dd8.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/coupons-b2634f1d782b932a.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/coupons/create-fad63619e187ee2b.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/coupons/edit/%5BcouponId%5D-90d7d27c1137a073.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/customers-8aa127bb99618036.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/customers/customer/%5BcustomerId%5D-00025634caf399bc.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/dashboard-f59b3a7ef6cbeaf2.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/invoice-1d62d33bd1ee3722.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/login-122308be2aaf9c26.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/logout-17f17047b41768fc.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/order-status-1817f39815b3742d.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/order-status/create-72c30f6a08d01d95.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/order-status/edit/%5BstatusId%5D-2667d44acfa7230d.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/orders-63929c1e32167e82.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/orders/%5BorderId%5D-a614db22909e64c4.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/products-40c7aeeac4fb4d36.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/products/create-8bef1369e17ec763.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/products/edit/%5BproductId%5D-801462c74ee5e2c5.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/profile-update-02638ec8e987ca56.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/settings/account-information-84f95b20c0ea6107.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/settings/notifications-d686eaa1fb20c4fc.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/settings/recent-login-history-26b14fe3e36d5ee4.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/shippings-01ec298d0af4ddbb.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/shippings/create-7c8ebc59e134cc41.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/shippings/edit/%5BshippingId%5D-1cd92e41867dc2b4.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/staffs-1558c4a4417c9924.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/staffs/create-a1c0f57128d69ae4.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/staffs/edit/%5BstaffId%5D-f4ea3e51a4c41c46.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/suppliers-2992359293e6a77b.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/suppliers/create-a9c58c78a25db77a.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/suppliers/edit/%5BsupplierId%5D-7b0748ee54fee165.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/tags-652590192153c97d.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/tags/create-a7ac87cc83e56c32.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/pages/tags/edit/%5BtagId%5D-506054c4150e0585.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/webpack-968d7e976f9f3b98.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/chunks/webpack-middleware-968d7e976f9f3b98.js',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/13606c7d0dac4c8e.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/2d9ebb2f80216121.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/36a47d32f8bd4c46.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/37aad1f71eda6fd9.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/7b8c9d0b782a3b10.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/7fd45fb7a8518d13.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/805d32652005df49.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/847202140afdaf15.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/88b74ef5e764e7e6.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/a3ce3760af13f1ad.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/a57e1e1143ece013.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/af306dbab358c55c.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/b2861f4d1f715bdc.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/c106f25de48bb24f.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/cc6f6d44cd0807a9.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/css/f59ff4e92959050e.css',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-all-400-normal.d068e995.woff',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-all-600-normal.a80ef551.woff',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-all-700-normal.1a6a5671.woff',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-400-normal.d2d589c8.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-600-normal.7e63f7ff.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-700-normal.b00bec51.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-ext-400-normal.5a6c3ab9.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-ext-600-normal.854e799f.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-ext-700-normal.5b0f83ce.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-greek-400-normal.d584c03a.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-greek-600-normal.e0949010.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-greek-700-normal.01657045.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-greek-ext-400-normal.1039a17c.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-greek-ext-600-normal.1f997874.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-greek-ext-700-normal.7e4a80f5.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-hebrew-400-normal.fdef0626.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-hebrew-600-normal.64944248.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-hebrew-700-normal.0100cdff.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-latin-400-normal.45a6d40a.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-latin-600-normal.921982ef.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-latin-700-normal.dff9eb1f.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-latin-ext-400-normal.12c7eac5.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-latin-ext-600-normal.daf45a0b.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-latin-ext-700-normal.d9e58f76.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-vietnamese-400-normal.8a85f5aa.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-vietnamese-600-normal.7309d47d.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/_next/static/media/open-sans-vietnamese-700-normal.8013bf46.woff2',
          revision: 'U7iwLDQq2uEGEEBqNIbvq'
        },
        {
          url: '/arrow-next.svg',
          revision: '172baae96fdb01f26d62672e0d4afae3'
        },
        {
          url: '/arrow-previous.svg',
          revision: '6b5b9894d18bc548d347d0110c3b12cd'
        },
        {
          url: '/favicons/android-chrome-192x192.png',
          revision: 'a13ed34282540fd6aea2c789750513c8'
        },
        {
          url: '/favicons/android-chrome-256x256.png',
          revision: 'd6c4c0e48fc190455290841594ec6fa8'
        },
        {
          url: '/favicons/apple-touch-icon.png',
          revision: 'ac71d10876cb5a43bb5781817496bf04'
        },
        {
          url: '/favicons/browserconfig.xml',
          revision: 'b0df1d8364886483f481bc261ea8db4b'
        },
        {
          url: '/favicons/favicon-16x16.png',
          revision: 'ca54625f760a191d5c2cccb473fec502'
        },
        {
          url: '/favicons/favicon-32x32.png',
          revision: '76c72505f933e28379445e9a686e3b4a'
        },
        {
          url: '/favicons/favicon.ico',
          revision: 'ac797f721846a3e20b3859b48e329376'
        },
        {
          url: '/favicons/mstile-150x150.png',
          revision: '62caeece55fa935ca74c88d07bb63b20'
        },
        {
          url: '/favicons/safari-pinned-tab.svg',
          revision: 'b6966a9851a2efac3c0f79f6c0f41181'
        },
        {
          url: '/icons/apple-icon-180.png',
          revision: '4d0bd977c14af140d3069300e07805a1'
        },
        {
          url: '/icons/manifest-icon-192.png',
          revision: 'ec559f69af2f50fc6fd66a7802334197'
        },
        {
          url: '/icons/manifest-icon-512.png',
          revision: 'e29d5657a9035d3e22274d47f3e4c5ec'
        },
        {
          url: '/image/card-argon.png',
          revision: '3870fde74e6242af243ffa92bcaeef0d'
        },
        {
          url: '/image/card-helium.png',
          revision: 'c960dd64e795307c42c48e8f244b7ce5'
        },
        {
          url: '/image/card-krypton.png',
          revision: '173ad5241fb5525926a681f775ab04c4'
        },
        {
          url: '/image/card-neon.png',
          revision: '3165c5e257f5f5d3f1a61cd4571ef624'
        },
        {
          url: '/image/card-xenon.png',
          revision: '3d0b5eb11a9ac071a293d54dfcf09634'
        },
        {
          url: '/image/layout-classic.png',
          revision: '3466c03af75c85989d1aae9b6092d452'
        },
        {
          url: '/image/layout-modern.png',
          revision: 'f524fd6d77a95490dea9683845c0a854'
        },
        {
          url: '/image/layout-standard.png',
          revision: '3a38c5b45aeca63400bbc50454c66a5d'
        },
        {
          url: '/locales/ar/banner.json',
          revision: '5e685b1ef80295e6c826e324caaa9a68'
        },
        {
          url: '/locales/ar/common.json',
          revision: 'fa689d138b1446691dce26960e62d4ad'
        },
        {
          url: '/locales/ar/form.json',
          revision: 'e576f02e1dbdc64795acbcb80df9e604'
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
          revision: '125a713073665a9d31c61d2aa93dd268'
        },
        {
          url: '/locales/en/error.json',
          revision: '65561accfb97a20e5b7df0c53ce5555d'
        },
        {
          url: '/locales/en/form.json',
          revision: '3e467cff6c5a092bb8db76cc4e99cf84'
        },
        {
          url: '/locales/en/table.json',
          revision: 'a3847db92f2ced9612c817ab4c9dff11'
        },
        {
          url: '/locales/en/widgets.json',
          revision: '420276e458d72f42c9485de38207bb09'
        },
        {
          url: '/locales/fr/banner.json',
          revision: 'eadceea361eb79e4ac7a28a4cd4bd600'
        },
        {
          url: '/locales/fr/common.json',
          revision: '0b2f5560cc54efd0fbb4fa00879a37fe'
        },
        {
          url: '/locales/fr/form.json',
          revision: 'fb6e1ae77835dfd7e6610a4c5c4f641c'
        },
        {
          url: '/locales/fr/table.json',
          revision: '6ff8c23abd3b68f0d7cb75a672dfcd7a'
        },
        {
          url: '/locales/fr/widgets.json',
          revision: 'd630533b0f9f279498676871bfbb761e'
        },
        { url: '/logo.svg', revision: '602a6d1c80cb99e11e3f417eef27ac69' },
        { url: '/manifest.json', revision: '6bedb73c647fd6632f21aab136812d88' },
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
          revision: '497c5bb692fe3f0aa7c58582b42ced0b'
        },
        { url: '/robots.txt', revision: '9152d7f1724ed8fbcd2e0c87029f193c' },
        { url: '/shop.jpg', revision: 'cc0e694e0e0e495c0ae09c890b4d9ac0' }
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
              event: i,
              state: n
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
