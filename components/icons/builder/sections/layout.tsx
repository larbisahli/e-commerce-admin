import React from 'react';

export const LayoutSectionIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 68 38"
      {...props}
    >
      <rect width="63" height="34" x="5" fill="#eee" rx="2"></rect>
      <rect
        width="62"
        height="33"
        x="0.5"
        y="4.5"
        fill="#fff"
        stroke="currentColor"
        strokeLinejoin="round"
        rx="1.5"
      ></rect>
      <rect
        width="35"
        height="23"
        x="22.5"
        y="9.5"
        fill="#aaa"
        stroke="#currentColor"
        strokeDasharray="3 2"
        strokeLinejoin="round"
        rx="1.5"
      ></rect>
      <rect
        width="12"
        height="23"
        x="5.5"
        y="9.5"
        fill="#aaa"
        stroke="#currentColor"
        strokeDasharray="3 2"
        strokeLinejoin="round"
        rx="1.5"
      ></rect>
    </svg>
  );
};
