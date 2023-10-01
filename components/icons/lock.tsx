import React from 'react';
export const LockSvg = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M17.44 9.33h-1.1V6.4a4.34 4.34 0 00-8.68 0v2.93h-1.1a2.5 2.5 0 00-2.5 2.5v7.61a2.507 2.507 0 002.5 2.5h10.88a2.507 2.507 0 002.5-2.5v-7.61a2.5 2.5 0 00-2.5-2.5zM8.66 6.4a3.34 3.34 0 016.68 0v2.93H8.66zm10.28 13.04a1.511 1.511 0 01-1.5 1.5H6.56a1.511 1.511 0 01-1.5-1.5v-7.61a1.5 1.5 0 011.5-1.5h10.88a1.5 1.5 0 011.5 1.5z"
      ></path>
      <path
        fill="currentColor"
        d="M13 14.95a.984.984 0 01-.5.86v1.5a.5.5 0 01-1 0v-1.5a.984.984 0 01-.5-.86 1 1 0 012 0z"
      ></path>
    </svg>
  );
};
