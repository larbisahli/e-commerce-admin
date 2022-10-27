import Link from '@components/ui/link';
import { siteSettings } from '@settings/site.settings';
import Image from 'next/image';
import React from 'react';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({ ...props }) => {
  return (
    <Link href={siteSettings.logo.href} {...props}>
      <div
        className="overflow-hidden"
        style={{
          width: siteSettings.logo.width,
          height: siteSettings.logo.height
        }}
      >
        <Image
          src={siteSettings.logo.url}
          alt={siteSettings.logo.alt}
          layout="fill"
          objectFit="contain"
          loading="eager"
        />
      </div>
    </Link>
  );
};

export default Logo;
