/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

type Props = {
  activeClassName: string;
  includes: string;
  className: string;
  children: React.ReactNode;
  isSubLink?: boolean;
};

const ActiveLink: React.FC<NextLinkProps & Props> = ({
  href,
  children,
  activeClassName,
  className,
  includes,
  onClick,
  isSubLink = false,
  ...props
}) => {
  const { asPath } = useRouter();

  const A = useMemo(() => asPath?.split('/')?.filter((item) => item), [asPath]);
  const B = useMemo(
    () => includes?.split('/')?.filter((item) => item),
    [includes]
  );
  const isIncluded = useMemo(
    () =>
      isSubLink
        ? A.every((value) => B.includes(value))
        : A.some((value) => B.includes(value)),
    [isSubLink, A, B]
  );

  const class_name =
    asPath === href || asPath === props.as || isIncluded
      ? `${className} ${activeClassName}`.trim()
      : className;

  const isFunction = onClick instanceof Function;

  return (
    <NextLink href={href} passHref>
      <a
        onClick={onClick}
        role={isFunction ? 'button' : null}
        className={class_name}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default ActiveLink;