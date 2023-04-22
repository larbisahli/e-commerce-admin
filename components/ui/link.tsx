import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

const Link: React.FC<
  NextLinkProps & {
    className?: string;
    title?: string;
    target?: string;
    children: React.ReactNode;
  }
> = ({ href, target = '_self', children, ...props }) => {
  return (
    <NextLink href={href}>
      <a target={target} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
