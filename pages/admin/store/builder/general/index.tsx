import AnalyticsIcon from '@components/icons/analytics';
import { ColorIcon } from '@components/icons/builder/color';
import { LogoIdentityIcon } from '@components/icons/builder/logo-identity';
import { PagesIcon } from '@components/icons/builder/pages';
import { SocialIcon } from '@components/icons/builder/social';
import { TemplateIcon } from '@components/icons/builder/template';
import { TypographyIcon } from '@components/icons/builder/typography';
import BuilderLayout from '@components/layouts/builder';
import NavigationLink from '@components/store-builder/navigationLink';
import { useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CreateSupplierPage({ client }: SSRProps) {
  useGetUser(client);
  return (
    <>
      <Head>
        <title>General | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/supplier.svg"
        />
      </Head>
      <div>
        <NavigationLink />
        <div className="mt-5">
          <Link
            href={ROUTES.BUILDER_LOGO_IDENTITY}
            className="flex cursor-pointer items-center py-3 px-2 hover:bg-gray-100"
          >
            <div className="text-gray-900">
              <LogoIdentityIcon width={25} height={25} />
            </div>
            <div className="mx-2 px-1 text-base text-black">Logo & dentity</div>
          </Link>
          <Link
            href={ROUTES.BUILDER_COLOR_APPEARANCE}
            className="flex cursor-pointer items-center py-3 px-2 hover:bg-gray-100"
          >
            <div className="text-gray-900">
              <ColorIcon width={25} height={25} />
            </div>
            <div className="mx-2 text-base text-black">Color & appearance</div>
          </Link>
          <Link
            href={ROUTES.BUILDER_TYPOGRAPHY}
            className="flex cursor-pointer items-center py-3 px-2 hover:bg-gray-100"
          >
            <div className="text-gray-900">
              <TypographyIcon width={20} height={20} />
            </div>
            <div className="mx-2 px-1 text-base text-black">Typography</div>
          </Link>
          <Link
            href={ROUTES.BUILDER_ANALYTICS}
            className="flex cursor-pointer items-center py-3 px-2 hover:bg-gray-100"
          >
            <div className="text-gray-900">
              <AnalyticsIcon width={20} height={20} />
            </div>
            <div className="mx-2 px-1 text-base text-black">Analytics</div>
          </Link>
          <Link
            href={ROUTES.BUILDER_SOCIAL_LINKS}
            className="flex cursor-pointer items-center py-3 px-2 hover:bg-gray-100"
          >
            <div className="text-gray-900">
              <SocialIcon width={20} height={20} />
            </div>
            <div className="mx-2 px-1 text-base text-black">Social links</div>
          </Link>
          <Link
            href={ROUTES.BUILDER_PAGES}
            className="flex cursor-pointer items-center py-3 px-2 hover:bg-gray-100"
          >
            <div className="text-gray-900">
              <PagesIcon width={25} height={25} />
            </div>
            <div className="mx-2 px-1 text-base text-black">Pages</div>
          </Link>
          <Link
            href={ROUTES.BUILDER_TEMPLATES}
            className="flex cursor-pointer items-center py-3 px-2 hover:bg-gray-100"
          >
            <div className="text-gray-900">
              <TemplateIcon width={20} height={20} />
            </div>
            <div className="mx-2 px-1 text-base text-black">Templates</div>
          </Link>
        </div>
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

// store-design/layout/index/sections/header
// store-design/layout/8c4cc176-0c02-4bc6-b39c-458a8689512d/ (privacy page)
// store-design/layout/8c4cc176-0c02-4bc6-b39c-458a8689512d/sections/header
