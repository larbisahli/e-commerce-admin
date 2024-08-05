import * as React from 'react';

const MenuSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"
    ></path>
  </svg>
);

export default MenuSvg;
