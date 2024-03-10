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
    <NextLink href={href} target={target} {...props}>
      <div>{children}</div>
    </NextLink>
  );
};

export default Link;
