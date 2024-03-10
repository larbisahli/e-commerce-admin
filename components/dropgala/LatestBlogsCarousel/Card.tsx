import { ClockIcon } from '@components/icons/clock.icon';
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

const Card = ({
  imgWidth,
  imgHeight,
  title,
  description,
  imgSrc,
  href,
  date,
  tags,
  classNames
}) => (
  <div className={cn('mx-auto w-[300px]', classNames)}>
    <div className="h-full rounded-md border border-gray-200 border-opacity-60 bg-white">
      {href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          <Image
            alt={title}
            src={imgSrc}
            className="rounded-t-md object-cover object-center md:h-40 lg:h-48"
            width={imgWidth ?? 350}
            height={imgHeight ?? 200}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="rounded-t-md object-cover object-center md:h-36 lg:h-48"
          width={imgWidth ?? 350}
          height={imgHeight ?? 200}
        />
      )}
      <div className="flex flex-col p-3 pb-2">
        <h2
          title={title}
          className="cut-line-2 mb-2 h-[56px] text-xl font-bold leading-7 tracking-tight"
        >
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="cut-line-3 max-3-lines prose mb-2 min-h-[60px] max-w-none text-sm leading-5 text-gray-500">
          {description}
        </p>
        <div className="flex h-full items-end justify-between">
          <div>
            {href && (
              <Link
                href={href}
                className="flex items-center justify-center text-sm font-medium leading-6 text-blue-600 hover:text-blue-500"
                aria-label={`Link to ${title}`}
              >
                <span>Learn more</span>
                <span className="text-l mx-1">&rarr;</span>
              </Link>
            )}
          </div>
          <div className="flex flex-1 items-center justify-end text-gray-400">
            <div className="mx-1">
              <ClockIcon width={15} height={15} />
            </div>
            <dl>
              <dd className="text-xs leading-6 text-gray-400">
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
