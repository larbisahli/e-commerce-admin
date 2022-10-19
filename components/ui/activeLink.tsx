import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

type Props = {
  activeClassName: string;
  includes: string;
  className: string;
  children: React.ReactNode;
};

const ActiveLink: React.FC<NextLinkProps & Props> = ({
  href,
  children,
  activeClassName,
  className,
  includes,
  ...props
}) => {
  const { asPath } = useRouter();

  const A = useMemo(() => asPath?.split('/')?.filter((item) => item), [asPath]);
  const B = useMemo(
    () => includes?.split('/')?.filter((item) => item),
    [includes]
  );
  const isIncluded = useMemo(
    () => A.some((value) => B.includes(value)),
    [A, B]
  );

  const class_name =
    asPath === href || asPath === props.as || isIncluded
      ? `${className} ${activeClassName}`.trim()
      : className;

  return (
    <NextLink href={href} passHref>
      <a className={class_name}>{children}</a>
    </NextLink>
  );
};

export default ActiveLink;
