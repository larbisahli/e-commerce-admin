import Link from 'next/link';

export const Tag = ({ text }) => {
  return (
    <Link href={`/blog/tags/${text}`}>
      <a className="text-xs px-2 pt-1 m-1 ml-0 rounded-full bg-gray-100 shadow border font-semibold uppercase text-gray-800 hover:text-gray-600">
        {text.split(' ').join('-')}
      </a>
    </Link>
  );
};

export default Tag;
