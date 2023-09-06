import Link from 'next/link';

export const Tag = ({ text }) => {
  return (
    <Link href={`/blog/tags/${text}`}>
      <a className="m-1 ml-0 rounded-full border bg-gray-100 px-2 pt-1 text-xs font-semibold uppercase text-gray-800 shadow hover:text-gray-600">
        {text.split(' ').join('-')}
      </a>
    </Link>
  );
};

export default Tag;
