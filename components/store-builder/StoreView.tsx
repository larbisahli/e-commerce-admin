import Loader from '@components/ui/loader/loader';
import { useGetClient } from '@hooks/useGetClient';
import { useUI } from '@hooks/useUI';
import { DEVICE_VIEWS } from '@ts-types/enums';
import { getBuilderSrc } from '@utils/utils';
import cn from 'classnames';
import React, { useEffect, useRef } from 'react';

export default function StoreViewComponents() {
  const iframeRef = useRef(null);

  const {
    ui: {
      builder: { deviceView, isReloadIframe, iframeSrc, iframeLoading }
    },
    updateBuilderInfo
  } = useUI();

  const { userInfo } = useGetClient();

  const alias = userInfo?.store?.alias;

  const reload = () => {
    updateBuilderInfo({ iframeLoading: true });
    let src = getBuilderSrc(alias);
    if (iframeSrc) {
      src = iframeSrc;
    }
    iframeRef.current.contentWindow.location.href = src;
    updateBuilderInfo({ isReloadIframe: false });
  };

  useEffect(() => {
    if (isReloadIframe) {
      reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {iframeLoading && (
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
            onLoad={() => updateBuilderInfo({ iframeLoading: false })}
            id="storefront-iframe"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
