import Head from 'next/head';

const NoIndex = () => {
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default NoIndex;
