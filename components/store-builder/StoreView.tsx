import Loader from '@components/ui/loader/loader';
import { useGetUser } from '@hooks/useGetUser';
import { useUI } from '@hooks/useUI';
import { DEVICE_VIEWS } from '@ts-types/enums';
import { getBuilderSrc } from '@utils/utils';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

export default function StoreViewComponents() {
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const {
    ui: {
      builder: { deviceView, isReloadIframe, iframeSrc }
    },
    updateBuilderInfo
  } = useUI();

  const { userInfo } = useGetUser();

  const alias = userInfo?.store?.alias;

  const reload = () => {
    setLoading(true);
    iframeRef.current.contentWindow.location.href =
      iframeSrc ?? getBuilderSrc(alias);
    updateBuilderInfo({ isReloadIframe: false });
  };

  useEffect(() => {
    if (isReloadIframe) {
      reload();
    }
  }, [isReloadIframe]);

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className={cn('builder-container rounded-sm', {
          'builder-container--desktop': deviceView === DEVICE_VIEWS.DESKTOP,
          'builder-container--mobile': deviceView === DEVICE_VIEWS.MOBILE,
          'builder-container--tablet': deviceView === DEVICE_VIEWS.TABLET
        })}
      >
        <div className="pointer-events-nones absolute top-0 left-0 z-10 h-full w-full">
          {loading && (
            <div className="flex h-full items-center justify-center">
              <Loader special />
            </div>
          )}
          <iframe
            ref={iframeRef}
            title="Shop preview"
            src={getBuilderSrc(alias)}
            width="100%"
            height="100%"
            className="w-fill h-full"
            onLoad={() => setLoading(false)}
            id="storefront-iframe"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
