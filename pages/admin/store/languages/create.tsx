import AppLayout from '@components/layouts/app';
import { useGetClient } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import fs from 'fs';
import { readFile } from 'fs/promises';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import path from 'path';

const LanguageForm = dynamic(
  () => import('@components/language/language-form'),
  { ssr: true }
);

interface Props extends SSRProps {
  localeFiles: { [key: string]: string };
}

export default function UpdateTagPage({ client, localeFiles = {} }: Props) {
  useGetClient(client);
  return (
    <>
      <Head>
        <title>New Language | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/language.svg"
        />
      </Head>
      <LanguageForm localeFiles={localeFiles} />
    </>
  );
}

UpdateTagPage.Layout = AppLayout;

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

  let localeFiles = [];

  try {
    const languageLocale = 'en-us';

    const files = await fs.promises
      .readdir(path.resolve(`./utils/locales/${languageLocale}`))
      .then((f) => f);

    localeFiles = await Promise.all(
      files?.map(async (f) => {
        const fileName = f?.split('.')[0];

        const translation = JSON.parse(
          await readFile(
            path.resolve(`./utils/locales/${languageLocale}/${f}`),
            'utf8'
          )
        );

        return { [fileName]: translation };
      })
    );
  } catch (error) {
    console.log({ error });
  }

  localeFiles = Object.assign({}, ...localeFiles);

  const { csrfToken, csrfError } = await XSRFHandler(context);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['form', 'common', 'error'])),
      localeFiles,
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
