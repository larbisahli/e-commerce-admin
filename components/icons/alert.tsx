import React from 'react';

function AlertIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        fill="currentColor"
        d="M18 2.5c-8.82 0-16 6.28-16 14s7.18 14 16 14a18 18 0 004.88-.68l5.53 3.52a1 1 0 001.54-.84v-6.73a13 13 0 004-9.27C34 8.78 26.82 2.5 18 2.5zm10.29 22.11a1 1 0 00-.32.73v5.34l-4.38-2.79a1 1 0 00-.83-.11 16 16 0 01-4.76.72c-7.72 0-14-5.38-14-12s6.28-12 14-12 14 5.38 14 12a11.08 11.08 0 01-3.71 8.11z"
        className="clr-i-outline clr-i-outline-path-1"
      ></path>
      <path
        fill="currentColor"
        d="M18 20.63a1 1 0 001-1V8.48a1 1 0 10-2 0v11.13a1 1 0 001 1.02z"
        className="clr-i-outline clr-i-outline-path-2"
      ></path>
      <circle
        cx="18"
        cy="24.04"
        r="1.33"
        fill="currentColor"
        className="clr-i-outline clr-i-outline-path-3"
      ></circle>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
  );
}

export default AlertIcon;
