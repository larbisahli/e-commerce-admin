import Footer from '@components/dropgala/Footer';
import ListLayout from '@components/dropgala/layout/ListLayout';
import Navigation from '@components/dropgala/Navigation';
import { PageSEO } from '@components/dropgala/SEO';
import siteMetadata from '@data/siteMetadata';
import { getAllFilesFrontMatter } from '@lib/mdx';

import { POSTS_PER_PAGE } from '../index';

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter('blog');
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const {
    params: { page }
  } = context;
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
      initialDisplayPosts,
      pagination
    }
  };
}

export default function PostPage({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <Navigation />
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <div className="container mx-auto pt-32">
        <ListLayout
          posts={posts}
          initialDisplayPosts={initialDisplayPosts}
          pagination={pagination}
          title="All Posts"
        />
      </div>
      <Footer />
    </>
  );
}
