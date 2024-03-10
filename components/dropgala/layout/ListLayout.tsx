import Tag from '@components/dropgala/common/Tag';
import Card from '@components/dropgala/LatestBlogsCarousel/Card';
import Pagination from '@components/dropgala/Pagination';
import { useState } from 'react';

interface Props {
  posts: any[];
  tags?: any[];
  tag?: string | null;
  searchValue: string;
  initialDisplayPosts?: any[];
  pagination?: any;
}

export default function ListLayout({
  posts,
  initialDisplayPosts = [],
  tags = [],
  tag = null,
  searchValue,
  pagination
}: Props) {
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
      <div className="px-5">
        <div className="flex flex-wrap items-center justify-start">
          {Object.keys(tags)?.map((value) => {
            return <Tag key={tag} text={value} selected={tag} />;
          })}
        </div>
        <div
          // className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 sm:grid-cols-2 2xl:grid-cols-5 3xl:grid-cols-6"
          className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2"
        >
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags, thumbnail } = frontMatter;
            return (
              <Card
                classNames="xl:w-[400px] lg:w-[300px]"
                imgHeight={400}
                imgWidth={400}
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
