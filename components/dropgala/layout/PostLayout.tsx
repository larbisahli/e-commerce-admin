import Link from '@components/dropgala/common/Link';
import Tag from '@components/dropgala/common/Tag';
import { BlogSEO } from '@components/dropgala/SEO';
import siteMetadata from '@data/siteMetadata';
import Image from 'next/legacy/image';

function PageTitle({ children }) {
  return (
    <h1 className="md:leading-14 mx-auto max-w-[1000px] text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl">
      {children}
    </h1>
  );
}

function SectionContainer({ children }) {
  return <div className="page-container">{children}</div>;
}

const postDateTemplate = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  children
}) {
  const { slug, date, title, tags, readingTime, thumbnail } = frontMatter;
  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <article>
        <div className="xl:divide-y xl:divide-gray-200">
          <header className="pt-6 xl:pb-6">
            <div className="my-10 space-y-1 text-center">
              <dl className="space-y-10">
                <div className="mb-4">
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )}
                    </time>
                  </dd>
                  <span className="font-base leading-6 text-gray-500 ">
                    {readingTime.text}
                  </span>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li
                      className="flex items-center space-x-2"
                      key={author.name}
                    >
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={45}
                          height={45}
                          alt="avatar"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900">{author.name}</dd>
                        <dd>
                          {
                            <Link
                              href={author.linkedin}
                              className="text-blue-500 hover:text-blue-600"
                            >
                              {author.occupation}
                            </Link>
                          }
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              {/* <div className="flex mt-2 flex-col">
                {<Image
                  alt={title}
                  src={thumbnail}
                  className="object-cover rounded"
                  width={1500}
                  height={700}
                />}
              </div> */}
              <div className="prose max-w-none border-none px-2 pb-8">
                {children}
              </div>
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs  uppercase tracking-wide text-gray-500">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag selected={null} key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-start text-xs uppercase tracking-wide text-gray-500">
                          Previous Article
                        </h2>
                        <div className="text-xs text-blue-500 hover:text-blue-600 sm:text-sm">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-end text-xs uppercase tracking-wide text-gray-500 sm:text-start">
                          Next Article
                        </h2>
                        <div className="text-end text-xs text-blue-500 hover:text-blue-600 sm:text-start sm:text-sm">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-4 w-fit xl:mt-1">
                <Link
                  href="/blog"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <span className="px-1 text-lg">&larr;</span>
                  <span>Back to the blog</span>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
