import siteMetadata from '@data/siteMetadata';
import cn from 'classnames';

import Image from '../common/Image';
import Link from '../common/Link';

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options);

  return now;
};

const Card = ({ title, description, imgSrc, href, date, tags, classNames }) => (
  <div
    className={cn('mx-auto p-4 md:w-1/2', classNames)}
    style={{ width: '350px', minWidth: '300px', height: '420px' }}
  >
    <div className="bg-white h-full border-2 border-gray-200 rounded-md border-opacity-60">
      {href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center lg:h-48 md:h-36"
            width={350}
            height={200}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="object-cover object-center lg:h-48 md:h-36"
          width={350}
          height={200}
        />
      )}
      <div style={{ height: '190px' }} className="p-2 relative">
        <h2 className="mb-2 text-xl font-bold leading-8 tracking-tight max-2-lines">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="mb-2 cut-line-3 prose text-gray-500 max-w-none max-3-lines text-base">
          {description}
        </p>
        <div
          style={{ width: '290px' }}
          className="absolute flex justify-between items-center bottom-0"
        >
          <div>
            {href && (
              <Link
                href={href}
                className="text-base font-medium leading-6 text-blue-500 hover:text-blue-600"
                aria-label={`Link to ${title}`}
              >
                <span>Learn more</span>
                <span className="text-2xl">&rarr;</span>
              </Link>
            )}
          </div>
          <div className="">
            <dl>
              <dd className="text-sm font-medium leading-6 text-gray-500">
                <time dateTime={date}>{formatDate(date)}</time>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Card;
