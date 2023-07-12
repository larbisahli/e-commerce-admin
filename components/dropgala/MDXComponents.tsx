/* eslint-disable react/display-name */
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

import Image from './common/Image';
import CustomLink from './common/Link';
import Pre from './common/Pre';
import TOCInline from './common/TOCInline';

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, ...rest }) => {
    const Layout = require(`../dropgala/layout/PostLayout`).default;
    return <Layout {...rest} />;
  }
};

export const MDXLayoutRenderer = ({ mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout components={MDXComponents} {...rest} />;
};
