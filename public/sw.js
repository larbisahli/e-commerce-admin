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
          url: '/_next/static/chunks/128-caaf0653369163ae.js',
          revision: 'caaf0653369163ae'
        },
        {
          url: '/_next/static/chunks/1307-369dd9e032e8cb9d.js',
          revision: '369dd9e032e8cb9d'
        },
        {
          url: '/_next/static/chunks/1370-72478e73dda0b4ae.js',
          revision: '72478e73dda0b4ae'
        },
        {
          url: '/_next/static/chunks/1438.755848ca8768c6c5.js',
          revision: '755848ca8768c6c5'
        },
        {
          url: '/_next/static/chunks/1937-c7c786fd2951c4c3.js',
          revision: 'c7c786fd2951c4c3'
        },
        {
          url: '/_next/static/chunks/1986-2a3860cab2a8f4e0.js',
          revision: '2a3860cab2a8f4e0'
        },
        {
          url: '/_next/static/chunks/2407-910262ff1fbb07ee.js',
          revision: '910262ff1fbb07ee'
        },
        {
          url: '/_next/static/chunks/2451-82f8f8c3a83b7c98.js',
          revision: '82f8f8c3a83b7c98'
        },
        {
          url: '/_next/static/chunks/256-3ea039e756ef49b5.js',
          revision: '3ea039e756ef49b5'
        },
        {
          url: '/_next/static/chunks/263.e775650cffd01bb4.js',
          revision: 'e775650cffd01bb4'
        },
        {
          url: '/_next/static/chunks/29107295-4a69275373f23f88.js',
          revision: '4a69275373f23f88'
        },
        {
          url: '/_next/static/chunks/2c386607.6827ac0e27e65c3a.js',
          revision: '6827ac0e27e65c3a'
        },
        {
          url: '/_next/static/chunks/3002-4b7f2a1136b28877.js',
          revision: '4b7f2a1136b28877'
        },
        {
          url: '/_next/static/chunks/3155-556aca7443efc0a3.js',
          revision: '556aca7443efc0a3'
        },
        {
          url: '/_next/static/chunks/3627.36604e09e8f1bd10.js',
          revision: '36604e09e8f1bd10'
        },
        {
          url: '/_next/static/chunks/368-e0e52073bf8ffbea.js',
          revision: 'e0e52073bf8ffbea'
        },
        {
          url: '/_next/static/chunks/3826.9ceb247b0e315a79.js',
          revision: '9ceb247b0e315a79'
        },
        {
          url: '/_next/static/chunks/394-3b06380e36c7bc0b.js',
          revision: '3b06380e36c7bc0b'
        },
        {
          url: '/_next/static/chunks/4320.951ee3742460d761.js',
          revision: '951ee3742460d761'
        },
        {
          url: '/_next/static/chunks/4515-97a7cdaa5ed24c8a.js',
          revision: '97a7cdaa5ed24c8a'
        },
        {
          url: '/_next/static/chunks/4954-ff158c46b5b72997.js',
          revision: 'ff158c46b5b72997'
        },
        {
          url: '/_next/static/chunks/5158.4e1c1ae07604e288.js',
          revision: '4e1c1ae07604e288'
        },
        {
          url: '/_next/static/chunks/524-b1e21745dd4e6d70.js',
          revision: 'b1e21745dd4e6d70'
        },
        {
          url: '/_next/static/chunks/5492-205b7037b0fcd4f3.js',
          revision: '205b7037b0fcd4f3'
        },
        {
          url: '/_next/static/chunks/5566-2b3f418a5b6194ea.js',
          revision: '2b3f418a5b6194ea'
        },
        {
          url: '/_next/static/chunks/5592-7ab88f5286575b55.js',
          revision: '7ab88f5286575b55'
        },
        {
          url: '/_next/static/chunks/5870-7b8fd4557294ad18.js',
          revision: '7b8fd4557294ad18'
        },
        {
          url: '/_next/static/chunks/6019-73e018908b0b49c4.js',
          revision: '73e018908b0b49c4'
        },
        {
          url: '/_next/static/chunks/6064-20282e4a71a2d045.js',
          revision: '20282e4a71a2d045'
        },
        {
          url: '/_next/static/chunks/6095-8d59aca919bf7e7c.js',
          revision: '8d59aca919bf7e7c'
        },
        {
          url: '/_next/static/chunks/6195-9c4fcf9365bfdc21.js',
          revision: '9c4fcf9365bfdc21'
        },
        {
          url: '/_next/static/chunks/626-58292a866cf7da7b.js',
          revision: '58292a866cf7da7b'
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
          url: '/_next/static/chunks/6515-98bb93fbe516e2dd.js',
          revision: '98bb93fbe516e2dd'
        },
        {
          url: '/_next/static/chunks/662-3113c2794b62b930.js',
          revision: '3113c2794b62b930'
        },
        {
          url: '/_next/static/chunks/6697-d3c2c06ccafdf8dc.js',
          revision: 'd3c2c06ccafdf8dc'
        },
        {
          url: '/_next/static/chunks/6731.95dd33f4c5633cae.js',
          revision: '95dd33f4c5633cae'
        },
        {
          url: '/_next/static/chunks/6c44d60f.3cdafcc61366fe38.js',
          revision: '3cdafcc61366fe38'
        },
        {
          url: '/_next/static/chunks/713-4188d2c58507d818.js',
          revision: '4188d2c58507d818'
        },
        {
          url: '/_next/static/chunks/7151-589a38c208bdc2fc.js',
          revision: '589a38c208bdc2fc'
        },
        {
          url: '/_next/static/chunks/7191-c3734d887f3e5c81.js',
          revision: 'c3734d887f3e5c81'
        },
        {
          url: '/_next/static/chunks/7229.aa1cbdb73303ec08.js',
          revision: 'aa1cbdb73303ec08'
        },
        {
          url: '/_next/static/chunks/7457-c322c9e1f83f4b81.js',
          revision: 'c322c9e1f83f4b81'
        },
        {
          url: '/_next/static/chunks/74fdba35-cb257728a2fbdd42.js',
          revision: 'cb257728a2fbdd42'
        },
        {
          url: '/_next/static/chunks/7536-acd81e1534c03a71.js',
          revision: 'acd81e1534c03a71'
        },
        {
          url: '/_next/static/chunks/7702-a8b148acc2917182.js',
          revision: 'a8b148acc2917182'
        },
        {
          url: '/_next/static/chunks/7826-2a0a554f236d7cdd.js',
          revision: '2a0a554f236d7cdd'
        },
        {
          url: '/_next/static/chunks/783-f376eb869c4d16bf.js',
          revision: 'f376eb869c4d16bf'
        },
        {
          url: '/_next/static/chunks/7856.9265ccd9bdbe3b1d.js',
          revision: '9265ccd9bdbe3b1d'
        },
        {
          url: '/_next/static/chunks/7917.48360b57ec35ccc6.js',
          revision: '48360b57ec35ccc6'
        },
        {
          url: '/_next/static/chunks/7922.bbf5c99a5e34a83c.js',
          revision: 'bbf5c99a5e34a83c'
        },
        {
          url: '/_next/static/chunks/7939.637b3841616828b7.js',
          revision: '637b3841616828b7'
        },
        {
          url: '/_next/static/chunks/7958-c287ada3acb00936.js',
          revision: 'c287ada3acb00936'
        },
        {
          url: '/_next/static/chunks/8250-e32440ea87c71df9.js',
          revision: 'e32440ea87c71df9'
        },
        {
          url: '/_next/static/chunks/8314.be94d5a931fe5f39.js',
          revision: 'be94d5a931fe5f39'
        },
        {
          url: '/_next/static/chunks/8353-5e436eb7a1a02f57.js',
          revision: '5e436eb7a1a02f57'
        },
        {
          url: '/_next/static/chunks/8443-09274c90f27d1b9f.js',
          revision: '09274c90f27d1b9f'
        },
        {
          url: '/_next/static/chunks/8525.71cda09186d5bdf8.js',
          revision: '71cda09186d5bdf8'
        },
        {
          url: '/_next/static/chunks/8794-c7d860e8d6d9439e.js',
          revision: 'c7d860e8d6d9439e'
        },
        {
          url: '/_next/static/chunks/8844.8d2cc54f397ea9f9.js',
          revision: '8d2cc54f397ea9f9'
        },
        {
          url: '/_next/static/chunks/9491-1b5a6e939a4a60c2.js',
          revision: '1b5a6e939a4a60c2'
        },
        {
          url: '/_next/static/chunks/9772.7b237895e503f9b9.js',
          revision: '7b237895e503f9b9'
        },
        {
          url: '/_next/static/chunks/9957-a0542d824a858d79.js',
          revision: 'a0542d824a858d79'
        },
        {
          url: '/_next/static/chunks/a908dc70-720813364b185e08.js',
          revision: '720813364b185e08'
        },
        {
          url: '/_next/static/chunks/c9184924-0b637cb2559c0e3b.js',
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
          url: '/_next/static/chunks/pages/_app-8d5a34c105f7af03.js',
          revision: '8d5a34c105f7af03'
        },
        {
          url: '/_next/static/chunks/pages/_error-d62f8733f694aac5.js',
          revision: 'd62f8733f694aac5'
        },
        {
          url: '/_next/static/chunks/pages/about-us-06b04c858226106d.js',
          revision: '06b04c858226106d'
        },
        {
          url: '/_next/static/chunks/pages/admin/attribute-d15d2737ed13e5f6.js',
          revision: 'd15d2737ed13e5f6'
        },
        {
          url: '/_next/static/chunks/pages/admin/attribute/create-d7504d2ab29e90a7.js',
          revision: 'd7504d2ab29e90a7'
        },
        {
          url: '/_next/static/chunks/pages/admin/attribute/edit/%5BattributeId%5D-78e81bb3e6cad970.js',
          revision: '78e81bb3e6cad970'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/manufacturer-487b970355c1ad27.js',
          revision: '487b970355c1ad27'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/manufacturer/create-1253fd78bfc46946.js',
          revision: '1253fd78bfc46946'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/manufacturer/edit/%5BsupplierId%5D-53d364d2e2f5335a.js',
          revision: '53d364d2e2f5335a'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/product-b3b12dd5a3b80ca3.js',
          revision: 'b3b12dd5a3b80ca3'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/product/create-7ba4fe0dcd6c74f0.js',
          revision: '7ba4fe0dcd6c74f0'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/product/edit/%5BproductId%5D-e1855a1241146f15.js',
          revision: 'e1855a1241146f15'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/supplier-fef491faa807cb4b.js',
          revision: 'fef491faa807cb4b'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/supplier/create-8a199c40bd68f28b.js',
          revision: '8a199c40bd68f28b'
        },
        {
          url: '/_next/static/chunks/pages/admin/catalog/supplier/edit/%5BsupplierId%5D-634d8c64f6c188e8.js',
          revision: '634d8c64f6c188e8'
        },
        {
          url: '/_next/static/chunks/pages/admin/category-17c965ed064a822b.js',
          revision: '17c965ed064a822b'
        },
        {
          url: '/_next/static/chunks/pages/admin/category/create-8bbb9be5f47dd939.js',
          revision: '8bbb9be5f47dd939'
        },
        {
          url: '/_next/static/chunks/pages/admin/category/edit/%5BcategoryId%5D-4ddd00c1c47158b8.js',
          revision: '4ddd00c1c47158b8'
        },
        {
          url: '/_next/static/chunks/pages/admin/coming-soon-230763ef7bd9dafe.js',
          revision: '230763ef7bd9dafe'
        },
        {
          url: '/_next/static/chunks/pages/admin/coupon-95d029c01833032f.js',
          revision: '95d029c01833032f'
        },
        {
          url: '/_next/static/chunks/pages/admin/coupon/create-74307e199f55a743.js',
          revision: '74307e199f55a743'
        },
        {
          url: '/_next/static/chunks/pages/admin/coupon/edit/%5BcouponId%5D-230d52def0682c8e.js',
          revision: '230d52def0682c8e'
        },
        {
          url: '/_next/static/chunks/pages/admin/customer-0050bf24bc323e3c.js',
          revision: '0050bf24bc323e3c'
        },
        {
          url: '/_next/static/chunks/pages/admin/customer/customer/%5BcustomerId%5D-d6f30fc946de5b90.js',
          revision: 'd6f30fc946de5b90'
        },
        {
          url: '/_next/static/chunks/pages/admin/dashboard-57e31d5fba3816a9.js',
          revision: '57e31d5fba3816a9'
        },
        {
          url: '/_next/static/chunks/pages/admin/marketplace/app/listing-5e937d2ff0a87eed.js',
          revision: '5e937d2ff0a87eed'
        },
        {
          url: '/_next/static/chunks/pages/admin/marketplace/theme/%5BthemeId%5D-22c6de68efa2648f.js',
          revision: '22c6de68efa2648f'
        },
        {
          url: '/_next/static/chunks/pages/admin/marketplace/theme/listing-8d10d4b13a7731c3.js',
          revision: '8d10d4b13a7731c3'
        },
        {
          url: '/_next/static/chunks/pages/admin/media-f1e513b53b350608.js',
          revision: 'f1e513b53b350608'
        },
        {
          url: '/_next/static/chunks/pages/admin/media/%5Bid%5D-5873b58a619b375d.js',
          revision: '5873b58a619b375d'
        },
        {
          url: '/_next/static/chunks/pages/admin/sales/order-15244784fd51a2b8.js',
          revision: '15244784fd51a2b8'
        },
        {
          url: '/_next/static/chunks/pages/admin/sales/order-status-7534e2d040610ff8.js',
          revision: '7534e2d040610ff8'
        },
        {
          url: '/_next/static/chunks/pages/admin/sales/order-status/create-c4cb861a21c7c84d.js',
          revision: 'c4cb861a21c7c84d'
        },
        {
          url: '/_next/static/chunks/pages/admin/sales/order-status/edit/%5BstatusId%5D-f172b25f57c105d3.js',
          revision: 'f172b25f57c105d3'
        },
        {
          url: '/_next/static/chunks/pages/admin/sales/order/%5BorderId%5D-d1af89af68820ddf.js',
          revision: 'd1af89af68820ddf'
        },
        {
          url: '/_next/static/chunks/pages/admin/settings/account-settings-e03c948b2fb6dc59.js',
          revision: 'e03c948b2fb6dc59'
        },
        {
          url: '/_next/static/chunks/pages/admin/shipping-delivery/delivery-time-fbfe68605090b0ba.js',
          revision: 'fbfe68605090b0ba'
        },
        {
          url: '/_next/static/chunks/pages/admin/shipping-delivery/delivery-time/create-b5afd8094a2d7f9c.js',
          revision: 'b5afd8094a2d7f9c'
        },
        {
          url: '/_next/static/chunks/pages/admin/shipping-delivery/delivery-time/edit/%5BshippingId%5D-ae129a103de648fe.js',
          revision: 'ae129a103de648fe'
        },
        {
          url: '/_next/static/chunks/pages/admin/shipping-delivery/shipping-zone-98fa89b406b76d17.js',
          revision: '98fa89b406b76d17'
        },
        {
          url: '/_next/static/chunks/pages/admin/shipping-delivery/shipping-zone/create-6943d09e4b5724eb.js',
          revision: '6943d09e4b5724eb'
        },
        {
          url: '/_next/static/chunks/pages/admin/shipping-delivery/shipping-zone/edit/%5BshippingId%5D-51b8dc930430254a.js',
          revision: '51b8dc930430254a'
        },
        {
          url: '/_next/static/chunks/pages/admin/slider/hero-carousel-5c41c9d92621a925.js',
          revision: '5c41c9d92621a925'
        },
        {
          url: '/_next/static/chunks/pages/admin/slider/hero-carousel/create-ae3194b8aa8870c1.js',
          revision: 'ae3194b8aa8870c1'
        },
        {
          url: '/_next/static/chunks/pages/admin/slider/hero-carousel/edit/%5BsliderId%5D-d315e018e5e03942.js',
          revision: 'd315e018e5e03942'
        },
        {
          url: '/_next/static/chunks/pages/admin/slider/promo-slider-07cbead3efe345b6.js',
          revision: '07cbead3efe345b6'
        },
        {
          url: '/_next/static/chunks/pages/admin/store/page/%5Bslug%5D-c717918155b97da7.js',
          revision: 'c717918155b97da7'
        },
        {
          url: '/_next/static/chunks/pages/admin/store/theme-c865749eacc1d47d.js',
          revision: 'c865749eacc1d47d'
        },
        {
          url: '/_next/static/chunks/pages/admin/tag-ed1bce12ec1b8da2.js',
          revision: 'ed1bce12ec1b8da2'
        },
        {
          url: '/_next/static/chunks/pages/admin/tag/create-4aaa62e6533d0ad6.js',
          revision: '4aaa62e6533d0ad6'
        },
        {
          url: '/_next/static/chunks/pages/admin/tag/edit/%5BtagId%5D-7a7d19947cc6e816.js',
          revision: '7a7d19947cc6e816'
        },
        {
          url: '/_next/static/chunks/pages/admin/user-4b5dc5c3ea887027.js',
          revision: '4b5dc5c3ea887027'
        },
        {
          url: '/_next/static/chunks/pages/admin/user/create-0a20bd94993ffb91.js',
          revision: '0a20bd94993ffb91'
        },
        {
          url: '/_next/static/chunks/pages/admin/user/edit/%5BuserId%5D-409b7c08a1b31a47.js',
          revision: '409b7c08a1b31a47'
        },
        {
          url: '/_next/static/chunks/pages/admin/user/user_role-899a39b3ada4ad52.js',
          revision: '899a39b3ada4ad52'
        },
        {
          url: '/_next/static/chunks/pages/admin/user/user_role/create-494efcb93d5f3262.js',
          revision: '494efcb93d5f3262'
        },
        {
          url: '/_next/static/chunks/pages/admin/user/user_role/edit/%5BroleId%5D-94e8ab7f75b00207.js',
          revision: '94e8ab7f75b00207'
        },
        {
          url: '/_next/static/chunks/pages/blog-c9d0bc43c1a03688.js',
          revision: 'c9d0bc43c1a03688'
        },
        {
          url: '/_next/static/chunks/pages/blog/%5B...slug%5D-cf610f04a994ab01.js',
          revision: 'cf610f04a994ab01'
        },
        {
          url: '/_next/static/chunks/pages/blog/page/%5Bpage%5D-ee8c25d26de26a27.js',
          revision: 'ee8c25d26de26a27'
        },
        {
          url: '/_next/static/chunks/pages/blog/tags/%5Btag%5D-9f6aa4207fdcf7c6.js',
          revision: '9f6aa4207fdcf7c6'
        },
        {
          url: '/_next/static/chunks/pages/index-fbb94bc1728cc181.js',
          revision: 'fbb94bc1728cc181'
        },
        {
          url: '/_next/static/chunks/pages/invoice-1482ae94e6351943.js',
          revision: '1482ae94e6351943'
        },
        {
          url: '/_next/static/chunks/pages/login-d41d61d0cf491893.js',
          revision: 'd41d61d0cf491893'
        },
        {
          url: '/_next/static/chunks/pages/logout-6567632c5b91b59f.js',
          revision: '6567632c5b91b59f'
        },
        {
          url: '/_next/static/chunks/pages/policy-cdbea8e7e9510577.js',
          revision: 'cdbea8e7e9510577'
        },
        {
          url: '/_next/static/chunks/pages/profile-update-04f237d837e07a23.js',
          revision: '04f237d837e07a23'
        },
        {
          url: '/_next/static/chunks/pages/signup-30a8c31db06e795e.js',
          revision: '30a8c31db06e795e'
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0'
        },
        {
          url: '/_next/static/chunks/webpack-85db872161ce87a1.js',
          revision: '85db872161ce87a1'
        },
        {
          url: '/_next/static/css/0262c29bf75a4545.css',
          revision: '0262c29bf75a4545'
        },
        {
          url: '/_next/static/css/04504a2ad636b7bf.css',
          revision: '04504a2ad636b7bf'
        },
        {
          url: '/_next/static/css/0f04891bd3121db8.css',
          revision: '0f04891bd3121db8'
        },
        {
          url: '/_next/static/css/0f656b1fdbaf607d.css',
          revision: '0f656b1fdbaf607d'
        },
        {
          url: '/_next/static/css/24fcce28627be00f.css',
          revision: '24fcce28627be00f'
        },
        {
          url: '/_next/static/css/285b373c1af4890a.css',
          revision: '285b373c1af4890a'
        },
        {
          url: '/_next/static/css/2a33a195e8c08187.css',
          revision: '2a33a195e8c08187'
        },
        {
          url: '/_next/static/css/2e2751e26baf52dd.css',
          revision: '2e2751e26baf52dd'
        },
        {
          url: '/_next/static/css/35bb1c0e2f9bb7cd.css',
          revision: '35bb1c0e2f9bb7cd'
        },
        {
          url: '/_next/static/css/3ce268ac554bf688.css',
          revision: '3ce268ac554bf688'
        },
        {
          url: '/_next/static/css/3fc82354204da7d5.css',
          revision: '3fc82354204da7d5'
        },
        {
          url: '/_next/static/css/6a444accce7d6407.css',
          revision: '6a444accce7d6407'
        },
        {
          url: '/_next/static/css/7c7f258ce44c544f.css',
          revision: '7c7f258ce44c544f'
        },
        {
          url: '/_next/static/css/7e334bd9577ab7af.css',
          revision: '7e334bd9577ab7af'
        },
        {
          url: '/_next/static/css/7fabfee6a023f2b6.css',
          revision: '7fabfee6a023f2b6'
        },
        {
          url: '/_next/static/css/92acfa332e95f67c.css',
          revision: '92acfa332e95f67c'
        },
        {
          url: '/_next/static/css/958400e8ebb7211d.css',
          revision: '958400e8ebb7211d'
        },
        {
          url: '/_next/static/css/95f409b96012768e.css',
          revision: '95f409b96012768e'
        },
        {
          url: '/_next/static/css/965b198c4fc3df4d.css',
          revision: '965b198c4fc3df4d'
        },
        {
          url: '/_next/static/css/9bdbfcf258410324.css',
          revision: '9bdbfcf258410324'
        },
        {
          url: '/_next/static/css/9cc15d05d317543a.css',
          revision: '9cc15d05d317543a'
        },
        {
          url: '/_next/static/css/a1750b089a3b146a.css',
          revision: 'a1750b089a3b146a'
        },
        {
          url: '/_next/static/css/a90f5cee2c1ad4c7.css',
          revision: 'a90f5cee2c1ad4c7'
        },
        {
          url: '/_next/static/css/b1bfced8d6250e91.css',
          revision: 'b1bfced8d6250e91'
        },
        {
          url: '/_next/static/css/b801195012a44930.css',
          revision: 'b801195012a44930'
        },
        {
          url: '/_next/static/css/c89914054b57a950.css',
          revision: 'c89914054b57a950'
        },
        {
          url: '/_next/static/css/f833af11aeb5cd15.css',
          revision: 'f833af11aeb5cd15'
        },
        {
          url: '/_next/static/css/f85844aabf753859.css',
          revision: 'f85844aabf753859'
        },
        {
          url: '/_next/static/css/f8aee2f66a30e49b.css',
          revision: 'f8aee2f66a30e49b'
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
        {
          url: '/_next/static/uBDIDns-j2I2IiifPQFE3/_buildManifest.js',
          revision: 'a5964c279b267490af23ff210bba1ae1'
        },
        {
          url: '/_next/static/uBDIDns-j2I2IiifPQFE3/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933'
        },
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
        { url: '/feed.xml', revision: '8a3434e8bf02e78e4eac20606a9cd9ae' },
        {
          url: '/image/error-plug.png',
          revision: '09ac461516dda937afcbc9a3b623c54d'
        },
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
          revision: '51475632620326113708b6d951c5c72f'
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
          revision: 'b5ad5318e5b797666b2b4dd9be0e7f0d'
        },
        {
          url: '/locales/en/error.json',
          revision: '1f74fc12a629d78a35037e2b3a6b67aa'
        },
        {
          url: '/locales/en/form.json',
          revision: '3a6487d7928077bab67e20401d23dc38'
        },
        {
          url: '/locales/en/table.json',
          revision: '8297e7334d7a75bf252cbfea027bd838'
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
          revision: '254f91496e4620e0faf48c2658978092'
        },
        {
          url: '/locales/fr/form.json',
          revision: '67d4c5fd0fc5019aa14b5aac29f3e481'
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
        { url: '/manifest.json', revision: '36d6d141e2f1c11575f4e55254d714ef' },
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
        { url: '/scandi.webp', revision: '1544934b727b374a5f4059996f091f69' },
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
          url: '/svg/category.svg',
          revision: 'd3245ac74d6946faaf4a05d883eb7bc6'
        },
        {
          url: '/svg/coupon.svg',
          revision: 'f820ae9d4287f132aa441d26a74bb292'
        },
        {
          url: '/tags/feature/feed.xml',
          revision: '860f3893b50e27313ef074a7c440e0ef'
        },
        {
          url: '/tags/multi-author/feed.xml',
          revision: '4f34106c9fa8a590d001ee06a87bcf45'
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
