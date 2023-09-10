import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { FormPlaceholder } from '@components/ui/placeholders/Form';
import { FormActionPlaceholder } from '@components/ui/placeholders/FormAction';
import { LANGUAGE } from '@graphql/language';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { LanguageType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import fs from 'fs';
import { readFile } from 'fs/promises';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import path from 'path';

const LanguageForm = dynamic(
  () => import('@components/language/language-form'),
  { ssr: true }
);

interface TLanguage {
  language: LanguageType;
}
interface OptionsVariable {
  id: number;
}

interface Props extends SSRProps {
  localeFiles: { [key: string]: string };
}

export default function UpdateTagPage({ client, localeFiles = {} }: Props) {
  const { query } = useRouter();

  const id = parseInt(query.id as string, 10);

  const { data, loading, error } = useQuery<TLanguage, OptionsVariable>(
    LANGUAGE,
    {
      variables: { id },
      fetchPolicy: 'cache-and-network'
    }
  );

  const { language = [] } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (isEmpty(language) || loading) {
    return (
      <div>
        <FormActionPlaceholder />
        <FormPlaceholder />
      </div>
    );
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Edit Language | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/language.svg"
        />
      </Head>
      <LanguageForm localeFiles={localeFiles} initialValues={language} isFork />
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
