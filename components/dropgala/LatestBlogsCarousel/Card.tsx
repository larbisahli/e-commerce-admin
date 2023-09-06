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
    <div className="h-full rounded-md border-2 border-gray-200 border-opacity-60 bg-white">
      {href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={350}
            height={200}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="object-cover object-center md:h-36 lg:h-48"
          width={350}
          height={200}
        />
      )}
      <div style={{ height: '190px' }} className="relative p-2">
        <h2 className="max-2-lines mb-2 text-xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="cut-line-3 max-3-lines prose mb-2 max-w-none text-base text-gray-500">
          {description}
        </p>
        <div
          style={{ width: '290px' }}
          className="absolute bottom-0 flex items-center justify-between"
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
