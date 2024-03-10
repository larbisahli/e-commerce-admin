import Link from '../common/Link';

const LatestCard = ({ title, description, href }) => {
  return (
    <Link href={href} aria-label={`Link to ${title}`}>
      <div className="mb-3">
        <div className="mb-2 flex flex-col">
          <h2
            title={title}
            className="cut-line-1 mb-2 text-lg font-semibold leading-7 tracking-tight text-blue-500 hover:underline"
          >
            {title}
          </h2>
          <p className="cut-line-3 max-3-lines prose mb-2 max-w-none text-sm leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LatestCard;
