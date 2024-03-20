import Image from 'next/image';
import Link from 'next/link';

const RecommendedPosts = [
  {
    id: 1,
    title: 'Effective Strategies for Handling E-commerce Shipping',
    description:
      'Explore e-commerce shipping: delivery, notifications, labels, rates, costs, packaging, customs, and best practices.',
    thumbnail: '/static/images/blog/delivery.jpg',
    link: '/blog/effective-strategies-for-handling-e-commerce-shipping',
    readTime: '4 min read'
  },
  {
    id: 2,
    title: 'Discover your winning product by putting it to the test',
    description:
      "Business success hinges on finding an excellent product meeting market needs. A merchant's success is linked to the quality of the product they offer.",
    thumbnail: '/static/images/blog/winning-product.jpg',
    link: '/blog/discover-your-winning-product-by-putting-it-to-the-test',
    readTime: '9 min read'
  },
  {
    id: 3,
    title: 'How to start a business in 10 steps',
    description:
      'Initiate a successful online business with 10 steps: clear plan, exceptional product, and robust marketing strategy. From defining the idea to first orders, achieve success.',
    thumbnail: '/static/images/blog/start-business.jpg',
    link: 'https://dropgala.com/blog/how-to-start-a-business-in-10-steps',
    readTime: '12 min read'
  }
];

const RecommendationsSection = () => {
  return (
    <div className="mb-4 w-full">
      <div className="mb-2 flex flex-1 items-end text-lg font-medium">
        Guides & Tips
      </div>
      <div className="border border-b-0 border-gray-300">
        {RecommendedPosts?.map((post) => {
          return (
            <Link target="_block" key={post.id} href={post.link}>
              <div className="group flex h-[150px] border-b border-gray-300">
                <div className="flex items-center justify-center">
                  <div className="relative mx-2 flex items-center justify-center">
                    <Image
                      alt={post.title}
                      src={post.thumbnail}
                      className="object-cover object-center"
                      width={200}
                      height={140}
                    />
                  </div>
                  <div className="mx-3 flex max-w-screen-sm flex-col">
                    <h2
                      title={post.title}
                      className="cut-line-1 mb-2 text-xl font-semibold leading-7 tracking-tight group-hover:underline"
                    >
                      {post.title}
                    </h2>
                    <p className="cut-line-3 max-3-lines prose mb-1 max-w-none text-sm leading-5 text-gray-500">
                      {post.description}
                    </p>
                    <span className="text-xs text-gray-500">
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsSection;
