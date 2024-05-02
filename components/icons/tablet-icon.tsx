import React from 'react';

function TabletIcon({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        fill="currentColor"
        d="M17 29h2v2h-2z"
        className="clr-i-outline clr-i-outline-path-1"
      ></path>
      <path
        fill="currentColor"
        d="M30 2H6a2 2 0 00-2 2v28a2 2 0 002 2h24a2 2 0 002-2V4a2 2 0 00-2-2m0 2v22.38H6V4zM6 32v-4h24v4z"
        className="clr-i-outline clr-i-outline-path-2"
      ></path>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
  );
}

export default TabletIcon;
