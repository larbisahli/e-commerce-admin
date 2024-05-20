import React from 'react';

export const SpacerSectionIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 70 26"
      {...props}
    >
      <rect width="70" height="26" fill="#eee" rx="2"></rect>
      <rect width="70" height="1" fill="currentColor" rx="0.5"></rect>
      <rect width="70" height="1" y="25" fill="currentColor" rx="0.5"></rect>
    </svg>
  );
};
