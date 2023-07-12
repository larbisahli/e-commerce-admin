import siteMetadata from '@data/siteMetadata';
import { memo } from 'react';

import Card from './Card';

const LatestBlogsCarousel = ({ posts, MAX_DISPLAY }) => {
  return (
    <div className="">
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:leading-10 md:leading-14">
          Posts
        </h1>
        <p className="text-center text-lg leading-7 text-gray-500">
          {siteMetadata.description}
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
          const { slug, date, title, summary, tags, thumbnail } = frontMatter;
          return (
            <Card
              key={title}
              title={title}
              description={summary}
              imgSrc={thumbnail ?? '/static/images/time-machine.jpg'}
              href={`/blog/${slug}`}
              tags={tags}
              date={date}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(LatestBlogsCarousel);
