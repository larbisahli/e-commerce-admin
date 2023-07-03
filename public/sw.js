if (!self.define) {
  let e,
    s = {};
  const c = (c, a) => (
    (c = new URL(c + '.js', a).href),
    s[c] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = c), (e.onload = s), document.head.appendChild(e);
        } else (e = c), importScripts(c), s();
      }).then(() => {
        let e = s[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, i) => {
    const n =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[n]) return;
    let t = {};
    const r = (e) => c(e, n),
      f = { module: { uri: n }, exports: t, require: r };
    s[n] = Promise.all(a.map((e) => f[e] || r(e))).then((e) => (i(...e), t));
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
          url: '/_next/static/chunks/1307-8092531c1fbcac3e.js',
          revision: '8092531c1fbcac3e'
        },
        {
          url: '/_next/static/chunks/1438.755848ca8768c6c5.js',
          revision: '755848ca8768c6c5'
        },
        {
          url: '/_next/static/chunks/1860-e8af69f0cf3e4fc6.js',
          revision: 'e8af69f0cf3e4fc6'
        },
        {
          url: '/_next/static/chunks/1937-31463ff2ace58b4c.js',
          revision: '31463ff2ace58b4c'
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
          url: '/_next/static/chunks/263.1655f267f6099f26.js',
          revision: '1655f267f6099f26'
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
          url: '/_next/static/chunks/3627.ff9e2801b3d05889.js',
          revision: 'ff9e2801b3d05889'
        },
        {
          url: '/_next/static/chunks/368-3466ce7d3ec54fa5.js',
          revision: '3466ce7d3ec54fa5'
        },
        {
          url: '/_next/static/chunks/3826.87a694e991103f4f.js',
          revision: '87a694e991103f4f'
        },
        {
          url: '/_next/static/chunks/394-3b06380e36c7bc0b.js',
          revision: '3b06380e36c7bc0b'
        },
        {
          url: '/_next/static/chunks/3973.1bb6cc3b63c32445.js',
          revision: '1bb6cc3b63c32445'
        },
        {
          url: '/_next/static/chunks/4320.f972e8b9e30f3e8f.js',
          revision: 'f972e8b9e30f3e8f'
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
          url: '/_next/static/chunks/5089-5c4252af15a8b61c.js',
          revision: '5c4252af15a8b61c'
        },
        {
          url: '/_next/static/chunks/5158.4e1c1ae07604e288.js',
          revision: '4e1c1ae07604e288'
        },
        {
          url: '/_next/static/chunks/5492-205b7037b0fcd4f3.js',
          revision: '205b7037b0fcd4f3'
        },
        {
          url: '/_next/static/chunks/5566-f8924a7cc8615bae.js',
          revision: 'f8924a7cc8615bae'
        },
        {
          url: '/_next/static/chunks/5586-0a54c78b0dc2285e.js',
          revision: '0a54c78b0dc2285e'
        },
        {
          url: '/_next/static/chunks/5592-56f2dc61223e0c7a.js',
          revision: '56f2dc61223e0c7a'
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
          url: '/_next/static/chunks/626-531295155b077e07.js',
          revision: '531295155b077e07'
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
          url: '/_next/static/chunks/662-1576cc7be24e7cfc.js',
          revision: '1576cc7be24e7cfc'
        },
        {
          url: '/_next/static/chunks/6697-9c1d3451882702d0.js',
          revision: '9c1d3451882702d0'
        },
        {
          url: '/_next/static/chunks/6731.f471dba938d163bc.js',
          revision: 'f471dba938d163bc'
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
          url: '/_next/static/chunks/7151-faac2537081cd99b.js',
          revision: 'faac2537081cd99b'
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
          url: '/_next/static/chunks/7457-f0ad5b6b8268022c.js',
          revision: 'f0ad5b6b8268022c'
        },
        {
          url: '/_next/static/chunks/74fdba35-3d667370b2b42ffa.js',
          revision: '3d667370b2b42ffa'
        },
        {
          url: '/_next/static/chunks/7536-acd81e1534c03a71.js',
          revision: 'acd81e1534c03a71'
        },
        {
          url: '/_next/static/chunks/7826-fda1408e869158c5.js',
          revision: 'fda1408e869158c5'
        },
        {
          url: '/_next/static/chunks/7856.5bd44eef7f16df1e.js',
          revision: '5bd44eef7f16df1e'
        },
        {
          url: '/_next/static/chunks/7917.48360b57ec35ccc6.js',
          revision: '48360b57ec35ccc6'
        },
        {
          url: '/_next/static/chunks/7922.c8becffe9bc54411.js',
          revision: 'c8becffe9bc54411'
        },
        {
          url: '/_next/static/chunks/7939.516ec21977ca9e72.js',
          revision: '516ec21977ca9e72'
        },
        {
          url: '/_next/static/chunks/7958-73dc06e174c1d0f6.js',
          revision: '73dc06e174c1d0f6'
        },
        {
          url: '/_next/static/chunks/8250-e32440ea87c71df9.js',
          revision: 'e32440ea87c71df9'
        },
        {
          url: '/_next/static/chunks/8314.376305998953dcaa.js',
          revision: '376305998953dcaa'
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
          url: '/_next/static/chunks/8689-1444a75b6b92a7dd.js',
          revision: '1444a75b6b92a7dd'
        },
        {
          url: '/_next/static/chunks/8794-eed29ebb281b8e67.js',
          revision: 'eed29ebb281b8e67'
        },
        {
          url: '/_next/static/chunks/8844.9e65ad7cb753fa73.js',
          revision: '9e65ad7cb753fa73'
        },
        {
          url: '/_next/static/chunks/9491-1b5a6e939a4a60c2.js',
          revision: '1b5a6e939a4a60c2'
        },
        {
          url: '/_next/static/chunks/9772.c64428b3ebd7ec3d.js',
          revision: 'c64428b3ebd7ec3d'
        },
        {
          url: '/_next/static/chunks/9957-a0542d824a858d79.js',
          revision: 'a0542d824a858d79'
        },
        {
          url: '/_next/static/chunks/a908dc70-9aaf1f62924a51d8.js',
          revision: '9aaf1f62924a51d8'
        },
        {
          url: '/_next/static/chunks/c9184924-cfc84389abafcffb.js',
          revision: 'cfc84389abafcffb'
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
          url: '/_next/static/chunks/pages/_app-70175f894c9615c5.js',
          revision: '70175f894c9615c5'
        },
        {
          url: '/_next/static/chunks/pages/_error-d62f8733f694aac5.js',
          revision: 'd62f8733f694aac5'
        },
        {
          url: '/_next/static/chunks/pages/attributes-4d4af7cb1f35aa0e.js',
          revision: '4d4af7cb1f35aa0e'
        },
        {
          url: '/_next/static/chunks/pages/attributes/create-8894b3146ecbf21b.js',
          revision: '8894b3146ecbf21b'
        },
        {
          url: '/_next/static/chunks/pages/attributes/edit/%5BattributeId%5D-0a1bef4fb45a4df8.js',
          revision: '0a1bef4fb45a4df8'
        },
        {
          url: '/_next/static/chunks/pages/catalog/products-ebef0cfd1ed6b5c8.js',
          revision: 'ebef0cfd1ed6b5c8'
        },
        {
          url: '/_next/static/chunks/pages/catalog/products/create-e7464320f5af593e.js',
          revision: 'e7464320f5af593e'
        },
        {
          url: '/_next/static/chunks/pages/catalog/products/edit/%5BproductId%5D-5d5c1abed99ed247.js',
          revision: '5d5c1abed99ed247'
        },
        {
          url: '/_next/static/chunks/pages/categories-f5d42ad8eb8645a2.js',
          revision: 'f5d42ad8eb8645a2'
        },
        {
          url: '/_next/static/chunks/pages/categories/create-600ec72422b4623f.js',
          revision: '600ec72422b4623f'
        },
        {
          url: '/_next/static/chunks/pages/categories/edit/%5BcategoryId%5D-67d935ac0bdc5ccb.js',
          revision: '67d935ac0bdc5ccb'
        },
        {
          url: '/_next/static/chunks/pages/coming-soon-e502a7a3916fabfe.js',
          revision: 'e502a7a3916fabfe'
        },
        {
          url: '/_next/static/chunks/pages/coupons-3666368855092ef8.js',
          revision: '3666368855092ef8'
        },
        {
          url: '/_next/static/chunks/pages/coupons/create-55901aea333851a1.js',
          revision: '55901aea333851a1'
        },
        {
          url: '/_next/static/chunks/pages/coupons/edit/%5BcouponId%5D-d1478356bc222650.js',
          revision: 'd1478356bc222650'
        },
        {
          url: '/_next/static/chunks/pages/customers-03ec2747311ad0a1.js',
          revision: '03ec2747311ad0a1'
        },
        {
          url: '/_next/static/chunks/pages/customers/customer/%5BcustomerId%5D-f82745b59a9a920d.js',
          revision: 'f82745b59a9a920d'
        },
        {
          url: '/_next/static/chunks/pages/dashboard-f9660c3c4e23868b.js',
          revision: 'f9660c3c4e23868b'
        },
        {
          url: '/_next/static/chunks/pages/index-f8abbbd1ce6fd0a2.js',
          revision: 'f8abbbd1ce6fd0a2'
        },
        {
          url: '/_next/static/chunks/pages/invoice-1482ae94e6351943.js',
          revision: '1482ae94e6351943'
        },
        {
          url: '/_next/static/chunks/pages/login-fa6896e323898357.js',
          revision: 'fa6896e323898357'
        },
        {
          url: '/_next/static/chunks/pages/logout-1f2715b6fab68ecc.js',
          revision: '1f2715b6fab68ecc'
        },
        {
          url: '/_next/static/chunks/pages/marketplace/apps/listing-f76f4dd1bcbb2cdd.js',
          revision: 'f76f4dd1bcbb2cdd'
        },
        {
          url: '/_next/static/chunks/pages/marketplace/themes/listing-79afcd083281a49b.js',
          revision: '79afcd083281a49b'
        },
        {
          url: '/_next/static/chunks/pages/media-e374927303ef3cd6.js',
          revision: 'e374927303ef3cd6'
        },
        {
          url: '/_next/static/chunks/pages/media/%5Bid%5D-6765ad26394c9d01.js',
          revision: '6765ad26394c9d01'
        },
        {
          url: '/_next/static/chunks/pages/order-status-f2aa021585ba43b4.js',
          revision: 'f2aa021585ba43b4'
        },
        {
          url: '/_next/static/chunks/pages/order-status/create-e8db488a626bcd99.js',
          revision: 'e8db488a626bcd99'
        },
        {
          url: '/_next/static/chunks/pages/order-status/edit/%5BstatusId%5D-edc5a456ae85d2f6.js',
          revision: 'edc5a456ae85d2f6'
        },
        {
          url: '/_next/static/chunks/pages/profile-update-ee83ff05a53471f3.js',
          revision: 'ee83ff05a53471f3'
        },
        {
          url: '/_next/static/chunks/pages/sales/orders-e9f5c229c5055c12.js',
          revision: 'e9f5c229c5055c12'
        },
        {
          url: '/_next/static/chunks/pages/sales/orders/%5BorderId%5D-bf60970428b4f47a.js',
          revision: 'bf60970428b4f47a'
        },
        {
          url: '/_next/static/chunks/pages/settings/account-settings-69545e09a5c3b83e.js',
          revision: '69545e09a5c3b83e'
        },
        {
          url: '/_next/static/chunks/pages/shipping-delivery/delivery-times-b3979f03accf6578.js',
          revision: 'b3979f03accf6578'
        },
        {
          url: '/_next/static/chunks/pages/shipping-delivery/delivery-times/create-dfb6649f957a4fd3.js',
          revision: 'dfb6649f957a4fd3'
        },
        {
          url: '/_next/static/chunks/pages/shipping-delivery/delivery-times/edit/%5BshippingId%5D-52b215fe1ef4bf6d.js',
          revision: '52b215fe1ef4bf6d'
        },
        {
          url: '/_next/static/chunks/pages/shipping-delivery/shipping-zones-b563afaf6491d106.js',
          revision: 'b563afaf6491d106'
        },
        {
          url: '/_next/static/chunks/pages/shipping-delivery/shipping-zones/create-6620ef97a3d5d4b5.js',
          revision: '6620ef97a3d5d4b5'
        },
        {
          url: '/_next/static/chunks/pages/shipping-delivery/shipping-zones/edit/%5BshippingId%5D-69ce0f63b02c1ff4.js',
          revision: '69ce0f63b02c1ff4'
        },
        {
          url: '/_next/static/chunks/pages/signup-30a8c31db06e795e.js',
          revision: '30a8c31db06e795e'
        },
        {
          url: '/_next/static/chunks/pages/sliders/hero-carousel-396cc8985cf45be4.js',
          revision: '396cc8985cf45be4'
        },
        {
          url: '/_next/static/chunks/pages/sliders/hero-carousel/create-545ef3008af2039b.js',
          revision: '545ef3008af2039b'
        },
        {
          url: '/_next/static/chunks/pages/sliders/hero-carousel/edit/%5BsliderId%5D-42b44099b33de70e.js',
          revision: '42b44099b33de70e'
        },
        {
          url: '/_next/static/chunks/pages/sliders/promo-sliders-03ddb51653de4b70.js',
          revision: '03ddb51653de4b70'
        },
        {
          url: '/_next/static/chunks/pages/store/pages/%5Bslug%5D-3b81545331ae035e.js',
          revision: '3b81545331ae035e'
        },
        {
          url: '/_next/static/chunks/pages/store/themes-523a4ccdbe04998f.js',
          revision: '523a4ccdbe04998f'
        },
        {
          url: '/_next/static/chunks/pages/suppliers-503341884c41c9e8.js',
          revision: '503341884c41c9e8'
        },
        {
          url: '/_next/static/chunks/pages/suppliers/create-8ecff3febe7cec54.js',
          revision: '8ecff3febe7cec54'
        },
        {
          url: '/_next/static/chunks/pages/suppliers/edit/%5BsupplierId%5D-79b79ad157f6b0f6.js',
          revision: '79b79ad157f6b0f6'
        },
        {
          url: '/_next/static/chunks/pages/tags-4dc139f16f289ba4.js',
          revision: '4dc139f16f289ba4'
        },
        {
          url: '/_next/static/chunks/pages/tags/create-defda95f3c8dda47.js',
          revision: 'defda95f3c8dda47'
        },
        {
          url: '/_next/static/chunks/pages/tags/edit/%5BtagId%5D-ce30e2df64ffb427.js',
          revision: 'ce30e2df64ffb427'
        },
        {
          url: '/_next/static/chunks/pages/user-b8e30212a99890df.js',
          revision: 'b8e30212a99890df'
        },
        {
          url: '/_next/static/chunks/pages/user/create-f529f4605bc2a4da.js',
          revision: 'f529f4605bc2a4da'
        },
        {
          url: '/_next/static/chunks/pages/user/edit/%5BuserId%5D-0ed8b4ebe0103897.js',
          revision: '0ed8b4ebe0103897'
        },
        {
          url: '/_next/static/chunks/pages/user/user_role-b0e5ba02b808fd94.js',
          revision: 'b0e5ba02b808fd94'
        },
        {
          url: '/_next/static/chunks/pages/user/user_role/create-84cbcb692568ab78.js',
          revision: '84cbcb692568ab78'
        },
        {
          url: '/_next/static/chunks/pages/user/user_role/edit/%5BroleId%5D-6057b144c46b5e32.js',
          revision: '6057b144c46b5e32'
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0'
        },
        {
          url: '/_next/static/chunks/webpack-bb3c5c9b39eadb80.js',
          revision: 'bb3c5c9b39eadb80'
        },
        {
          url: '/_next/static/css/07e3760f015239af.css',
          revision: '07e3760f015239af'
        },
        {
          url: '/_next/static/css/0d7077dd81c84fc7.css',
          revision: '0d7077dd81c84fc7'
        },
        {
          url: '/_next/static/css/0e31abdad7df61d2.css',
          revision: '0e31abdad7df61d2'
        },
        {
          url: '/_next/static/css/16811b6fd79ce29e.css',
          revision: '16811b6fd79ce29e'
        },
        {
          url: '/_next/static/css/246fbff5fdd58240.css',
          revision: '246fbff5fdd58240'
        },
        {
          url: '/_next/static/css/2e2751e26baf52dd.css',
          revision: '2e2751e26baf52dd'
        },
        {
          url: '/_next/static/css/31369ea3ee2c7cbe.css',
          revision: '31369ea3ee2c7cbe'
        },
        {
          url: '/_next/static/css/31921605272bdf22.css',
          revision: '31921605272bdf22'
        },
        {
          url: '/_next/static/css/3ce268ac554bf688.css',
          revision: '3ce268ac554bf688'
        },
        {
          url: '/_next/static/css/484ddc9235620bcf.css',
          revision: '484ddc9235620bcf'
        },
        {
          url: '/_next/static/css/500ef2c3286a8817.css',
          revision: '500ef2c3286a8817'
        },
        {
          url: '/_next/static/css/5b04416de1223e05.css',
          revision: '5b04416de1223e05'
        },
        {
          url: '/_next/static/css/66d1faa92f8feca2.css',
          revision: '66d1faa92f8feca2'
        },
        {
          url: '/_next/static/css/670a975006c6f6c6.css',
          revision: '670a975006c6f6c6'
        },
        {
          url: '/_next/static/css/7445132413eabb62.css',
          revision: '7445132413eabb62'
        },
        {
          url: '/_next/static/css/7c7f258ce44c544f.css',
          revision: '7c7f258ce44c544f'
        },
        {
          url: '/_next/static/css/81c70f15843b7818.css',
          revision: '81c70f15843b7818'
        },
        {
          url: '/_next/static/css/92acfa332e95f67c.css',
          revision: '92acfa332e95f67c'
        },
        {
          url: '/_next/static/css/95f409b96012768e.css',
          revision: '95f409b96012768e'
        },
        {
          url: '/_next/static/css/9d37fb41c268b341.css',
          revision: '9d37fb41c268b341'
        },
        {
          url: '/_next/static/css/a5807b551000dc59.css',
          revision: 'a5807b551000dc59'
        },
        {
          url: '/_next/static/css/a9fb05c1ca6cfad4.css',
          revision: 'a9fb05c1ca6cfad4'
        },
        {
          url: '/_next/static/css/b2f93077b15bbd45.css',
          revision: 'b2f93077b15bbd45'
        },
        {
          url: '/_next/static/css/c6eef04fe27a9d3f.css',
          revision: 'c6eef04fe27a9d3f'
        },
        {
          url: '/_next/static/css/ec9f48ce0f8fc4e2.css',
          revision: 'ec9f48ce0f8fc4e2'
        },
        {
          url: '/_next/static/css/f0aadbf6cc0a4d22.css',
          revision: 'f0aadbf6cc0a4d22'
        },
        {
          url: '/_next/static/css/f0e7cad8fcda3293.css',
          revision: 'f0e7cad8fcda3293'
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
          url: '/_next/static/media/shop.6fb69313.jpg',
          revision: 'cc0e694e0e0e495c0ae09c890b4d9ac0'
        },
        {
          url: '/_next/static/zTQxgWD6C9B5ddf1lx0HG/_buildManifest.js',
          revision: 'ad16049fd4bf76454f9f5eaad013508a'
        },
        {
          url: '/_next/static/zTQxgWD6C9B5ddf1lx0HG/_ssgManifest.js',
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
          revision: 'f943a9c3c8923b369de9ff9f147b2bd8'
        },
        {
          url: '/locales/en/error.json',
          revision: '1f74fc12a629d78a35037e2b3a6b67aa'
        },
        {
          url: '/locales/en/form.json',
          revision: 'a7fd36b906a416499038c7e816e81b4f'
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
        { url: '/robots.txt', revision: '9152d7f1724ed8fbcd2e0c87029f193c' },
        { url: '/scandi.webp', revision: '1544934b727b374a5f4059996f091f69' },
        { url: '/shop.jpg', revision: 'cc0e694e0e0e495c0ae09c890b4d9ac0' },
        {
          url: '/store-setup.png',
          revision: 'd7af20397bb463e18756f2f392ff2ca1'
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
              event: c,
              state: a
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
