import { useQuery } from '@apollo/client';
import BuilderLayout from '@components/layouts/builder';
import LayoutNavigation from '@components/store-builder/LayoutNavigation';
import NavigationLink from '@components/store-builder/navigationLink';
import { useModalState } from '@components/ui/modal/modal.context';
import { STORE_LAYOUTS, STORE_LAYOUTS_COMPONENTS } from '@graphql/content';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useUI } from '@hooks/useUI';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import {
  StoreBuilder,
  StoreBuilderActions,
  StoreLayoutNames
} from '@ts-types/enums';
import { ROUTES } from '@utils/routes';
import { getBuilderSrc } from '@utils/utils';
import { isEmpty } from 'lodash';
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
  storeLayoutCommonComponents: {
    id: string;
    name: string;
    title: string;
  }[];
}

interface OptionsVariable {
  layoutName?: string;
  etag: string;
}

export default function CreateSupplierPage({ client }: SSRProps) {
  const { query, push } = useRouter();
  const layoutName = query.layoutName as string;

  const isCategoryPage = layoutName === StoreLayoutNames.CATEGORY;
  const isCartPage = layoutName === StoreLayoutNames.CART;
  const isCheckoutPage = layoutName === StoreLayoutNames.CHECKOUT;
  const isProductPage = layoutName === StoreLayoutNames.PRODUCT;

  const {
    userInfo: { store: { etag, alias } = {} }
  } = useGetClient(client);

  const {
    data: lData,
    loading: lLoading,
    error: lError
  } = useQuery<TLayout, OptionsVariable>(STORE_LAYOUTS, {
    variables: {
      etag: etag?.layoutEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(etag)
  });

  const {
    data: lcData,
    loading: lcLoading,
    error: lcError
  } = useQuery<TLayout, OptionsVariable>(STORE_LAYOUTS_COMPONENTS, {
    variables: {
      layoutName,
      etag: etag?.layoutEtag
    },
    fetchPolicy: 'cache-and-network',
    skip:
      isCategoryPage ||
      isCartPage ||
      isCheckoutPage ||
      isProductPage ||
      isEmpty(etag)
  });

  const loading = lLoading || lcLoading;

  const { storeLayouts = [] } = lData ?? {};
  const { storeLayoutComponents = [], storeLayoutCommonComponents = [] } =
    lcData ?? {};

  useErrorLogger(lcError);
  useErrorLogger(lError);

  const { meta } = useModalState();
  const {
    ui: {
      builder: { iframeLoading }
    }
  } = useUI();

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
          if (layout?.layoutName) {
            push(`${ROUTES.BUILDER_LAYOUT}/${layout?.layoutName}`, null, {
              shallow: false
            });
            console.log('>>>> Storefront page changes', { layout });
          }
        }
      },
      false
    );
  }, []);

  /**
   * STOREFRONT POSTMESSAGE FOR WINDOW SCROLL TO UPDATED COMPONENT
   */
  useEffect(() => {
    if (alias && meta?.componentId && !iframeLoading) {
      // @ts-ignore
      setTimeout(() => {
        const iframeWin =
          document.getElementById('storefront-iframe').contentWindow;
        iframeWin.postMessage(
          {
            source: StoreBuilder.GALA_CMS_BUILDER,
            actionType: StoreBuilderActions.SCROLL_TO_SECTION,
            componentId: meta?.componentId
          },
          getBuilderSrc(alias)
        );
      }, 900);
    }
  }, [alias, meta?.componentId, iframeLoading]);

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
          storeLayoutCommonComponents={storeLayoutCommonComponents}
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
