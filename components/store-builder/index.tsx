import Loader from '@components/ui/loader/loader';
import React, { useRef, useState } from 'react';

export default function PlansComponents() {
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  // const reload =()=>{
  //   setLoading(true)
  //   iframeRef.current.contentWindow.location.href = "http://127.0.0.1:3000"
  // }
  return (
    <div className="flex h-full items-center justify-center">
      <div className="builder-container">
        <div className="pointer-events-nones absolute top-0 left-0 z-10 h-full w-full">
          {loading && (
            <div className="flex h-full items-center justify-center">
              <Loader special />
            </div>
          )}
          <iframe
            ref={iframeRef}
            title="Shop preview"
            src="http://127.0.0.1:3000"
            width="100%"
            height="100%"
            className="w-fill h-full"
            onLoad={() => setLoading(false)}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
