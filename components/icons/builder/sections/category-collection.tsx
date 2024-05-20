import React from 'react';

export const CategoryCollectionSectionIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <circle cx="17" cy="7" r="3"></circle>
        <circle cx="7" cy="17" r="3"></circle>
        <path d="M14 14h6v5a1 1 0 01-1 1h-4a1 1 0 01-1-1zM4 4h6v5a1 1 0 01-1 1H5a1 1 0 01-1-1z"></path>
      </g>
    </svg>
  );
};
