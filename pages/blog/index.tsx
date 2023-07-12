import Footer from '@components/dropgala/Footer';
import ListLayout from '@components/dropgala/layout/ListLayout';
import Navigation from '@components/dropgala/Navigation';
import { PageSEO } from '@components/dropgala/SEO';
import siteMetadata from '@data/siteMetadata';
import { getAllFilesFrontMatter } from '@lib/mdx';

export const POSTS_PER_PAGE = 5;

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE)
  };

  return { props: { initialDisplayPosts, posts, pagination } };
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <Navigation />
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
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
