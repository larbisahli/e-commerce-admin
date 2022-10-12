export const OrdersIcon: React.FC<React.SVGAttributes<{}>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    {...props}
  >
    <mask id="a">
      <g fill="none" strokeLinejoin="round" strokeWidth={4}>
        <rect
          width={30}
          height={36}
          x={9}
          y={8}
          fill="#fff"
          stroke="#fff"
          rx={2}
        />
        <path stroke="#fff" strokeLinecap="round" d="M18 4v6m12-6v6" />
        <path
          stroke="#000"
          strokeLinecap="round"
          d="M16 19h16m-16 8h12m-12 8h8"
        />
      </g>
    </mask>
    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#a)" />
  </svg>
);