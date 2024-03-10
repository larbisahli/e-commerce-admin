import BlogSubscription from '@components/dropgala/BlogSubscription';
import Footer from '@components/dropgala/Footer';
import ListLayout from '@components/dropgala/layout/ListLayout';
import SearchLayout from '@components/dropgala/layout/SearchLayout';
import Navigation from '@components/dropgala/Navigation';
import { PageSEO, TagSEO } from '@components/dropgala/SEO';
import siteMetadata from '@data/siteMetadata';
import generateRss from '@lib/generate-rss';
import { getAllFilesFrontMatter } from '@lib/mdx';
import { getAllTags } from '@lib/tags';
import fs from 'fs';
import { kebabCase } from 'lodash';
import path from 'path';
import { useState } from 'react';

const root = process.cwd();

export async function getStaticPaths() {
  const tags = await getAllTags('blog');

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag
      }
    })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const tags = await getAllTags('blog');
  const allPosts = await getAllFilesFrontMatter('blog');
  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true &&
      post.tags.map((t) => kebabCase(t)).includes(params.tag)
  );

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`);
    const rssPath = path.join(root, 'public', 'tags', params.tag);
    fs.mkdirSync(rssPath, { recursive: true });
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss);
  }

  return { props: { tags, posts: filteredPosts, tag: params.tag } };
}

export default function Tag({ posts, tag, tags }) {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <Navigation />
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <section>
        <BlogSubscription></BlogSubscription>
      </section>
      <article className="container mx-auto my-8 lg:flex">
        <section className="lg:w-4/6">
          <ListLayout
            searchValue={searchValue}
            posts={posts}
            initialDisplayPosts={posts}
            pagination={null}
            tags={tags}
            tag={tag}
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
