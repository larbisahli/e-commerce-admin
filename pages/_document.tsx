import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';
import Script from 'next/script';
import { i18n } from 'next-i18next';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    if (process.env.NODE_ENV !== 'production') {
      i18n?.reloadResources(locale);
    }

    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Mulish:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>
          {/* <Script src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.RECAPTCHA_SITE_KEY}`} /> */}
        </Head>
        <body dir={dir}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
