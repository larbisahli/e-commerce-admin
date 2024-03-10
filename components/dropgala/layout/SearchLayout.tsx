import Card from '@components/dropgala/LatestBlogsCarousel/Card';
import { Dispatch, SetStateAction } from 'react';

import LatestCard from '../LatestBlogsCarousel/LatestCard';

interface Props {
  posts: any[];
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export default function SearchLayout({
  setSearchValue,
  searchValue,
  posts
}: Props) {
  return (
    <div className="relative h-full">
      <div className="sticky top-20">
        <div className="space-y-2 pb-8 md:space-y-5">
          <h2 className="md:leading-14 text-2xl font-bold leading-9 tracking-tight text-gray-900 sm:text-3xl sm:leading-10">
            Search
          </h2>
          <div className="relative max-w-lg">
            <input
              aria-label="Search"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              className="block w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
            />
            <svg
              className="absolute right-3 top-[9px] h-5 w-5 text-gray-400"
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
        <div className="space-y-2 pb-8 md:space-y-5">
          <h2 className="md:leading-14 text-2xl font-bold leading-9 tracking-tight text-gray-900 sm:text-3xl sm:leading-10">
            Most popular articles
          </h2>
          <div>
            {posts.map((frontMatter) => {
              const { slug, date, title, summary } = frontMatter;
              return (
                <LatestCard
                  key={title}
                  title={title}
                  description={summary}
                  href={`/blog/${slug}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
