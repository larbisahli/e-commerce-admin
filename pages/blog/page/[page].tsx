import BlogSubscription from '@components/dropgala/BlogSubscription';
import Footer from '@components/dropgala/Footer';
import ListLayout from '@components/dropgala/layout/ListLayout';
import SearchLayout from '@components/dropgala/layout/SearchLayout';
import Navigation from '@components/dropgala/Navigation';
import { PageSEO } from '@components/dropgala/SEO';
import siteMetadata from '@data/siteMetadata';
import { getAllFilesFrontMatter } from '@lib/mdx';
import { getAllTags } from '@lib/tags';
import { POSTS_PER_PAGE } from '@utils/utils';
import { useState } from 'react';

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter('blog');
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps(context) {
  const {
    params: { page }
  } = context;
  const tags = await getAllTags('blog');
  const posts = await getAllFilesFrontMatter('blog');
  const pageNumber = parseInt(page);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE)
  };

  return {
    props: {
      posts,
      tags,
      initialDisplayPosts,
      pagination
    }
  };
}

export default function PostPage({
  tags,
  posts,
  initialDisplayPosts,
  pagination
}) {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <Navigation />
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <section>
        <BlogSubscription></BlogSubscription>
      </section>
      <article className="container mx-auto my-8 lg:flex">
        <section className="lg:w-4/6">
          <ListLayout
            searchValue={searchValue}
            posts={posts}
            initialDisplayPosts={initialDisplayPosts}
            pagination={pagination}
            tags={tags}
          />
        </section>
        <section className="hidden lg:block lg:w-1/3">
          <SearchLayout
            posts={posts}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
        </section>
      </article>
      <Footer />
    </>
  );
}
