import React from 'react';

export const VideoIcon = ({ width = '24px', height = '24px' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill="#428bff"
        d="M5 5.5a2.75 2.75 0 00-2.75 2.75v7.5A2.75 2.75 0 005 18.5h8.5a2.75 2.75 0 002.75-2.75v-1.594l3.419 3.045c.805.717 2.081.145 2.081-.934V7.365c0-1.08-1.276-1.651-2.081-.934L16.25 9.476V8.25A2.75 2.75 0 0013.5 5.5z"
      ></path>
    </svg>
  );
};
