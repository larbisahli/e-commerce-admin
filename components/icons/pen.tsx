const EditSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="none"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m30 7-5-5L5 22l-2 7 7-2Zm-9-1 5 5ZM5 22l5 5Z"
    />
  </svg>
);

export default EditSvg;
