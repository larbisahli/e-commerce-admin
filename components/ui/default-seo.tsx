import { DefaultSeo as NextDefaultSeo } from 'next-seo';

const DefaultSeo = () => {
  return (
    <NextDefaultSeo
      title={'Dropgala'}
      twitter={{
        handle: '',
        site: '',
        cardType: ''
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1 maximum-scale=1'
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ]}
      additionalLinkTags={[
        {
          rel: 'apple-touch-icon',
          href: 'icons/apple-icon-180.png'
        },
        {
          rel: 'manifest',
          href: '/manifest.json'
        }
      ]}
    />
  );
};

export default DefaultSeo;
