import Card from '@components/dropgala/LatestBlogsCarousel/Card';
import Pagination from '@components/dropgala/Pagination';
import { useState } from 'react';

interface Props {
  posts: any[];
  title: string;
  initialDisplayPosts?: any[];
  pagination?: any;
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination
}: Props) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent =
      frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredBlogPosts;

  return (
    <>
      <div className="divide-y">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap py-8">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags, thumbnail } = frontMatter;
            return (
              <Card
                classNames="mx-0"
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
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  );
}
