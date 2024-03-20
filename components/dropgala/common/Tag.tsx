import cn from 'classnames';
import Link from 'next/link';

export const Tag = ({ text, selected }) => {
  return (
    <Link href={`/blog/tags/${text}`}>
      <div
        className={cn(
          'm-1 rounded-sm border bg-gray-100 px-3 py-1 text-xs text-gray-600 shadow hover:border-blue-500 hover:bg-blue-400 hover:text-white',
          { 'border-blue-500 bg-blue-400 !text-white': selected === text }
        )}
      >
        {text.split(' ').join('-')}
      </div>
    </Link>
  );
};

export default Tag;
