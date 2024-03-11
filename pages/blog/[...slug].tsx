import BlogSubscription from '@components/dropgala/BlogSubscription';
import Footer from '@components/dropgala/Footer';
import { MDXLayoutRenderer } from '@components/dropgala/MDXComponents';
import Navigation from '@components/dropgala/Navigation';
import generateRss from '@lib/generate-rss';
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles
} from '@lib/mdx';
import fs from 'fs';

const DEFAULT_LAYOUT = 'PostLayout';

export async function getStaticPaths() {
  const posts = getFiles('blog');
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/')
      }
    })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('blog');
  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug) === params.slug.join('/')
  );
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug('blog', params.slug.join('/'));
  const authorList = post.frontMatter.authors || ['default'];
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author]);
    return authorResults.frontMatter;
  });
  const authorDetails = await Promise.all(authorPromise);

  // rss
  const rss = generateRss(allPosts);
  fs.writeFileSync('./public/feed.xml', rss);

  return { props: { post, authorDetails, prev, next } };
}

function PageTitle({ children }) {
  return (
    <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl">
      {children}
    </h1>
  );
}

export default function Blog({ post, authorDetails, prev, next }) {
  const { mdxSource, toc, frontMatter } = post;
  return (
    <>
      <Navigation />
      <div className="container mx-auto pt-32">
        {/* <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div> */}
        {!frontMatter.draft ? (
          <MDXLayoutRenderer
            layout={frontMatter.layout || DEFAULT_LAYOUT}
            toc={toc}
            mdxSource={mdxSource}
            frontMatter={frontMatter}
            authorDetails={authorDetails}
            prev={prev}
            next={next}
          />
        ) : (
          <div className="mt-24 text-center">
            <PageTitle>
              Under Construction{' '}
              <span role="img" aria-label="roadwork sign">
                🚧
              </span>
            </PageTitle>
          </div>
        )}
      </div>

      <section>
        <BlogSubscription></BlogSubscription>
      </section>
      <Footer />
    </>
  );
}
