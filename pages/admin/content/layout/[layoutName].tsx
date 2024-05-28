import { useQuery } from '@apollo/client';
import BuilderLayout from '@components/layouts/builder';
import LayoutNavigation from '@components/store-builder/LayoutNavigation';
import NavigationLink from '@components/store-builder/navigationLink';
import { STORE_LAYOUTS } from '@graphql/content';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import { StoreBuilder } from '@ts-types/enums';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

interface TLayout {
  storeLayouts: {
    id: string;
    name: string;
    title: string;
    isCustom: boolean;
  }[];
  storeLayoutComponents: {
    contentId: string;
    data: any;
  }[];
}

interface OptionsVariable {
  layoutName: string;
}

export default function CreateSupplierPage({ client }: SSRProps) {
  useGetUser(client);

  const { query } = useRouter();
  const layoutName = query.layoutName as string;

  const { data, loading, error } = useQuery<TLayout, OptionsVariable>(
    STORE_LAYOUTS,
    {
      variables: { layoutName },
      fetchPolicy: 'cache-and-network'
    }
  );

  const { storeLayouts = [], storeLayoutComponents = [] } = data ?? {};

  useErrorLogger(error);

  /**
   * BUILDER EVENT LISTENER
   */
  useEffect(() => {
    // For some reason this renders twice
    window.addEventListener(
      'message',
      function (e) {
        if (e.data?.source === StoreBuilder.GALA_CMS_BUILDER_PAGE) {
          const layout = e.data?.layout;
          if (layout) {
            console.log({ layout });
          }
        }
      },
      false
    );
  }, []);

  return (
    <>
      <Head>
        <title>Store design | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/design.svg"
        />
      </Head>
      <div className="h-full overflow-hidden">
        <div className="px-5">
          <NavigationLink />
        </div>
        <LayoutNavigation
          loading={loading}
          storeLayoutComponents={storeLayoutComponents}
          storeLayouts={storeLayouts}
        />
      </div>
    </>
  );
}

CreateSupplierPage.Layout = BuilderLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { client } = await verifyAuth(context);

  if (!client) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN
      }
    };
  }

  const { csrfToken, csrfError } = await XSRFHandler(context);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'table',
        'common',
        'form',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
