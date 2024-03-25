import React from 'react';

function AnalyticsIcon({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      {...props}
    >
      <path fill="currentColor" d="M4 2H2v26a2 2 0 002 2h26v-2H4z"></path>
      <path
        fill="currentColor"
        d="M30 9h-7v2h3.59L19 18.59l-4.29-4.3a1 1 0 00-1.42 0L6 21.59 7.41 23 14 16.41l4.29 4.3a1 1 0 001.42 0l8.29-8.3V16h2z"
      ></path>
    </svg>
  );
}

export default AnalyticsIcon;
